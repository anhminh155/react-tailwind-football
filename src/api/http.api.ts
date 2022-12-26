import axios, { AxiosError } from "axios";
import { API_URL } from "./constant";
import { toast, ToastContainer } from "react-toastify";

const headers = {
  "X-Auth-Token": "0c7100d23de447f9be17b2ec5d06c289",
  //options
  // "X-Unfold-Lineups": false,
  // "X-Unfold-Bookings": false,
  // "X-Unfold-Subs": false,
  // "X-Unfold-Goals": false,
};

export default class Http {
  static get(receiptUrl: string) {
    return axios
      .get(`${API_URL}${receiptUrl}`, {
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
