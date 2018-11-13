import { config } from "../config";
let searchParams, photoParams, detailParams;
switch (config.callForReal) {
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
    photoParams = id => {
      return {
        url: `https://api.foursquare.com/v2/venues/${id}/photos`,
        method: "GET",
        qs: {
          client_id: "1ZCYUXHNJK2TQYDJ5XMHVTXM2F5YW3V1P3W15YDWUTOBO1MN",
          client_secret: "RHQ2UI1DMNO5HF1GTMO5YIHXZO12Z2PNUKVAF1ZRZURMZ2NI",
          v: "20180323"
        }
      };
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
      url: `http://localhost:${config.port}/searchResponse`,
      method: "GET"
    };
    photoParams = id => {
      return {
        url: `http://localhost:${config.port}/photoResponse`,
        method: "GET"
      };
    };
    detailParams = id => {
      return {
        url: `http://localhost:${config.port}/detailsResponse`,
        method: "GET"
      };
    };
    break;

  default:
    break;
}
const apiEndpoint = {
  search: searchParams,
  photo: photoParams,
  detail: function(id) {
    return detailParams(id);
  }
};
export default apiEndpoint;
