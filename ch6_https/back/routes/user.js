const express = require("express");
const router = express.Router();

// 사용자 관련
const bcrypt = require("bcrypt");
const passport = require("passport");

// 업로드 관련
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");

const moment = require("moment");

const db = require("../models");
const {
  isLoggedIn,
  isNotLoggedIn
} = require("./middlewares");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "userprofile");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + Date.now() + ext);
    }
  }),
  limit: {
    fileSize: 1000 * 1024 * 1024
  }
});

router.get("/kakao", passport.authenticate("kakao"));
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    successRedirect: process.env.NODE_ENV === "production" ?
      "https://namshter.com" : "http://localhost:3081/",
    failureRedirect: process.env.NODE_ENV === "production" ?
      "https://namshter.com" : "http://localhost:3081/"
  })
);

router.get("/naver", passport.authenticate("naver"));
router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    successRedirect: process.env.NODE_ENV === "production" ?
      "https://namshter.com" : "http://localhost:3081/",
    failureRedirect: process.env.NODE_ENV === "production" ?
      "https://namshter.com" : "http://localhost:3081/"
  })
);

// 사용자정보 가져오기
router.get("/", isLoggedIn, async (req, res, next) => {
  const user = req.user;
  res.json(user);
});

// 다른 사용자정보 가져오기
router.get("/:id", async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: parseInt(req.params.id, 10)
      },
      attributes: [
        "id",
        "nickname",
        "name",
        "email",
        "src",
        "isAdmin",
        "snsId",
        "provider"
      ],
      include: [{
          model: db.Post,
          as: "Posts",
          attributes: ["id", "createdAt"]
        },
        {
          // 이 유저가 좋아한다고(Liked) 한 글을 포함시켜라
          model: db.Post,
          as: "Liked",
          attributes: ["id"]
        },
        {
          model: db.User,
          as: "Followings",
          attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
        },
        {
          model: db.User,
          as: "Followers",
          attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
        },
        {
          model: db.Comment,
          attributes: ["id"]
        },
        {
          model: db.Group,
          as: "GroupJoined",
          attributes: ["id", "name", "state"]
        }
      ],
      order: [
        [{
          model: db.User,
          as: 'Followings'
        }, 'createdAt', 'DESC'],
        [{
          model: db.User,
          as: 'Followers'
        }, 'createdAt', 'DESC'],
        [db.Post, 'createdAt', 'DESC'],
        [{
          model: db.Group,
          as: 'GroupJoined'
        }, 'createdAt', 'DESC'],
      ]
    });
    res.json(user);
  } catch (err) {
    console.error("GET /:id :::", err);
    next(err);
  }
});

// 다른 사용자정보 가져오기
router.get("/image/:userEmail", async (req, res, next) => {
  try {
    const userSrc = await db.User.findOne({
      where: {
        email: req.params.userEmail
      },
      attributes: ["nickname", "src"],
    });
    res.json(userSrc);
  } catch (err) {
    console.error("GET /image/:userEmail :::", err);
    next(err);
  }
});

// 회원가입(signUp)
router.post("/", isNotLoggedIn, async (req, res, next) => {
  // 회원가입
  try {
    const hash = await bcrypt.hash(req.body.password, 12);
    const exUser = await db.User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (exUser) {
      // 이미 회원가입되어있으면
      return res.status(403).json({
        errorCode: 1,
        message: "이미 회원가입되어있습니다."
      });
    }
    await db.User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      nickname: req.body.nickname
    }); // HTTP STATUS CODE
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.error("POST-1 / :::", err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async err => {
        // 세션에 사용자 정보 저장은 serializeUser
        if (err) {
          console.error("POST-2 / :::", err);
          return next(err);
        }
        const fullUser = await db.User.findOne({
          where: {
            id: user.id
          },
          attributes: [
            "id",
            "nickname",
            "name",
            "email",
            "src",
            "isAdmin",
            "snsId",
            "provider"
          ],
          include: [{
              model: db.Post,
              attributes: ["id", "createdAt"]
            },
            {
              model: db.User,
              as: "Followings",
              attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
            },
            {
              model: db.User,
              as: "Followers",
              attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
            },
            {
              model: db.Comment,
              attributes: ["id"]
            },
            {
              model: db.Group,
              as: "GroupJoined",
              attributes: ["id", "name", "state"]
            }
          ],
          order: [
            [{
              model: db.User,
              as: 'Followings'
            }, 'createdAt', 'DESC'],
            [{
              model: db.User,
              as: 'Followers'
            }, 'createdAt', 'DESC'],
            [db.Post, 'createdAt', 'DESC'],
            [{
              model: db.Group,
              as: 'GroupJoined'
            }, 'createdAt', 'DESC'],
          ]
        });
        // 데일리 체크
        const today = moment(new Date().toISOString()).format("YYYY-MM-DD") + " 00:00:00Z";
        const checkingDay = await db.DailyTz.findOne({
          where: {
            createdAt: today
          },
          attributes: ["id"]
        });
        const checkedToday = await checkingDay.getCheckedUser({
          where: {
            id: user.id
          }
        });
        if (checkingDay && checkedToday && checkedToday.length === 0) {
          await fullUser.addChecking(checkingDay.id);
        }
        return res.json(fullUser);
      });
    })(req, res, next);
  } catch (err) {
    console.error("POST-3 / :::", err);
    return next(err);
  }
});

