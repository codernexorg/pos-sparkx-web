import { AxiosError } from 'axios';
import api from '../../api';
import { rejectedToast, successToast } from '../../app/utils/toaster';
import {
  ADD_WAREHOUSE_ERR,
  ADD_WAREHOUSE_LOADING,
  ADD_WAREHOUSE_SUCCESS,
  FETCH_WAREHOUSE_ERR,
  FETCH_WAREHOUSE_LOADING,
  FETCH_WAREHOUSE_SUCCESS
} from '../constant';
import { AppDispatch } from '../store';
import { ApiError, CreateFN, Warehouse } from '../types';

export const getWareHouse = () => async (dispatch: AppDispatch) => {
  dispatch({ type: FETCH_WAREHOUSE_LOADING });
  api
    .get('/warehouse')
    .then((res: { data: Warehouse[] }) => {
      dispatch({ type: FETCH_WAREHOUSE_SUCCESS, payload: res.data });
    })
    .catch((err: AxiosError<ApiError>) => {
      rejectedToast(err);
      dispatch({
        type: FETCH_WAREHOUSE_ERR
      });
    });
};

export const addWarehouse: CreateFN<Warehouse> =
  (data, reset) => async (dispatch: AppDispatch) => {
    dispatch({ type: ADD_WAREHOUSE_LOADING });
    api
      .post('/warehouse', data)
      .then((res: { data: Warehouse }) => {
        dispatch({ type: ADD_WAREHOUSE_SUCCESS, payload: res.data });
        reset();
        successToast('warehouse added success');
      })
      .catch((err: AxiosError<ApiError>) => {
        dispatch({
          type: ADD_WAREHOUSE_ERR
        });
        rejectedToast(err);
      });
  };
