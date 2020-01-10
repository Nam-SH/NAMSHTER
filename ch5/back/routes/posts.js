const express = require('express');
const router = express.Router();
const db = require('../models');


// 게시물들 가져오기, (/posts)
// 쿼리 스트링 => //GET /posts?ofset=10&limit=10
router.get('/', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname']
        }, {
          model: db.Image,
        }, {
      //  좋아요 관련
          model: db.User,
          as: 'Likers',
          attributes: ['id']
        }, {
          //  리트윗 관련
          model: db.Post,
          as: "Retweet",
          include: [
            {
              model: db.User,
              attributes: ['id', 'nickname']
            }
          ]
        }],
      order: [['createdAt', 'DESC']],
      offset: parseInt(req.query.offset, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    });
    res.json(posts)
  }
  catch (err) {
    console.error(err)
    next(err)
  }
});

module.exports = router;