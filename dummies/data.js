let search = require("./search_response");
let details = require("./details_response");
let photo = require("./photo_response");

module.exports = () => {
  let data = Object.assign(search, details, photo);
  return data;
};
