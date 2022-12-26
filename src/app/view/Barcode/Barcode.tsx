import { Typography } from 'antd';
import { Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import BarcodeGeneratorComponent from 'react-barcode';
import { FaPrint } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import { printBarcode } from '../../../redux/actions/barcode';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Button, CommonInput, Loader } from '../../components';
const Barcode = () => {
  const dispatch = useAppDispatch();

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current
  });
  const { products, isLoading } = useTypedSelector(state => state.barcode);

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const LotForm = () => {
    return (
      <Formik
        initialValues={{ lotNumber: 0 }}
        onSubmit={value => {
          dispatch(printBarcode(value));
          setIsClicked(true);
        }}
      >
        {() => (
          <Form className='bg-white p-10 rounder flex flex-col items-center gap-y-4'>
            <CommonInput label='Lot Nuber' name='lotNumber' />
            <Button type='submit'>Go</Button>
          </Form>
        )}
      </Formik>
    );
  };

  if (!isClicked) {
    return <LotForm />;
  }

  if (!products?.length) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <Typography.Title level={3}>
          No Product To Print Barcode !
        </Typography.Title>
      </div>
    );
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex justify-between'>
        <Typography.Title level={3}>Barcodes</Typography.Title>
        <button
          onClick={handlePrint}
          className='flex gap-x-2 bg-yellow-300 items-center px-4 rounded py-1'
        >
          <FaPrint />
          Print
        </button>
      </div>
      <div className='flex flex-col' ref={printRef}>
        {products?.map((product, i) => {
          return (
            <div className='flex'>
              <div className='w-[150px] h-[116px] items-center bg-white flex flex-col justify-center text-sm ml-[30px] mt-[10px]'>
                <p className='flex justify-around w-full'>
                  <span>{`0000` + product.itemCode}</span>
                  <span>{product.sellPrice}tk</span>
                </p>
                <BarcodeGeneratorComponent
                  key={i}
                  height={30}
                  value={product.itemCode.toString()}
                  displayValue={false}
                  format='CODE128'
                  margin={0}
                  textAlign='center'
                />
                <span className='text-xs text-center'>
                  {product.productGroup}
                </span>
              </div>
              <div className='w-[150px] h-[116px] items-center bg-white flex flex-col justify-center text-sm ml-[10px] mt-[10px]'>
                <p className='flex justify-around w-full'>
                  <span>{`0000` + product.itemCode}</span>
                  <span>{product.sellPrice}tk</span>
                </p>
                <BarcodeGeneratorComponent
                  key={i}
                  height={30}
                  value={product.itemCode.toString()}
                  displayValue={false}
                  format='CODE128'
                  margin={0}
                  textAlign='center'
                />
                <span className='text-xs text-center'>
                  {product.productGroup}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Barcode;
