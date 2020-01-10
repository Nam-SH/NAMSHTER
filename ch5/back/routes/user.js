const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares')


// 사용자정보 가져오기
router.get('/', isLoggedIn, async (req, res, next) => {
  const user = req.user;
  res.json(user);
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
      nickname: req.body.nickname,
    }); // HTTP STATUS CODE
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (err) => { // 세션에다 사용자 정보 저장 (어떻게? serializeUser)
        if (err) {
          console.error(err);
          return next(err);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          attributes: ['id', 'email', 'nickname'],
          include: [{
            model: db.Post,
            attributes: ['id'],
          }, {
            model: db.User,
            as: 'Followings',
            attributes: ['id'],
          }, {
            model: db.User,
            as: 'Followers',
            attributes: ['id'],
          }],
        });
        return res.json(fullUser);
      });
    })(req, res, next);
  } catch (err) {
    console.error('/signup :::', err);
    return next(err);
  }
});

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (err) => { // 세션에다 사용자 정보 저장 (어떻게? serializeUser)
      if (err) {
        console.error('/login :::', err);
        return next(err);
      }
      const fullUser = await db.User.findOne({
        where: { id: user.id },
        attributes: ['id', 'email', 'nickname'],
        include: [{
          model: db.Post,
          attributes: ['id'],
        }, {
          model: db.User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: db.User,
          as: 'Followers',
          attributes: ['id'],
        }],
      });
      return res.json(fullUser);
    });
  })(req, res, next);
});

// 로그아웃
router.post('/logout', isLoggedIn, async (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(200).send('로그아웃 되었습니다.')
})

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id,
      }
    });
    await me.addFollowing(req.params.id);
    res.send(req.params.id)
  }
  catch (err) {
    console.error('POST /:id/follow :::', err)
    next(err)
  }
})

router.delete('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await me.removeFollowing(req.params.id);
    res.send(req.params.id)
  }
  catch (err) {
    console.error('DELETE /:id/follow :::', err)
    next(err)
  }
});

router.delete('/:id/follower', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await user.removeFollower(req.params.id);
    res.send(req.params.id)
  }
  catch (err) {
    console.error('DELETE /:id/follower :::', err)
    next(err)
  }
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await db.User.update({
      nickname: req.body.nickname,
    }, {
      where: {
        id: req.user.id,
      }
    });
    res.send(req.body.nickname);
  }
  catch (err) {
    console.error('/nickname :::', err)
    next(err)
  }
});

// 팔로워 전체 목록 불러오기
router.get('/:id/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.user.id,
      }
    });
    const followers = await user.getFollowers({
      attributes: ['id', 'nickname'],
      limit: parseInt(req.query.limit, 10) || 3,
      offset: parseInt(req.query.limit, 10) || 0,
    })
    res.json(followers)
  }
  catch (err) {
    console.error('/:id/followers :::', err)
    next(err)
  }
})

// 팔로잉 전체 목록 불러오기
router.get('/:id/followings', isLoggedIn, async (req, res, next) => {
  try {
    console.log('req.user.id :::::::::::::::::', req.user.id)
    const user = await db.User.findOne({
      where: {
        id: req.user.id,
      }
    });
    const followings = await user.getFollowings({
      attributes: ['id', 'nickname'],
      limit: parseInt(req.query.limit, 10) || 3,
      offset: parseInt(req.query.limit, 10) || 0,
    })
    res.json(followings)
  }
  catch (err) {
    console.error('/:id/followings :::', err)
    next(err)
  }
})


module.exports = router;