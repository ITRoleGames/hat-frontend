import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Store } from "react-notifications-component";
import { getAccessToken } from "service/local-storage";
import { isUserLoggedIn } from "service/local-storage";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (isUserLoggedIn()) {
        const accessToken = getAccessToken();
        config.headers!!["Authorization"] = `Bearer ${ accessToken }`;
        return config;
    }
    // console.info(`[request] [${ JSON.stringify(config) }]`);
    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    // console.error(`[request error] [${ JSON.stringify(error) }]`);
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    // console.info(`[response] [${ JSON.stringify(response) }]`);
    return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    // console.error(`[response error] [${ JSON.stringify(error) }]`);
    if (!error.response) {
        return Promise.reject(error);
    }
    const response: AxiosResponse = error.response;
    let errorText = "Unknown error";

    if (response.status === 401) {
        showError("Authorization error");
    } else if ([ 400, 404, 405, 409, 500 ].indexOf(response.status) !== -1) {

        if (error.message) {
            errorText = error.message;
        }

        showError(errorText);
    } else if (response.status === 504) {
        showError("Server is not available");
    }

    return Promise.reject(error);
};

const showError = (message: string): void =>{
    Store.addNotification({
        title: "Error",
        message: message,
        type: "danger",
        insert: "top",
        container: "top-full",
        animationIn: [ "animate__animated", "animate__fadeIn" ],
        animationOut: [ "animate__animated", "animate__fadeOut" ],
        dismiss: {
            duration: 5000,
            onScreen: true,
        },
    });
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}
