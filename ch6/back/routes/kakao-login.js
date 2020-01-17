const express = require('express');

const router = express.Router();

const db = require('../models');
const passport = require('passport');

const app = express();

app.use(passport.initialize())
app.use(passport.session())

router.get("/kakao", passport.authenticate("kakao-login"));

router.get("/kakao/callback",
  passport.authenticate("kakao-login", {
    successRedirect: "/",
    failureRedirect: "/api/auth/fail"
  })
);
