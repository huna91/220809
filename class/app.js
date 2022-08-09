// 경매소 만들기 응용
// 로그인 회원가입 붙여서 구현해볼것
// 월요일 쿠키세션 JWT 진행

// 사용 모듈
// express, ejs, socketio, fs, nodemon

/*
1. packjson 설치
2. express 서버 세팅
3. 페이지 라우터 분리해서 보여주기
 - / 루트경로 페이지 하나
 - / shop 페이지 하나
4. nodemon 개발 버전으로 설치



*/

const express = require("express");
const fs = require("fs");
const socketio = require("socket.io");
const ejs = require("ejs");
// const { endianness } = require("os");
// 서버 몸체 만듬
const app = express();
const PORT = 3012;
const server = app.listen(PORT, () => {
  console.log(`${PORT}번 포트 서버연결`);
});

const io = socketio(server);

// 상품의 번호를 정해줄 변수
let counter = 0;

// 생성자 함수(객체를 생성하는 함수)
function Product(name, image, price, count) {
  // 상품의 번호를 증가하며 컨트롤
  this.index = counter++;
  this.name = name;
  this.image = image;
  this.price = price;
  this.count = count;
}

// 객체 생성 테스트
// console.log(new Product("사과", "/", 2000, 20));

// 상품을 담고있는 배열
const products = [
  new Product("사과", "/", 2000, 20),
  new Product("수박", "/", 2000, 20),
  new Product("포도", "/", 2000, 20),
  new Product("복숭아", "/", 2000, 20),
  new Product("자두", "/", 2000, 20),
];
console.log(products);


app.get("/", (req, res) => {
  fs.readFile("page.html", "utf-8", (err, data) => {
    console.log("메인 접속");
    res.end(data);
  });
});

// app.get("/shop", (req, res) => {
//   // 이미지 파일 읽어 온거
//   // fs.readFileSync("shop.html", "utf-8")의 반환값인 page는 html 파일을 읽어서 utf-8 인코딩 해서 반환해준다.
//   const page = fs.readFileSync("shop.html", "utf-8");
//   console.log(page);
//   fs.readFile("shop.html", "utf-8", (err, data) => {
  //     console.log("샵 페이지 접속");
//     res.end(data);
//   });
// });
app.get("/shop", (req, res) => {
  // 이미지 파일 읽어 온거
  // fs.readFileSync("shop.html", "utf-8")의 반환값인 page는 html 파일을 읽어서 utf-8 인코딩 해서 반환해준다.
  const page = fs.readFileSync("shop.html", "utf-8");
  
  res.send(
    ejs.render(page, {
      products: products,
    })
    );
});

// 상품페이지 이미지를 보기 위해 use 함수 사용
// __dirname+"/" 이 의미는 이 폴더부터 경로를 사용할 것이라고 알려주는 것임.
// app.use("/자신이 설정할 경로", express.static(__dirname + "/images"));
// ㅗ 이렇게 작성하면 예를들어 "/src" ,express.static(__dirname + "/images") 이렇게 작성하면
// /src/images 경로가  이렇게 설정 됨.
app.use(express.static(__dirname + "/images"));
console.log(express.static(__dirname + "/images"));
console.log(__dirname + "/images");

//ex
app.use("/src2", express.static(__dirname + "/images2"));
// app.use("/css", express.static(__dirname + "/css"));   => 이런식으로 파일 관리

let cart = [];

io.on("connection", (socket) => {
  console.log("소켓 연결");

  function onReturn(index){
    products[index].count++;

    delete cart[index];
    let count = products[index].count;
    io.emit("count",{
      index,
      count
    })
  }
});