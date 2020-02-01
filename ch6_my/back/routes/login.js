const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares')


router.get("/auth/kakao", isNotLoggedIn, passport.authenticate("kakao"));

router.get("/kakao_oauth",
  passport.authenticate("kakao", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

router.get("/auth/naver", isNotLoggedIn, passport.authenticate("kakao"));

router.get("/naver_oauth",
  passport.authenticate("kakao", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

module.exports = router;