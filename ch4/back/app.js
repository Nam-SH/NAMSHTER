const express = require('express');

const app = express();

// 메인페이지를 가져오는 것
app.get('/', (req, res) => {
  // res.status(200).send('여기는 백엔드');
  res.send('여기는 백엔드');
})

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 프로에서 작동중...`)
  console.log()
  console.log(`http://localhost:${3085}/`)
})