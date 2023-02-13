/* eslint-disable */
import axios, { AxiosError } from "axios";
import { API_URL } from "./constant";
import { toast } from "react-toastify";

const headers = {
  "X-Auth-Token": process.env.REACT_APP_X_AUTH_TOKEN,
  "x-requested-with": "XMLHttpRequest",
};

const handleError = (err: Error | AxiosError) => {
  console.log(err);
  let errorMessage = err.message;
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 429) {
      errorMessage = "Too Many Requests, Please wait a moment and try again.";
    } else if (err.response?.status === 403) {
      // window.open("https://cors-anywhere.herokuapp.com/corsdemo", '_blank');
      location.reload();
      errorMessage = "Forbidden";
    } else {
      errorMessage = `${err.message},${err.response?.data.message}`;
    }
  }
  toast(errorMessage, {
    position: toast.POSITION.TOP_RIGHT,
    className: "foo-bar",
  });
};

export default class Http {
  static get(receiptUrl: string) {
    return axios
      .get(`https://cors-anywhere.herokuapp.com/${API_URL}${receiptUrl}`, {
        headers,
      })
      .catch(handleError);
  }
}
