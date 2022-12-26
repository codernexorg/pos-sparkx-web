import { useField } from 'formik';
import React from 'react';

type CommonInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const CommonInput: React.FC<CommonInputProps> = ({
  size: _,
  label,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <div className='flex flex-col w-full gap-y-2'>
      <label htmlFor={field.name}>{label}</label>
      <input
        className='h-[37px] rounded border border-b-2 border-b-slate-300 outline-none bg-transparent pl-3'
        {...props}
        id={field.name}
        {...field}
      />
      {error ? <p>{error}</p> : null}
    </div>
  );
};

export default CommonInput;
