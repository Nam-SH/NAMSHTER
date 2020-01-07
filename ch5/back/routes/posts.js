const express = require('express');
const router = express.Router();
const db = require('../models');


// 게시물들 가져오기, (/posts)
router.get('/', async (req, res, next) => {
  try {
    console.log('글을 가져오는 back/posts입니다.')
    const posts = await db.Post.findAll({
       include: [
         {
         model: db.User,
         attributes: ['id', 'nickname']
       }, {
         model: db.Image,
       }],
       order: [['createdAt', 'DESC']],
       offset: parseInt(req.query.offset, 10) || 0,
       limit: parseInt(req.query.limit, 10) || 10,
    });
    res.json(posts)
  }
  catch (err) {
    console.error('back/posts의 err:::', err)
    next(err)
  }
})

module.exports = router;