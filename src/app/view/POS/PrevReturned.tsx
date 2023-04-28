import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useAppDispatch, useTypedSelector } from "../../../redux/store";
import { fetchReturned } from "../../../redux/actions/returned";
import { Field, Form, Formik } from "formik";
import { filter } from "underscore";
import { BiReset } from "react-icons/bi";

interface PrevReturnedProps {}

const PrevReturned: React.FC<PrevReturnedProps> = () => {
    const dispatch=useAppDispatch()
    useEffect(()=>{
        dispatch(fetchReturned())
    },[dispatch])
    const {returned,isLoading}=useTypedSelector(state=>state.returned)
    const [filteredReturned,setFilteredReturned]=useState<IReturned[]>([])
    useEffect(() => {
        setFilteredReturned(returned);
    }, [returned]);
    return (
        <div>
           <h1 className={'card__title dark:text-white'}>Returned</h1>
            <div className={'flex  gap-x-3 mb-3'}>
                <Formik initialValues={{searchTerm:''}} onSubmit={(values)=>{
                    setFilteredReturned(filter(returned,(r)=>r.invoiceNo===values.searchTerm))
                }
                }>
                    <Form>
                        <Field className={'w-[240px] h-9 border border-primary-color focus:outline-none rounded-md pl-2'} name={'searchTerm'} placeholder={'Invoice No'}/>
                    </Form>
                </Formik>
                <button className={'text-white bg-green-500 h- w-[140px] rounded-md flex items-center justify-center gap-x-3'} onClick={()=>setFilteredReturned(returned)}><BiReset/> Reset</button>
            </div>
            <Table dataSource={filteredReturned} rowKey={(obj:IReturned)=>obj.id} loading={isLoading} pagination={{pageSize:50}} rowClassName={'dark:bg-slate-700 dark:text-white dark:hover:text-primaryColor-900'}>
                <Table.Column title={'Invoice No'} dataIndex={'invoiceNo'}/>
                <Table.Column title={'Returned Amount'} dataIndex={'amount'}/>
                <Table.Column title={'Customer Phone'} dataIndex={'customerPhone'}/>
                <Table.Column title={'ItemCode - SellPrice - Seller Name'} render={(_,record:IReturned)=>{
                    return record.products.map(p=>{
                        console.log(p)
                        return <li className={'text-primaryColor-900 font-semibold font-inter'} key={p.itemCode}>{p.itemCode} - {p.sellPriceAfterDiscount} - {p.employee?.empName}</li>
                    })
                }
                }/>
                <Table.Column title={'Check'} render={(_,record:IReturned)=>{
                    return <div className={'bg-green-500 text-center text-white rounded-md'}>{record.check?record.check:'0%'}</div>
                }
                }/>
                <Table.Column title={'Sales Time'} render={(_,record:IReturned)=>new Date(record.salesDate).toLocaleTimeString('en-US',{
                    day:'numeric',month:'numeric',year:'numeric'
                })}/>
                <Table.Column title={'Returned Time'} render={(_,record:IReturned)=>new Date(record.createdAt).toLocaleTimeString('en-US',{
                    day:'numeric',month:'numeric',year:'numeric'
                })}/>
            </Table>
        </div>
    )
}

export default PrevReturned

