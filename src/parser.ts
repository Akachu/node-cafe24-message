import { MessageType, MessageConfig, MessageForm } from "./interface";
import { CAFE24_MESSAGE_API_URL } from "./api";

export function makeMultipartData(data: Record<string, string>) {
  let boundary = Math.random()
    .toFixed(12)
    .substr(2);

  let dataString = "";

  for (let key in data) {
    let value = Buffer.from(data[key]).toString("base64");

    let length = Buffer.from(value).byteLength;
    dataString +=
      `--${boundary}\n` +
      `Content-Disposition: form-data; name="${key}"\n` +
      `Content-Length: ${length}\n` +
      `\n${value}\n`;
  }

  dataString += `--${boundary}--`;

  let contentType = `multipart/form-data; boundary=${boundary}`;
  let contentLength = Buffer.from(dataString).byteLength;
  let multipartHeaders = {
    "Content-Type": contentType,
    "Content-Length": contentLength.toString()
  };

  return { dataString, multipartHeaders };
}

export function makeMessageSendData(
  form: MessageForm,
  config: MessageConfig,
  forceMessageType?: MessageType
) {
  const length = Buffer.byteLength(form.body);

  const sphone = config.phone.split("-");

  let data: Record<string, string> = {
    user_id: config.userId,
    secure: config.secret,
    sphone1: sphone[0],
    sphone2: sphone[1],
    sphone3: sphone[2],
    rphone: form.phone,
    smsType: "S",
    mode: "1",
    msg: form.body,
    sms_url: CAFE24_MESSAGE_API_URL
  };

  if (length > 2000 || (length > 90 && forceMessageType == MessageType.SMS)) {
    throw new Error("message body is too big");
  } else if (length > 90) {
    data.smsType = "L";
  }

  if (form.isTest) data.testflag = "Y";

  if (form.repeat) {
    const repeat = form.repeat;

    data = {
      ...data,
      repeatFlag: "Y",
      repeatNum: repeat.count.toString(),
      repeatTime: repeat.interval.toString()
    };
  }

  if (form.reserve) {
    const reserve = form.reserve;

    const date =
      (reserve.getFullYear() + "").padStart(4, "0") +
      (reserve.getMonth() + "").padStart(2, "0") +
      (reserve.getDate() + "").padStart(2, "0");

    const time =
      (reserve.getHours() + "").padStart(2, "0") +
      (reserve.getMinutes() + "").padStart(2, "0") +
      (reserve.getSeconds() + "").padStart(2, "0");

    data = {
      ...data,
      rdate: date,
      rtime: time
    };
  }

  const messageType = data.smsType === "S" ? MessageType.SMS : MessageType.LMS;

  return {
    data,
    messageType
  };
}
