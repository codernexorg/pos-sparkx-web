import { Spin } from 'antd';
import millify from 'millify';
import React from 'react';

const Stats: React.FC<{
  title: string;
  value: number;
  icon?: React.ReactNode;
  isLoading?: boolean;
}> = ({ title, value, icon, isLoading }) => {
  return (
    <div
      className={`h-[150px] min-w-[220px] max-w-fit bg-sky-400 p-2 rounded-md flex flex-col items-start gap-y-4 text-slate-100`}
    >
      <h1 className='text-2xl font-bold'>{title}</h1>
      {!isLoading ? (
        <div className='flex gap-x-4'>
          <p className={` font-semibold text-xl`}>{millify(value)}</p>
          <p className='text-3xl'>{icon}</p>
        </div>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default Stats;
