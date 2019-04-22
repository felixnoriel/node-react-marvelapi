const _ = require("lodash");

const common = require("./common");

module.exports = _.merge(common, {
  env: "development"
});
