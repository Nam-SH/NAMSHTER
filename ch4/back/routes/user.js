const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares')


// 회원가입(signUp)
router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12)
    // 닉네임을 겹치지 않게 만든다.
    const exUser = await db.User.findOne({
      where: {
        email: req.body.email,
      }
    })
    if (exUser) { // 이미 회원가입이 되어있으면
      // return res.status(403).send('이미 회원가입이 되어있어요')
      return res.status(403).json({
        errorCode: 1,
        message: '이미 회원가입이 되어있어요'
      })
    }
    await db.User.create({
      email: req.body.email,
      password: hash,
      nickname: req.body.nickname
    });
    // 회원가입 후 바로 로그인하기
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(err)
        return next(err);
      }; 
      if (info) {
        return res.status(401).send(info.reason)
      };
      return req.login(user, async (err) => {
        if (err) {
          console.error(err);
          return next(err)
        }
        console.log('회원가입 후 로그인 시도!')
        return res.json(user)
      });
    })(req, res, next);
  } catch (err) {
    console.error(err);
    return next(err);
  }
})

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err)
      return next(err);
    } 
    if (info) {
      return res.status(401).send(info.reason)
    }
    return req.login(user, async (err) => {
      if (err) {
        console.error(err);
        return next(err)
      }
      return res.json(user)
    });
  })(req, res, next);
})

// 로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(200).send('로그아웃 되었습니다.')
})

module.exports = router;