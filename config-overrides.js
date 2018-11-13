/*  react-app-rewire-workbox from official docs */
const { rewireWorkboxGenerate } = require("react-app-rewire-workbox");

module.exports = function override(config, env) {
  // if (env === "production") {
  if (true) {
    console.log("Production build - Adding Workbox for PWAs");
    config = rewireWorkboxGenerate()(config, env);
  }

  return config;
};

/*  
    react-app-rewire-workbox 
    from
    https://medium.com/la-creativer%C3%ADa/using-workbox-with-create-react-app-without-ejecting-b02b804854b
*/
// const {
//   rewireWorkboxInject,
//   defaultInjectConfig
// } = require("react-app-rewire-workbox");
// const path = require("path");

// module.exports = function override(config, env) {
//   if (env === "production") {
//     console.log("Production build - Adding Workbox for PWAs");
//     // Extend the default injection config with required swSrc
//     const workboxConfig = {
//       ...defaultInjectConfig,
//       swSrc: path.join(__dirname, "src", "custom-sw.js")
//     };
//     config = rewireWorkboxInject(workboxConfig)(config, env);
//   }

//   return config;
// };
