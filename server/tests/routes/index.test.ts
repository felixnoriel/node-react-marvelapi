import { expect } from "chai";
import * as Koa from "koa";
import * as request from "supertest";
import "mocha";

import router from "../../src/routes";

describe("The Routes", () => {
  it("adds the health route", async () => {
    const app = new Koa();

    router(app);

    await request(app.callback())
      .get("/health")
      .then(response => {
        expect(response.status).to.equal(200);
      });
  });
});
