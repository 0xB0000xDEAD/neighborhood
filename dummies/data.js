/* import details from "details_response";
import photo from "photo_response";

let data = [].concat(details, photo);
console.log(data);

export default data; */

// above not working due to es6 missing support

// module.exports = () => {
//   return [].concat({ paperino: "jkjksjd" }, { pluto: "hjhsds" });
// };

// index.js
let search = require("./search_response");
let details = require("./details_response");
let photo = require("./photo_response");

module.exports = () => {
  let data = Object.assign(search, details, photo);
  console.log(data);

  return data;
};
