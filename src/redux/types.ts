import { NavigateFunction } from 'react-router-dom';
import {
  ADD_MULTIPLE_PRODUCT_ERR,
  ADD_MULTIPLE_PRODUCT_LOADING,
  ADD_MULTIPLE_PRODUCT_SUCCESS,
  ADD_PRODUCT_GROUP_ERR,
  ADD_PRODUCT_GROUP_LOADING,
  ADD_PRODUCT_GROUP_SUCCESS,
  ADD_SHOWROOM_ERR,
  ADD_SHOWROOM_LOADING,
  ADD_SHOWROOM_SUCCESS,
  ADD_SINGLE_PRODUCT_ERR,
  ADD_SINGLE_PRODUCT_LOADING,
  ADD_SINGLE_PRODUCT_SUCCESS,
  ADD_SUPPLIER_ERR,
  ADD_SUPPLIER_LOADING,
  ADD_SUPPLIER_SUCCESS,
  ADD_WAREHOUSE_ERR,
  ADD_WAREHOUSE_LOADING,
  ADD_WAREHOUSE_SUCCESS,
  BARCODE_LOADING,
  CREATE_CATEGORY_ERR,
  CREATE_CATEGORY_LOADING,
  CREATE_CATEGORY_SUCCESS,
  FETCH_BARCODE,
  FETCH_CATEGORY_ERR,
  FETCH_CATEGORY_LOADING,
  FETCH_CATEGORY_SUCCESS,
  FETCH_PRODUCT_ERR,
  FETCH_PRODUCT_GROUP_ERR,
  FETCH_PRODUCT_GROUP_LOADING,
  FETCH_PRODUCT_GROUP_SUCCESS,
  FETCH_PRODUCT_LOADING,
  FETCH_PRODUCT_SUCCESS,
  FETCH_SHOWROOM_ERR,
  FETCH_SHOWROOM_LOADING,
  FETCH_SHOWROOM_SUCCESS,
  FETCH_SUPPLIER_ERR,
  FETCH_SUPPLIER_LOADING,
  FETCH_SUPPLIER_SUCCESS,
  FETCH_WAREHOUSE_ERR,
  FETCH_WAREHOUSE_LOADING,
  FETCH_WAREHOUSE_SUCCESS,
  PRINT_BARCODE,
  SET_BARCODE
} from './constant';
import { AppDispatch } from './store';
//Product Group
export interface ProductGroup {
  id?: number;
  productName: string;
  productCode: string;
  productCategory: string;
}

export interface IProductGState {
  productGroup: ProductGroup[];
  isLoading: boolean;
}

interface CreatePorductGroupLoading {
  type: typeof ADD_PRODUCT_GROUP_LOADING;
}
interface CreatePorductGroupSuccess {
  type: typeof ADD_PRODUCT_GROUP_SUCCESS;
  payload: ProductGroup;
}
interface CreatePorductGroupErr {
  type: typeof ADD_PRODUCT_GROUP_ERR;
}

interface FetchProductGroupLoading {
  type: typeof FETCH_PRODUCT_GROUP_LOADING;
}
interface FetchProductGroupSuccess {
  type: typeof FETCH_PRODUCT_GROUP_SUCCESS;
  payload: ProductGroup[];
}
interface FetchProductGroupErr {
  type: typeof FETCH_PRODUCT_GROUP_ERR;
}

export type ProductGroupAction =
  | CreatePorductGroupLoading
  | CreatePorductGroupSuccess
  | CreatePorductGroupErr
  | FetchProductGroupLoading
  | FetchProductGroupSuccess
  | FetchProductGroupErr
  | FetchProductGroupSuccess;

//Product Types
export interface IProductSate {
  products: Product[];
  isLoading: boolean;
  hasMore: boolean;
}

interface CreateSingleProductLoading {
  type: typeof ADD_SINGLE_PRODUCT_LOADING;
}

interface CreateSingleProductSuccess {
  type: typeof ADD_SINGLE_PRODUCT_SUCCESS;
  payload: Product;
}

interface CreateSingleProductErr {
  type: typeof ADD_SINGLE_PRODUCT_ERR;
}

interface CreateMultiProductLoading {
  type: typeof ADD_MULTIPLE_PRODUCT_LOADING;
}

interface CreateMultiProductSuccess {
  type: typeof ADD_MULTIPLE_PRODUCT_SUCCESS;
  payload: Product;
}

interface CreateMultiProductErr {
  type: typeof ADD_MULTIPLE_PRODUCT_ERR;
}

interface FetchProductLoading {
  type: typeof FETCH_PRODUCT_LOADING;
}

interface FetchProductSuccess {
  type: typeof FETCH_PRODUCT_SUCCESS;
  payload: { hasMore: boolean; product: Product[] };
}

interface FetchProductErr {
  type: typeof FETCH_PRODUCT_ERR;
}

export type ProductActionType =
  | CreateSingleProductLoading
  | CreateSingleProductSuccess
  | CreateMultiProductLoading
  | CreateMultiProductSuccess
  | CreateMultiProductErr
  | CreateSingleProductErr
  | FetchProductLoading
  | FetchProductSuccess
  | FetchProductErr;

//Supplier Types

export interface Supplier {
  id?: number;
  supplierName: string;
  supplierAddress: string;
  contactPersonName: string;
  contactPersonNumber: string;
  supplierEmail: string;
  altContactNumber: string;
  extraInfo: string;
}

