const express = require("express");
const router = express.Router();
const db = require("../models");

const {
  isLoggedIn
} = require("./middlewares");

// 업로드 관련
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "grouppostimage");
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

//  그룹 관련 -------------------------------------------------------------------------------------

// 한개 그룹 디테일
router.get("/:groupId", async (req, res, next) => {
  try {
    const group = await db.Group.findOne({
      where: {
        id: req.params.groupId
      },
      include: [{
          model: db.User,
          as: "Master",
          attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
        },
        {
          model: db.User,
          as: "Groupmembers",
          attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
        },
        {
          model: db.GroupPost,
          include: [{
            model: db.User,
            attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
          }]
        },
        {
          model: db.Subject,
          as: "Selectsubject",
          attributes: ["id", "name"],
          include: [{
            model: db.Category,
            attributes: ["id", "name"]
          }]
        }
      ]
    });
    return res.json(group);
  } catch (err) {
    console.error("GET /:id", err);
    next(err);
  }
});

// 그룹 한개 생성
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const newGroup = await db.Group.create({
      name: req.body.name,
      intro: req.body.intro,
      limit: req.body.limit,
      MasterId: req.user.id
    });
    const targetSubject = await db.Subject.findOne({
      where: {
        name: req.body.subjectName
      }
    });
    await newGroup.addGroupmembers(req.user.id);
    await newGroup.addSelectsubject(targetSubject.id);

    const fullGroup = await db.Group.findOne({
      where: {
        id: newGroup.id
      },
      attributes: ["id", "name", "intro", "limit", "state", "src", 'startDate', 'endDate'],
      include: [{
          model: db.User,
          as: "Master",
          attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
        },
        {
          model: db.User,
          as: "Groupmembers",
          attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
        },
        {
          model: db.GroupPost,
          attributes: ["id"]
        },
        {
          model: db.Subject,
          as: "Selectsubject",
          attributes: ["id", "name"],
          include: [{
            model: db.Category,
            attributes: ["id", "name"]
          }]
        }
      ]
    });
    return res.json(fullGroup);
  } catch (err) {
    console.error("POST /:id", err);
    next(err);
  }
});

// 그룹 정보 수정
router.put("/:groupId", async (req, res, next) => {
  try {
    const group = await db.Group.findOne({
      where: {
        id: parseInt(req.params.groupId, 10)
      }
    });
    if (!group) {
      return res.status(404).send("그런 그룹이 없는데여;;");
    }
    if (group.MasterId !== 11) {
      return res.status(403).send("님은 그룹을 수정할 권한이 없는데여;;");
    }
    await db.Group.update({
      name: req.body.name,
      intro: req.body.intro,
      limit: req.body.limit
    }, {
      where: {
        id: req.params.groupId
      }
    });
    res.json({
      name: req.body.name,
      intro: req.body.intro,
      limit: req.body.limit
    });
  } catch (err) {
    console.error("PUT :groupId", err);
    next(err);
  }
});

// 그룹 삭제
router.delete("/:groupId", isLoggedIn, async (req, res, next) => {
  try {
    const group = await db.Group.findOne({
      where: {
        id: parseInt(req.params.groupId, 10)
      }
    });
    if (!group) {
      return res.status(404).send("그런 그룹이 없는데여;;");
    }
    if (group.MasterId !== req.user.id) {
      return res.status(403).send("님은 그룹을 삭제할 권한이 없는데여;;");
    }
    await db.Group.destroy({
      where: {
        id: req.params.groupId
      }
    });
    return res.json(req.params.groupId);
  } catch (err) {
    console.error("DELETE /:groupId");
    next(err);
  }
});

// 그룹 상태 변경하기
router.post("/:groupId/changestate", isLoggedIn, async (req, res, next) => {
  try {
    // 1. 해당 그룹 찾기
    const group = await db.Group.findOne({
      where: {
        id: parseInt(req.params.groupId, 10)
      }
    });
    // 2. 그룹이 없으면 끝
    if (!group) {
      return res.status(404).send("그런 그룹이 없는데여;;");
    }
    // 3. 완료된 그룹이면?
    if (group.state === 2) {
      return res.status(403).send("완료 된 그룹인데여;;");
    }
    // 4. 그룹이 있으면 해당 그룹의 마수터와 요청한 자의 id 비교하기
    if (group.MasterId !== req.user.id) {
      return res.status(403).send("님은 상태를 변경할 권한이 없는데여;;");
    }
    // 4. 완료되지 않았고 방장이라면 바꿔주기
    if (group.state === 0) {
      await db.Group.update({
        state: group.state + 1,
        startDate: new Date()
      }, {
        where: {
          id: parseInt(req.params.groupId, 10)
        }
      });
    } else {
      await db.Group.update({
        state: group.state + 1,
        endDate: new Date()
      }, {
        where: {
          id: parseInt(req.params.groupId, 10)
        }
      });
    }
    return res.json({
      next: group.state + 1,
    });
  } catch (err) {
    console.error("POST /changestate :::", err);
    next(err);
  }
});

