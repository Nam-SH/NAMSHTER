const express = require('express');
const router = express.Router();
const db = require('../models');
const {
  isLoggedIn,
  isNotLoggedIn
} = require('./middlewares')

// lastId 방식으로 불러오기
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
    const posts = await db.Post.findAll({
      where,
      include: [{
        model: db.User,
        attributes: ['id', 'nickname']
      }, {
        model: db.Image,
      }, {
        model: db.User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: db.Comment,
        attributes: ['id']
      }, {
        model: db.Post,
        as: "Retweet",
        include: [{
            model: db.User,
            attributes: ['id', 'nickname']
          },
          {
            model: db.Image
          }
        ]
      }],
      order: [
        ['createdAt', 'DESC']
      ],
      limit: parseInt(req.query.limit, 10) || 10,
    });
    res.json(posts);
  } catch (err) {
    console.error('GET /', err)
    next(err)
  }
});


router.get('/thisweek', async (req, res, next) => {
  try {
    let where = {
      UserId: req.user.id
    };
    // if (parseInt(req.query.lastId, 10)) {
    //   where = {
    //     id: {
    //       [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
    //     }
    //   }
    // }
    const posts = await db.Post.findAll({
      where,
      attributes: ['createdAt'],
      order: [
        ['createdAt', 'DESC']
      ],
    });
    let calcPosts = []
    for (let i of posts) {
      calcPosts.push(i.dataValues.createdAt)
    }
    return res.json(calcPosts);
  } catch (err) {
    console.error('GET /', err)
    next(err)
  }
});


module.exports = router;