const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const {
  isLoggedIn,
  isNotLoggedIn
} = require('./middlewares')


router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    successRedirect: process.env.NODE_ENV === "production" ? "http://namshter.com" : "http://localhost:3081/",
    failureRedirect: process.env.NODE_ENV === "production" ? "http://namshter.com" : "http://localhost:3081/"
  })
);

router.get("/naver", passport.authenticate("naver"));

router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    successRedirect: process.env.NODE_ENV === "production" ? "http://namshter.com" : "http://localhost:3081/",
    failureRedirect: process.env.NODE_ENV === "production" ? "http://namshter.com" : "http://localhost:3081/"
  })
);

// 사용자정보 가져오기
router.get('/', isLoggedIn, async (req, res, next) => {
  const user = req.user;
  res.json(user);
});

// 다른 사용자정보 가져오기
router.get('/:id', async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: parseInt(req.params.id, 10)
      },
      attributes: ['id', 'nickname', 'name', 'email', 'isAdmin', 'snsId', 'provider'],
      include: [{
        model: db.Post,
        as: 'Posts',
        attributes: ['id', 'createdAt'],
      }, {
        // 이 유저가 좋아한다고(Liked) 한 글을 포함시켜라
        model: db.Post,
        as: 'Liked',
        attributes: ['id'],
      }, {
        model: db.User,
        attributes: ['id', 'nickname', 'name'],
      }, {
        model: db.User,
        attributes: ['id', 'nickname', 'name'],
      }, {
        model: db.Comment,
        attributes: ['id']
      }, {
        model: db.Group,
        as: 'Groupjoined',
        attributes: ['id', 'name', 'status'],
      }],
    });
    res.json(user);
  } catch (err) {
    console.error('GET /:id :::', err);
    next(err);
  }
});


// 회원가입(signUp)
router.post('/', isNotLoggedIn, async (req, res, next) => { // 회원가입
  try {
    const hash = await bcrypt.hash(req.body.password, 12);
    const exUser = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) { // 이미 회원가입되어있으면
      return res.status(403).json({
        errorCode: 1,
        message: '이미 회원가입되어있습니다.',
      });
    }
    await db.User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      nickname: req.body.nickname,
    }); // HTTP STATUS CODE
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error('POST-1 / :::', err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (err) => { // 세션에 사용자 정보 저장은 serializeUser
        if (err) {
          console.error('POST-2 / :::', err);
          return next(err);
        }
        const fullUser = await db.User.findOne({
          where: {
            id: user.id
          },
          attributes: ['id', 'nickname', 'name', 'email', 'isAdmin', 'snsId', 'provider'],
          include: [{
            model: db.Post,
            attributes: ['id', 'createdAt'],
          }, {
            model: db.User,
            as: 'Followings',
            attributes: ['id', 'nickname', 'name'],
          }, {
            model: db.User,
            as: 'Followers',
            attributes: ['id', 'nickname', 'name'],
          }, {
            model: db.Comment,
            attributes: ['id']
          }, {
            model: db.Group,
            as: 'Groupjoined',
            attributes: ['id', 'name', 'status'],
          }],
        });
        return res.json(fullUser);
      });
    })(req, res, next);
  } catch (err) {
    console.error('POST-3 / :::', err);
    return next(err);
  }
});

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('POST-1 /login :::', err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (err) => { // 세션에다 사용자 정보 저장 (어떻게? serializeUser)
      if (err) {
        console.error('POST-2 /login :::', err);
        return next(err);
      }
      const fullUser = await db.User.findOne({
        where: {
          id: user.id
        },
        attributes: ['id', 'nickname', 'name', 'email', 'isAdmin', 'snsId', 'provider'],
        include: [{
          model: db.Post,
          attributes: ['id', 'createdAt'],
        }, {
          model: db.User,
          as: 'Followings',
          attributes: ['id', 'nickname', 'name'],
        }, {
          model: db.User,
          as: 'Followers',
          attributes: ['id', 'nickname', 'name'],
        }, {
          model: db.Comment,
          attributes: ['id'],
        }, {
          model: db.Group,
          as: 'Groupjoined',
          attributes: ['id', 'name', 'status'],
        }],
      });
      return res.json(fullUser);
    });
  })(req, res, next);
});

