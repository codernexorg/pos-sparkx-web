import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '../../api';
import { rejectedToast, successToast } from '../../app/utils/toaster';
import {
  ADD_MULTIPLE_PRODUCT_ERR,
  ADD_MULTIPLE_PRODUCT_LOADING,
  ADD_MULTIPLE_PRODUCT_SUCCESS,
  ADD_SINGLE_PRODUCT_LOADING,
  ADD_SINGLE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_LOADING,
  FETCH_PRODUCT_SUCCESS
} from '../constant';
import { AppDispatch } from '../store';
import { ApiError, CreateFN } from '../types';

export const fetchProduct = () => async (dispatch: AppDispatch) => {
  dispatch({ type: FETCH_PRODUCT_LOADING });
  const res = (await api.get(`/product`)) as {
    data: { product: Product[]; hasMore: boolean };
  };

  dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: res.data });
};

export const createSingleProduct: CreateFN<Product> =
  (data, reset) => async (dispatch: AppDispatch) => {
    dispatch({ type: ADD_SINGLE_PRODUCT_LOADING });
    api
      .post('/product/single', data)
      .then((res: { data: Product }) => {
        successToast('Single Proudct Added Successfully');
        dispatch({ type: ADD_SINGLE_PRODUCT_SUCCESS, payload: res.data });
        reset();
      })
      .catch((err: AxiosError<ApiError>) => {
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
  (data1?: ProductInfoMultiple[], data2?: MultipleProductInput) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: ADD_MULTIPLE_PRODUCT_LOADING });
    if (data1 && data2) {
      const product: ProductData[] = [];

      data1.forEach(item => {
        const productApi = { ...item, ...data2 };
        product.push(productApi);
      });

      if (!product.length) {
        toast.error('Something went wrong with product creation');
      }

      api
        .post('/product/multiple', product)
        .then(res => {
          dispatch({ type: ADD_MULTIPLE_PRODUCT_SUCCESS, payload: res.data });
          successToast('Multiple Product Successfully created');
        })
        .catch((err: AxiosError<ApiError>) => {
          dispatch({ type: ADD_MULTIPLE_PRODUCT_ERR });
          rejectedToast(err);
        });
    }
  };