export interface ISupplierState {
  suppliers: Supplier[];
  isLoading: boolean;
  error: string | null;
}

interface CreateSupplierLoading {
  type: typeof ADD_SUPPLIER_LOADING;
}

interface CreateSupplierSuccess {
  type: typeof ADD_SUPPLIER_SUCCESS;
  payload: Supplier;
}

interface CreateSupplierErr {
  type: typeof ADD_SUPPLIER_ERR;
  payload: string;
}

export type CreateSupplierAction =
  | CreateSupplierLoading
  | CreateSupplierErr
  | CreateSupplierSuccess;

export interface FetchSupplierLoading {
  type: typeof FETCH_SUPPLIER_LOADING;
}
export interface FetchSupplierSuccess {
  type: typeof FETCH_SUPPLIER_SUCCESS;
  payload: Supplier[];
}
export interface FetchSupplierErr {
  type: typeof FETCH_SUPPLIER_ERR;
  payload: string;
}

export type FetchSupplierAction =
  | FetchSupplierErr
  | FetchSupplierLoading
  | FetchSupplierSuccess;

export type SupplierActionType = CreateSupplierAction | FetchSupplierAction;

//Category Types

export interface Category {
  id?: number;
  categoryName: string;
}

interface CreateCatLoading {
  type: typeof CREATE_CATEGORY_LOADING;
}

interface CreateCatSuccess {
  type: typeof CREATE_CATEGORY_SUCCESS;
  payload: Category;
}

interface CreateCatErr {
  type: typeof CREATE_CATEGORY_ERR;
}

interface FetchCatLoading {
  type: typeof FETCH_CATEGORY_LOADING;
}

interface FetchCatSuccess {
  type: typeof FETCH_CATEGORY_SUCCESS;
  payload: Category[];
}

interface FetchCatErr {
  type: typeof FETCH_CATEGORY_ERR;
}

export interface ICatState {
  categories: Category[];
  isLoading: boolean;
}

type CreateCatActionType = CreateCatErr | CreateCatLoading | CreateCatSuccess;
type FetchCatActionType = FetchCatLoading | FetchCatErr | FetchCatSuccess;

export type CatActionType = CreateCatActionType | FetchCatActionType;

//Shoroom
export interface Showroom {
  id?: number;
  showroomName: string;
  showroomAddress: string;
  showroomCode: string;
}

export interface IShoroomState {
  shorooms: Showroom[];
  isLoading: boolean;
}

interface CreateShoroomLoading {
  type: typeof ADD_SHOWROOM_LOADING;
}

interface CreateShoroomSuccess {
  type: typeof ADD_SHOWROOM_SUCCESS;
  payload: Showroom;
}

interface CreateShoroomErr {
  type: typeof ADD_SHOWROOM_ERR;
}

interface FetchShoroomLoading {
  type: typeof FETCH_SHOWROOM_LOADING;
}

interface FetchShoroomSuccess {
  type: typeof FETCH_SHOWROOM_SUCCESS;
  payload: Showroom[];
}

interface FetchShoroomErr {
  type: typeof FETCH_SHOWROOM_ERR;
}

export type ShoroomActionType =
  | CreateShoroomLoading
  | CreateShoroomSuccess
  | CreateShoroomErr
  | FetchShoroomErr
  | FetchShoroomLoading
  | FetchShoroomSuccess;

//WareHouse

export interface Warehouse {
  whId?: number;
  whName: string;
  whLocation: string;
  whCode: string;
}
export interface IWareHouseState {
  warehouses: Warehouse[];
  isLoading: boolean;
}

interface CreateWarehouseLoading {
  type: typeof ADD_WAREHOUSE_LOADING;
}

interface CreateWarehouseSuccess {
  type: typeof ADD_WAREHOUSE_SUCCESS;
  payload: Warehouse;
}

interface CreateWarehouseErr {
  type: typeof ADD_WAREHOUSE_ERR;
}

interface FetchWarehouseLoading {
  type: typeof FETCH_WAREHOUSE_LOADING;
}

interface FetchWarehouseSuccess {
  type: typeof FETCH_WAREHOUSE_SUCCESS;
  payload: Warehouse[];
}

interface FetchWarehouseErr {
  type: typeof FETCH_WAREHOUSE_ERR;
}

export type WarehouseActionType =
  | CreateWarehouseLoading
  | CreateWarehouseErr
  | CreateWarehouseSuccess
  | FetchWarehouseErr
  | FetchWarehouseLoading
  | FetchWarehouseSuccess;

//Create Function
export type CreateFN<T> = (
  data: T,
  reset: Function,
  navigate?: NavigateFunction
) => (dispatch: AppDispatch) => Promise<any>;

export interface ApiError {
  success: boolean;
  message: string;
}

//BARCODE

interface PrintBarcodeAction {
  type: typeof PRINT_BARCODE;
  payload: Product[];
}

interface BarcodeLoading {
  type: typeof BARCODE_LOADING;
}

interface SettingBarcode {
  type: typeof SET_BARCODE;
  payload: BarcodeSetting;
}

interface FetchBarcode {
  type: typeof FETCH_BARCODE;
  payload: BarcodeSetting;
}

export type BarcodeActionType =
  | PrintBarcodeAction
  | SettingBarcode
  | FetchBarcode
  | BarcodeLoading;