// 로그아웃
router.post('/logout', isLoggedIn, async (req, res) => {
  try {
    req.logout();
    req.session.destroy();
    return res.status(200).send('로그아웃 되었습니다.')
  } catch (err) {
    console.error('/logout :::', err)
    next(err)
  }
})


// 닉네임 변경
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await db.User.update({
      nickname: req.body.nickname,
    }, {
      where: {
        id: req.user.id
      },
    });
    res.send(req.body.nickname);
  } catch (err) {
    console.error('PATCH /nickname :::', err);
    next(err);
  }
});

// 이름 변경
router.patch('/name', isLoggedIn, async (req, res, next) => {
  try {
    await db.User.update({
      name: req.body.name,
    }, {
      where: {
        id: req.user.id
      },
    });
    res.send(req.body.name);
  } catch (err) {
    console.error('PATCH /name :::', err);
    next(err);
  }
});

// 비밀번호 변경
router.patch('/password', isLoggedIn, async (req, res, next) => {
  const hash = await bcrypt.hash(req.body.password, 12);
  try {
    await db.User.update({
      password: hash,
    }, {
      where: {
        id: req.user.id
      },
    });
    res.send();
  } catch (err) {
    console.error('PATCH /nickname :::', err);
    next(err);
  }
});

// 팔로우
router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id,
      }
    });
    await me.addFollowing(req.params.id);
    const user = await db.User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'nickname', 'name']
    });
    res.send({
      id: user.id,
      nickname: user.nickname,
      name: user.name
    })
  } catch (err) {
    console.error('POST /:id/follow :::', err)
    next(err)
  }
})

// 언팔로우
router.delete('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id
      },
    });
    await me.removeFollowing(req.params.id);
    res.send(req.params.id)
  } catch (err) {
    console.error('DELETE /:id/follow :::', err)
    next(err)
  }
});

// 언팔로워
router.delete('/:id/follower', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id
      },
    });
    await me.removeFollower(req.params.id);
    res.send(req.params.id)
  } catch (err) {
    console.error('DELETE /:id/follower :::', err)
    next(err)
  }
});

// 나를 팔로워 전체 목록 불러오기
router.get('/:id/followers', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id
      },
    });
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      }
    }
    const followers = await me.getFollowers({
      where,
      attributes: ['id', 'nickname', 'name'],
      order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC']
      ],
      limit: parseInt(req.query.limit, 10) || 4,
    })
    let isMore = (!followers.slice(3, 4).length) ? false : true
    return res.json({
      followers: followers.slice(0, 3),
      hasMoreFollower: isMore
    })
    res.json(followers)
  } catch (err) {
    console.error('GET /:id/followers :::', err)
    next(err)
  }
})

// 내가 팔로우 전체 목록 불러오기
router.get('/:id/followings', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id
      },
    });
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      }
    }
    const followings = await me.getFollowings({
      where,
      attributes: ['id', 'nickname', 'name'],
      order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC']
      ],
      limit: parseInt(req.query.limit, 10) || 4,
    })
    let isMore = (!followings.slice(3, 4).length) ? false : true
    return res.json({
      followings: followings.slice(0, 3),
      hasMoreFollowing: isMore
    })
  } catch (err) {
    console.error('GET /:id/followings :::', err)
    next(err)
  }
})

// 특정 사용자가 작성한 글 불러오기
router.get('/:id/posts', async (req, res, next) => {
  try {
    let where = {
      UserId: parseInt(req.params.id, 10),
    };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), // less than
        },
      };
    };
    const posts = await db.Post.findAll({
      where,
      include: [{
        model: db.User,
        attributes: ['id', 'nickname', 'name', 'email', 'isAdmin', 'snsId', 'provider'],
      }, {
        model: db.Image,
      }, {
        model: db.User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: db.Post,
        as: "Retweet",
        include: [{
          model: db.User,
          attributes: ['id', 'nickname', 'name', 'email', 'isAdmin', 'snsId', 'provider'],
        }, {
          model: db.Image
        }]
      }],
      order: [
        ['createdAt', 'DESC']
      ],
      limit: parseInt(req.query.limit, 10) || 10,
    });
    res.json(posts);
  } catch (err) {
    console.error('GET /:id/posts :::', err)
    next(err);
  }
});

module.exports = router;