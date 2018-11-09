let response = {
  meta: {
    code: 200,
    requestId: "5be40d6af594df6737a67878"
  },
  response: {
    photos: {
      count: 1,
      items: [
        {
          id: "506ca65ae4b03e31eaf04bb0",
          createdAt: 1349297754,
          source: {
            name: "Instagram",
            url: "http://instagram.com"
          },
          prefix: "https://fastly.4sqi.net/img/general/",
          suffix: "/7722771_DobGmNjhAmIPkCDcgcH3KXy9R6I133xBuk7OVt6XBqE.jpg",
          width: 612,
          height: 612,
          user: {
            id: "7722771",
            firstName: "Judah",
            lastName: "C",
            gender: "male",
            photo: {
              prefix: "https://fastly.4sqi.net/img/user/",
              suffix: "/7722771-SKFXUB1POYNBEXHN.jpg"
            }
          },
          checkin: {
            id: "506ca65ae4b09eec6b6d372e",
            createdAt: 1349297754,
            type: "checkin",
            timeZoneOffset: -420
          },
          visibility: "public"
        }
      ],
      dupesRemoved: 0
    }
  }
};

// export default photo;  // not working, o ES6 support in json-server

let data = {
  photoResponse: response
};

module.exports = data;
