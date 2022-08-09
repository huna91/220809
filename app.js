/*
**** JWT(Json Web Token) ****
 - JWT는 웹 표준으로 두개체의 JSON 객체를 사용해서 정보를 안정성 있게 전달 해준다.
 - JWT는 사용할 정보를 자체적으로 가지고 있다.(사용자가 필요한 것들)
 - JWT로 발급한 토큰은 아래의 정보를 포함하고 있다.
  * 기본정보 (유저의 정보 프로필)
  * signature(서명) : 토큰이 정상인지 검증되어진 토큰 
 - 웹서버는 http의 헤더에 정보가 들어있다.
 - url params 파라미터로도 전달 가능하다.
 - 주 사용처 : 로그인이 정상적인지 회원 인증 권한에서 사용한다.
 - JWT사용 원리
  -> 유저 : 로그인 요청 
  -> 서버 : 유저의 정보를 확인하여 정상 유저이면 토큰(JWT) 발급
  -> 유저 : 서버에 요청할 때마다 JWT를 포함해서 전달
  -> 서버 : 유저의 요청을 받을때마다 토큰이 정상인지 확인 후 작업에 대한 응답을 한다.

  => 이러한 방식을 통해 서버는 유저의 세션을 유지할 필요가 없고, 유저가 로그인 되었는지 확인할 필요가 없어진다.
     유저측에서 요청했을 때만 토큰을 확인해서 처리하기 때문에 서버 자원을 아낄 수 있다.

 - JWT 사용 장점 : 서버 자원을 아끼고 안정성 있게 정보를 주고 받을 수 있다.
 
 - JWT를 생성하면 JWT의 라이브러리가 자동으로 인코딩과 해싱 작업을 해준다.
 - HMAC SHA256 인코딩 및 해싱
  * HMAC : 해싱 기법을 적용해서 메시지의 위변조를 방지하는 기법
  * SHA256 : 임의 길이 메시지를 256비트의 축약된 메시지로 만들어내는 해시 알고리즘. 

 *** JWT의 구조 ***
 - header{ alg:"", typ:"" } / payload{ sub:"", name:"", lat:"" } / signature()
 - header : 타입과 알고리즘의 정보를 가지고 있다.
 - payload : 유저의 정보들과 만료 기간 객체를 가지고 있다.
 - signature : header, payload를 인코딩하고 합쳐서 비밀키로 해쉬
*/

/*
//토큰의 정보
header = {
  alg: "HS256",
  typ: "JWT",
};
//전달할 데이터
payload = {
  // 토큰의 제목
  sub: "4151533",
  // 유저 이름
  name: "sjsiejfli",
  // 토큰이 발급된 시간, 발급 된지 얼마나 지났는지
  lat: "1413513513135",
};
// 토큰 인증
signature = HMACSHA256(BASE64URL(header) + BASE64URL(payload));
*/

// 사용 모듈 : express, jsonwebtoken, nodemon, fs, body-parser, dotenv

// express 모듈 가져오기
const express = require("express");
// jwt 모듈 가져오기
const jwt = require("jsonwebtoken");
// fs 모듈 가져오기
const fs = require("fs");
// .env 모듈 가져오기
const dot = require("dotenv");
//config()함수 사용
dot.config();

const PORT = 3013;
const app = express();

app.listen(PORT, () => {
  console.log(`${PORT}번 포트 연결`);
});

app.post("/login", (req, res) => {
  // 로그인 하면 토큰 발급
  // 토큰 생성 (현재 넘길 정보가 없으니 변수로 만들기)
  const name = "JWT";
  const profile = "조와띠";

  // .env 파일을 통해 암호화 데이터를 관리하고 유출되는 것을 방지할 수 있다.
  // .env 애플리케이션이 실행 될 때 처음부터 저장된 특정 값을 가져옴
  const key = process.env.KEY;

  // jwt 토큰 생성하는 함수
  let token = jwt.sign(
    {
      // 타입 : JWT로
      type: "JWT",
      // 유저이름
      name: "",
    },
    // 암호키
    "dlrpqkfhzlzlzl",

    {
      // 토큰 유효시간 설정(만료시간)
      expiresIn: "5m",
      // 토큰 발급자
      issuer: "나",
    }
  );
  let data = {
    msg: "토큰내용",
    token,
  };
  res.send(JSON.stringify(data));
});

app.get("/", (req, res) => {
  fs.readFile("index.html", "utf-8", (err, data) => {
    res.send(data);
  });
});
