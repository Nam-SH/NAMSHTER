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
      include: [{
          model: db.User,
          as: "Master",
          attributes: ['id', 'nickname', 'name', 'email', 'src', 'isAdmin', 'snsId', 'provider'],
        },
        {
          model: db.User,
          as: "Groupmembers",
          attributes: ['id', 'nickname', 'name', 'email', 'src'],
        },
        {
          model: db.GroupPost,
          attributes: ["id"]
        }, {
          model: db.Subject,
          as: "Selectsubject",
          attributes: ['id', 'name'],

        }
      ],
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
router.get("/:status", async (req, res, next) => {
  try {
    let where = {
      status: req.params.status
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
      include: [{
          model: db.User,
          as: "Master",
          attributes: ['id', 'nickname', 'name', 'email', 'src', 'isAdmin'],
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
    console.error("GET /:status", err);
    next(err);
  }
});


// 나의 전, 진행, 완료된 리스트 불러오기
router.get("/my/:status", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: {
        id: req.user.id
      },
    });
    let where = {
      status: req.params.status,
    };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      }
    }
    const joinedgroups = await me.getGroupjoined({
      where,
      attributes: ['id', 'name', 'intro', 'limit', 'status'],
      include: [{
        model: db.User,
        as: "Master",
        attributes: ['id', 'nickname', 'name', 'email', 'src', 'isAdmin'],
      }, {
        model: db.User,
        as: "Groupmembers",
        attributes: ["id"]
      }],
      limit: parseInt(req.query.limit, 10) || 5,
    })
    res.json(joinedgroups)
  } catch (err) {
    console.error('GET /my/:status :::', err)
    next(err)
  }
});

// 다른 유저의 전, 진행, 완료된 리스트 불러오기
router.get("/user/:userId/:status", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.params.userId
      },
    });
    let where = {
      status: req.params.status,
    };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      }
    }
    const joinedgroups = await user.getGroupjoined({
      where,
      attributes: ['id', 'name', 'intro', 'limit', 'status'],
      include: [{
        model: db.User,
        as: "Master",
        attributes: ['id', 'nickname', 'name', 'email', 'src', 'isAdmin'],
      }, {
        model: db.User,
        as: "Groupmembers",
        attributes: ['id']
      }],
      limit: parseInt(req.query.limit, 10) || 5,
    })
    res.json(joinedgroups)
  } catch (err) {
    console.error('GET /user/:userId/:status :::', err)
    next(err)
  }
});


module.exports = router;