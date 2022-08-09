let createCookie = function (name, value, time) {
  let date = new Date();
  console.log(date);
  date.setTime(date.getTime() + time * 24 * 60 * 60 * 1000);
  document.cookie = `${name} = ${value}; expires = ${date.toUTCString()}; path = /`;
};

let getCookie = function (name) {};