// 그룹 가입탈퇴
router.post("/:groupId/userInOut", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });
    const targetGroup = await db.Group.findOne({
      where: {
        id: req.params.groupId
      },
      attributes: ['id', 'limit', 'MasterId'],
      include: [{
        model: db.User,
        as: "Groupmembers",
        attributes: ["id"]
      }]
    });
    if (targetGroup.Groupmembers.length + 1 > targetGroup.limit) {
      return res.status(403).send("가입 인원 초과함;;");
    }
    if (user.id === targetGroup.MasterId) {
      return res.status(403).send("님은 방장이라 가입/탈퇴 못함;;");
    }
    const usersInGroup = await targetGroup.getGroupmembers({
      where: {
        id: user.id
      },
      attributes: ["id", "createdAt"]
    });
    if (usersInGroup && usersInGroup.length > 0) {
      const cDay = usersInGroup[0].createdAt;
      const cYear = new Date(cDay).getFullYear();
      const cMonth = new Date(cDay).getMonth();
      const cDate = new Date(cDay).getDate();
      const dayStart = new Date(cYear, cMonth, cDate);
      const today = new Date();
      const dayEnd = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      if (dayEnd - dayStart >= 259200000) {
        await user.removeGroupJoined(req.params.groupId);
        return res.json(user.id);
      } else {
        return res.status(403).send("3일 후 탈퇴 가능함;;");
      }
    } else {
      await user.addGroupJoined(req.params.groupId);
      return res.json(user.id);
    }
  } catch (err) {
    console.error("POST /:groupId/userInOut", err);
    next(err);
  }
});

// 그룹 좋아요
router.post('/:groupId/like', isLoggedIn, async (req, res, next) => {
  try {
    const targetGroup = await db.Group.findOne({
      where: {
        id: req.params.groupId
      }
    });
    if (!targetGroup) {
      return res.status(404).send("그런 그룹이 없는데여;;");
    }
    await targetGroup.addGroupLiker(req.user.id)
    return res.json(req.user.id)
  } catch (err) {
    next(err)
  }
})

// 그룹 좋아요취소
router.delete('/:groupId/like', isLoggedIn, async (req, res, next) => {
  try {
    const targetGroup = await db.Group.findOne({
      where: {
        id: req.params.groupId
      }
    });
    if (!targetGroup) {
      return res.status(404).send("그런 그룹이 없는데여;;");
    }
    await targetGroup.removeGroupLiker(req.user.id)
    return res.json(req.user.id)
  } catch (err) {
    next(err)
  }
})

// 글 관련 -------------------------------------------------------------------------------------

// 글 전체 불러오기
router.get("/:groupId/posts", async (req, res, next) => {
  try {
    let where = {
      GroupId: req.params.groupId
    };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      };
    }
    const groupPosts = await db.GroupPost.findAll({
      where,
      include: [{
          model: db.User,
          attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
        },
        {
          model: db.GroupPostImage
        },
        {
          model: db.GroupPostComment,
          attributes: ['id']
        },
      ],
      order: [
        ["createdAt", "DESC"],
      ],
      limit: parseInt(req.query.limit, 10) || 10
    });
    res.json(groupPosts);
  } catch (err) {
    console.error("GET /:groupId/posts", err);
    next(err);
  }
});

// 글 작성(POST /post)
router.post("/:groupId/post", isLoggedIn, async (req, res, next) => {
  try {
    const newGroupPost = await db.GroupPost.create({
      title: req.body.title,
      content: req.body.content,
      GroupId: req.params.groupId,
      UserId: req.user.id
    });
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        await Promise.all(
          req.body.image.map(image => {
            return db.GroupPostImage.create({
              src: image,
              GroupPostId: newGroupPost.id
            });
          })
        );
      } else {
        await db.GroupPostImage.create({
          src: req.body.image,
          GroupPostId: newGroupPost.id
        });
      }
    }
    const fullGroupPost = await db.GroupPost.findOne({
      where: {
        id: newGroupPost.id
      },
      include: [{
          model: db.User,
          attributes: ["id", "nickname", "name", "src", "email", "isAdmin"]
        },
        {
          model: db.GroupPostImage
        },
        {
          model: db.GroupPostComment,
          attributes: ['id']
        },
      ]
    });
    return res.json(fullGroupPost);
  } catch (err) {
    console.error("POST /:groupId/post :::", err);
    next(err);
  }
});

// 글 수정
router.put("/:groupId/post/:postId", isLoggedIn, async (req, res, next) => {
  try {
    const group = await db.Group.findOne({
      where: {
        id: req.params.groupId
      }
    });
    if (!group) {
      return res.status(404).send("없는 그룹인데요;;");
    }
    const targetPost = await db.GroupPost.findOne({
      where: {
        id: req.params.postId
      }
    });
    if (!targetPost) {
      return res.status(404).send("글이 없는데요;;");
    }

    if (targetPost.UserId != req.user.id) {
      return res.status(403).send("님 글이 아닌데요;;");
    } else {
      await db.GroupPost.update({
        title: req.body.title,
        content: req.body.content
      }, {
        where: {
          id: req.params.postId
        }
      });
      return res.json({
        title: req.body.title,
        content: req.body.content
      });
    }
  } catch (err) {
    console.error("PUT /:groupId/post/:postId :::", err);
    next(err);
  }
});

