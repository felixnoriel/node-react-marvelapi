import * as got from "got";
import { OutgoingHttpHeaders } from "http";
import { Readable } from "stream";
import config from "../config";
import * as md5 from "md5";

export interface Request {
  method: string;
  path: string;
  data?: Buffer | Readable | string;
  headers: OutgoingHttpHeaders;
  timeout?: number;
}

// 10 sec default timeout
const DefaultTimeout = 10000;

export default class Service {
  protected baseURL: string;
  constructor() {
    this.baseURL = config.MARVEL_API_URL!;
  }

  async sendRequest(request: Request): Promise<got.Response<any>> {
    const requestURL = this.baseURL + request.path + this.getAPICredentials();
    return await got(requestURL, {
      headers: request.headers,
      method: request.method,
      body: request.data,
      timeout: request.timeout || DefaultTimeout
    });
  }

  private getAPICredentials(): string {
    const ts = new Date().getTime();
    return `&ts=${ts}&apikey=${config.MARVEL_API_PUBLIC_KEY}&hash=${md5(
      `${ts}${config.MARVEL_API_PRIVATE_KEY}${config.MARVEL_API_PUBLIC_KEY}`
    )}`;
  }
}
