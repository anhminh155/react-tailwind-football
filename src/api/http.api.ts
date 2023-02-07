 /* eslint-disable */
import axios, { AxiosError } from "axios";
import { API_URL } from "./constant";
import { toast } from "react-toastify";

const headers = {
  "X-Auth-Token": process.env.REACT_APP_X_AUTH_TOKEN,
  "x-requested-with": "XMLHttpRequest",
};

const handleError = (err:Error | AxiosError) => {
  console.log(err);
  let errorMessage = err.message;
  if (axios.isAxiosError(err)) {
    errorMessage = 
      err.response?.status === 429
        ? "Too Many Requests, Please wait a moment and try again."
        : `${err.message},${err.response?.data.message}`;
  }
  toast(errorMessage, {
    position: toast.POSITION.TOP_RIGHT,
    className: "foo-bar",
  });
};

export default class Http {
  static get(receiptUrl: string) {
    (function () {
      var cors_api_host = "cors-anywhere.herokuapp.com";
      var cors_api_url = "https://" + cors_api_host + "/";
      var slice = [].slice;
      var origin = window.location.protocol + "//" + window.location.host;      
      var open = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function () {
        var args:any = [].slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (
          targetOrigin &&
          targetOrigin[0].toLowerCase() !== origin &&
          targetOrigin[1] !== cors_api_host
        ) {
          args[1] = cors_api_url + args[1];
        }                        
        return open.apply(this, args);
      };
    })();
    return axios
      .get(`https://cors-anywhere.herokuapp.com/${API_URL}${receiptUrl}`, {
        headers,
      })
      .catch(handleError);
  }
}
