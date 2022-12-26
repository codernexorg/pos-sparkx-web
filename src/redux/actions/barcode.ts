import { AxiosError } from 'axios';
import api from '../../api';
import { rejectedToast } from '../../app/utils/toaster';
import { BARCODE_LOADING, PRINT_BARCODE } from '../constant';
import { AppDispatch } from '../store';
import { ApiError } from '../types';

export const printBarcode =
  (data: { lotNumber: number }) => async (dispatch: AppDispatch) => {
    dispatch({ type: BARCODE_LOADING });
    api
      .post('/barcode/generate', data)
      .then((res: { data: Product[] }) => {
        dispatch({ type: PRINT_BARCODE, payload: res.data });
      })
      .catch((err: AxiosError<ApiError>) => {
        rejectedToast(err);
      });
  };
