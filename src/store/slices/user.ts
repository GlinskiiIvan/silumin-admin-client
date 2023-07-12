import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {IAuthRequest, IAuthResponse, IUser} from "../../interfaces/user";
import {AxiosError, AxiosResponse} from "axios";

import jwt_decode from "jwt-decode";

import * as userAPI from '../../http/userAPI';

interface IState {
    userData: IUser | null,
    status: string
    error: string | null;
}

const initialState: IState = {
    userData: null,
    status: 'LOADING',
    error: null
};

// export const loginThunk = createAsyncThunk<AxiosResponse<IAuthResponse>, IAuthRequest>('/user/loginThunk', async (params, {rejectWithValue}) => {
export const loginThunk = createAsyncThunk<IAuthResponse, IAuthRequest, { rejectValue: AxiosError }>('/user/loginThunk', async (params, {rejectWithValue}) => {
    // const response = await userAPI.login(params);
    // return response.data;
    try {
        const response = await userAPI.login(params);
        return response.data;
    } catch (e) {
        return rejectWithValue(e as AxiosError);
    }
});

export const logoutThunk = createAsyncThunk('/user/logoutThunk', async () => {
    await userAPI.logout();
});

export const checkThunk = createAsyncThunk<any, any>('/user/checkThunk', async () => {
    return await userAPI.check();
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //Login
        builder.addCase(loginThunk.pending, (state) => {
            state.userData = null;
            state.status = 'LOADING';
            state.error = '';
        });
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            const data: IUser = jwt_decode(action.payload.token);
            state.userData = data ? data : null;
            state.status = 'SUCCESS';
            state.error = '';
        });
        builder.addCase(loginThunk.rejected, (state, action) => {
            state.userData = null;
            state.status = 'ERROR';
            if (action.payload) {
                state.error = action.payload.response && (action.payload.response.data as {statusCode: number, message: string})?.message ||  'Unknown error.';
            } else {
                state.error = 'Unknown error.';
            }
        });

        //Logout
        builder.addCase(logoutThunk.pending, (state) => {
            state.userData = null;
            state.status = 'LOADING';
            state.error = '';
        });
        builder.addCase(logoutThunk.fulfilled, (state) => {
            state.userData = null;
            state.status = 'SUCCESS';
            state.error = '';
        });
        builder.addCase(logoutThunk.rejected, (state) => {
            state.userData = null;
            state.status = 'ERROR';
        });

        //check auth
        builder.addCase(checkThunk.pending, (state) => {
            state.userData = null;
            state.status = 'LOADING';
            state.error = '';
        });
        builder.addCase(checkThunk.fulfilled, (state, action) => {
            const data: IUser = jwt_decode(action.payload.data.token);
            state.userData = data ? data : null;
            state.status = 'SUCCESS';
            state.error = '';
        });
        builder.addCase(checkThunk.rejected, (state) => {
            state.userData = null;
            state.status = 'ERROR';
        });
    }
});

export const selectUser = (state: RootState) => state.user;
export const selectUserData = (state: RootState) => state.user.userData;
export const selectIsAuth = (state: RootState) => state.user.userData !== null;

export const userReducer = userSlice.reducer;