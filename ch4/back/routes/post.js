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
  // console.log('/images :::', req.files);
  res.json(req.files.map(v => v.filename));
});


// 글 작성하기
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    // req.body.content
    // req.body.imagePaths
    // console.log(req.body)
    const hashtags = req.body.content.match(/#[^\s#] + /g);
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
    })
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      })));
      // 1. 쿼리가 복잡하지 않은 경우
      await newPost.addHastags(result.map(r => r[0]));
      // 2. 만일 쿼리가 복잡하면??
      // db.sequelize.query('SQL문 직접 입력')
    }
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
        // 요청을 받으면 프론트에 User: { id: 1, nickname: "남승현" } 형식이 추가된다.
      }]
    });
    return res.json(fullPost)
  }
  catch(err) {
    console.error('/post :::', err);
    next(err);
  }
});

module.exports = router