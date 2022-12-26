import { Typography } from 'antd';
import { Field, Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  createMultipleProduct,
  fetchProduct
} from '../../../redux/actions/product';
import { getProductGroup } from '../../../redux/actions/productGroup';
import { getShowroom } from '../../../redux/actions/showroom';
import { getSupplier } from '../../../redux/actions/supplier';
import { getWareHouse } from '../../../redux/actions/warehouse';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Button, HookInput, Loader, SelectInput } from '../../components';

const AddMultiple = () => {
  const dispatch = useAppDispatch();
  const btnReft = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(getShowroom());
    dispatch(getWareHouse());
    dispatch(getSupplier());
    dispatch(getProductGroup());
  }, [dispatch]);

  const { products, isLoading } = useTypedSelector(state => state.products);
  const { suppliers } = useTypedSelector(state => state.supplier);
  const { productGroup } = useTypedSelector(state => state.productGroup);
  const { warehouses } = useTypedSelector(state => state.warehouse);
  const { shorooms } = useTypedSelector(state => state.showroom);

  const [product, setProduct] = useState<MultipleProductInput | null>(null);
  const [productInfo, setProductInfo] = useState<
    {
      itemCode: number;
      sellPrice: number;
    }[]
  >([]);

  const [itemCount, setItemCount] = useState<number>(0);
  interface Item {
    code: number;
    price: number;
  }

  const item = function (): Item[] {
    const item: Item[] = [];

    if (itemCount) {
      for (let i = 0; i < itemCount; i++) {
        item[i] = {
          code: products[products.length - 1]?.itemCode + i,
          price: 0
        };
      }
    }
    return item;
  };

  const initialValues = {
    items: item().map(p => ({
      itemCode: p.code + 1,
      sellPrice: p.price
    }))
  };
  const onClick = () => {
    btnReft.current?.click();
  };

  if (isLoading) {
    return <Loader />;
  }

  //Multiple Check
  const MultipleCheck = () => {
    return (
      <Formik
        initialValues={{ pCount: '' }}
        onSubmit={value => {
          if (value.pCount) {
            setItemCount(parseInt(value.pCount));
          }
        }}
        enableReinitialize
      >
        {() => (
          <InitialForm className='bg-white flex flex-col items-center p-10 justify-around gap-y-3'>
            <Typography>Item Count</Typography>
            <Field
              className='border border-black outline-none px-10 py-1 w-full'
              name='pCount'
              id='pCount'
              placeholder='How Many Items?'
              type='number'
            />
            <button className='' type='submit'>
              Go Next
            </button>
          </InitialForm>
        )}
      </Formik>
    );
  };

  //Important Steps

  return (
    <div className='w-full pt-10 flex items-center justify-center relative'>
      {!itemCount ? (
        <MultipleCheck />
      ) : (
        <ProductForm>
          <Typography className='text-2xl my-10'>Add New Product</Typography>
          <div className='flex gap-x-20'>
            <Formik
              enableReinitialize={true}
              initialValues={{
                invoiceNumber: '',
                invoiceDate: '',
                invoiceTotalPrice: 0,
                lotNumber: 0,
                supplierName: '',
                whName: '',
                showroomName: '',
                transportationCost: 0,
                unitCost: 0,
                productGroup: ''
              }}
              onSubmit={value => {
                setProduct(value);

                if (product)
                  dispatch(createMultipleProduct(productInfo, product));
              }}
            >
              <Form
                id='form1multiple'
                className='w-full flex flex-col gap-y-6 items-center'
              >
                <FormGroup>
                  <HookInput
                    required
                    name='invoiceNumber'
                    label='Invoice Number'
                    placeholder='EG: #0001, 002, IV:002'
                  />
                  <HookInput
                    required
                    label='Invoice Date'
                    type='date'
                    name='invoiceDate'
                  />
                </FormGroup>
                <FormGroup>
                  <HookInput
                    required
                    label='Invoice Total Price'
                    type='number'
                    name='invoiceTotalPrice'
                  />
                  <HookInput
                    required
                    label='Lot Number'
                    type='number'
                    name='lotNumber'
                  />
                </FormGroup>
                <FormGroup>
                  <SelectInput
                    label='Supplier Name'
                    name='supplierName'
                    children={suppliers.map(sp => (
                      <option key={sp.id} value={sp.supplierName}>
                        {sp.supplierName}
                      </option>
                    ))}
                  />
                  <SelectInput
                    label='Product Group'
                    name='productGroup'
                    children={productGroup.map(sp => (
                      <option key={sp.id} value={sp.productName}>
                        {sp.productName}
                      </option>
                    ))}
                  />
                </FormGroup>
                <FormGroup>
                  <HookInput label='Unit Cost' type='number' name='unitCost' />
                  <HookInput
                    required
                    label='Transportation Cost'
                    type='number'
                    name='transportationCost'
                  />
                </FormGroup>
                <FormGroup>
                  <SelectInput
                    label='Showroom Name'
                    name='showroomName'
                    children={shorooms.map(sp => (
                      <option key={sp.id} value={sp.showroomName}>
                        {sp.showroomName}
                      </option>
                    ))}
                  />
                  <SelectInput
                    label='Warehouse Name'
                    name='whName'
                    children={warehouses.map(sp => (
                      <option key={sp.whId} value={sp.whName}>
                        {sp.whName}
                      </option>
                    ))}
                  />
                </FormGroup>

                <Button onClick={onClick} type='submit'>
                  Save
                </Button>
              </Form>
            </Formik>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={value => {
                setProductInfo(value.items);
              }}
            >
              {/**
               *
               *
               *
               * Item Price & Code
               *
               *
               *
               */}
              <Form id='form2multiple' className='w-full flex flex-col gap-y-6'>
                {initialValues.items.map((item, index) => (
                  <div key={index} className='flex  gap-x-4'>
                    <div className='w-full'>
                      <label htmlFor={`items[${index}].itemCode`}>
                        Item Code
                      </label>
                      <Field
                        value={item.itemCode}
                        defaultValue={item.itemCode}
                        className='h-[37px] w-full cursor-not-allowed text-slate-500 rounded border border-b-2 border-b-slate-300 outline-none bg-transparent pl-3'
                        // name={`items[${index}].itemCode`}
                        id={`items[${index}].itemCode`}
                      />
                    </div>
                    <div className='w-full'>
                      <label htmlFor={`items[${index}].sellPrice`}>
                        Sell Price
                      </label>
                      <Field
                        type='number'
                        name={`items[${index}].sellPrice`}
                        className='h-[37px] w-full rounded border border-b-2 border-b-slate-300 outline-none bg-transparent pl-3'
                        required
                      />
                    </div>
                  </div>
                ))}
                <button className='hidden' ref={btnReft} type='submit'>
                  Save
                </button>
              </Form>
            </Formik>
          </div>
        </ProductForm>
      )}
    </div>
  );
};

const InitialForm = styled(Form)`
  width: 50%;
`;
const ProductForm = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  row-gap: 30px;
  justify-content: center;
`;
const FormGroup = styled.div`
  display: flex;
  column-gap: 40px;
  width: 100%;
`;

export default AddMultiple;
