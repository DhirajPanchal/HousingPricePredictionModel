// Container App
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { ILogin, IRegistration, IUser } from "../model/auth.model";

const GATEWAY = "http://localhost:8010";

const GATEWAY_SERVICE_ROUTE = "";

const API_VERSION = "/api/v1";

var containerPublicApi: AxiosInstance = axios.create({
  baseURL: `${GATEWAY}${GATEWAY_SERVICE_ROUTE}${API_VERSION}`,
  headers: { "Content-Type": "application/json" },
});

var containerProtectedApi: AxiosInstance = axios.create({
  baseURL: `${GATEWAY}${GATEWAY_SERVICE_ROUTE}${API_VERSION}`,
  headers: { "Content-Type": "application/json" },
});

containerProtectedApi.interceptors.request.use(
  (config) => {
    console.log("[OUTBOUND] __API (CON) " + config.method + " : " + config.url);
    const token = sessionStorage.getItem("TOKEN");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    // responseAnalysis(response);
    return response;
  },
  (error: AxiosError) => {
    const { status, statusText } = error.response!;
    console.error("[INBOUND] API (C) ERROR :: " + status + " :: " + statusText);
    console.error(error.response);
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(instance: AxiosInstance, url: string) =>
    instance.get<T>(url).then(responseBody),
  put: <T>(
    instance: AxiosInstance,
    url: string,
    body: any,
    objective?: string
  ) =>
    instance
      .put<T>(url, body, {
        headers: {
          OBJECTIVE_TAG: objective,
        },
      })
      .then(responseBody),
  delete: <T>(instance: AxiosInstance, url: string, objective?: string) =>
    instance
      .delete<T>(url, {
        headers: {
          OBJECTIVE_TAG: objective,
        },
      })
      .then(responseBody),
  post: <T>(
    instance: AxiosInstance,
    url: string,
    body: any,
    objective?: string
  ) =>
    instance
      .post<T>(url, body, {
        headers: {
          OBJECTIVE_TAG: objective,
        },
      })
      .then(responseBody),
};

//   *  *  *  *  *  *   A U T H   *  *  *  *  *  *

const userLogin = (payload: ILogin) => {
  return request.post<{ token: string }>(
    containerPublicApi,
    `/auth/login`,
    payload
  );
};

const userRegistration = (payload: IRegistration) => {
  return request.post<IRegistration>(
    containerPublicApi,
    `/auth/registration`,
    payload,
    `${payload.firstName} congrats, you can now login.`
  );
};

const userProfile = () => {
  return request.get<IUser>(containerProtectedApi, `/auth/profile`);
};

const ExternalInterface = {
  userLogin,
  userRegistration,
  userProfile,
};

export default ExternalInterface;
