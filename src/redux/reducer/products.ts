import {Reducer} from '@reduxjs/toolkit';
import {
    ADD_MULTIPLE_PRODUCT_ERR,
    ADD_MULTIPLE_PRODUCT_LOADING,
    ADD_MULTIPLE_PRODUCT_SUCCESS,
    ADD_SINGLE_PRODUCT_ERR,
    ADD_SINGLE_PRODUCT_LOADING,
    ADD_SINGLE_PRODUCT_SUCCESS,
    FETCH_PRODUCT_SUCCESS,
    TRANSFER_PRODUCT_ERR,
    TRANSFER_PRODUCT_LOADING,
    TRANSFER_PRODUCT_SUCCESS
} from '../constant';
import {IProductSate, ProductActionType} from '../types';

const products: Reducer<IProductSate, ProductActionType> = (
    state = {isLoading: false, products: [], hasMore: false},
    action
) => {
    switch (action.type) {
        case "FETCH_PRODUCT_LOADING": {
            return {...state, isLoading: true}
        }

        case "FETCH_PRODUCT_ERR": {
            return {...state, isLoading: false}
        }

        case ADD_SINGLE_PRODUCT_LOADING:
            return {...state, isLoading: true};
        case ADD_SINGLE_PRODUCT_SUCCESS: {
            return {
                ...state,
                products: [...state.products, ...action.payload],
                isLoading: false
            };
        }
        case ADD_SINGLE_PRODUCT_ERR: {
            return {...state, isLoading: false};
        }

        case ADD_MULTIPLE_PRODUCT_LOADING: {
            return {...state, isLoading: true};
        }
        case ADD_MULTIPLE_PRODUCT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                products: [...state.products, ...action.payload]
            };
        }

        case ADD_MULTIPLE_PRODUCT_ERR: {
            return {...state, isLoading: false};
        }
        case FETCH_PRODUCT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                products: action.payload.product,
                hasMore: action.payload.hasMore
            };
        }

        case TRANSFER_PRODUCT_LOADING: {
            return {...state, isLoading: true}
        }
        case TRANSFER_PRODUCT_SUCCESS: {
            return {...state, isLoading: false, products: [...state.products, ...action.payload]}
        }

        case TRANSFER_PRODUCT_ERR: {
            return {...state, isLoading: false}
        }
        
        default:
            return state;
    }
};

export default products;
