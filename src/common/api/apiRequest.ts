import axios from "axios";
import API_END_POINT from "../../apiConfig";

class ApiRequest {
  static async call(
    method: any,
    reqUrl: any,
    params: any,
    body: any,
    additionalHeaders: any,
    blob: any,
    config: any = {}
  ): Promise<any | any> {
    const requestBody = body;
    const token = localStorage.getItem("userToken");
    const headers = {
      ...additionalHeaders,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token ? "Bearer " + token : "",
    };
    console.log(API_END_POINT.API_END_POINT);
    const url = `${API_END_POINT.API_END_POINT}${reqUrl}`;
    console.log(url);
    return axios({
      data: requestBody,
      headers,
      method,
      ...config,
      params,
      responseType: blob,
      url,
    })
      .then((response) => ApiRequest.handlePromiseResolve(response))
      .catch((error) => ApiRequest.handlePromiseReject(error));
  }
  static handlePromiseResolve = (response: any) => {
    if (response) {
      return response.data;
    }
    return false;
  };
  static handlePromiseReject = (error: any) => {
    const response = error && error.response;
    if (response && response.status === 401) {
      localStorage.clear();
    }
    if (!error.status) {
      return {
        error: "Network error",
      };
    }
    return { error };
  };
  static get = (
    url: any,
    params = null,
    header = null,
    responseType = null
  ): Promise<any | any> => {
    return ApiRequest.call("GET", url, params, null, header, responseType);
  };
  static post = (
    url: any,
    params: any,
    body: any,
    header: any,
    config = {}
  ): Promise<any | any> => {
    return ApiRequest.call("POST", url, params, body, header, null, config);
  };
  static put = (
    url: any,
    params: any,
    body: any,
    header: any
  ): Promise<any | any> => {
    return ApiRequest.call("PUT", url, params, body, header, null);
  };
  static delete = (url: any, params: any, header: any): Promise<any | any> => {
    return ApiRequest.call("DELETE", url, params, null, header, null);
  };
}

export default ApiRequest;
