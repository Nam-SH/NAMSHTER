const express = require('express');
const multer = require('multer');
const { isLoggedIn } = require('./middlewares')
const router = express.Router();
const db = require('../models');

// 시간
const path = require('path')

// 1번 방법
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

// 2번 방법
// const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     // 실패시 null, 성공시 uploads에 저장
//     done(null, 'uploads');
//   },
//   filename(req, file, callback) {
//     // ext: 확장자 이름을 뽑아온다.
//     const ext = path.extname(file.originalname);
//     const basename = path.basename(file.originalname, ext);
//     // 남승현.jpg  ==> basename: 남승현, ext: .jpg
//     callback(null, basename + Date.now() + ext);
//   },
// })
// const upload = multer({
//   storage,
//   limits: {
//     files: 10,
//     fileSize: 1024 * 1024 * 1024,
//   }
// })

// 이미지업로드 (/post/images)
// 1. isLoggedIn 사용한 후 모양
router.post('/images', isLoggedIn, upload.array('image'), (req, res) => {
  console.log(req.files);
  
  res.json(req.files.map(v => v.filename));
});

// 1. 글 상세보기(GET '/)

// 2. 글 작성(/post)
router.post('/', isLoggedIn, async (req, res, next) => { // POST /post
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      })));
      // 1. 쿼리가 복잡하지 않은 경우
      await newPost.addHashtags(result.map(r => r[0]));
      // 2. 만일 쿼리가 복잡하면??
      // db.sequelize.query('SQL문 직접 입력')
    }
    if (req.body.image) {
      // 여러개 경우
      if (Array.isArray(req.body.image)) {
        await Promise.all(req.body.image.map((image) => {
          return db.Image.create({ src: image, PostId: newPost.id });
        }));
      } 
      else { // 하나인 경우
        await db.Image.create({ src: req.body.image, PostId: newPost.id });
      };
    }
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [{
        // 요청을 받으면 프론트에 User: { id:!, nickname: "남승현" } 형식이 추가된다.
        model: db.User,
        attributes: ['id', 'nickname'],
      }, {
        model: db.Image,
      }, {
        model: db.User,
        as: 'Likers',
        attributes: ['id'],
      }],
    });
    return res.json(fullPost);
  } 
  catch (err) {
    console.error('/post :::', err);
    next(err);
  }
});

// 3. 글 삭제
router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } })
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
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
    next('delete(/:id) :::', err)
  }
})


// 댓글작성
router.post('/:id/comment', isLoggedIn, async (req, res, next) => { // POST /post/:id/comment
  try {
    
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const newComment = await db.Comment.create({
      // postId, UserId는 associate의 관계 정의로 인해 자동으로 추가되어 있다.
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content,
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
    console.error('POST/:id/comment :::', err)
    next(err)
  }
})

// 댓글조회
router.get('/:id/comments', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id,
      },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }],
      order: [['createdAt', 'ASC'], ['updatedAt', 'ASC'],],
    });
    res.json(comments);
  } catch (err) {
    console.error('GET /:id/comments :::', err);
    next(err);
  }
});

// 리트윗 하기
router.post('/:id/retweet', isLoggedIn, async (req, res, next) => {
  try {

    // 글이 없으면 리트윗 안 됨
    const post = await db.Post.findOne({
      where: { id: req.params.id, },
      include: [{
        model: db.Post,
        as: 'Retweet'
      }]
    })
    if (!post) {
      return res.status(404).send('글이 없는데요;;')
    }
    // 글의 유저아이이가 내 id와 같으면 리트윗 하면 안 됨
    if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).send('자신의 글을 리트윗할 수 없습니다.');
    }

    // 리트윗 된 글이 내 글이면 리트윗하면 안 됨
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await db.Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      }
    })
    if (exPost) {
      return res.status(403).send('이미 리트윗했습니다요')
    }
    // 검사 끝~~

    const retweet = await db.Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet이욤~',
    })
    const retweetWithPrevPost = await db.Post.findOne({
      where: { id: retweet.id },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname']
      }, {
        model:db.Post,
        as: 'Retweet',
        include: [{
          model: db.User,
          attributes: ['id', 'nickname'],
        }, {
          model: db.Image,
        }, {
          model: db.User,
          as: 'Likers',
          attributes: ['id']
        }]
      }]
    })
    res.json(retweetWithPrevPost);
  }
  catch (err) {
    console.error('/:id/retweet :::', err)
    next(err)
  }
});

// 좋아요
router.post('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id, }, })
    if (!post) {
      return res.status(404).send('글이 없는데요;;');
    }
    // 글이 있으면
    await post.addLiker(req.user.id);
    res.json({ userId: req.user.id });
  }
  catch (err) {
    console.error('POST /:id/like :::', err);
    next(err);
  }
});

// 좋아요 취소
router.delete('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id, }, })
    if (!post) {
      return res.status(404).send('글이 없는데요;;');
    }
    // 글이 있으면
    await post.removeLiker(req.user.id);
    res.json({ userId: req.user.id });
  }
  catch (err) {
    console.error('DELETE /:id/like :::', err);
    next(err);
  }
});


module.exports = router