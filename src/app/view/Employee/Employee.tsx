import React from 'react'
import {useAppDispatch, useTypedSelector} from "../../../redux/store";
import {Modal, Table} from "antd";
import PrintAbleLayout from "../../components/PrintAbleLayout";
import {Form, Formik} from "formik";
import {Button, CommonInput, SelectInput} from "../../components";
import {createEmployee, deleteEmployee, updateEmployee} from "../../../redux/actions/employee";
import {AiOutlineDelete, AiOutlineEdit, AiOutlineEye} from "react-icons/ai";
import ConfirmationModal from "../../components/ConfirmationModal";

interface EmployeeProps {
}

const Employee: React.FC<EmployeeProps> = () => {
    const dispatch = useAppDispatch()

    const {isLoading, employees} = useTypedSelector(state => state.employee);
    const {showroom} = useTypedSelector(state => state.showroom);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [editAble, setEditAble] = React.useState<IEmployee | null>(null);
    const [confirmationModal, setConfirmationModal] = React.useState(false);
    const [itemToDelete, setItemToDelete] = React.useState(0);
    const [openViewModal, setOpenViewModal] = React.useState(false);
    const [employee, setEmployee] = React.useState<IEmployee | null>(null);
    return (
        <div>
            {/*Add Employee Modal*/}
            <Modal footer={false} open={openAdd} onCancel={() => setOpenAdd(false)}>

                <Formik initialValues={{
                    empName: '',
                    empPhone: '',
                    designation: '',
                    empAddress: '',
                    showroom: '',
                    empEmail: '',
                    empSalary: 0
                }} onSubmit={async values => {
                    console.log(values)
                    await dispatch(createEmployee(values))
                    setOpenAdd(false)
                }}>
                    <Form>
                        <CommonInput label={"Name *"} name={'empName'} placeholder={'Employee Name '} required={true}/>
                        <CommonInput label={"Email"} name={'empEmail'} placeholder={'Employee Email'} required={false}/>
                        <CommonInput label={"Phone *"} name={'empPhone'} placeholder={'Employee Phone'}
                                     required={true}/>
                        <CommonInput label={"Address"} name={'empAddress'} placeholder={'Employee Address'}
                                     required={false}/>
                        <CommonInput label={"Salary Amount"} type={'number'} name={'empSalary'}
                                     placeholder={'Employee Salary'}
                                     required={false}/>
                        <SelectInput required={true} name={'designation'} label={"Select Designation"}>
                            <option value={'Manager'}>Manager</option>
                            <option value={'SalesMan'}>SalesMan</option>
                            <option value={'Other'}>Other</option>
                        </SelectInput>
                        <SelectInput required={true} label={"Select Showroom *"} name={'showroom'}>
                            {
                                showroom.map((item, index) => {
                                    return <option key={index} value={item.showroomName}>{item.showroomName}</option>
                                })
                            }
                        </SelectInput>
                        <Button type={'submit'}>Add Employee</Button>
                    </Form>
                </Formik>
            </Modal>

            {/*Edit Employee Modal*/}

            <Modal footer={false} open={openEdit} onCancel={() => setOpenEdit(false)}>

                {editAble && <Formik initialValues={{
                    empName: editAble.empName,
                    empPhone: editAble.empPhone,
                    designation: editAble.designation,
                    empAddress: editAble.empAddress,
                    showroom: editAble.showroom,
                    empEmail: editAble.empEmail,
                    empSalary: editAble.empSalary
                }} enableReinitialize={true} onSubmit={async values => {
                    await dispatch(updateEmployee(editAble.id, values))
                    setOpenAdd(false)
                }}>
                    <Form>
                        <CommonInput label={"Name *"} name={'empName'} placeholder={'Employee Name '} required={true}/>
                        <CommonInput label={"Email"} name={'empEmail'} placeholder={'Employee Email'} required={false}/>
                        <CommonInput label={"Phone *"} name={'empPhone'} placeholder={'Employee Phone'}
                                     required={true}/>
                        <CommonInput label={"Address"} name={'empAddress'} placeholder={'Employee Address'}
                                     required={false}/>
                        <CommonInput type={'number'} label={"Salary Amount"} name={'empSalary'}
                                     placeholder={'Employee Salary'}
                                     required={false}/>
                        <SelectInput required={true} name={'designation'} label={"Select Designation"}>
                            <option value={'Manager'}>Manager</option>
                            <option value={'SalesMan'}>SalesMan</option>
                            <option value={'Other'}>Other</option>
                        </SelectInput>
                        <SelectInput required={true} label={"Select Showroom *"} name={'showroom'}>
                            {
                                showroom.map((item, index) => {
                                    return <option key={index} value={item.showroomName}>{item.showroomName}</option>
                                })
                            }
                        </SelectInput>
                        <Button type={'submit'}>Update Employee</Button>
                    </Form>
                </Formik>}
            </Modal>
            {/*Vie Employee Modal*/}
            <Modal width={1000} footer={false} open={openViewModal} onCancel={() => setOpenViewModal(false)}>
                <div className={'text-[16px]  space-y-2'}>
                    <p className={'font-semibold'}>Emp Name: {employee?.empName}</p>
                    <p className={'font-semibold'}>Designation: {employee?.designation}</p>
                    <p className={'font-semibold'}>Contact Number: {employee?.empPhone}</p>
                    <p className={'font-semibold'}>Address: {employee?.empAddress}</p>
                    <p className={'font-semibold'}>Email: {employee?.empEmail}</p>
                    <p className={'font-semibold'}>Total Sales: {employee?.sales?.length}</p>
                    <p className={'font-semibold'}>Joining Date: {employee?.joiningDate}</p>
                    <div className={'mt-4'}>
                        <h1 className={'text-xl font-semibold'}>Sales Table</h1>
                        <Table dataSource={employee?.sales} rowKey={obj => obj.id}>
                            <Table.Column title={'sl'} render={(_, rec, i) => i + 1}/>
                            <Table.Column title={'Total Items'} render={(_, rec: Invoice) => rec.products.length}/>
                            <Table.Column title={'Total Price'} render={(_, rec: Invoice) => rec.invoiceAmount}/>
                            <Table.Column title={'Date'} filtered={true}
                                          render={(_, record: Invoice) => new Date(record.createdAt).toDateString()}/>
                        </Table>
                    </div>
                    <div className={'mt-4'}>
                        <h1 className={'text-xl font-semibold'}>Salary Table</h1>
                        <Table rowKey={obj => obj.id} dataSource={employee?.salary}>
                            <Table.Column title="Salary Amount" dataIndex="salaryAmount" key="salaryAmount"/>
                            <Table.Column title="Date" dataIndex="createdAt"
                                          render={(_, record: ISalary) => new Date(record.createdAt).toDateString()}/>
                        </Table>
                    </div>
                </div>

            </Modal>


            {/*Delete Employee Modal*/}
            <ConfirmationModal open={confirmationModal} setOpen={setConfirmationModal} execute={async () => {
                await dispatch(deleteEmployee(itemToDelete))
                setConfirmationModal(false)
            }}/>
            {/*All Employees Table*/}
            <PrintAbleLayout title={'Employees'} tableId={'employee'} handlePrint={() => {
            }} btnText={'Add Employee'} handleClick={() => setOpenAdd(true)}>
                <Table rowKey={obj => obj.id} id={'employee'} dataSource={employees} loading={isLoading}>
                    <Table.Column title="Name" dataIndex="empName" key="empName"/>
                    <Table.Column title="Phone" dataIndex={'empPhone'} key={'empPhone'}/>
                    <Table.Column title="Email" dataIndex={'empEmail'} key={'empEmail'}/>
                    <Table.Column title="Address" dataIndex={'empAddress'} key={'empAddress'}/>
                    <Table.Column title="Basic Salary" dataIndex={'empSalary'} key={'empSalary'}/>
                    <Table.Column title="Designation" dataIndex={'designation'} key={'designation'}/>
                    <Table.Column title="Sales Count" render={(_, record: IEmployee) => record.sales?.length}
                                  key={'sales'}/>
                    <Table.Column title={'Showroom'} dataIndex={'showroom'}/>
                    <Table.Column title={"Actions"} render={(_, record: IEmployee) => {
                        return (
                            <div className={'flex text-xl gap-x-2'}>
                                <AiOutlineEye cursor={'pointer'} onClick={() => {
                                    setEmployee(record)
                                    setOpenViewModal(true)
                                }}/>
                                <AiOutlineEdit cursor={'pointer'} onClick={() => {
                                    setEditAble(record)
                                    setOpenEdit(true)
                                }}/>
                                <AiOutlineDelete cursor={'pointer'} onClick={async () => {
                                    setItemToDelete(record.id)
                                    setConfirmationModal(true)
                                }}/>
                            </div>
                        )
                    }
                    }/>
                </Table>
            </PrintAbleLayout>
        </div>
    )
}

export default Employee