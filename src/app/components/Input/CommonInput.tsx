import {useField} from 'formik';
import React from 'react';
import {AiFillInfoCircle} from "react-icons/ai";

type CommonInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
};

const CommonInput: React.FC<CommonInputProps> = ({
                                                     size: _,
                                                     label,
                                                     className,
                                                     ...props
                                                 }) => {
    const [field, {error}] = useField(props);

    return (
        <div className=' flex flex-col w-full gap-y-2'>
            <label htmlFor={field.name}>{label}</label>
            <input
                className='h-[37px] w-full rounded border border-b-2 border-b-slate-300 outline-none bg-transparent pl-3'
                {...props}
                id={field.name}
                {...field}
            />
            {error ? <span className={'text-red-700'}>{error}<AiFillInfoCircle/></span> : null}
        </div>
    );
};

export default CommonInput;
