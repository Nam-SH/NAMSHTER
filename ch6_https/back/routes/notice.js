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
        {
          model: db.NoticeComment,
          attributes: ["id"]
        }
      ]
    });
    return res.json(newFullNotice);
  } catch (err) {
    console.error("POST /notice :::", err);
    next(err);
  }
});
// 글 수정
router.patch("/:noticeId", isLoggedIn, async (req, res, next) => {
  try {
    const notice = await db.Notice.findOne({
      where: {
        id: req.params.noticeId
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
    await db.Notice.update({
      content: req.body.content
    }, {
      where: {
        id: req.params.noticeId
      }
    });
    const updateNotice = await db.Notice.findOne({
      where: {
        id: req.params.noticeId
      }
    })
    res.json({
      content: req.body.content,
      updateTime: updateNotice.updatedAt
    });
  } catch (err) {
    console.error("PATCH /notice/:noticeId", err);
    next(err);
  }
});
// 글 삭제
router.delete("/:noticeId", isLoggedIn, async (req, res, next) => {
  try {
    const notice = await db.Notice.findOne({
      where: {
        id: req.params.noticeId
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
    if (notice.UserId !== req.user.id) {
      return res.status(403).send("님이 작성한 글이 아니에여;;");
    }
    await db.Notice.destroy({
      where: {
        id: req.params.noticeId
      }
    });
    return res.send(req.params.noticeId);
  } catch (err) {
    console.error(err);
    next("DELETE /:noticeId :::", err);
  }
});

// 
// 공지사항 댓글 작성
router.post("/:noticeId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const notice = await db.Notice.findOne({
      where: {
        id: req.params.noticeId
      }
    });
    if (!notice) {
      return res.status(404).send('없는 글인데여;;')
    }
    const newComment = await db.NoticeComment.create({
      content: req.body.content,
      UserId: req.user.id,
      NoticeId: req.params.noticeId
    });
    const fullComment = await db.NoticeComment.findOne({
      where: {
        id: newComment.id
      },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
      }]
    });
    return res.json(fullComment);
  } catch (err) {
    console.error("POST /notice/comment :::", err);
    next(err);
  }
});
// 댓글 수정
router.patch("/:noticeId/comment/:commentId", isLoggedIn, async (req, res, next) => {
  try {
    const notice = await db.Notice.findOne({
      where: {
        id: req.params.noticeId
      }
    });
    if (!notice) {
      return res.status(404).send('없는 글인데여;;')
    }
    const noticeComment = await db.NoticeComment.findOne({
      where: {
        id: req.params.commentId,
        NoticeId: req.params.noticeId
      }
    });
    if (!noticeComment) {
      return res.status(404).send("없는 댓글 인데요;;");
    }
    if (noticeComment.UserId !== req.user.id) {
      return res.status(403).send("님이 작성한 댓글이 아니에여;;");
    }
    await db.NoticeComment.update({
      content: req.body.content
    }, {
      where: {
        id: req.params.commentId
      }
    });
    const updateNoticeComment = await db.NoticeComment.findOne({
      where: {
        id: req.params.commentId
      }
    })
    res.json({
      content: req.body.content,
      updateTime: updateNoticeComment.updatedAt
    });
  } catch (err) {
    console.error("PATCH /:noticeId/comment/:commentId", err);
    next(err);
  }
});

// 댓글 삭제
router.delete("/:noticeId/comment/:commentId", isLoggedIn, async (req, res, next) => {
  try {
    const notice = await db.Notice.findOne({
      where: {
        id: req.params.noticeId,
      }
    });
    if (!notice) {
      return res.status(404).send('없는 글인데여;;')
    }
    const noticeComment = await db.NoticeComment.findOne({
      where: {
        id: req.params.commentId,
        NoticeId: req.params.noticeId
      }
    });
    if (!noticeComment) {
      return res.status(404).send("없는 댓글 인데요;;");
    }
    if (noticeComment.UserId !== req.user.id) {
      return res.status(403).send("님이 작성한 댓글이 아니에여;;");
    }
    await db.NoticeComment.destroy({
      where: {
        id: req.params.commentId
      }
    });
    return res.send(req.params.commentId);
  } catch (err) {
    console.error(err);
    next("DELETE /:noticeId/comment/:commentId :::", err);
  }
});

module.exports = router;