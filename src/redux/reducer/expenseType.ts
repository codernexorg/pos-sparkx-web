import {Reducer} from "@reduxjs/toolkit";
import {ApiError} from "../types";

interface IExpenseTypeState {
    expenseTypes: IExpenseType[];
    isLoading: boolean
    error: string | undefined
}

interface FetchExpenseTypeLoading {
    type: 'FETCH_EXPENSE_TYPE_LOADING';
}

interface FetchExpenseTypeSuccess {
    type: 'FETCH_EXPENSE_TYPE_SUCCESS',
    payload: IExpenseType[]
}

interface FetchExpenseTypeErr {
    type: 'FETCH_EXPENSE_TYPE_ERR',
    payload: ApiError | undefined
}

interface CreateExpenseTypeLoading {
    type: 'CREATE_EXPENSE_TYPE_LOADING'
}

interface CreateExpenseTypeSuccess {
    type: 'CREATE_EXPENSE_TYPE_SUCCESS',
    payload: IExpenseType
}

interface CreateExpenseTypeErr {
    type: 'CREATE_EXPENSE_TYPE_ERR',
    payload: ApiError | undefined
}

export type IExpenseTypeAction =
    FetchExpenseTypeLoading
    | FetchExpenseTypeSuccess
    | FetchExpenseTypeErr
    | CreateExpenseTypeLoading
    | CreateExpenseTypeSuccess
    | CreateExpenseTypeErr
const expenseType: Reducer<IExpenseTypeState, IExpenseTypeAction> = (state = {
    expenseTypes: [],
    isLoading: false,
    error: ''
}, action) => {
    switch (action.type) {
        case 'FETCH_EXPENSE_TYPE_LOADING':
            return {...state, isLoading: true}
        case 'FETCH_EXPENSE_TYPE_SUCCESS':
            return {...state, isLoading: false, expenseTypes: action.payload}
        case 'FETCH_EXPENSE_TYPE_ERR':
            return {...state, isLoading: false, error: action.payload?.message}
        case "CREATE_EXPENSE_TYPE_LOADING":
            return {...state, isLoading: true}
        case "CREATE_EXPENSE_TYPE_SUCCESS":
            return {...state, isLoading: false, expenseTypes: [...state.expenseTypes, action.payload]}
        case "CREATE_EXPENSE_TYPE_ERR":
            return {...state, isLoading: false, error: action.payload?.message}
        default:
            return state
    }
}

export default expenseType