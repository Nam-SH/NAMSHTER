const express = require('express');
const router = express.Router();
const db = require('../models');

const {
  isLoggedIn
} = require('./middlewares')


// 한개 그룹 디테일
router.get('/:groupId', async (req, res, next) => {
  try {
    const group = await db.Group.findOne({
      where: {
        id: req.params.groupId
      },
      include: [{
        model: db.User,
        as: "Master",
        attributes: ['id', 'nickname', 'name', 'email', 'isAdmin', 'snsId', 'provider'],
      }, {
        model: db.User,
        as: "Groupmembers",
        attributes: ['id', 'nickname', 'name', 'email'],
      }, {
        model: db.GroupPost,
        include: [{
          model: db.User,
          attributes: ['id', 'nickname', 'name', 'email'],
        }]
      }, {
        model: db.Subject,
        as: "Selectsubject",
        attributes: ['id', 'name'],
        include: [{
          model: db.Category,
          attributes: ['id', 'name']
        }]
      }],
    });
    return res.json(group);
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

    const targetSubject = await db.Subject.findOne({
      where: {
        name: req.body.subjectName
      }
    })
    await newGroup.addGroupmembers(req.user.id)
    await newGroup.addSelectsubject(targetSubject.id)

    const fullGroup = await db.Group.findOne({
      where: {
        id: newGroup.id
      },
      include: [{
          model: db.User,
          as: "Master",
          attributes: ['id', 'nickname', 'name', 'email'],
        },
        {
          model: db.User,
          as: "Groupmembers",
          attributes: ['id', 'nickname', 'name', 'email'],
        }, {
          model: db.GroupPost,
          include: [{
            model: db.User,
            attributes: ['id', 'nickname', 'name', 'email'],
          }]
        }, {
          model: db.Subject,
          as: "Selectsubject",
          attributes: ['id', 'name'],
          include: [{
            model: db.Category,
            attributes: ['id', 'name']
          }]
        }
      ],
    });
    return res.json(fullGroup);
  } catch (err) {
    console.error('POST /:id', err)
    next(err)
  }
});

// 그룹 상태 변혼하기
router.post("/:groupId/changestatus", async (req, res, next) => {
  try {
    // 1. 해당 그룹 찾기
    const group = await db.Group.findOne({
      where: {
        id: parseInt(req.params.groupId, 10)
      }
    })
    // 2. 그룹이 없으면 끝
    if (!group) {
      return res.status(404).send('그런 그룹이 없는데여;;')
    }
    // 3. 그룹이 있으면 해당 그룹의 마수터와 요청한 자의 id 비교하기
    // 방장이 아니면 400에러 보내기
    if (group.MasterId !== req.body.userId) {
      return res.status(403).send('님은 상태를 변경할 권한이 없는데여;;')
    }
    // 4. 방장이라면 바꿔주기
    let nxt = 1
    if (group.status === 1) {
      nxt = 2
    } else if (group.status === 2) {
      return res.status(400).send('완료 된 그룹인데여;;')
    }

    await db.Group.update({
      status: nxt,
    }, {
      where: {
        id: parseInt(req.params.groupId, 10)
      }
    })
    return res.json(nxt)
  } catch (err) {
    console.error('POST /changestatus :::', err);
    next(err)
  }
})

router.post("/:groupId/userInOut", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.body.userId
      }
    })
    const targetGroup = await db.Group.findOne({
      where: {
        id: req.params.groupId
      },
      attributes: ['id', 'MasterId']
    })

    if (user.id === targetGroup.MasterId) {
      return res.send("님은 방장이라 가입/탈퇴 못함;;")
    }
    const usersInGroup = await targetGroup.getGroupmembers({
      where: {
        id: user.id
      },
      attributes: ['id']
    })
    if (usersInGroup) {
      await user.removeGroupjoined(req.params.groupId)
      return res.send("탈퇴가 되었네여;;")
    } else {
      await user.addGroupjoined(req.params.groupId)
      return res.send("가입이 되었네여;;")
    }
  } catch (err) {
    console.error('POST /:groupId/userInOut', err);
    next(err)
  }
})

module.exports = router;