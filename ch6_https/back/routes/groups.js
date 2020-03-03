const express = require("express");
const router = express.Router();
const db = require("../models");

const {
  isLoggedIn
} = require("./middlewares");

// lastId 방식으로 불러오기(loadAllGroups)
router.get("/", async (req, res, next) => {
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      };
    }
    const groups = await db.Group.findAll({
      where,
      attributes: ["id", "name", "intro", "limit", "state", 'createdAt', "src"],
      include: [{
        model: db.User,
        as: "Master",
        attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
      }, {
        model: db.User,
        as: "Groupmembers",
        attributes: ['id'],
      }, {
        model: db.GroupPost,
        attributes: ["id"]
      }, {
        model: db.Subject,
        as: "Selectsubject",
        attributes: ['id', 'name'],
        include: [{
          model: db.Category,
          attributes: ["id", "name"]
        }]
      }],
      order: [
        ["createdAt", "DESC"]
      ],
      limit: parseInt(req.query.limit, 10) || 10
    });
    res.json(groups);
  } catch (err) {
    console.error("GET /", err);
    next(err);
  }
});

// 전체의 전, 진행, 완료된 그룹 구분해서 가져오는 것
router.get("/:state", async (req, res, next) => {
  try {
    let where = {
      state: req.params.state
    };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      };
    }
    const groups = await db.Group.findAll({
      where,
      attributes: ['id', 'name', 'intro', 'limit', 'state', 'createdAt', "src"],
      include: [{
          model: db.User,
          as: "Master",
          attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
        },
        {
          model: db.User,
          as: "Groupmembers",
          attributes: ["id"]
        }, {
          model: db.GroupPost,
          attributes: ["id"]
        },
        {
          model: db.Subject,
          as: "Selectsubject",
          attributes: ['id', 'name'],
          include: [{
            model: db.Category,
            attributes: ['id', 'name']
          }]
        }
      ],
      order: [
        ["createdAt", "DESC"]
      ],
      limit: parseInt(req.query.limit, 10) || 10
    });
    res.json(groups);
  } catch (err) {
    console.error("GET /:state", err);
    next(err);
  }
});


// 나의 전, 진행, 완료된 리스트 불러오기
router.get("/my/:state", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id
      },
    });
    const joinedGroups = await me.getGroupJoined({
      where: {
        state: req.params.state,
      },
      attributes: ['id', 'name', 'intro', 'limit', 'state', "src"],
      include: [{
        model: db.User,
        as: "Master",
        attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
      }, {
        model: db.User,
        as: "Groupmembers",
        attributes: ["id"]
      }, {
        model: db.GroupPost,
        attributes: ["id"]
      }, {
        model: db.Subject,
        as: "Selectsubject",
        attributes: ['id', 'name'],
        include: [{
          model: db.Category,
          attributes: ["id", "name"]
        }]
      }],
    })
    res.json(joinedGroups)
  } catch (err) {
    console.error('GET /my/:state :::', err)
    next(err)
  }
});

// 다른 유저의 전, 진행, 완료된 리스트 불러오기
router.get("/user/:userId/:state", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.params.userId
      },
    });
    const joinedGroups = await user.getGroupJoined({
      where: {
        state: req.params.state,
      },
      attributes: ['id', 'name', 'intro', 'limit', 'state', "src"],
      include: [{
        model: db.User,
        as: "Master",
        attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
      }, {
        model: db.User,
        as: "Groupmembers",
        attributes: ['id']
      }, {
        model: db.GroupPost,
        attributes: ["id"]
      }, {
        model: db.Subject,
        as: "Selectsubject",
        attributes: ['id', 'name'],
        include: [{
          model: db.Category,
          attributes: ["id", "name"]
        }]
      }]
    })
    res.json(joinedGroups)
  } catch (err) {
    console.error('GET /user/:userId/:state :::', err)
    next(err)
  }
});


module.exports = router;