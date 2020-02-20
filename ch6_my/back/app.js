const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();
const hpp = require('hpp');
const helmet = require('helmet');
const http = require('http');
const https = require('https');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');

const groupRouter = require('./routes/group');
const groupsRouter = require('./routes/groups');


const dotenv = require('dotenv');

// 배포용인지 확인
const prod = process.env.NODE_ENV === 'production';

// db 강제로 덮어씌우기
// db.sequelize.sync({
//   force: true
// })
db.sequelize.sync();

passportConfig();

dotenv.config();

if (prod) {
  // 배포용
  app.use(helmet());
  app.use(hpp());
  app.use(morgan('combined'));
  app.use(cors({
    origin: 'https://namshter.com',
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: 'http://localhost:3081',
    credentials: true,
  }));
}

// 정적파일 사용 => 서버에서 정확한 위치를 보이지 않이 위해, 단순히 / 로 요청을 받게 한다.
app.use('/', express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookie(process.env.COOKIE_SECRET))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: prod,
    domain: prod && '.namshter.com'
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
app.use('/group', groupRouter)
app.use('/groups', groupsRouter)


app.listen(prod ? process.env.PORT : 3085, () => {
  console.log(`백엔드 서버 ${prod ? process.env.PORT : 3085}번 포트에서 작동 중...`);
})

// const lex = require('greenlock-express').create({
//   version: 'draft-11',
//   configDir: '/etc/letsencrypt', // 또는 ~/letsencrypt/etc
//   server: 'https://acme-v02.api.letsencrypt.org/directory',
//   email: 'gtsmell@gmail.com',
//   store: require('greenlock-store-fs'),
//   approveDomains: (opts, certs, cb) => {
//     if (certs) {
//       opts.domains = ['api.namshter.com'];
//     } else {
//       opts.email = 'gtsmell@gmail.com';
//       opts.agreeTos = true;
//     }
//     cb(null, {
//       options: opts,
//       certs
//     });
//   },
//   renewWithin: 81 * 24 * 60 * 60 * 1000,
//   renewBy: 80 * 24 * 60 * 60 * 1000,
// });

// if (prod) {
//   https.createServer(lex.httpsOptions, lex.middleware(app)).listen(443);
//   http.createServer(lex.middleware(require('redirect-https')())).listen(80);
// } else {
//   app.listen(prod ? process.env.PORT : 3085, () => {
//     console.log(`server is running on ${prod ? process.env.PORT : 3085}`);
//   });
// }

module.exports = app