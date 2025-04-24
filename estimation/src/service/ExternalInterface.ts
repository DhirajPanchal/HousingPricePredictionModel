// STORE App
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import {
  DEFAULT_LIST_PAYLOAD,
  ListItem,
  ListPayload,
  ListResponse,
} from "../model/list.model";
import { Drug } from "../model/Drug";

const GATEWAY = "http://localhost:8005/";

const STORE_SERVICE_ROUTE = "active-pharmacy/store";

const API_VERSION = "api/v1";

var hpp_estimation_api: AxiosInstance = axios.create({
  baseURL: GATEWAY,
  headers: { "Content-Type": "application/json" },
});

var storeProtectedApi: AxiosInstance = axios.create({
  baseURL: `${GATEWAY}/${STORE_SERVICE_ROUTE}/${API_VERSION}/`,
  headers: { "Content-Type": "application/json" },
});

storeProtectedApi.interceptors.request.use(
  (config) => {
    console.log("[OUTBOUND] API (S) " + config.method + " : " + config.url);
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
    responseAnalysis(response);
    // // console.log("[INBOUND] __API (INV) RESPONSE", response.data);
    // // console.log(response);
    //toast.success("Success");
    return response;
  },
  (error: AxiosError) => {
    const { status, statusText } = error.response!;
    console.error(
      "[INBOUND] __API (INV) ERROR :: " + status + " :: " + statusText
    );
    console.error(error.response);
    // toast.error(`ERROR ${status} : ${statusText}`);
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

function responseAnalysis(response: AxiosResponse<any, any>) {
  // console.log("**************************************************** START");
  // console.log(response);
  // console.log("METHOD : ", response?.config?.method);
  // console.log("URL   : ", response?.config?.url);
  const objective: string = response?.config?.headers["OBJECTIVE_TAG"];
  // // console.log("objective   : ", objective);
  if (objective !== undefined && objective.trim().length > 0) {
    if (objective !== "X") {
      //toast.success(objective);
    }

    return;
  }

  if (response?.config?.method === "put") {
    //toast.success("Updated successful");
  } else if (response?.config?.method === "post") {
    if (response?.config?.url?.includes("/list")) {
      // toast("Data grid refreshed");
    } else {
      //toast.success("Created successful");
    }
  }

  // // console.log("****************************************************");
}

const request = {
  get: <T>(instance: AxiosInstance, url: string, objective?: string) =>
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

//   *  *  *  *  *  *   D R U G   *  *  *  *  *  *

const loadDrugList = (payload: ListPayload = DEFAULT_LIST_PAYLOAD) => {
  return request.post<ListResponse<Drug>>(
    storeProtectedApi,
    `list/drug?index=${payload.ui_only.index}&size=${payload.ui_only.size}`,
    payload
  );
};

const loadProvider = (type: string, search: string = "") => {
  return request.get<ListItem>(
    storeProtectedApi,
    `list/provider?type=${type}&search=${search}`
  );
};

const performPrediction = (payload: IHouseInput) => {
  return request.post<IHouseInput>(
    hpp_estimation_api,
    `predict-property-price`,
    payload,
    ` congrats, price`
  );
};

const ExternalInterface = {
  loadDrugList,
  loadProvider,
  performPrediction,
};

export default ExternalInterface;
