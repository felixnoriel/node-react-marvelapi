process.env.NODE_ENV = "test";
require("dotenv").config();
import "mocha";

import server from "../../src/index";

// need to synchronous import chai
const Chai = require("chai");
const ChaiHttp = require("chai-http");
Chai.should();
Chai.use(ChaiHttp);

xdescribe("Assets API", () => {
  const assetKeys = [
    "id",
    "account_id",
    "title",
    "slug",
    "description",
    "state",
    "language",
    "tags",
    "categories",
    "genres",
    "custom_data",
    "availability",
    "created_at",
    "deleted_at",
    "updated_at"
  ];

  const assetsApiURL = `/media/assets`;
  before(async () => {});

  after(async () => {});

  describe(`GET`, () => {
    it(`${assetsApiURL} should return an array of assets`, async () => {
      const response = await Chai.request(server).get(assetsApiURL);
      response.error.should.equal(false);
      response.status.should.equal(200);
      response.type.should.equal("application/json");
      response.body.status.should.equal("success");
      response.body.data[0].should.include.keys(assetKeys);
    });
  });
});
