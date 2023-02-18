import {Reducer} from "@reduxjs/toolkit";
import {ApiError} from "../types";

interface TaxState {
    taxes: ITax[];
    isLoading: boolean
    error: string | undefined
}

interface FetchTaxLoading {
    type: "FETCH_TAX_LOADING"

}

interface FetchTaxSuccess {
    type: "FETCH_TAX_SUCCESS",
    payload: ITax[]
}

interface FetchTaxFailure {
    type: "FETCH_TAX_FAILURE",
    payload: ApiError | undefined
}

interface AddTaxLoading {
    type: "ADD_TAX_LOADING"
}

interface AddTaxSuccess {
    type: "ADD_TAX_SUCCESS",
    payload: ITax
}

interface AddTaxFailure {
    type: "ADD_TAX_FAILURE",
    payload: ApiError | undefined
}

export type TaxActionTypes =
    FetchTaxLoading
    | FetchTaxSuccess
    | FetchTaxFailure
    | AddTaxFailure
    | AddTaxSuccess
    | AddTaxLoading
const tax: Reducer<TaxState, TaxActionTypes> = (state = {taxes: [], error: undefined, isLoading: false}, action) => {
    switch (action.type) {
        case "FETCH_TAX_LOADING":
            return {...state, isLoading: true}

        case "FETCH_TAX_SUCCESS": {
            return {...state, taxes: action.payload, isLoading: false}
        }
        case "FETCH_TAX_FAILURE": {
            return {...state, isLoading: false, error: action.payload?.message}
        }
        case "ADD_TAX_LOADING": {
            return {...state, isLoading: true}
        }
        case "ADD_TAX_SUCCESS": {
            return {...state, taxes: [...state.taxes, action.payload], isLoading: false}
        }
        case "ADD_TAX_FAILURE": {
            return {...state, isLoading: false, error: action.payload?.message}
        }

        default:
            return state
    }
}

export default tax