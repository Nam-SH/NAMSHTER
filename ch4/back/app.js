const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./models');
const app = express();

app.use(cors('http://localhost:3000'));
app.use(express());
app.use(express.urlencoded({ extended: false }));

db.sequelize.sync();


// 메인페이지를 가져오는 것
app.get('/', (req, res) => {
  // res.status(200).send('여기는 백엔드');
  res.send('(수정)여기는 남승현');
})

// 1. 회원가입(signUp)
app.post('/user', async (req, res, next) => {
  console.log('백엔드에서 회원가입 정보 받았음요~~')
  try {
    const hash = await bcrypt.hash(req.body.password, 12)
    const newUser =  await db.User.create({
      email: req.body.email,
      password: hash,
      nickname: req.body.nickname
    });
    res.status(201).json(newUser) // 성공적으로 생성했다.
  } catch (err) {
    console.log('req', req)
    console.log('err입니다~~', err);
    return next(err);
  }
})

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 프로에서 작동중...`)
  console.log()
  console.log(`http://localhost:${3085}/`)
})