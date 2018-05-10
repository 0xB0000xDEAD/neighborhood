let photo = {
  meta: {
    code: 200,
    requestId: "5997070d6a60717704801060"
  },
  response: {
    photos: {
      count: 1,
      items: [
        {
          id: "51e4151c498e60b5d17bc721",
          createdAt: 1373902108,
          source: {
            name: "Instagram",
            url: "http://instagram.com"
          },
          prefix: "https://igx.4sqi.net/img/general/",
          suffix: "/1022386_wEd7VXnWzp5lajvRLtAPunoiufDSIq8PMEtEuIH2Tzg.jpg",
          width: 612,
          height: 612,
          user: {
            id: "123456",
            firstName: "John",
            lastName: "Doe",
            gender: "male",
            photo: {
              prefix: "https://igx.4sqi.net/img/user/",
              suffix: "/YXNQ5O4TLYSNHMKY.jpg"
            }
          },
          checkin: {
            id: "51e4151b498ea66547febfaf",
            createdAt: 1373902107,
            type: "checkin",
            timeZoneOffset: -240
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
  photoResponse: photo
};

module.exports = data;