// 로그인
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("POST-1 /login :::", err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async err => {
      // 세션에다 사용자 정보 저장 (어떻게? serializeUser)
      try {
        if (err) {
          console.error("POST-2 /login :::", err);
          return next(err);
        }
        const fullUser = await db.User.findOne({
          where: {
            id: user.id
          },
          attributes: [
            "id",
            "nickname",
            "name",
            "email",
            "src",
            "isAdmin",
            "snsId",
            "provider"
          ],
          include: [{
              model: db.Post,
              attributes: ["id", "createdAt"]
            },
            {
              model: db.User,
              as: "Followings",
              attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
            },
            {
              model: db.User,
              as: "Followers",
              attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
            },
            {
              model: db.Comment,
              attributes: ["id"]
            },
            {
              model: db.Group,
              as: "GroupJoined",
              attributes: ["id", "name", "state"]
            }
          ],
          order: [
            [{
              model: db.User,
              as: 'Followings'
            }, 'createdAt', 'DESC'],
            [{
              model: db.User,
              as: 'Followers'
            }, 'createdAt', 'DESC'],
            [db.Post, 'createdAt', 'DESC'],
            [{
              model: db.Group,
              as: 'GroupJoined'
            }, 'createdAt', 'DESC'],
          ]
        });
        // 데일리 체크
        const today =
          moment(new Date().toISOString()).format("YYYY-MM-DD") + " 00:00:00Z";
        const checkingDay = await db.DailyTz.findOne({
          where: {
            createdAt: today
          },
          attributes: ["id"]
        });
        const checkedToday = await checkingDay.getCheckedUser({
          where: {
            id: user.id
          }
        });
        if (checkingDay && checkedToday && checkedToday.length === 0) {
          await fullUser.addChecking(checkingDay.id);
        }
        return res.json(fullUser);
      } catch (err) {
        console.error("POST-4 /login :::", err);
        return next(err);
      }
    });
  })(req, res, next);
});

// 로그아웃
router.post("/logout", isLoggedIn, async (req, res) => {
  try {
    req.logout();
    req.session.destroy();
    return res.status(200).send("로그아웃 되었습니다.");
  } catch (err) {
    console.error("/logout :::", err);
    next(err);
  }
});

// 닉네임 변경
router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await db.User.update({
      nickname: req.body.nickname
    }, {
      where: {
        id: req.user.id
      }
    });
    res.send(req.body.nickname);
  } catch (err) {
    console.error("PATCH /nickname :::", err);
    next(err);
  }
});

// 이름 변경
router.patch("/name", isLoggedIn, async (req, res, next) => {
  try {
    await db.User.update({
      name: req.body.name
    }, {
      where: {
        id: req.user.id
      }
    });
    res.send(req.body.name);
  } catch (err) {
    console.error("PATCH /name :::", err);
    next(err);
  }
});

// 비밀번호 변경
router.patch("/password", isLoggedIn, async (req, res, next) => {
  const hash = await bcrypt.hash(req.body.password, 12);
  try {
    await db.User.update({
      password: hash
    }, {
      where: {
        id: req.user.id
      }
    });
    res.send("비밀번호 변경 성공~");
  } catch (err) {
    console.error("PATCH /nickname :::", err);
    next(err);
  }
});

