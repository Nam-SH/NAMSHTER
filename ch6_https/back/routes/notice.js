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

// 공지사항 작성(POST /post)
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.user.id
      }
    })
    if (!user.isAdmin)
      return res.status(403).send('님은 관리자가 아니에여;;')
    const newNotice = await db.Notice.create({
      content: req.body.content,
      UserId: req.user.id
    });
    const newFullNotice = await db.Notice.findOne({
      where: {
        id: newNotice.id
      },
      include: [{
          model: db.User,
          attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
        },
        // {
        //   model: db.Comment,
        //   attributes: ["id"]
        // }
      ]
    });
    return res.json(newFullNotice);
  } catch (err) {
    console.error("POST /notice :::", err);
    next(err);
  }
});
// 글 수정
router.patch("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    const notice = await db.Notice.findOne({
      where: {
        id: req.params.postId
      }
    });
    const user = await db.User.findOne({
      where: {
        id: req.user.id
      }
    })
    if (!notice) {
      return res.status(404).send("없는 글 인데요;;");
    }
    if (!user.isAdmin)
      return res.status(403).send('님은 관리자가 아니에여;;')
    if (notice.UserId !== req.user.id) {
      return res.status(403).send("님이 작성한 글이 아니에여;;");
    }
    await db.notice.update({
      content: req.body.content
    }, {
      where: {
        id: req.params.postId
      }
    });
    const updateNotice = await db.Post.findOne({
      where: {
        id: req.params.postId
      }
    })
    res.json({
      content: req.body.content,
      updateTime: updateNotice.updatedAt
    });
  } catch (err) {
    console.error("PATCH /notice/:postId", err);
    next(err);
  }
});
// 글 삭제
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    const notice = await db.Notice.findOne({
      where: {
        id: req.params.postId
      }
    });
    const user = await db.User.findOne({
      where: {
        id: req.user.id
      }
    })
    if (!user.isAdmin)
      return res.status(403).send('님은 관리자가 아니에여;;')
    if (!notice) {
      return res.status(404).send("없는 글 인데요;;");
    }
    if (post.UserId !== req.user.id) {
      return res.status(403).send("님이 작성한 글이 아니에여;;");
    }
    await db.Notice.destroy({
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

module.exports = router;