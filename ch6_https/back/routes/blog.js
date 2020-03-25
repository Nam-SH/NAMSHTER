const express = require('express');
const router = express.Router();

// 업로드 관련
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");

const {
  isLoggedIn
} = require("./middlewares");
const db = require('../models');




module.exports = router;