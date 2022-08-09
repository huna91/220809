// nodemon express fs jsonwebtoken body-parser dotenv

const fs = require("fs");
const express = require("express");
const jwt = require("jsonwebtoken");
const dot = require("dotenv");
const bodyParser = require("body-parser");
dot.config();

const app = express();
const PORT = 3014;

// -----------------------------express session----------------------------------
// 모듈 설치
// ------------------------------------------------------------------------------
// npm i express-session
// ㅜ 저장된 세션의 정보를 파일로 보기 위해
// npm i session-file-store
// ------------------------------------------------------------------------------
// 모듈 가져오기
const session = require("express-session");
const FileStore = require("session-file-store")(session);

// bodyparser 사용
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(
  session({
    // 세션을 발급할때 사용되는 키
    // .env를 사용하여 코드 노출 안되도록 하자.
    secret: "qlalfzl",
    // 세션을 저장하고 불러올때 다시 저장 여부
    resave: false,
    // 세션을 저장할 때 초기화 여부
    saveUninitialized: true,
    // 저장소 생성 여부(모듈로 만든거) => sessions 폴더 생성됨(개발할 때 확인차 생성하는 것임)
    store: new FileStore(),
  })
);

app.listen(PORT, () => {
  console.log(`${PORT}번포트 연결`);
});

app.get("/", (req, res) => {
  //   if (!req.session.key) {
  //     req.session.key = "아무거나 넣기";
  //   }
  //   if (!req.session.pw) {
  //     req.session.pw = "비번";
  //   }

  //   res.send(`key:${req.session.key},pw:${req.session.pw}`);
  fs.readFile("index.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.get("/shop", (req, res) => {
  res.send(`난 숍${req.session.key}`);
  console.log(req.session.key);
  console.log(req.session.pw);
});

app.get("/login", (req, res) => {
  fs.readFile("login.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/", (req, res) => {
  req.session.key += req.body.userID_input;
  req.session.pw += req.body.userPassword_input;
  console.log(req.session.key);
  console.log(req.session.pw);
  res.send().redirect("/");
  //   req.body.userID_input;
  //   res.redirect("/");
});

let createCookie = function (name, value, time) {
  let date = new Date();
  date.setDate(date.getDate() + time * 24 * 60 * 60 * 1000);
  document.cookie = `${name} = ${value}; expires = ${date.toUTCString()}; path=/`;
};
