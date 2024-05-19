import { authKey } from "@/constants/authKey";
import { getNewAccessToken } from "@/services/auth.services";
import { TGenericErrorResponse, TResponseSuccess } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import setAuthToken from "@/utils/setAuthToken";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const responseObject: TResponseSuccess = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const config = error.config;
    if (error?.response?.data?.message === "jwt expired" && !config.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.accessToken as string;
      config.headers["Authorization"] = accessToken;
      setToLocalStorage(authKey, accessToken);
      setAuthToken(accessToken);
      return instance(config);
    } else {
      const responseObject: TGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!!!",
        errorMessage: error?.response?.data?.message,
      };
      // return Promise.reject(error);
      return responseObject;
    }
  }
);

export { instance };