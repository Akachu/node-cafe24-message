# node-cafe24-message

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