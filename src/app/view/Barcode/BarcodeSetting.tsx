import { Spin } from 'antd';

const BarcodeSetting = () => {
  return (
    <div className='flex justify-center mt-10'>
      <div className='bg-white w-[80%] h-[300px] p-10 rounded-md flex items-center justify-center'>
        <h1 className='text-3xl'>
          Barcode Settings Under Maintenance <Spin />{' '}
        </h1>
      </div>
    </div>
  );
};

export default BarcodeSetting;
