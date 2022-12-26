import { Form } from 'formik';
import { useEffect } from 'react';
import styled from 'styled-components';
import { CommonInput, SelectInput } from '.';
import { fetchProduct } from '../../redux/actions/product';
import { getProductGroup } from '../../redux/actions/productGroup';
import { getShowroom } from '../../redux/actions/showroom';
import { getSupplier } from '../../redux/actions/supplier';
import { getWareHouse } from '../../redux/actions/warehouse';
import { useAppDispatch, useTypedSelector } from '../../redux/store';

const FormGroup = styled.div`
  display: flex;
  column-gap: 40px;
  width: 100%;
`;
const AddProduct: React.FC<{ itemCode: number }> = ({ itemCode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductGroup());
    dispatch(fetchProduct());
    dispatch(getShowroom());
    dispatch(getSupplier());
    dispatch(getWareHouse());
  }, [dispatch]);

  const { products } = useTypedSelector(store => store.products);
  const { productGroup } = useTypedSelector(store => store.productGroup);
  const { shorooms } = useTypedSelector(store => store.showroom);
  const { suppliers } = useTypedSelector(store => store.supplier);
  const { warehouses } = useTypedSelector(store => store.warehouse);

  return (
    <Form className='w-full flex flex-col gap-y-6 items-center bg-white rounded p-4'>
      <FormGroup>
        <CommonInput name='invoiceNumber' label='Invoice Number' />
        <CommonInput label='Invoice Date' type='date' name='invoiceDate' />
      </FormGroup>
      <FormGroup>
        <CommonInput
          label='Invoice Total Price'
          type='number'
          name='invoiceTotalPrice'
        />
        <CommonInput label='Lot Number' type='number' name='lotNumber' />
      </FormGroup>
      <FormGroup>
        <SelectInput name='supplierName' label='Supplier Name'>
          {suppliers.map(sp => (
            <option key={sp.id} value={sp.supplierName}>
              {sp.supplierName}
            </option>
          ))}
        </SelectInput>
        <SelectInput name='productGroup' label='Product Group'>
          {productGroup.map(pg => (
            <option key={pg.id} value={pg.productName}>
              {pg.productName}
            </option>
          ))}
        </SelectInput>
      </FormGroup>
      <FormGroup>
        <CommonInput label='Total Item' type='number' name='totalItem' />
        <CommonInput label='Unit Cost' type='number' name='unitCost' />
      </FormGroup>
      <FormGroup>
        <CommonInput
          label='Transportation Cost'
          type='number'
          name='transportationCost'
        />
        <CommonInput label='Sell Price' type='number' name='sellPrice' />
      </FormGroup>
      <FormGroup>
        <SelectInput name='showroomName' label='Planned Showroom'>
          {shorooms.map(sr => (
            <option key={sr.id} value={sr.showroomName}>
              {sr.showroomName}
            </option>
          ))}
        </SelectInput>
        <SelectInput name='whName' label='Warehouse'>
          {warehouses.map(wh => (
            <option key={wh.whId} value={wh.whName}>
              {wh.whName}
            </option>
          ))}
        </SelectInput>
      </FormGroup>
      <button className='border border-slate-700 w-[140px]' type='submit'>
        {' '}
        Go
      </button>
    </Form>
  );
};

export default AddProduct;
