import "mocha";
import { expect } from "chai";
import * as http from "http";
import * as process from "process";
import * as net from "net";

describe("The App", () => {
  process.env.LISTEN_PORT = "0";
  // App is now listening on port 3000.
  const server = require("../src/index").default as http.Server;
  const address = server.address() as net.AddressInfo;

  it("listens and boots", done => {
    const test = () => {
      const options = {
        hostname: address.address,
        port: address.port,
        path: "/"
      };
      const req = http.request(options, res => {
        expect(res.statusCode).to.equal(404);
        server.close(done);
      });
      req.end();
    };
    if (server.listening) {
      test();
    } else {
      server.on("listening", test);
    }
  });
});
