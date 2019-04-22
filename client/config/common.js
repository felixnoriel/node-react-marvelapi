require("dotenv").config();

module.exports = {
  api: {
    baseUrl: process.env.API_URL || "http://localhost:3000"
  }
};
