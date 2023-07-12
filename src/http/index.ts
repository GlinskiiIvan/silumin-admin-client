import axios, {AxiosRequestConfig, InternalAxiosRequestConfig} from "axios";

const $host = axios.create({
    // withCredentials: true
    baseURL: process.env.REACT_APP_API_URI
});

const $authHost = axios.create({
    // withCredentials: true
    baseURL: process.env.REACT_APP_API_URI
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    console.log(`Bearer ${localStorage.getItem('token')}`)
    return config
};

$authHost.interceptors.request.use(authInterceptor);
/*$authHost.interceptors.response.use((config) => config, async (error) => {
    const originalRequest = error.config;
    if(error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${REACT_APP_API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return $authHost.request(originalRequest);
        } catch (e) {
            console.log('Пользователь не авторизован')
        }
    }
    return Promise.reject(error);
})*/

export {$host, $authHost};

