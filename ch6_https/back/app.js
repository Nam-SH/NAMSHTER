const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookie = require("cookie-parser");
const morgan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");
const dotenv = require("dotenv");

const https = require("https");
const http = require("http");

const prod = process.env.NODE_ENV === "production";
const db = require("./models");
const passportConfig = require("./passport");

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const hashtagRouter = require("./routes/hashtag");
const groupRouter = require("./routes/group");
const groupsRouter = require("./routes/groups");

const app = express();

// db.sequelize.sync({
//   force: true
// });
db.sequelize.sync();

dotenv.config();
passportConfig();

if (prod) {
  app.use(helmet());
  app.use(hpp());
  app.use(morgan("combined"));
  app.use(
    cors({
      origin: ["https://namshter.com", "https://www.namshter.com"],
      default: "https://namshter.com",
      credentials: true
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: "http://localhost:3081",
      credentials: true
    })
  );
}

app.use("/", express.static("uploads"));
app.use("/profile", express.static("userprofile"));
app.use("/postimage", express.static("grouppostimage"));
app.use("/groupimage", express.static("groupprofileimage"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(cookie(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: prod,
      domain: prod && ".namshter.com"
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).send("여기는 백엔드");
});

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/hashtag", hashtagRouter);
app.use("/group", groupRouter);
app.use("/groups", groupsRouter);

if (prod) {
  const lex = require("greenlock-express").create({
    version: "draft-11",
    configDir: "/etc/letsencrypt", // 또는 ~/letsencrypt/etc
    server: "https://acme-v02.api.letsencrypt.org/directory",
    email: "gtsmell@gmail.com",
    store: require("greenlock-store-fs"),
    approveDomains: (opts, certs, cb) => {
      if (certs) {
        opts.domains = ["api.namshter.com"];
      } else {
        opts.email = "gtsmell@gmail.com";
        opts.agreeTos = true;
      }
      cb(null, {
        options: opts,
        certs
      });
    },
    renewWithin: 81 * 24 * 60 * 60 * 1000,
    renewBy: 80 * 24 * 60 * 60 * 1000
  });
  https.createServer(lex.httpsOptions, lex.middleware(app)).listen(443);
  http.createServer(lex.middleware(require("redirect-https")())).listen(80);
} else {
  app.listen(prod ? process.env.PORT : 3085, () => {
    console.log(`server is running on ${process.env.PORT || 3085}`);
  });
}