import { request } from "https";
import { IncomingMessage } from "http";
import { makeMultipartData } from "./parser";
import { CAFE24_MESSAGE_API_URL } from "./api";

export async function send(data: Record<string, string>) {
  const { dataString, multipartHeaders } = makeMultipartData(data);
  const options = {
    headers: multipartHeaders,
    method: "POST"
  };

  const res: IncomingMessage = await new Promise((resolve, reject) => {
    const req = request(CAFE24_MESSAGE_API_URL, options, resolve);
    req.write(dataString);
    req.end();
    req.on("error", reject);
  });

  let resData = "";

  res.on("data", chunk => (resData += chunk));

  await new Promise((resolve, reject) => {
    res.on("error", reject);
    res.on("end", resolve);
  });

  return resData;
}
