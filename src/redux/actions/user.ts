import {AppDispatch} from "../store";
import api from "../../api";
import {
    CREATE_USER_ERR,
    CREATE_USER_LOADING,
    CREATE_USER_SUCCESS,
    FETCH_USER_ERR,
    FETCH_USER_LOADING,
    FETCH_USER_SUCCESS
} from "../constant";
import {AxiosError} from "axios";
import {ApiError} from "../types";
import {rejectedToast, successToast} from "../../app/utils/toaster";

export const createUser = (data: any) => async (dispatch: AppDispatch) => {
    dispatch({type: CREATE_USER_LOADING})
    api.post('/user?secretpass=sparkxpos', data).then((res) => {
        successToast("User created successfully")
        dispatch({type: CREATE_USER_SUCCESS, payload: res.data});
    }).catch((err: AxiosError<ApiError>) => {
        rejectedToast(err)
        dispatch({type: CREATE_USER_ERR, payload: err.response?.data.message});
    })
}

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    dispatch({type: FETCH_USER_LOADING})
    api.get('/user').then(res => {
        dispatch({type: FETCH_USER_SUCCESS, payload: res.data})
    }).catch((err: AxiosError<ApiError>) => {
        rejectedToast(err)
        dispatch({type: FETCH_USER_ERR, payload: err.response?.data.message})
    })
}