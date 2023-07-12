import {$host, $authHost} from "./index";
import { AxiosResponse } from "axios";
import {IAuthRequest, IAuthResponse} from "../interfaces/user";

type TFAuthRequest = (params: IAuthRequest) => Promise<AxiosResponse<IAuthResponse>>;

const login: TFAuthRequest = async (params) => {
    const response = await $host.post('auth/login', params);
    localStorage.setItem('token', response.data.token);
    return response;
};

const logout = async () => {
    localStorage.removeItem('token');
};

const check = async () => {
    const response = await $authHost.get('auth/check-auth');
    localStorage.setItem('token', response.data.token);
    return response;
};

export {login, logout, check};