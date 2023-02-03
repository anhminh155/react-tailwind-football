import axios, { AxiosError } from "axios";
import { API_URL } from "./constant";
import { toast } from "react-toastify";

const headers = {
  "X-Auth-Token": process.env.REACT_APP_X_AUTH_TOKEN,
  'x-requested-with': 'XMLHttpRequest'
};
export default class Http {
  static get(receiptUrl: string) {
    return axios
      .get(`https://cors-anywhere.herokuapp.com/${API_URL}${receiptUrl}`, {
        headers: headers,
      })
      .catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          // Access to config, request, and response
          console.log(err);
          toast(`${err.message}, ${err.response?.data.message}`, {
            position: toast.POSITION.TOP_RIGHT,
            className: "foo-bar",
          });
        } else {
          // Just a stock error
          console.log(err);
          toast(`${err.message}`, {
            position: toast.POSITION.TOP_RIGHT,
            className: "foo-bar",
          });
        }
      });
  }
}
