// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

self.addEventListener("install", event => event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", event =>
  event.waitUntil(self.clients.claim())
);

// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// app-shell
workbox.routing.registerRoute("/", workbox.strategies.networkFirst());

workbox.routing.registerRoute(
  new RegExp("^https://api.foursquare.com/v2/venues"),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp("^https://maps.googleapis.com"),
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
