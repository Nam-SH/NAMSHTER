const express = require('express');
const router = express.Router();
const db = require('../models');

const {
  isLoggedIn
} = require('./middlewares')

// lastId 방식으로 불러오기(loadAllGroups)
router.get('/', async (req, res, next) => {
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      }
    }
    const groups = await db.Group.findAll({
      where,
      include: [{
        model: db.User,
        through: 'Groupuser',
        attributes: ['id']
      }, {
        model: db.User,
        as: 'Master',
        attributes: ['id']
      }, {
        model: db.Grouppost,
        attributes: ['id']
      }],
      order: [
        ['createdAt', 'DESC']
      ],
      limit: parseInt(req.query.limit, 10) || 10,
    });
    res.json(groups);
  } catch (err) {
    console.error('GET /', err)
    next(err)
  }
});

// 전체의 전, 진행, 완료된 그룹 구분해서 가져오는 것
router.get('/:status', async (req, res, next) => {
  try {
    let where = {
      status: req.params.status
    };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      }
    }
    const groups = await db.Group.findAll({
      where,
      include: [{
        model: db.User,
        through: 'Groupuser',
        attributes: ['id']
      }, {
        model: db.User,
        as: 'Master',
        attributes: ['id']
      }],
      order: [
        ['createdAt', 'DESC']
      ],
      limit: parseInt(req.query.limit, 10) || 10,
    });
    res.json(groups);
  } catch (err) {
    console.error('GET /:id', err)
    next(err)
  }
});

// 나의 전, 진행, 완료된 리스트 불러오기
router.get('/my/:status', isLoggedIn, async (req, res, next) => {
  try {
    let where = {
      UserId: parseInt(req.user.id, 10),
      status: parseInt(req.params.status, 10)
    };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      }
    }
    const groups = await db.Group.findAll({
      where,
      include: [{
        model: db.User,
        through: 'Groupuser',
        attributes: ['id']
      }, {
        model: db.User,
        as: 'Master',
      }],
      order: [
        ['createdAt', 'DESC']
      ],
      limit: parseInt(req.query.limit, 10) || 10,
    });

    res.json(groups);
  } catch (err) {
    console.error('GET /:id', err)
    next(err)
  }
});

// 다른 유저의 전, 진행, 완료된 리스트 불러오기
router.get('/:userId/:status', isLoggedIn, async (req, res, next) => {
  try {
    let where = {
      UserId: parseInt(req.params.userId, 10),
      status: parseInt(req.params.status, 10)
    };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      }
    }
    const groups = await db.Group.findAll({
      where,
      include: [{
        model: db.User,
        through: 'Groupuser',
        attributes: ['id']
      }, {
        model: db.User,
        as: 'Master',
        attributes: ['id']
      }],
      order: [
        ['createdAt', 'DESC']
      ],
      limit: parseInt(req.query.limit, 10) || 10,
    });
    res.json(groups);
  } catch (err) {
    console.error('GET /:id', err)
    next(err)
  }
});


module.exports = router;