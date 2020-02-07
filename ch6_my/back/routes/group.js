const express = require('express');
const router = express.Router();
const db = require('../models');

// 한개 그룹 디테일
router.get('/:groupId', async (req, res, next) => {
  try {
    const group = await db.Post.findOne({
      where: {
        id: req.params.groupId
      },
      include: [{
        model: db.User,
        as: 'Master',
        attributes: ['id', 'nickname', 'name', 'email']
      }, {
        model: db.User,
        throught: "Groupuser",
        attributes: ['id', 'nickname', 'name', 'email']
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

module.exports = router;