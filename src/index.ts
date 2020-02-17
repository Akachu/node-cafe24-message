import {
  MessageConfig,
  MessageForm,
  MessageRepeatConfig,
  MessageType
} from "./interface";
import { makeMessageSendData } from "./parser";
import { send } from "./request";
import errorCode from "./errorCode";

export default class Cafe24Message {
  private config: MessageConfig;
  public constructor(config: MessageConfig) {
    const sphone = config.phone.split("-");

    if (sphone.length !== 3) {
      throw new Error("sender's phone number format is wrong");
    }

    this.config = config;
  }

  public async send(form: MessageForm, forceMessageType?: MessageType) {
    const { data, messageType } = makeMessageSendData(
      form,
      this.config,
      forceMessageType
    );
    let result = await send(data);
    let results = result.split(",");
    const status = results[0];

    if (
      status !== "success" &&
      status !== "reserved" &&
      status !== "-2" &&
      status !== "0"
    ) {
      let errorMessage = errorCode[status] || "unknown";
      throw new Error(`code: ${status}, ${errorMessage}`);
    }

    return parseInt(results[1]);
  }
}

export { MessageConfig, MessageForm, MessageRepeatConfig, MessageType };
