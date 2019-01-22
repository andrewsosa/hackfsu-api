const micro = require("micro");
const router = require("./router");

module.exports = micro(router);
