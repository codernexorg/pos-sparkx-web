import { combineReducers } from '@reduxjs/toolkit';
import barcode from './barcode';
import category from './category';
import productGroup from './productGroup';
import products from './products';
import showroom from './showroom';
import supplier from './supplier';
import warehouse from './warehouse';
const reducres = combineReducers({
  products,
  supplier,
  category,
  showroom,
  warehouse,
  productGroup,
  barcode
});

export default reducres;
