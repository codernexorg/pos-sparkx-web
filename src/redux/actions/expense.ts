import {Dispatch} from "@reduxjs/toolkit";
import {ExpenseAction} from "../reducer/expense";
import api from "../../api";
import {AxiosError} from "axios";
import {ApiError} from "../types";
import {rejectedToast, successToast} from "../../app/utils/toaster";

export const fetchExpense = () => async (dispatch: Dispatch<ExpenseAction>) => {
    dispatch({type: "FETCH_EXPENSE_LOADING"})
    api.get('/expense').then((res) => dispatch({
        type: "FETCH_EXPENSE_SUCCESS",
        payload: res.data
    })).catch((err: AxiosError<ApiError>) => dispatch({type: "FETCH_EXPENSE_ERROR", payload: err.response?.data}))
}

export const createExpense = (expense: any) => async (dispatch: Dispatch<ExpenseAction>) => {
    dispatch({type: "CREATE_EXPENSE_LOADING"})
    api.post('/expense', expense).then(res => {
        successToast('Expense created successfully')

        dispatch({
            type: "CREATE_EXPENSE_SUCCESS",
            payload: res.data
        })
    }).catch((err: AxiosError<ApiError>) => {
        dispatch({type: "CREATE_EXPENSE_ERROR", payload: err.response?.data})
        rejectedToast(err)
    })
}