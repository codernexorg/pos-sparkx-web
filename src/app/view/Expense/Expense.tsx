import React from 'react'
import PrintAbleLayout from "../../components/PrintAbleLayout";
import {Modal, Table} from "antd";
import {useAppDispatch, useTypedSelector} from "../../../redux/store";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import ConfirmationModal from "../../components/ConfirmationModal";
import {Form, Formik} from "formik";
import {Button, CommonInput, SelectInput} from "../../components";
import {createExpense} from "../../../redux/actions/expense";
import {useSettingContext} from "../../context/SettingProver";
import {UserRole} from "../../../types";

interface ExpenseProps {
}

const Expense: React.FC<ExpenseProps> = () => {
    const dispatch = useAppDispatch()
    const {expenses, isLoading} = useTypedSelector(state => state.expense)
    const {employees} = useTypedSelector(state => state.employee)
    const {expenseTypes} = useTypedSelector(state => state.expenseType)
    const [confirmationModal, setConfirmationModal] = React.useState(false)
    const [itemToDelete, setItemToDelete] = React.useState<number | null>(null)
    const [openAddModal, setOpenAddModal] = React.useState(false)
    const [addConfirmationModal, setAddConfirmationModal] = React.useState(false)
    const {currentUser} = useSettingContext()
    return (
        <PrintAbleLayout title={"Expenses"} handlePrint={() => {
        }} tableId={'expense'} btnText={'Add Expense'} handleClick={() => {
            setOpenAddModal(true)
        }}
                         showPrint={true} showExcel={true} showPDF={true}
        >
            <ConfirmationModal open={confirmationModal} setOpen={setConfirmationModal} execute={async () => {
                console.log(itemToDelete)
            }}/>
            <Modal onCancel={() => setOpenAddModal(false)} footer={false} open={openAddModal}>
                <Formik initialValues={{
                    expenseName: '',
                    empId: 0, expenseReason: '', expenseCost: 0
                }} onSubmit={async (values, formikHelpers) => {
                    await dispatch(createExpense(values))
                    setOpenAddModal(false)
                }}>
                    {
                        ({handleSubmit, values}) => (

                            <Form method={'POST'} onSubmit={(e) => {
                                e.preventDefault()
                                setAddConfirmationModal(true)
                            }
                            }>
                                <ConfirmationModal open={addConfirmationModal} setOpen={setAddConfirmationModal}
                                                   execute={async () => {
                                                       await handleSubmit()
                                                       setAddConfirmationModal(false)
                                                   }}/>

                                <SelectInput label={"Expense Type"} name={'expenseName'}
                                             children={expenseTypes.map(ex =>
                                                 <option key={ex.id}
                                                         value={ex.expenseName}>{ex.expenseName}</option>)}/>
                                <CommonInput label={"Expense Cost"} name={'expenseCost'} type={'number'}/>
                                <CommonInput label={"Expense Reason"} name={'expenseReason'} type={'text'}/>
                                {
                                    values.expenseName.includes('Salary') ?
                                        <SelectInput label={"Select Employee"} name={'empId'}
                                                     children={employees.map((emp) => <option key={emp.id}
                                                                                              value={emp.id}>{emp.empName}</option>)}/> : null
                                }
                                <Button type={'submit'} loading={isLoading}>Add Expense</Button>
                            </Form>
                        )
                    }
                </Formik>
            </Modal>
            <Table dataSource={expenses} rowKey={obj => obj.id}>
                <Table.Column title={'Sl'} render={(text, record, index) => index + 1}/>
                <Table.Column title={'Expense Type'} dataIndex={'expenseName'}/>
                <Table.Column title={'Description'} dataIndex={'expenseReason'}/>
                <Table.Column title={'Amount'} dataIndex={'expenseCost'}/>
                <Table.Column title={'Salary Employee'} render={(_, record: IExpense) => {
                    if (record.expenseName.includes('Salary')) {
                        return employees.find(emp => emp.id === record.employeeId)?.empName
                    } else {
                        return '-'
                    }
                }}/>
                {
                    currentUser?.role.includes(UserRole[0]) ? <Table.Column title={"Showroom"}
                                                                            render={(_, record: IExpense) => record.showroom?.showroomName ? record?.showroom.showroomName : 'Head Office'}/> : null
                }
                <Table.Column title={'Date'}
                              render={(_, expense: IExpense) => new Date(expense.createdAt).toDateString()}/>
                <Table.Column title={'Action'} render={(_, expense: IExpense) => {
                    return (
                        <div className={'flex text-xl'}>

                            <AiOutlineEdit onClick={() => {
                            }}/>
                            <AiOutlineDelete onClick={() => {
                                setItemToDelete(expense.id)
                                setConfirmationModal(true)
                            }}/>
                        </div>
                    )
                }}/>

            </Table>
        </PrintAbleLayout>
    )
}

export default Expense