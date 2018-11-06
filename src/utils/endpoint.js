import { callForReal, port } from "../config";
// import { obj } from "../config";
let searchParams, photoParams, detailParams;
switch (callForReal) {
  case true:
    searchParams = {
      url: "https://api.foursquare.com/v2/venues/search",
      method: "GET",
      qs: {
        client_id: "1ZCYUXHNJK2TQYDJ5XMHVTXM2F5YW3V1P3W15YDWUTOBO1MN",
        client_secret: "RHQ2UI1DMNO5HF1GTMO5YIHXZO12Z2PNUKVAF1ZRZURMZ2NI",
        near: "los angeles",
        // query: "lake",
        categoryId: "4bf58dd8d48988d167941735",
        // radius: "50000",
        v: "20180323",
        limit: 10
      }
    };
    //TODO dump a real response for this endpoint
    photoParams = {
      url: `http://localhost:${port}/photoResponse`,
      method: "GET"
    };
    detailParams = id => {
      return {
        url: `https://api.foursquare.com/v2/venues/${id}`,
        method: "GET",
        qs: {
          client_id: "1ZCYUXHNJK2TQYDJ5XMHVTXM2F5YW3V1P3W15YDWUTOBO1MN",
          client_secret: "RHQ2UI1DMNO5HF1GTMO5YIHXZO12Z2PNUKVAF1ZRZURMZ2NI",
          v: "20180323"
        }
      };
    };
    break;
  case false:
    searchParams = {
      url: `http://localhost:${port}/searchResponse`,
      method: "GET"
    };
    photoParams = {
      url: `http://localhost:${port}/photoResponse`,
      method: "GET"
    };
    detailParams = id => {
      return {
        url: `http://localhost:${port}/detailsResponse`,
        method: "GET"
      };
    };
    break;

  default:
    break;
}
export const apiEndpoint2 = {
  search: searchParams,
  photo: photoParams,
  detail: function(id) {
    return detailParams(id);
  }
};

export const old = {
  //park in new york (fake API call)
  parks: {
    url: `http://localhost:${port}/searchResponse`,

    method: "GET"
  },
  // (real API call)(real API call)
  option: {
    url: "https://api.foursquare.com/v2/venues/search",
    method: "GET",
    qs: {
      client_id: "1ZCYUXHNJK2TQYDJ5XMHVTXM2F5YW3V1P3W15YDWUTOBO1MN",
      client_secret: "RHQ2UI1DMNO5HF1GTMO5YIHXZO12Z2PNUKVAF1ZRZURMZ2NI",
      ll: "40.7243,-74.0018",
      query: "lake",
      v: "20180323",
      limit: 15
    }
  },
  // los ankeles skate park (real API call)
  skatePark: {
    url: "https://api.foursquare.com/v2/venues/search",
    method: "GET",
    qs: {
      client_id: "1ZCYUXHNJK2TQYDJ5XMHVTXM2F5YW3V1P3W15YDWUTOBO1MN",
      client_secret: "RHQ2UI1DMNO5HF1GTMO5YIHXZO12Z2PNUKVAF1ZRZURMZ2NI",
      near: "los angeles",
      // query: "lake",
      categoryId: "4bf58dd8d48988d167941735",
      // radius: "50000",
      v: "20180323",
      limit: 10
    }
  },
  detail_dummy: function(id) {
    return {
      url: `http://localhost:${port}/detailsResponse`,
      method: "GET"
    };
  },
  details_real: function(id) {
    return {
      url: `https://api.foursquare.com/v2/venues/${id}`,
      method: "GET",
      qs: {
        client_id: "1ZCYUXHNJK2TQYDJ5XMHVTXM2F5YW3V1P3W15YDWUTOBO1MN",
        client_secret: "RHQ2UI1DMNO5HF1GTMO5YIHXZO12Z2PNUKVAF1ZRZURMZ2NI",
        v: "20180323"
      }
    };
  },
  photo_dummy: {
    url: `http://localhost:${port}/photoResponse`,
    method: "GET"
  }
};
