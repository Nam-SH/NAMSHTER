const express = require("express");
const router = express.Router();

// 업로드 관련
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");

const {
  isLoggedIn
} = require("./middlewares");
const db = require("../models");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + Date.now() + ext);
    }
  }),
  limit: {
    fileSize: 1000 * 1024 * 1024
  }
});

// 이미지업로드(/post/images)
router.post("/images", isLoggedIn, upload.array("image"), (req, res) => {
  res.json(req.files.map(v => v.filename));
});

// 배포용
// AWS.config.update({
//   region: 'us-east-2',
//   accessKeyId: process.env.S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
// });

// const upload = multer({
//   storage: multerS3({
//     s3: new AWS.S3(),
//     bucket: 'namshter',
//     key(req, file, cb) {
//       cb(null, `original/${Date.now()}${path.basename(file.originalname)}`)
//     },
//   }),
//   limit: { fileSize: 20 * 1024 * 1024 },
// });

// router.post('/images', isLoggedIn, upload.array('image'), (req, res) => {
//   // console.log(req.files);
//   res.json(req.files.map(v => v.location));
// });

// 글 상세보기(/post/:id) - 글하나만 가져오기
router.get("/:postId", async (req, res, next) => {
  try {
    const fullpost = await db.Post.findOne({
      where: {
        id: req.params.postId
      },
      include: [{
          model: db.User,
          attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
        },
        {
          model: db.Image
        },
        {
          model: db.User,
          as: "Likers",
          attributes: ["id"]
        },
        {
          model: db.Comment,
          attributes: ["id"]
        },
        {
          model: db.Post,
          as: "Retweet",
          include: [{
              model: db.User,
              attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
            },
            {
              model: db.Image
            }
          ]
        }
      ]
    });
    return res.json(fullpost);
  } catch (err) {
    console.error("GET /:postId :::", err);
    next(err);
  }
});

// 글 작성(POST /post)
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          db.Hashtag.findOrCreate({
            where: {
              name: tag.slice(1).toLowerCase()
            }
          })
        )
      );
      await newPost.addHashtags(result.map(r => r[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        await Promise.all(
          req.body.image.map(image => {
            return db.Image.create({
              src: image,
              PostId: newPost.id
            });
          })
        );
      } else {
        await db.Image.create({
          src: req.body.image,
          PostId: newPost.id
        });
      }
    }
    const fullPost = await db.Post.findOne({
      where: {
        id: newPost.id
      },
      include: [{
          model: db.User,
          attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
        },
        {
          model: db.Image
        },
        {
          model: db.User,
          as: "Likers",
          attributes: ["id"]
        },
        {
          model: db.Comment,
          attributes: ["id"]
        }
      ]
    });
    return res.json(fullPost);
  } catch (err) {
    console.error("POST / :::", err);
    next(err);
  }
});

// 글 수정
router.patch("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.postId
      }
    });
    if (!post) {
      return res.status(404).send("없는 글 인데요;;");
    }
    if (post.UserId !== req.user.id) {
      return res.status(403).send("님이 작성한 글이 아니에여;;");
    }
    await db.Post.update({
      content: req.body.content
    }, {
      where: {
        id: req.params.postId
      }
    });
    const updatePost = await db.Post.findOne({
      where: {
        id: req.params.postId
      }
    })
    res.json({
      content: req.body.content,
      updateTime: updatePost.updatedAt
    });
  } catch (err) {
    console.error("PATCH /:postId", err);
    next(err);
  }
});

// 글 삭제
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.postId
      }
    });
    if (!post) {
      return res.status(404).send("없는 글 인데요;;");
    }
    if (post.UserId !== req.user.id) {
      return res.status(403).send("님이 작성한 글이 아니에여;;");
    }
    await db.Post.destroy({
      where: {
        id: req.params.postId
      }
    });
    return res.send(req.params.postId);
  } catch (err) {
    console.error(err);
    next("DELETE /:postId :::", err);
  }
});

// 댓글작성
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.postId
      }
    });
    if (!post) {
      return res.status(404).send("없는 글 인데요;;");
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content,
      score: req.body.score
    });
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id
      },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
      }]
    });
    return res.json(comment);
  } catch (err) {
    console.error("POST /:postId/comment :::", err);
    next(err);
  }
});

// 댓글조회
router.get("/:postId/comments", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.postId
      }
    });
    if (!post) {
      return res.status(404).send("없는 글 인데요;;");
    }
    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.postId
      },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
      }],
      order: [
        ["createdAt", "ASC"]
      ]
    });
    res.json(comments);
  } catch (err) {
    console.error("GET /:postId/comments :::", err);
    next(err);
  }
});

// 댓글 삭제
router.delete('/:postId/comment/:commentId', isLoggedIn, async (req, res, next) => {
  try {
    const targetPost = await db.Post.findOne({
      where: {
        id: req.params.postId
      }
    });
    if (!targetPost) {
      return res.status(404).send("없는 글 인데요;;");
    }
    const targetComment = await db.Comment.findOne({
      where: {
        id: req.params.commentId
      }
    });
    if (!targetComment) {
      return res.status(404).send("없는 댓글 인데요;;");
    }
    await db.Comment.destroy({
      where: {
        id: req.params.commentId
      }
    })
    res.send(req.params.commentId)
  } catch (err) {
    console.error("DELETE /:postId/comment/:commentId :::", err);
    next(err);
  }
})

// 리트윗 하기
router.post("/:postId/retweet", isLoggedIn, async (req, res, next) => {
  try {
    // 글이 없으면 리트윗 안 됨
    const post = await db.Post.findOne({
      where: {
        id: req.params.postId
      },
      include: [{
        model: db.Post,
        as: "Retweet"
      }]
    });
    if (!post) {
      return res.status(404).send("글이 없는데요;;");
    }
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send("자기 글은 리트윗 못해여;;");
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await db.Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId
      }
    });
    if (exPost) {
      return res.status(403).send("이미 리트윗 한 글인데여;;");
    }
    const retweet = await db.Post.create({
      content: "retweet이욤~",
      UserId: req.user.id,
      RetweetId: retweetTargetId
    });
    const retweetWithPrevPost = await db.Post.findOne({
      where: {
        id: retweet.id
      },
      include: [{
          model: db.User,
          attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
        },
        {
          model: db.User,
          as: "Likers",
          attributes: ["id"]
        }, {
          model: db.Comment,
          attributes: ["id"]
        }, {
          model: db.Post,
          as: "Retweet",
          include: [{
              model: db.User,
              attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
            },
            {
              model: db.Image
            },
            {
              model: db.User,
              as: "Likers",
              attributes: ["id"]
            }
          ]
        }
      ]
    });
    res.json(retweetWithPrevPost);
  } catch (err) {
    console.error("/:id/retweet :::", err);
    next(err);
  }
});

// 좋아요
router.post("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.postId
      }
    });
    if (!post) {
      return res.status(404).send("없는 글 인데여;;");
    }
    await post.addLiker(req.user.id);
    res.json({
      userId: req.user.id
    });
  } catch (err) {
    console.error("POST /:id/like :::", err);
    next(err);
  }
});

// 좋아요 취소
router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.postId
      }
    });
    if (!post) {
      return res.status(404).send("없는 글 인데여;;");
    }
    await post.removeLiker(req.user.id);
    res.json({
      userId: req.user.id
    });
  } catch (err) {
    console.error("DELETE /:id/like :::", err);
    next(err);
  }
});

module.exports = router;