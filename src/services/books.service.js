const FreeComBooks = require("../scraper/targets/freecombooks");
const Dbooks = require("../scraper/targets/Dbooks");

const freeComBooks = new FreeComBooks();
const dbooks = new Dbooks();

module.exports = {freeComBooks, dbooks}
