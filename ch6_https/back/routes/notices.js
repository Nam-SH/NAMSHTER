const express = require('express');
const router = express.Router();
const db = require('../models');

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
    const notices = await db.Notice.findAll({
      where,
      include: [{
          model: db.User,
          attributes: ['id', 'nickname', 'name', 'src', 'email', 'isAdmin'],
        },
        // {
        // model: db.Comment,
        // attributes: ['id']
        // }
      ],
      order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC']
      ],
      limit: parseInt(req.query.limit, 10) || 10,
    });
    res.json(notices);
  } catch (err) {
    console.error('GET /', err)
    next(err)
  }
});

module.exports = router;