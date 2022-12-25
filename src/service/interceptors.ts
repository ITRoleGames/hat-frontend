import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getAccessToken } from "service/local-storage";
import { isUserLoggedIn } from "service/local-storage";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (isUserLoggedIn()) {
        const accessToken = getAccessToken();
        config.headers!!["Authorization"] = `Bearer ${ accessToken }`;
        return config;
    }
    console.info(`[request] [${ JSON.stringify(config) }]`);
    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${ JSON.stringify(error) }]`);
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    console.info(`[response] [${ JSON.stringify(response) }]`);
    return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[response error] [${ JSON.stringify(error) }]`);

    if (error.response!!.status === 401) {
        alert("Refresh token not impl");
        console.log("TODO: refresh token");
        //todo: refresh as in https://gist.github.com/mkjiau/650013a99c341c9f23ca00ccb213db1c
    }

    if (error.response!!.status === 403) {
        //todo: redirect to some page
    }

    return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}
