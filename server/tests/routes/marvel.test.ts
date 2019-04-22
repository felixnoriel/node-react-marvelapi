process.env.NODE_ENV = "test";
require("dotenv").config();
import "mocha";
import { expect } from "chai";
import server from "../../src/index";

// need to synchronous import chai
const Chai = require("chai");
const ChaiHttp = require("chai-http");
Chai.should();
Chai.use(ChaiHttp);

describe("Marvel API", () => {
  before(async () => {});

  after(async () => {});

  describe(`GET`, () => {
    it(`/marvel/characters should return an array of characters`, async () => {
      const response = await Chai.request(server).get(
        "/marvel/characters?limit=10"
      );
      response.error.should.equal(false);
      response.status.should.equal(200);
      response.type.should.equal("application/json");
      response.body.status.should.equal("success");
    });

    it(`/marvel/avengers should return an error because the entity_type is invalid`, async () => {
      const response = await Chai.request(server).get("/marvel/avengers");
      response.status.should.equal(404);
      response.body.status.should.equal("error");
      expect(response.error).to.be.an("error");
    });

    // increase timeout because marvel API takes a long time
  }).timeout(5000);
});
