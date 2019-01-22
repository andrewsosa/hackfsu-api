/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */
/* eslint import/no-extraneous-dependencies: 0 */

require("dotenv").config();

const { router, get } = require("microrouter"); // routing
const config = require("./now.json"); // now.json

// Load the routes from now.json into microrouter `get` routes
const routes = config.routes.map(r => get(r.src, require(`.${r.dest}`)));

module.exports = router(...routes);
