const express = require('express');
const { isLoggedIn } = require('./middlewares')
const router = express.Router();
const multer = require('multer');
const db = require('../models');

// 시간
const path = require('path')

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      // 실패시 null, 성공시 uploads에 저장
      done(null, 'uploads');
    },
    filename(req, file, done) {
      // ext: 확장자 이름을 뽑아온다.
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      // 남승현.jpg  ==> basename: 남승현, ext: .jpg
      done(null, basename + Date.now() + ext);
    },
  }),
  limit: { fileSize: 1000 * 1024 * 1024 },
});

// 1. 기존 첫 모양
// router.post('/image', (req, res) => {
//  if (req.isAuthenticated()) {
//   }
// });

// 2. isLoggedIn 사용한 후 모양
router.post('/images', upload.array('image'), (req, res) => {
  // console.log(req.files);
  console.log('나ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ')
  res.json(req.files.map(v => v.filename));
});

router.post('/', isLoggedIn, (req, res) => {

});

module.exports = router