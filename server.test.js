/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

require("dotenv").config();

const { router, get } = require("microrouter");
const { routes } = require("./now.json");

const handlers = routes.map(r => get(r.src, require(`.${r.dest}`)));
module.exports = router(...handlers);
