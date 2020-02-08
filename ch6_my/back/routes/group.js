const express = require('express');
const router = express.Router();
const db = require('../models');

const {
  isLoggedIn
} = require('./middlewares')

// 한개 그룹 디테일
router.get('/:groupId', isLoggedIn, async (req, res, next) => {
  try {
    const group = await db.Group.findOne({
      where: {
        id: req.params.groupId
      },
      include: [{
        model: db.User,
        as: "Master",
        attributes: ['id', 'nickname', 'name', 'email']
      }, {
        model: db.User,
        as: "Groupmember",
        include: [{
          model: db.User,
          attributes: ['id', 'nickname']
        }]
      }, {
        model: db.Grouppost,
        include: [{
          model: db.User,
          attributes: ['id', 'nickname', 'name', 'email']
        }]
      }],
    });
    res.json(group);
  } catch (err) {
    console.error('GET /:id', err)
    next(err)
  }
});

// 그룹 한개 생성
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const newGroup = await db.Group.create({
      name: req.body.name,
      intro: req.body.intro,
      limit: req.body.limit,
      MasterId: req.user.id,
    })
    await newGroup.addGroupmember(req.user.id)

    const fullGroup = await db.Group.findOne({
      where: {
        id: newGroup.id
      },
      include: [{
          model: db.User,
          as: "Master",
          attributes: ['id', 'nickname', 'name', 'email']
        },
        {
          model: db.User,
          as: "Groupmember",
          include: [{
            model: db.User,
            attributes: ['id']
          }]
        }, {
          model: db.Grouppost,
          include: [{
            model: db.User,
            attributes: ['id', 'nickname', 'name', 'email']
          }]
        }
      ],
    });
    return res.json(fullGroup);
  } catch (err) {
    console.error('GET /:id', err)
    next(err)
  }
});

module.exports = router;