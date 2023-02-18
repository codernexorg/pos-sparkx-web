import {Dispatch} from "@reduxjs/toolkit";
import {IExpenseTypeAction} from "../reducer/expenseType";
import api from "../../api";
import {AxiosError} from "axios";
import {ApiError} from "../types";
import {successToast} from "../../app/utils/toaster";

export const fetchExpenseTypes = () => async (dispatch: Dispatch<IExpenseTypeAction>) => {
    dispatch({type: 'FETCH_EXPENSE_TYPE_LOADING'})
    api.get('/expense/expense-types').then(res => dispatch({type: 'FETCH_EXPENSE_TYPE_SUCCESS', payload: res.data}))
        .catch((err: AxiosError<ApiError>) => {
            dispatch({type: 'FETCH_EXPENSE_TYPE_ERR', payload: err.response?.data})
        })
}

export const createExpenseTypes = (data: any) => async (dispatch: Dispatch<IExpenseTypeAction>) => {
    dispatch({type: 'CREATE_EXPENSE_TYPE_LOADING'})
    api.post('/expense/expense-types', data).then(res => {
        successToast('Expense Type Created Successfully!')
        dispatch({type: 'CREATE_EXPENSE_TYPE_SUCCESS', payload: res.data})
    })
        .catch((err: AxiosError<ApiError>) => {
            dispatch({type: 'CREATE_EXPENSE_TYPE_ERR', payload: err.response?.data})
        })
}