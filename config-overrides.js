/*  react-app-rewire */

// const workboxPlugin = require('workbox-webpack-plugin')
// const path = require('path')

// module.exports = {
//   webpack: function (config, env) {
//     if (env === 'production') {
//       const workboxConfigProd = {
//         swSrc: path.join(__dirname, 'public', 'custom-service-worker.js'),
//         swDest: 'custom-service-worker.js',
//         importWorkboxFrom: 'disabled'
//       }
//       config = removeSWPrecachePlugin(config)
//       config.plugins.push(new workboxPlugin.InjectManifest(workboxConfigProd))
//     }
//     return config
//   }
// }

// function removeSWPrecachePlugin (config) {
//   const swPrecachePluginIndex = config.plugins.findIndex((element) => {
//     return element.constructor.name === 'SWPrecacheWebpackPlugin'
//   })
//   if (swPrecachePluginIndex !== -1) {
//     config.plugins.splice(swPrecachePluginIndex, 1)
//   }
//   return config
// }

/*  react-app-rewire-workbox from official docs */
// const {rewireWorkboxGenerate} = require('react-app-rewire-workbox');

// module.exports = function override(config, env) {
//   if (env === "production") {
//     console.log("Production build - Adding Workbox for PWAs");
//     config = rewireWorkboxGenerate()(config, env);
//   }

//   return config;
// };

/*  
    react-app-rewire-workbox 
    from
    https://medium.com/la-creativer%C3%ADa/using-workbox-with-create-react-app-without-ejecting-b02b804854b
*/
const {
  rewireWorkboxInject,
  defaultInjectConfig
} = require("react-app-rewire-workbox");
const path = require("path");

module.exports = function override(config, env) {
  // if (env === "production") {
  if (true) {
    console.log("Production build - Adding Workbox for PWAs");
    // Extend the default injection config with required swSrc
    const workboxConfig = {
      ...defaultInjectConfig,
      swSrc: path.join(__dirname, "src", "custom-sw.js")
    };
    config = rewireWorkboxInject(workboxConfig)(config, env);
  }

  return config;
};
