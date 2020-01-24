const express = require('express');
const cors = require('cors');

const db = require('./models');
const app = express();

const hpp = require('hpp')
const helmet = require('helmet')

const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');

const dotenv = require('dotenv')

// 배포용인지 확인
const prod = process.env.NODE_ENV === 'production';

// db 강제로 덮어씌우기
// db.sequelize.sync({force: true})
db.sequelize.sync();
passportConfig();

dotenv.config()

if (prod) {
  // 배포용
  app.use(helmet());
  app.use(hpp());
  app.use(morgan('combined'));
  app.use(cors({
    origin: 'http://namshter.com',
    credentials: true,
  }));
}
else {
  app.use(morgan('dev'))
  app.use(cors({
    origin: 'http://localhost:3081',
    credentials: true,
  }));
}



// 정적파일 사용 => 서버에서 정확한 위치를 보이지 않이 위해, 단순히 / 로 요청을 받게 한다.
app.use('/', express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookie(process.env.COOKIE_SECRET))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    domain: prod && '.manshter.com'
  }
}));

app.use(passport.initialize())
app.use(passport.session())

// 메인페이지를 가져오는 것
app.get('/', (req, res) => {
  res.status(200).send('여기는 백엔드');
})

app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/posts', postsRouter)
app.use('/hashtag', hashtagRouter)



app.listen(prod ? process.env.PORT : 3085, () => {
  console.log(`백엔드 서버 ${prod ? process.env.PORT : 3085}번 포트에서 작동 중...`);
  
})