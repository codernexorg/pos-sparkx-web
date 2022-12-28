import { Form } from 'formik';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Button, CommonInput, SelectInput } from '.';
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
const AddProduct: React.FC<{ itemCode: string }> = ({ itemCode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductGroup());
    dispatch(fetchProduct());
    dispatch(getShowroom());
    dispatch(getSupplier());
    dispatch(getWareHouse());
  }, [dispatch]);

  const { productGroup } = useTypedSelector(store => store.productGroup);
  const { shorooms } = useTypedSelector(store => store.showroom);
  const { suppliers } = useTypedSelector(store => store.supplier);
  const { warehouses } = useTypedSelector(store => store.warehouse);
  const { isLoading } = useTypedSelector(store => store.products);

  return (
    <Form className='w-full flex flex-col gap-y-6 items-center bg-white rounded p-4'>
      <FormGroup>
        <CommonInput required name='invoiceNumber' label='Invoice Number' />
        <CommonInput
          required
          label='Invoice Date'
          type='date'
          name='invoiceDate'
        />
      </FormGroup>
      <FormGroup>
        <CommonInput
          required
          label='Invoice Total Price'
          type='number'
          name='invoiceTotalPrice'
        />
        <CommonInput
          required
          label='Lot Number'
          type='number'
          name='lotNumber'
        />
      </FormGroup>
      <FormGroup>
        <SelectInput required name='supplierName' label='Supplier Name'>
          {suppliers.map(sp => (
            <option key={sp.id} value={sp.supplierName}>
              {sp.supplierName}
            </option>
          ))}
        </SelectInput>
        <SelectInput required name='productGroup' label='Product Group'>
          {productGroup.map(pg => (
            <option key={pg.id} value={pg.productName}>
              {pg.productName}
            </option>
          ))}
        </SelectInput>
      </FormGroup>
      <FormGroup>
        <CommonInput
          required
          label='Total Item'
          type='number'
          name='totalItem'
        />
        <CommonInput required label='Unit Cost' type='number' name='unitCost' />
      </FormGroup>
      <FormGroup>
        <CommonInput
          required
          label='Transportation Cost'
          type='number'
          name='transportationCost'
        />
        <CommonInput
          required
          label='Sell Price'
          type='number'
          name='sellPrice'
        />
      </FormGroup>
      <FormGroup>
        <SelectInput required name='showroomName' label='Planned Showroom'>
          {shorooms.map(sr => (
            <option key={sr.id} value={sr.showroomName}>
              {sr.showroomName}
            </option>
          ))}
        </SelectInput>
        <SelectInput required name='whName' label='Warehouse'>
          {warehouses.map(wh => (
            <option key={wh.whId} value={wh.whName}>
              {wh.whName}
            </option>
          ))}
        </SelectInput>
      </FormGroup>
      <Button type='submit' loading={isLoading}>
        Save
      </Button>
    </Form>
  );
};

export default AddProduct;
