import Cafe24Message from "../src/index";
import { expect } from "chai";
import "mocha";

const userId = process.env.userId!;
const secret = process.env.secret!;
const phone = process.env.phone!;
const targetPhone = process.env.targetPhone!;

describe("test", () => {
  const message = new Cafe24Message({
    userId,
    secret,
    phone
  });

  it("send sms", async () => {
    let result = await message.send({
      body: "sms 문자 발송 테스트",
      phone: targetPhone
    });

    expect(result).is.not.a("Error");
  });

  it("send lms", async () => {
    let result = await message.send({
      body: "lms 문자 발송 테스트",
      phone: targetPhone
    });

    expect(result).is.not.a("Error");
  });

  it("faild to send message", async () => {
    message
      .send({
        body: "문자 발송 실패 테스트",
        phone: "0101010-101010-10101010"
      })
      .catch(err => {
        expect(err).is("Error");
      });
  });
});
