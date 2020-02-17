export interface MessageConfig {
  userId: string;
  secret: string;
  phone: string;
}

export interface MessageForm {
  phone: string;
  body: string;
  title?: string;
  isTest?: boolean;
  reserve?: Date;
  repeat?: MessageRepeatConfig;
}

export enum MessageType {
  SMS = "SMS",
  LMS = "LMS"
}

export interface MessageRepeatConfig {
  count: number;
  interval: number;
}
