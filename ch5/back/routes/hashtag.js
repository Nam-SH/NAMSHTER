const express = require('express');

const router = express.Router();

const db = require('../models');

// 해시태그 글 가져오기 (// GET /hashtag/:tag?lastId=10&limit=10)
router.get('/:tag', async (req, res, next) => { 
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), // less than
        },
      };
    }
    const posts = await db.Post.findAll({
      where,
      include: [{
        model: db.Hashtag,
        where: { name: decodeURIComponent(req.params.tag) },
      }, {
        model: db.User,
        attributes: ['id', 'nickname'],
      }, {
        model: db.Image,
      }, {
        model: db.User,
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: db.Post,
        as: 'Retweet',
        include: [{
          model: db.User,
          attributes: ['id', 'nickname'],
        }, {
          model: db.Image,
        }],
      }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(req.query.limit, 10) || 10,
    });
    res.json(posts);
  } 
  catch (err) {
    console.error('/:tag :::', err)
    next(err);
  }
});

module.exports = router;