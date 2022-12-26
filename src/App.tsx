import { Suspense } from 'react';
import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import Loader from './app/components/Loader';
import {
  AddCat,
  AddProductGroup,
  AddShowRoom,
  AddSupplier,
  AddWareHouse,
  Barcode,
  BarcodeSetting,
  Categories,
  DBLayout,
  Dashboard,
  EditWHouse,
  Login,
  NotFound,
  ProductGroup,
  Products,
  ShowRoom,
  Supplier,
  WareHouse
} from './app/view';
import AddMultiple from './app/view/Product/AddMultiple';
import AddSingle from './app/view/Product/AddSingle';

function App() {
  const AppHome = () => {
    return (
      <div className='w-full h-screen flex flex-col items-center justify-center gap-y-6'>
        <h1 className='text-5xl font-bold font-ubuntu '>Welcome Back</h1>
        <NavLink
          to={'/dashboard'}
          className='font-ubuntu border border-black px-3 py-1'
        >
          Go TO Dashboard
        </NavLink>
      </div>
    );
  };

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/' element={<AppHome />} />
        <Route path='/dashboard' element={<DBLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path='products'
            element={
              <>
                <Outlet />
              </>
            }
          >
            <Route index element={<Products />} />
            <Route path='add-single' element={<AddSingle />} />
            <Route path='add-multiple' element={<AddMultiple />} />
          </Route>
          <Route path='product-group'>
            <Route index element={<ProductGroup />} />
            <Route path='add' element={<AddProductGroup />} />
          </Route>
          <Route path='barcode' element={<Outlet />}>
            <Route index element={<Barcode />} />
            <Route path='setting' element={<BarcodeSetting />} />
          </Route>
          <Route path='warehouse' element={<Outlet />}>
            <Route index element={<WareHouse />} />
            <Route path=':id' element={<EditWHouse />} />
            <Route path='add' element={<AddWareHouse />} />
          </Route>
          <Route path='showroom' element={<Outlet />}>
            <Route index element={<ShowRoom />} />
            <Route path='add' element={<AddShowRoom />} />
          </Route>

          <Route path='categories'>
            <Route index element={<Categories />} />
            <Route path='add' element={<AddCat />} />
          </Route>
          <Route path='supplier'>
            <Route index element={<Supplier />} />
            <Route path='add' element={<AddSupplier />} />
          </Route>
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
