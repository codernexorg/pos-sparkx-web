import {Button, Typography} from 'antd';
import {FaFileExcel, FaFilePdf, FaPrint} from 'react-icons/fa';
import style from 'styled-components';
import toExcel from '../utils/toExcel';
import React from "react";
import {useSettingContext} from "../context/SettingProver";
import {UserRole} from "../../types";

interface PrinAbleLayotProps {
    children: React.ReactNode;
    tableId?: string;
    handlePrint?: React.MouseEventHandler;
    handleClick?: React.MouseEventHandler;
    btnText?: React.ReactNode;
    title: string,
    showPrint?: boolean,
    showExcel?: boolean,
    showPDF?: boolean,

}

const Header = style.div`
  display:flex;
  flex-direction:column;
  margin:15px 0;
  row-gap:10px;
  background:#fff;
  padding:20px 10px;
  border-radius:20px 10px;
`;

const PrintAbleLayout: React.FC<PrinAbleLayotProps> = ({
                                                           children,
                                                           tableId,
                                                           handlePrint,
                                                           handleClick,
                                                           btnText,
                                                           title,
                                                           showExcel = true,
                                                           showPrint = true, showPDF
                                                       }) => {
    const {currentUser} = useSettingContext()
    return (
        <div className='w-full flex flex-col'>
            <Header>
                <Typography className='text-2xl font-bold'>{title}</Typography>
                <div className='flex text-sm gap-x-4 '>
                    {
                        showPrint ? <div
                            title='PDF'
                            className='bg-red-900 text-white flex items-center py-0.5 px-2 rounded cursor-pointer'
                            onClick={() => {
                            }}
                        >
                            <FaFilePdf cursor={'pointer'}/> <span>PDF</span>
                        </div> : null
                    }
                    {
                        showExcel ? <div
                            title='Excel'
                            className='bg-green-600 text-white flex items-center py-0.5 px-2 rounded cursor-pointer'
                            onClick={() => tableId && toExcel(tableId)}
                        >
                            <FaFileExcel cursor={'pointer'}/>
                            <span>EXCEL</span>
                        </div> : null
                    }
                    {
                        showPrint ? <div
                            title='Print'
                            className='bg-green-600 text-white flex items-center py-0.5 px-2 rounded cursor-pointer'
                            onClick={handlePrint}
                        >
                            <FaPrint cursor={'pointer'}/>
                            <span>PRINT</span>
                        </div> : null
                    }
                    {
                        currentUser?.role.includes(UserRole[0]) && btnText ?
                            <Button className={'bg-blue-600 text-white hover:text-white'}
                                    onClick={handleClick}>{btnText}</Button> : null
                    }
                </div>
            </Header>
            {children}
        </div>
    );
};

export default PrintAbleLayout;
