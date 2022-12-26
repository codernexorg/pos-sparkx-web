import { AxiosError } from 'axios';
import api from '../../api';
import { rejectedToast, successToast } from '../../app/utils/toaster';
import {
  ADD_SHOWROOM_ERR,
  ADD_SHOWROOM_LOADING,
  ADD_SHOWROOM_SUCCESS,
  FETCH_SHOWROOM_ERR,
  FETCH_SHOWROOM_LOADING,
  FETCH_SHOWROOM_SUCCESS
} from '../constant';
import { AppDispatch } from '../store';
import { ApiError, CreateFN, Showroom } from '../types';

export const getShowroom = () => async (dispatch: AppDispatch) => {
  dispatch({ type: FETCH_SHOWROOM_LOADING });
  api
    .get('/showroom')
    .then((res: { data: Showroom[] }) => {
      dispatch({ type: FETCH_SHOWROOM_SUCCESS, payload: res.data });
    })
    .catch((error: AxiosError<ApiError>) => {
      dispatch({ type: FETCH_SHOWROOM_ERR });
      rejectedToast(error);
    });
};

export const createShowroom: CreateFN<Showroom> =
  (data, reset) => async (dispatch: AppDispatch) => {
    dispatch({ type: ADD_SHOWROOM_LOADING });
    api
      .post('/showroom', data)
      .then((res: { data: Showroom }) => {
        dispatch({ type: ADD_SHOWROOM_SUCCESS, payload: res.data });
        successToast('Showroom created');
        reset();
      })
      .catch((error: AxiosError<ApiError>) => {
        dispatch({ type: ADD_SHOWROOM_ERR });
        rejectedToast(error);
      });
  };
