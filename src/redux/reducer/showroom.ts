import { Reducer } from '@reduxjs/toolkit';
import {
  ADD_SHOWROOM_ERR,
  ADD_SHOWROOM_LOADING,
  ADD_SHOWROOM_SUCCESS,
  FETCH_SHOWROOM_ERR,
  FETCH_SHOWROOM_LOADING,
  FETCH_SHOWROOM_SUCCESS
} from '../constant';
import { IShoroomState, ShoroomActionType } from '../types';

const showroom: Reducer<IShoroomState, ShoroomActionType> = function (
  state = { isLoading: false, shorooms: [] },
  action
) {
  switch (action.type) {
    case FETCH_SHOWROOM_LOADING: {
      return { ...state, isLoading: true };
    }

    case FETCH_SHOWROOM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        shorooms: action.payload
      };
    }

    case FETCH_SHOWROOM_ERR: {
      return { ...state, isLoading: false };
    }
    case ADD_SHOWROOM_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }

    case ADD_SHOWROOM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        shorooms: [...state.shorooms, action.payload]
      };
    }
    case ADD_SHOWROOM_ERR: {
      return {
        ...state,
        isLoading: false
      };
    }
    default:
      return state;
  }
};

export default showroom;
