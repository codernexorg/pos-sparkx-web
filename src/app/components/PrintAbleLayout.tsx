import { Button, Tooltip, Typography } from "antd";
import { FaFileExcel, FaFilePdf, FaPrint } from "react-icons/fa";
import style from "styled-components";
import React from "react";
import { useSettingContext } from "../context/SettingProver";
import { UserRole } from "../../types";
import { Field, Form, Formik } from "formik";
import { BiReset } from "react-icons/bi";
import { AiFillQuestionCircle } from "react-icons/ai";

interface PrinAbleLayotProps {
  children: React.ReactNode;
  handleExcel?: React.MouseEventHandler;
  handlePrint?: React.MouseEventHandler;
  handlePdf?: React.MouseEventHandler;
  handleClick?: React.MouseEventHandler;
  btnText?: React.ReactNode;
  title: string;
  showPrint?: boolean;
  showExcel?: boolean;
  showPDF?: boolean;
  handleSearch?: (data: string) => void;
  resetSearch?: () => void;
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
  handleExcel,
  handlePrint,
  handleClick,
  btnText,
  title,
  showExcel = true,
  showPrint = true,
  showPDF = true,
  handlePdf,
  handleSearch,resetSearch
}) => {
  const { currentUser } = useSettingContext();
  return (
    <div className="w-full flex flex-col">
      <Header className={'dark:bg-slate-700 '}>
        <Typography className="text-2xl font-bold dark:text-white">{title}</Typography>
        <div className="flex text-sm gap-x-4 items-center">
          {showPDF ? (
            <button
              title="PDF"
              className="bg-red-900 text-white flex items-center py-0.5 px-2 rounded cursor-pointer h-8 hover:bg-red-500 duration-300"
              onClick={handlePdf}
            >
              <FaFilePdf cursor={"pointer"} /> <span>PDF</span>
            </button>
          ) : null}
          {showExcel ? (
            <button
              title="Excel"
              className="bg-green-600 text-white flex items-center py-0.5 px-2 rounded cursor-pointer h-8 hover:bg-green-500 duration-300"
              onClick={handleExcel}
            >
              <FaFileExcel cursor={"pointer"} />
              <span>EXCEL</span>
            </button>
          ) : null}
          {showPrint ? (
            <button
              title="Print"
              className="bg-green-600 text-white flex items-center py-0.5 px-2 rounded cursor-pointer h-8 hover:bg-green-500 duration-300"
              onClick={handlePrint}
            >
              <FaPrint cursor={"pointer"} />
              <span>PRINT</span>
            </button>
          ) : null}
          {!currentUser?.role.includes(UserRole[2]) && btnText ? (
            <Button
              className={"bg-blue-600 text-white hover:text-white"}
              onClick={handleClick}
            >
              {<span className={"text-white"}>{btnText}</span>}
            </Button>
          ) : null}
          {handleSearch ? (
            <>
              <Formik initialValues={{search:''}} onSubmit={
                (values,{resetForm})=>{
                  handleSearch(values.search)
                  resetForm()
                }
              }>
                <Form>

                    <Field name={'search'} placeholder={'Search'} className={'w-[300px] border border-primary-color h-8 focus:border-blue-300 transition-all duration-500 pl-2 outline-none rounded'}/>

                </Form>

              </Formik>
              <Tooltip title={'Press Enter On Keyboard To Search'}>
                <AiFillQuestionCircle fontSize={18}/>
              </Tooltip>
              <button className={'btn__common'} onClick={resetSearch}>Reset <BiReset/></button>
            </>
          ) : null}
        </div>
      </Header>
      {children}
    </div>
  );
};

export default PrintAbleLayout;