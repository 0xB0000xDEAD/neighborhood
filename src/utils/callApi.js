import rp from "request-promise-native";

const callApi = option => {
  return rp(option, function(err, res, body) {
    if (err) {
      // console.error(err);
    } else {
      // console.log("everything's ok");
    }
  });
};
export default callApi;
