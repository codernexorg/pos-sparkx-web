import { Suspense, useEffect, useMemo } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Loader from "./app/components/Loader";
import {
  AddCat,
  AddCustomer,
  AddProductGroup,
  AddShowRoom,
  AddSupplier,
  AddWareHouse,
  Audit,
  Barcode,
  BarcodeSetting,
  Brand,
  Categories,
  Customer,
  CustomerDetails,
  CustomerQTY,
  Dashboard,
  DBLayout,
  EditWHouse,
  Employee,
  EmpMOM_YOY,
  ImportProducts,
  InventoryReport,
  Invoice,
  Login,
  LostProduct,
  Marketing,
  NotFound,
  PrevReturned,
  ProductGroup,
  Products,
  Purchase,
  Return,
  SalesReport,
  Sell,
  ShowRoom,
  Supplier,
  SystemSetting,
  Tax,
  TransferProduct,
  User,
  WareHouse,
} from "./app/view";
import AddMultiple from "./app/view/Product/AddMultiple";
import AddSingle from "./app/view/Product/AddSingle";
import { useAppDispatch } from "./redux/store";
import { fetchProduct } from "./redux/actions/product";
import { getSupplier } from "./redux/actions/supplier";
import { getWareHouse } from "./redux/actions/warehouse";
import { getShowroom } from "./redux/actions/showroom";
import { fetchCustomer } from "./redux/actions/customer";
import { fetchEmployee } from "./redux/actions/employee";
import { fetchBusiness } from "./redux/actions/business";
import { fetchTax } from "./redux/actions/tax";
import { getBrand } from "./redux/actions/brand";
import { getProductGroup } from "./redux/actions/productGroup";
import { getInvoice } from "./redux/actions/invoice";
import { useSettingContext } from "./app/context/SettingProver";
import DamagedProducts from "./app/view/Product/DamagedProduct";

interface DispatchActions {
  (): void;
}

function App() {
  const dispatch = useAppDispatch();

  const dispatchActions: DispatchActions[] = useMemo(() => {
    return [
      () => dispatch(fetchProduct()),
      () => dispatch(getSupplier()),
      () => dispatch(getWareHouse()),
      () => dispatch(getShowroom()),
      () => dispatch(fetchCustomer()),
      () => dispatch(fetchEmployee()),
      () => dispatch(fetchBusiness()),
      () => dispatch(fetchTax()),
      () => dispatch(getBrand()),
      () => dispatch(getProductGroup()),
      () => dispatch(getInvoice()),
    ];
  }, [dispatch]);

  useEffect(() => {
    dispatchActions.forEach((action) => action());
  }, [dispatchActions]);
  const { mode } = useSettingContext();

  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DBLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products">
              <Route index element={<Products />} />
              <Route path="add-single" element={<AddSingle />} />
              <Route path="add-multiple" element={<AddMultiple />} />
              <Route path="import" element={<ImportProducts />} />
              <Route path="transfer" element={<TransferProduct />} />
              <Route path="lost" element={<LostProduct />} />
              <Route path="damaged" element={<DamagedProducts />} />
            </Route>
            <Route path="product-group">
              <Route index element={<ProductGroup />} />
              <Route path="add" element={<AddProductGroup />} />
            </Route>
            <Route path="barcode" element={<Outlet />}>
              <Route index element={<Barcode />} />
              <Route path="setting" element={<BarcodeSetting />} />
            </Route>
            <Route path="warehouse" element={<Outlet />}>
              <Route index element={<WareHouse />} />
              <Route path=":id" element={<EditWHouse />} />
              <Route path="add" element={<AddWareHouse />} />
            </Route>
            <Route path="showroom" element={<Outlet />}>
              <Route index element={<ShowRoom />} />
              <Route path="add" element={<AddShowRoom />} />
            </Route>

            <Route path="categories">
              <Route index element={<Categories />} />
              <Route path="add" element={<AddCat />} />
            </Route>
            <Route path="supplier">
              <Route index element={<Supplier />} />
              <Route path="add" element={<AddSupplier />} />
            </Route>
            <Route path="pos">
              <Route index element={<Sell />} />
              <Route path="invoice" element={<Invoice />} />
              <Route path="return" element={<Return />} />
              <Route path="return/prev" element={<PrevReturned />} />
            </Route>
            <Route path="setting">
              <Route index element={<div>Settings</div>} />
              <Route path="user" element={<User />} />
              <Route path={"vat"} element={<Tax />} />
              <Route path={"system"} element={<SystemSetting />} />
            </Route>
            <Route path={"customer"}>
              <Route index element={<Customer />} />
              <Route path=":id" element={<CustomerDetails />} />
              <Route path="add" element={<AddCustomer />} />
            </Route>
            <Route path={"employee"}>
              <Route index element={<Employee />} />
            </Route>
            <Route path={"brands"} element={<Brand />} />
            <Route path={"audit"} element={<Audit />} />
            <Route path={"marketing"} element={<Marketing />} />
            <Route path={"purchase"} element={<Purchase />} />
            <Route path={"reports"}>
              <Route path={"sales"} element={<SalesReport />} />
              <Route path={"employee"} element={<EmpMOM_YOY />} />
              <Route path={"customer"} element={<CustomerQTY />} />
              <Route path={"inventory"} element={<InventoryReport />} />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;