// 이미지업로드(/post/images)
router.patch(
  "/images",
  isLoggedIn,
  upload.single("image"),
  async (req, res) => {
    try {
      await db.User.update({
        src: req.file.filename
      }, {
        where: {
          id: req.user.id
        }
      });
      res.send(req.file.filename);
    } catch (err) {
      console.error("PATCH /images :::", err);
      next(err);
    }
  }
);

// 팔로우
router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });
    await me.addFollowing(req.params.id);
    const user = await db.User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ["id", "nickname", "name"]
    });
    res.send({
      id: user.id,
      nickname: user.nickname,
      name: user.name
    });
  } catch (err) {
    console.error("POST /:id/follow :::", err);
    next(err);
  }
});

// 언팔로우
router.delete("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });
    await me.removeFollowing(req.params.id);
    res.send(req.params.id);
  } catch (err) {
    console.error("DELETE /:id/follow :::", err);
    next(err);
  }
});

// 언팔로워
router.delete("/:id/follower", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });
    await me.removeFollower(req.params.id);
    res.send(req.params.id);
  } catch (err) {
    console.error("DELETE /:id/follower :::", err);
    next(err);
  }
});

// 나를 팔로워 전체 목록 불러오기
router.get("/:id/followers", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      };
    }
    const followers = await me.getFollowers({
      where,
      attributes: ['id', 'nickname', 'name', 'src', 'email'],
      order: [
        ["createdAt", "DESC"],
        ["id", "DESC"]
      ],
      limit: parseInt(req.query.limit, 10) || 5
    });
    let isMore = !followers.slice(4, 5).length ? false : true;
    return res.json({
      followers: followers.slice(0, 4),
      hasMoreFollower: isMore
    });
    res.json(followers);
  } catch (err) {
    console.error("GET /:id/followers :::", err);
    next(err);
  }
});

// 내가 팔로우 전체 목록 불러오기
router.get("/:id/followings", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      };
    }
    const followings = await me.getFollowings({
      where,
      attributes: ['id', 'nickname', 'name', 'src', 'email'],
      order: [
        ["createdAt", "DESC"],
        ["id", "DESC"]
      ],
      limit: parseInt(req.query.limit, 10) || 5
    });
    let isMore = !followings.slice(4, 5).length ? false : true;
    return res.json({
      followings: followings.slice(0, 4),
      hasMoreFollowing: isMore
    });
  } catch (err) {
    console.error("GET /:id/followings :::", err);
    next(err);
  }
});

// 특정 사용자가 작성한 글 불러오기
router.get("/:userId/posts", async (req, res, next) => {
  try {
    let where = {
      UserId: parseInt(req.params.userId, 10)
    };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) // less than
        }
      };
    }
    const posts = await db.Post.findAll({
      where,
      include: [{
          model: db.User,
          attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
        },
        {
          model: db.Image
        },
        {
          model: db.User,
          as: "Likers",
          attributes: ["id"]
        },
        {
          model: db.Post,
          as: "Retweet",
          include: [{
              model: db.User,
              attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
            },
            {
              model: db.Image
            }
          ]
        }
      ],
      order: [
        ["createdAt", "DESC"]
      ],
      limit: parseInt(req.query.limit, 10) || 10
    });
    res.json(posts);
  } catch (err) {
    console.error("GET /:id/posts :::", err);
    next(err);
  }
});

// 출석률 확인
router.get('/:userId/daily', isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.params.userId
      }
    })
    if (!user) {
      return res.status(404).send('없는 사용자 인데요')
    }
    const rawData = await user.getChecking()
    const thisYear = new Date(rawData[0].createdAt).getFullYear()
    let allYearCheck = [
      []
    ]
    for (i = 1; i < 13; i++) {
      let lastDay = new Date(thisYear, i, 0).getDate()
      allYearCheck.push(new Array(lastDay + 1).fill(0))
    }
    for (i = 0; i < rawData.length; i++) {
      let checkMonth = new Date(rawData[i].createdAt).getMonth() + 1
      let checkday = new Date(rawData[i].createdAt).getDay() + 1
      allYearCheck[checkMonth][checkday] = 1
    }
    return res.json(allYearCheck)

  } catch (err) {
    console.error('GET /:userId/daily', err);
    next(err)
  }
})

module.exports = router;