// 글 삭제
router.delete("/:groupId/post/:postId", isLoggedIn, async (req, res, next) => {
  try {
    const group = await db.Group.findOne({
      where: {
        id: req.params.groupId
      }
    });
    if (!group) {
      return res.status(404).send("없는 그룹인데요;;");
    }
    const targetPost = await db.GroupPost.findOne({
      where: {
        id: req.params.postId
      }
    });
    if (!targetPost) {
      return res.status(404).send("글이 없는데요;;");
    }

    if (targetPost.UserId != 11) {
      return res.status(403).send("님 글이 아닌데요;;");
    } else {
      await db.GroupPost.destroy({
        where: {
          id: req.params.postId
        }
      });
      return res.json(req.params.postId);
    }
  } catch (err) {
    console.error("PUT /:groupId/post/:postId :::", err);
    next(err);
  }
});

// 포스트 좋아요
router.post(
  "/:groupId/post/:postId/like",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const group = await db.Group.findOne({
        where: {
          id: req.params.groupId
        }
      });
      if (!group) {
        return res.status(404).send("없는 그룹인데요;;");
      }
      const targetPost = await db.GroupPost.findOne({
        where: {
          id: req.params.postId
        }
      });
      if (!targetPost) {
        return res.status(404).send("글이 없는데요;;");
      }
      await targetPost.addGroupPostLiker(req.user.id);
      res.send(req.user.id);
    } catch (err) {
      console.error("POST /:groupId/post/:postId/like :::", err);
      next(err);
    }
  }
);

// 좋아요 취소
router.delete(
  "/:groupId/post/:postId/like",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const group = await db.Group.findOne({
        where: {
          id: req.params.groupId
        }
      });
      if (!group) {
        return res.status(404).send("없는 그룹인데요;;");
      }
      const targetPost = await db.GroupPost.findOne({
        where: {
          id: req.params.postId
        }
      });
      if (!targetPost) {
        return res.status(404).send("글이 없는데요;;");
      }
      await targetPost.removeGroupPostLiker(req.user.id);
      return res.send(req.user.id);
    } catch (err) {
      console.error("POST /:groupId/post/:postId/like :::", err);
      next(err);
    }
  }
);

// 3댓글 조회
router.get('/:groupId/post/:postId/comments', isLoggedIn, async (req, res, next) => {
  try {
    let where = {
      GroupId: req.params.groupId,
      GroupPostId: req.params.postId
    };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      };
    }
    const comments = await db.GroupPostComment.findAll({
      where,
      attributes: ["id", "comment", 'createdAt'],
      include: [{
        model: db.User,
        attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
      }],
      order: [
        ["createdAt", "DESC"]
      ],
      limit: parseInt(req.query.limit, 10) || 10
    });
    res.json(comments);
  } catch (err) {
    console.error("GET /:groupId/post/:postId/comments :::", err);
    next(err);
  }
})

// 4댓글 생성
router.post('/:groupId/post/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const group = await db.Group.findOne({
      where: {
        id: req.params.groupId
      }
    });
    if (!group) {
      return res.status(404).send("없는 그룹인데요;;");
    }
    const targetPost = await db.GroupPost.findOne({
      where: {
        id: req.params.postId
      }
    });
    if (!targetPost) {
      return res.status(404).send("글이 없는데요;;");
    }
    const newComment = await db.GroupPostComment.create({
      comment: req.body.comment,
      UserId: req.user.id,
      GroupId: req.params.groupId,
      GroupPostId: req.params.postId
    })

    const fullComment = await db.GroupPostComment.findOne({
      where: {
        id: newComment.id
      },
      attributes: ['id', 'comment', "createdAt"],
      include: [{
        model: db.User,
        attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
      }]
    })

    return res.json(fullComment)

  } catch (err) {
    console.error('POST /:groupId/post/:postId/comment', err);
    next(err)
  }
})


// 5댓글 삭제
router.delete('/:groupId/post/:postId/comment/:commentId', isLoggedIn, async (req, res, next) => {
  try {
    const group = await db.Group.findOne({
      where: {
        id: req.params.groupId
      }
    });
    if (!group) {
      return res.status(404).send("없는 그룹인데요;;");
    }
    const targetPost = await db.GroupPost.findOne({
      where: {
        id: req.params.postId
      }
    });
    if (!targetPost) {
      return res.status(404).send("글이 없는데요;;");
    }
    const targetComment = await db.GroupPostComment.findOne({
      where: {
        id: req.params.commentId
      }
    })
    if (!targetComment) {
      return res.status(404).send("댓글이 없는데요;;");
    }
    await db.GroupPostComment.destroy({
      where: {
        id: req.params.commentId
      }
    })
    return res.send(req.params.commentId)

  } catch (err) {
    console.error('DELETE /:groupId/post/:postId/comment/:commentId', err);
    next(err)
  }
})

module.exports = router;