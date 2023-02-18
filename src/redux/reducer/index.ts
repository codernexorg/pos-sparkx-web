import {combineReducers} from '@reduxjs/toolkit';
import barcode from './barcode';
import category from './category';
import productGroup from './productGroup';
import products from './products';
import showroom from './showroom';
import supplier from './supplier';
import warehouse from './warehouse';
import user from "./user";
import invoice from "./invoice";
import customer from "./customer";
import {employee} from "./employee";
import business from "./business";
import tax from "./tax";
import transferred from "./transfered";
import expense from "./expense";
import expenseType from "./expenseType";

const reducers = combineReducers({
    products,
    supplier,
    category,
    showroom,
    warehouse,
    productGroup,
    barcode, user, invoice, customer, employee, business, tax, transferred, expense, expenseType,
});

export default reducers;
