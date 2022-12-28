import { Reducer } from '@reduxjs/toolkit';
import {
  BARCODE_ERR,
  BARCODE_LOADING,
  FETCH_BARCODE,
  PRINT_BARCODE,
  SET_BARCODE
} from '../constant';
import { BarcodeActionType } from '../types';

const barcode: Reducer<IPrintBarcodeState, BarcodeActionType> = function (
  state = { barcode: { width: 2, height: 1 }, products: [], isLoading: false },
  action
) {
  switch (action.type) {
    case BARCODE_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case PRINT_BARCODE:
      return { ...state, products: action.payload, isLoading: false };

    case FETCH_BARCODE: {
      return { ...state, barcode: action.payload, isLoading: false };
    }
    case SET_BARCODE: {
      return {
        ...state,
        barcode: action.payload,
        isLoading: false
      };
    }

    case BARCODE_ERR: {
      return {
        ...state,
        isLoading: false,
        products: []
      };
    }

    default:
      return state;
  }
};
export default barcode;
