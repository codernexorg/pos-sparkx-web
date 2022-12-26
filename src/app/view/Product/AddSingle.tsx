import Typography from 'antd/es/typography/Typography';
import { Formik } from 'formik';
import { useEffect } from 'react';
import {
  createSingleProduct,
  fetchProduct
} from '../../../redux/actions/product';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { AddProductSingle } from '../../components';

const AddSingle = () => {
  const disptach = useAppDispatch();

  useEffect(() => {
    disptach(fetchProduct());
  }, [disptach]);

  const { products } = useTypedSelector(store => store.products);

  const itemCode = products[products.length - 1]?.itemCode + 1 || 1;

  return (
    <div>
      <Typography className='text-2xl my-10'>
        Add New Product{' '}
        <span className='text-xl ml-3 text-slate-500'>
          Item Starting From {itemCode}
        </span>
      </Typography>
      <Formik
        initialValues={
          {
            invoiceNumber: '',
            invoiceDate: '',
            lotNumber: 0,
            invoiceTotalPrice: 0,
            supplierName: '',
            totalItem: 0,
            transportationCost: 0,
            unitCost: 0,
            whName: '',
            sellPrice: 0,
            showroomName: '',
            productGroup: '',
            itemCode: itemCode
          } satisfies Product
        }
        enableReinitialize={true}
        onSubmit={async (value, { resetForm }) => {
          console.log(value);
          disptach(createSingleProduct(value, resetForm));
        }}
      >
        <AddProductSingle itemCode={itemCode} />
      </Formik>
    </div>
  );
};

export default AddSingle;
