import {Suspense, useEffect} from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import Loader from './app/components/Loader';
import {
    AddCat,
    AddCustomer,
    AddProductGroup,
    AddShowRoom,
    AddSupplier,
    AddWareHouse,
    Barcode,
    BarcodeSetting,
    Categories,
    Customer,
    Dashboard,
    DBLayout,
    EditWHouse,
    Employee,
    Expense,
    ExpenseType,
    ImportProducts,
    Invoice,
    Login,
    NotFound,
    ProductGroup,
    Products,
    Sell,
    ShowRoom,
    Supplier,
    Tax,
    TransferProduct,
    User,
    WareHouse
} from './app/view';
import AddMultiple from './app/view/Product/AddMultiple';
import AddSingle from './app/view/Product/AddSingle';
import {useAppDispatch} from "./redux/store";
import {fetchProduct} from "./redux/actions/product";
import {getSupplier} from "./redux/actions/supplier";
import {getWareHouse} from "./redux/actions/warehouse";
import {getShowroom} from "./redux/actions/showroom";
import {fetchCustomer} from "./redux/actions/customer";
import {fetchEmployee} from "./redux/actions/employee";
import {fetchBusiness} from "./redux/actions/business";
import {fetchTax} from "./redux/actions/tax";
import {fetchExpense} from "./redux/actions/expense";
import {fetchExpenseTypes} from "./redux/actions/expenseTypes";

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchProduct())
        dispatch(getSupplier());
        dispatch(getWareHouse());
        dispatch(getShowroom());
        dispatch(fetchCustomer())
        dispatch(fetchEmployee())
        dispatch(fetchBusiness())
        dispatch(fetchTax())
        dispatch(fetchExpense())
        dispatch(fetchExpenseTypes())
    }, [dispatch])

    const AppHome = () => {
        return <Navigate to='/dashboard' replace/>;
    };

    return (
        <Suspense fallback={<Loader/>}>
            <Routes>
                <Route index element={<AppHome/>}/>
                <Route path='/dashboard' element={<DBLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path='products'>
                        <Route index element={<Products/>}/>
                        <Route path='add-single' element={<AddSingle/>}/>
                        <Route path='add-multiple' element={<AddMultiple/>}/>
                        <Route path='import' element={<ImportProducts/>}/>
                        <Route path='transfer' element={<TransferProduct/>}/>
                    </Route>
                    <Route path='product-group'>
                        <Route index element={<ProductGroup/>}/>
                        <Route path='add' element={<AddProductGroup/>}/>
                    </Route>
                    <Route path='barcode' element={<Outlet/>}>
                        <Route index element={<Barcode/>}/>
                        <Route path='setting' element={<BarcodeSetting/>}/>
                    </Route>
                    <Route path='warehouse' element={<Outlet/>}>
                        <Route index element={<WareHouse/>}/>
                        <Route path=':id' element={<EditWHouse/>}/>
                        <Route path='add' element={<AddWareHouse/>}/>
                    </Route>
                    <Route path='showroom' element={<Outlet/>}>
                        <Route index element={<ShowRoom/>}/>
                        <Route path='add' element={<AddShowRoom/>}/>
                    </Route>

                    <Route path='categories'>
                        <Route index element={<Categories/>}/>
                        <Route path='add' element={<AddCat/>}/>
                    </Route>
                    <Route path='supplier'>
                        <Route index element={<Supplier/>}/>
                        <Route path='add' element={<AddSupplier/>}/>
                    </Route>
                    <Route path='pos'>
                        <Route index element={<Sell/>}/>
                        <Route path='invoice' element={<Invoice/>}/>
                    </Route>
                    <Route path='setting'>
                        <Route index element={<div>Settings</div>}/>
                        <Route path='user' element={<User/>}/>
                        <Route path={'vat'} element={<Tax/>}/>
                    </Route>
                    <Route path={'customer'}>
                        <Route index element={<Customer/>}/>
                        <Route path='add' element={<AddCustomer/>}/>
                    </Route>
                    <Route path={'employee'}>
                        <Route index element={<Employee/>}/>
                    </Route>
                    <Route path={'expenses'}>
                        <Route index element={<Expense/>}/>
                        <Route path='categories' element={<ExpenseType/>}/>
                    </Route>
                </Route>
                <Route path='login' element={<Login/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </Suspense>
    );
}

export default App;
