import React from 'react'
import {Modal, Table} from "antd";
import {useAppDispatch, useTypedSelector} from "../../../redux/store";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {Form, Formik} from "formik";
import {Button, CommonInput} from "../../components";
import {deleteCustomer, updateCustomer} from "../../../redux/actions/customer";
import {Link} from "react-router-dom";
import {FaPlus} from "react-icons/fa";

interface CustomerProps {
}

const Customer: React.FC<CustomerProps> = () => {
    const dispatch = useAppDispatch()
    const {customers, isLoading} = useTypedSelector((state) => state.customer)

    const [editAbleCustomer, setEditAbleCustomer] = React.useState<ICustomer | null>(null)
    const [openModal, setOpenModal] = React.useState(false)
    return (
        <div className={'mt-10'}>
            <div className={'mb-4'}>
                <Link className={'border border-slate-400 flex w-[140px] items-center justify-center py-1 gap-x-2'}
                      to={'add'}>Customer <FaPlus/></Link>
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
            <Table dataSource={customers} loading={isLoading} rowKey={(obj, index) => obj.customerPhone}>
                <Table.Column title="Name" dataIndex="customerName"/>
                <Table.Column title={"Contact No"} dataIndex={'customerPhone'}/>
                <Table.Column title={"Email"} dataIndex={'customerEmail'}/>
                <Table.Column title={"Address"} dataIndex={'customerAddress'}/>
                <Table.Column title={'Credit'} dataIndex={'credit'}/>
                <Table.Column title={'Lifetime Due'} dataIndex={'due'} sorter={(a: ICustomer, b: ICustomer) => {
                    if (a.due && b.due) {
                        return a.due.toString().localeCompare(b.due.toString())
                    }
                    return 0
                }
                }/>
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