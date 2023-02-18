import {AxiosError} from 'axios';
import api from '../../api';
import {rejectedToast, successToast} from '../../app/utils/toaster';
import {
    ADD_MULTIPLE_PRODUCT_ERR,
    ADD_MULTIPLE_PRODUCT_LOADING,
    ADD_MULTIPLE_PRODUCT_SUCCESS,
    ADD_SINGLE_PRODUCT_ERR,
    ADD_SINGLE_PRODUCT_LOADING,
    ADD_SINGLE_PRODUCT_SUCCESS,
    FETCH_PRODUCT_LOADING,
    FETCH_PRODUCT_SUCCESS,
    TRANSFER_PRODUCT_ERR,
    TRANSFER_PRODUCT_LOADING,
    TRANSFER_PRODUCT_SUCCESS
} from '../constant';
import {AppDispatch} from '../store';
import {ApiError, CreateFN} from '../types';

export const fetchProduct = () => async (dispatch: AppDispatch) => {
    dispatch({type: FETCH_PRODUCT_LOADING});
    const res = (await api.get(`/product`)) as {
        data: { product: Product[]; hasMore: boolean };
    };

    dispatch({type: FETCH_PRODUCT_SUCCESS, payload: res.data});
};

export const createSingleProduct: CreateFN<Product> =
    (data, reset) => async (dispatch: AppDispatch) => {
        dispatch({type: ADD_SINGLE_PRODUCT_LOADING});
        api
            .post('/product/single', data)
            .then((res) => {
                successToast('Single Proudct Added Successfully');
                dispatch({type: ADD_SINGLE_PRODUCT_SUCCESS, payload: res.data as Product[]});
                reset();
            })
            .catch((err: AxiosError<ApiError>) => {
                dispatch({type: ADD_SINGLE_PRODUCT_ERR})
                rejectedToast(err);
            });
    };

type ProductData = {
    invoiceNumber: string;
    invoiceDate: string;
    invoiceTotalPrice: number;
    lotNumber: number;
    supplierName: string;
    whName: string;
    showroomName: string;
    transportationCost: number;
    unitCost: number;
    productGroup: string;
    sellPrice: number;
    itemCode: string;
};
export const createMultipleProduct =
    (data?: MultipleProductInput) =>
        async (dispatch: AppDispatch) => {
            dispatch({type: ADD_MULTIPLE_PRODUCT_LOADING});
            if (data) {
                const product: ProductData[] = [];

                data.items.forEach(item => {
                    product.push({...item, ...data});
                });

                const confirm = prompt('Are you sure you want to Add These Products? (yes/no)', 'yes')

                if (confirm === 'yes') {
                    api
                        .post('/product/multiple', product)
                        .then(res => {
                            dispatch({type: ADD_MULTIPLE_PRODUCT_SUCCESS, payload: res.data});
                            successToast('Multiple Product Successfully created');
                        })
                        .catch((err: AxiosError<ApiError>) => {
                            dispatch({type: ADD_MULTIPLE_PRODUCT_ERR});
                            rejectedToast(err);
                        });
                } else {
                    alert("You decided to not add these products");
                }
            }
        };


export const transferProduct = (data: any) => async (dispatch: AppDispatch) => {
    dispatch({type: TRANSFER_PRODUCT_LOADING})
    api.post('/transfer', data).then(res => {
        dispatch({type: TRANSFER_PRODUCT_SUCCESS, payload: res.data})
        successToast("Product Transferred Successfully ")
    }).catch((err: AxiosError<ApiError>) => {
        dispatch({type: TRANSFER_PRODUCT_ERR})
        rejectedToast(err)
    })
}