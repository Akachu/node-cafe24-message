# node-cafe24-message [![Build Status](https://travis-ci.com/Akachu/node-cafe24sms.svg?branch=master)](https://travis-ci.com/Akachu/node-cafe24sms) [![Coverage Status](https://coveralls.io/repos/github/Akachu/node-cafe24-message/badge.svg)](https://coveralls.io/github/Akachu/node-cafe24-message) [![NPM version](https://img.shields.io/npm/v/cafe24-message.svg)](https://npmjs.org/package/cafe24-message)

## Install

```bash
yarn add cafe24-message
```

## Usage

```ts
const message = new Cafe24Message({
  userId: "__USER_ID__",
  secret: "__SECRET__",
  phone: "070-1234-5678"
});

let result = await message.send({
  body: "메시지 전송 테스트",
  phone: "010-1234-5678"
});

console.log(result); // 남은 문자 건수 표시
```
