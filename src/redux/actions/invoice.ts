import {AppDispatch} from "../store";
import {
    FETCH_INVOICE_ERR,
    FETCH_INVOICE_LOADING,
    FETCH_INVOICE_SUCCESS,
    REMOVE_INVOICE_ERR,
    REMOVE_INVOICE_LOADING,
    REMOVE_INVOICE_SUCCESS
} from "../constant";
import api from "../../api";
import {rejectedToast, successToast} from "../../app/utils/toaster";
import {AxiosError} from "axios";
import {ApiError} from "../types";

export const getInvoice = () => async (dispatch: AppDispatch) => {
    dispatch({type: FETCH_INVOICE_LOADING})
    api.get('/invoice').then(res => dispatch({
        type: FETCH_INVOICE_SUCCESS,
        payload: res.data
    })).catch((err: AxiosError<ApiError>) => {
        dispatch({type: FETCH_INVOICE_ERR, payload: err.response?.data.message})
        rejectedToast(err)
    })
}


export const deleteInvoice = (id: number) => async (dispatch: AppDispatch) => {
    dispatch({type: REMOVE_INVOICE_LOADING})
    api.delete(`/invoice/${id}`).then(res => {
        successToast('Invoice deleted successfully')
        dispatch({type: REMOVE_INVOICE_SUCCESS, payload: res.data})
    }).catch((err: AxiosError<ApiError>) => {
        dispatch({type: REMOVE_INVOICE_ERR, payload: err.response?.data})
        rejectedToast(err)
    })
}
