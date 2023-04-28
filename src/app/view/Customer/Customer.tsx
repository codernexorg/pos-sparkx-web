import React from "react";
import { Modal, Table, Upload } from "antd";
import { useAppDispatch, useTypedSelector } from "../../../redux/store";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Form, Formik } from "formik";
import { Button, CommonInput } from "../../components";
import {
  deleteCustomer,
  updateCustomer,
} from "../../../redux/actions/customer";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { DraggerProps } from "antd/es/upload";
import { baseURL } from "../../../api";
import { toast } from "react-toastify";

interface CustomerProps {}

const Customer: React.FC<CustomerProps> = () => {
    const dispatch = useAppDispatch()
    const {customers, isLoading} = useTypedSelector((state) => state.customer)

    const [editAbleCustomer, setEditAbleCustomer] = React.useState<ICustomer | null>(null)
    const [openModal, setOpenModal] = React.useState(false)
    const [openImportModal, setImportModal] = React.useState(false)
    const uploaderProps: DraggerProps = {
        name: 'file',
        multiple: false,
        action: `${baseURL}/customer/import`,
        onChange(info: any) {
            const {status, response} = info.file;
            if (status === 'done') {
                toast.success(`Data Importing On Background, Please Reload After Some Time`);
            } else if (status === 'error') {
                toast.error(`${info.file.name} ${response?.message}`);
            }
        },
        withCredentials: true,
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        accept: '.xlsx'
    };
    return (
        <div className={'mt-10'}>
            <div className={'mb-4 flex space-x-5'}>
                <Link className={'border border-slate-400 flex w-[140px] items-center justify-center py-1 gap-x-2 dark:text-white'}
                      to={'add'}>Customer <FaPlus/></Link>
                <Button onClick={() => setImportModal(true)}>Import Customer</Button>
            </div>
            {
                editAbleCustomer && openModal ?
                    <Modal open={openModal} onCancel={() => {
                        setOpenModal(false)
                        setEditAbleCustomer(null)
                    }} footer={false}>
                        <Formik initialValues={editAbleCustomer} onSubmit={async (values) => {
                            await dispatch(updateCustomer(values))
                        }}>
                            {
                                () => (
                                    <Form className='space-y-2'>
                                        <CommonInput label={"Customer Name"} name={'customerName'}/>
                                        <CommonInput label={"Customer Phone"} name={'customerPhone'}/>
                                        <CommonInput label={"Customer Email"} name={'customerEmail'}/>
                                        <CommonInput label={"Customer Address"} name={'customerAddress'}/>
                                        <Button type={'submit'} loading={isLoading}>Update</Button>
                                    </Form>
                                )
                            }

                        </Formik>
                    </Modal> : null
            }
            <Modal open={openImportModal} onCancel={() => setImportModal(false)} footer={false}>
                <Upload.Dragger {...uploaderProps} >
                    <p className='text-lg font-semibold'>
                        Click or drag file to this area to upload
                    </p></Upload.Dragger>
            </Modal>
            <Table dataSource={customers} loading={isLoading} rowKey={(obj, index) => obj.customerPhone} rowClassName={'dark:bg-slate-700 dark:text-white dark:hover:text-primaryColor-900'}>
                <Table.Column title="Name" render={(_,record:ICustomer)=>{
                    return (
                        <Link to={`/dashboard/customer/${record.id}`} className={'text-blue-600'}>
                            {record.customerName}
                        </Link>
                    );
                }
                }/>
                <Table.Column title={"Contact No"} dataIndex={'customerPhone'}/>
                <Table.Column title={"Email"} dataIndex={'customerEmail'}/>
                <Table.Column title={"Address"} dataIndex={'customerAddress'}/>
                <Table.Column title={'Credit'} dataIndex={'credit'}/>
                <Table.Column title={'Lifetime Paid'} dataIndex={'paid'}/>
                <Table.Column title={'Actions'} render={(text, record: ICustomer, index) => {
                    return (
                        <div className={'flex text-2xl gap-x-2'}>
                            <AiOutlineEdit cursor={'pointer'} onClick={() => {
                                setOpenModal(true)
                                setEditAbleCustomer(record)
                            }
                            }/>
                            <AiOutlineDelete cursor={'pointer'} onClick={
                                async () => {
                                    if (!record.id) return
                                    await dispatch(deleteCustomer(record.id))
                                }
                            }/>
                        </div>
                    )
                }}/>
            </Table>
        </div>
    )
}

export default Customer