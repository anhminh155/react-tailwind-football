import axios, { AxiosError } from "axios";
import { API_URL } from "./constant";
import { toast } from "react-toastify";

const headers = {
  "X-Auth-Token": "475e4b54e1344de8ba772455f6919e95",
  // "X-Auth-Token": "0bf856d8142d4cc8a85d72751a1eb068",
  //options
  // "X-Unfold-Lineups": false,
  // "X-Unfold-Bookings": false,
  // "X-Unfold-Subs": false,
  // "X-Unfold-Goals": false,
};

export default class Http {
  static get(receiptUrl: string) {
    return axios
      .get(`/${receiptUrl}`, {
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
