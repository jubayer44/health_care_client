import { authKey } from "@/constants/authKey";
import { TGenericErrorResponse, TResponseSuccess } from "@/types";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const assessToken = getFromLocalStorage(authKey);
    if (assessToken) {
        config.headers.Authorization = assessToken;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(
    //@ts-ignore
    function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const responseObj: TResponseSuccess = {
        data: response?.data.data,
        meta: response?.data.meta
    }
    return responseObj;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const responseObj: TGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong",
        errorMessage: error?.response?.data?.errorMessage || "Something went wrong", 
    }
    return responseObj;
  });

export {instance};