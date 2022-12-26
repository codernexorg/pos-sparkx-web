import React from 'react';

const Login = React.lazy(() => import('./Auth/Login'));
const Dashboard = React.lazy(() => import('./Dashboard/Dashboard'));
const DBLayout = React.lazy(() => import('./Dashboard/Layout'));
const NotFound = React.lazy(() => import('./NotFound'));
const MultipleProduct = React.lazy(() => import('./Product/AddMultiple'));
const SingleProduct = React.lazy(() => import('./Product/AddSingle'));
const Products = React.lazy(() => import('./Product/AllProducts'));
const ProductGroup = React.lazy(() => import('./Product/ProductGroup'));
const Barcode = React.lazy(() => import('./Barcode/Barcode'));
const BarcodeSetting = React.lazy(() => import('./Barcode/BarcodeSetting'));
const WareHouse = React.lazy(() => import('./WareHouse/WareHouse'));
const AddWareHouse = React.lazy(() => import('./WareHouse/AddWH'));

const ShowRoom = React.lazy(() => import('./ShowRoom/ShowRoom'));
const AddShowRoom = React.lazy(() => import('./ShowRoom/AddSR'));

const EditWHouse = React.lazy(() => import('./WareHouse/EditWareHouse'));

const Categories = React.lazy(() => import('./Categories/Categories'));
const AddCat = React.lazy(() => import('./Categories/AddCat'));

const Supplier = React.lazy(() => import('./Supplier/Supplier'));
const AddSupplier = React.lazy(() => import('./Supplier/AddSupplier'));

const AddProductGroup = React.lazy(() => import('./Product/AddProductGroup'));

export {
  Login,
  Dashboard,
  DBLayout,
  NotFound,
  MultipleProduct,
  SingleProduct,
  Products,
  ProductGroup,
  Barcode,
  BarcodeSetting,
  WareHouse,
  AddWareHouse,
  ShowRoom,
  AddShowRoom,
  EditWHouse,
  Categories,
  AddCat,
  Supplier,
  AddSupplier,
  AddProductGroup
};
