import {ApiError} from "../types";
import {Reducer} from "@reduxjs/toolkit";

interface ExpenseState {
    expenses: IExpense[]
    isLoading: boolean
    error: string | undefined
}


interface FetchExpenseLoading {
    type: 'FETCH_EXPENSE_LOADING'
}

interface FetchExpenseSuccess {
    type: 'FETCH_EXPENSE_SUCCESS'
    payload: IExpense[]
}

interface FetchExpenseError {
    type: 'FETCH_EXPENSE_ERROR'
    payload: ApiError | undefined
}

interface CreateExpenseLoading {
    type: 'CREATE_EXPENSE_LOADING'
}

interface CreateExpenseSuccess {
    type: 'CREATE_EXPENSE_SUCCESS'
    payload: IExpense
}

interface CreateExpenseError {
    type: 'CREATE_EXPENSE_ERROR'
    payload: ApiError | undefined
}

export type ExpenseAction =
    FetchExpenseLoading
    | FetchExpenseSuccess
    | FetchExpenseError
    | CreateExpenseError
    | CreateExpenseLoading
    | CreateExpenseSuccess;

const expense: Reducer<ExpenseState, ExpenseAction> = (state = {expenses: [], error: '', isLoading: false}, action) => {

    switch (action.type) {

        case "FETCH_EXPENSE_LOADING":
            return {...state, isLoading: true}
        case "FETCH_EXPENSE_SUCCESS":
            return {...state, expenses: action.payload, isLoading: false}
        case "FETCH_EXPENSE_ERROR":
            return {...state, error: action.payload?.message, isLoading: false}

        case "CREATE_EXPENSE_LOADING":
            return {...state, isLoading: true}

        case "CREATE_EXPENSE_SUCCESS":
            return {...state, expenses: [...state.expenses, action.payload], isLoading: false}
        case "CREATE_EXPENSE_ERROR":
            return {...state, error: action.payload?.message, isLoading: false}

        default:
            return state
    }
}

export default expense