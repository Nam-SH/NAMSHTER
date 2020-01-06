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

// 이미지업로드 (/post/images)
// 2. isLoggedIn 사용한 후 모양
router.post('/images', upload.array('image'), (req, res) => {
  // console.log(req.files);
  res.json(req.files.map(v => v.filename));
});


// 글 작성(/post)
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
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
    if (req.body.image) {
      // 여러개 경우
      if (Array.isArray(req.body.image)) {
        await Promise.all(req.body.image.map((image) => {
          return db.Image.create({ src: image, PostId: newPost.id })
        }));
      } else { // 하나인 경우
        await db.Image.create({ src: req.body.image, PostId: newPost.id })
      };
    }
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
        // 요청을 받으면 프론트에 User: { id:!, nickname: "남승현" } 형식이 추가된다.
        model: db.User,
        attributes: ['id', 'nickname'],
        }, {
          model: db.Image,
        }]
    });
    return res.json(fullPost)
  }
  catch(err) {
    console.log(err);
    next(err);
  }
});

// 글 삭제
router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } })
    if (!post) {
      return res.status(400).send('포스트가 존재하지 않습니다.');
    }
    await db.Post.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.send('삭제가 잘 됐어요...ㅎ')
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})



// 댓글작성
router.post("/:id/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } })
    if (!post) {
      return res.status(400).send('포스트가 존재하지 않습니다.');
    }
    const newComment = await db.Comment.create({
      // postId, UserId는 associate의 관계 정의로 인해 자동으로 추가되어 있다.
      postId: post.id,
      UserId: req.user.id,
      content: req.body.content
    });

    // 프론트로 보낼 정보를 만든다.
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id
      },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname']
      }]
    });
    return res.json(comment);
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})

// 댓글조회

router.get('/:id/comments', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } })
    if (!post) {
      return res.status(404).send('없는 포스트 인데여ㅋㅋㅋ')
    }
    const comments = await db.Comment.findAll({ 
      where: { id: req.params.id },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname']
      }],
      order: [['createdAt', 'ASC']]
    });
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})

module.exports = router