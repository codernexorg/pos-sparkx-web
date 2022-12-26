import { Spin } from 'antd';

const Loader = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Spin />
    </div>
  );
};

export default Loader;
