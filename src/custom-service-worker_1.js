// original
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js"
);

// import workbox from ""
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// workbox.routing.registerRoute(
//   "https://api.foursquare.com/v2/venues/search",
//   workbox.strategies.cacheFirst()
// );

workbox.routing.registerRoute(
  new RegExp("^https://api.foursquare.com/v2/venues/search"),
  workbox.strategies.cacheFirst({
    cacheName: "api-cache",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

workbox.routing.registerRoute(
  /\.(?:js|css|html|json)$/,
  workbox.strategies.networkFirst()
);
workbox.routing.registerRoute(
  "http://localhost:3000/",
  workbox.strategies.networkFirst()
);

//default route handler
workbox.routing.setDefaultHandler(({ url, event, params }) => {
  console.log(`no route for this url(${url})`);
});

// dummy routes

workbox.routing.registerRoute(
  "http://localhost:4000/searchResponse",
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
  "http://localhost:4000/detailsResponse",
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
  "http://localhost:4000/photoResponse",
  workbox.strategies.networkFirst()
);
