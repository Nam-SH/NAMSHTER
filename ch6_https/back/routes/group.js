const express = require("express");
const router = express.Router();
const db = require("../models");

const { isLoggedIn } = require("./middlewares");

// 업로드 관련
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      // 실패시 null, 성공시 uploads에 저장
      done(null, "grouppostimage");
    },
    filename(req, file, done) {
      // ext: 확장자 이름을 뽑아온다.
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      // 남승현.jpg ==> basename: 남승현, ext: .jpg
      done(null, basename + Date.now() + ext);
    }
  }),
  limit: {
    fileSize: 1000 * 1024 * 1024
  }
});
// 이미지업로드(/post/images)
router.post("/images", isLoggedIn, upload.array("image"), (req, res) => {
  res.json(req.files.map(v => v.filename));
});

// 배포용
// AWS.config.update({
//   region: 'us-east-2',
//   accessKeyId: process.env.S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
// });

// const upload = multer({
//   storage: multerS3({
//     s3: new AWS.S3(),
//     bucket: 'namshter',
//     key(req, file, cb) {
//       cb(null, `original/${Date.now()}${path.basename(file.originalname)}`)
//     },
//   }),
//   limit: { fileSize: 20 * 1024 * 1024 },
// });

// router.post('/images', isLoggedIn, upload.array('image'), (req, res) => {
//   // console.log(req.files);
//   res.json(req.files.map(v => v.location));
// });

// 한개 그룹 디테일
router.get("/:groupId", async (req, res, next) => {
  try {
    const group = await db.Group.findOne({
      where: {
        id: req.params.groupId
      },
      include: [
        {
          model: db.User,
          as: "Master",
          attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
        },
        {
          model: db.User,
          as: "Groupmembers",
          attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
        },
        {
          model: db.GroupPost,
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
            }
          ]
        },
        {
          model: db.Subject,
          as: "Selectsubject",
          attributes: ["id", "name"],
          include: [
            {
              model: db.Category,
              attributes: ["id", "name"]
            }
          ]
        }
      ]
    });
    return res.json(group);
  } catch (err) {
    console.error("GET /:id", err);
    next(err);
  }
});

// 그룹 한개 생성
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const newGroup = await db.Group.create({
      name: req.body.name,
      intro: req.body.intro,
      limit: req.body.limit,
      MasterId: req.user.id
    });

    const targetSubject = await db.Subject.findOne({
      where: {
        name: req.body.subjectName
      }
    });
    await newGroup.addGroupmembers(req.user.id);
    await newGroup.addSelectsubject(targetSubject.id);

    const fullGroup = await db.Group.findOne({
      where: {
        id: newGroup.id
      },
      include: [
        {
          model: db.User,
          as: "Master",
          attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
        },
        {
          model: db.User,
          as: "Groupmembers",
          attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
        },
        {
          model: db.GroupPost,
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
            }
          ]
        },
        {
          model: db.Subject,
          as: "Selectsubject",
          attributes: ["id", "name"],
          include: [
            {
              model: db.Category,
              attributes: ["id", "name"]
            }
          ]
        }
      ]
    });
    return res.json(fullGroup);
  } catch (err) {
    console.error("POST /:id", err);
    next(err);
  }
});

// 그룹 상태 변경하기
router.post("/:groupId/changestatus", isLoggedIn, async (req, res, next) => {
  try {
    // 1. 해당 그룹 찾기
    const group = await db.Group.findOne({
      where: {
        id: parseInt(req.params.groupId, 10)
      }
    });
    // 2. 그룹이 없으면 끝
    if (!group) {
      return res.status(404).send("그런 그룹이 없는데여;;");
    }
    // 3. 그룹이 있으면 해당 그룹의 마수터와 요청한 자의 id 비교하기
    // 방장이 아니면 400에러 보내기
    if (group.MasterId !== req.body.userId) {
      return res.status(403).send("님은 상태를 변경할 권한이 없는데여;;");
    }
    // 4. 방장이라면 바꿔주기
    let nxt = 1;
    if (group.status === 1) {
      nxt = 2;
    } else if (group.status === 2) {
      return res.status(400).send("완료 된 그룹인데여;;");
    }

    await db.Group.update(
      {
        status: nxt
      },
      {
        where: {
          id: parseInt(req.params.groupId, 10)
        }
      }
    );
    return res.json(nxt);
  } catch (err) {
    console.error("POST /changestatus :::", err);
    next(err);
  }
});

// 그룹 가입탈퇴
router.post("/:groupId/userInOut", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.body.userId
      }
    });
    const targetGroup = await db.Group.findOne({
      where: {
        id: req.params.groupId
      },
      attributes: ["id", "MasterId"]
    });

    if (user.id === targetGroup.MasterId) {
      return res.send("님은 방장이라 가입/탈퇴 못함;;");
    }
    const usersInGroup = await targetGroup.getGroupmembers({
      where: {
        id: user.id
      },
      attributes: ["id"]
    });
    if (usersInGroup && usersInGroup.length > 0) {
      await user.removeGroupJoined(req.params.groupId);
      return res.json(user.id);
    } else {
      await user.addGroupJoined(req.params.groupId);
      return res.json(user.id);
    }
  } catch (err) {
    console.error("POST /:groupId/userInOut", err);
    next(err);
  }
});

// 글 전체 불러오기
router.get("/:groupId/posts", async (req, res, next) => {
  try {
    let where = {
      GroupId: req.params.groupId
    };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      };
    }
    const groupPosts = await db.GroupPost.findAll({
      where,
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
        },
        {
          model: db.GroupPostImage
        }
      ],
      order: [["createdAt", "DESC"]],
      limit: parseInt(req.query.limit, 10) || 10
    });
    res.json(groupPosts);
  } catch (err) {
    console.error("GET /:groupId/posts", err);
    next(err);
  }
});

// 글 작성(POST /post)
router.post("/:groupId/post", isLoggedIn, async (req, res, next) => {
  try {
    const newGroupPost = await db.GroupPost.create({
      title: req.body.title,
      content: req.body.content,
      GroupId: req.params.groupId,
      UserId: req.user.id
    });
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        await Promise.all(
          req.body.image.map(image => {
            return db.GroupPostImage.create({
              src: image,
              GroupPostId: newGroupPost.id
            });
          })
        );
      } else {
        await db.GroupPostImage.create({
          src: req.body.image,
          GroupPostId: newGroupPost.id
        });
      }
    }
    const fullGroupPost = await db.GroupPost.findOne({
      where: {
        id: newGroupPost.id
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
        },
        {
          model: db.GroupPostImage
        }
      ]
    });
    return res.json(fullGroupPost);
  } catch (err) {
    console.error("POST /:groupId/post :::", err);
    next(err);
  }
});

// 1글 수정
// 2글 삭제
// 3댓글 조회
// 4댓글 생성
// 5댓글 삭제
// 6.좋아요

module.exports = router;
