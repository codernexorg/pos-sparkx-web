import React from 'react'
import PrintAbleLayout from "../../components/PrintAbleLayout";
import {Modal, Table} from "antd";
import ConfirmationModal from "../../components/ConfirmationModal";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {useAppDispatch, useTypedSelector} from "../../../redux/store";
import {Form, Formik} from "formik";
import {Button, CommonInput} from "../../components";
import {createExpenseTypes} from "../../../redux/actions/expenseTypes";

interface ExpenseTypeProps {
}

const ExpenseType: React.FC<ExpenseTypeProps> = () => {
    const dispatch = useAppDispatch()
    const {expenseTypes, isLoading} = useTypedSelector(state => state.expenseType)
    const [confirmationModal, setConfirmationModal] = React.useState(false)
    const [addConfirmationModal, setAddConfirmationModal] = React.useState(false)
    const [openAddModal, setOpenAddModal] = React.useState(false)
    const [itemToDelete, setItemToDelete] = React.useState<number | null>(null)
    return (
        <PrintAbleLayout title={"Expense Types"} handlePrint={() => {
        }} btnText={'Add Expense Type'} handleClick={() => {
            setOpenAddModal(true)
        }}>
            <ConfirmationModal open={confirmationModal} setOpen={setConfirmationModal} execute={async () => {
                console.log(itemToDelete)
            }}/>
            <Modal onCancel={() => setOpenAddModal(false)} footer={false} open={openAddModal}>
                <Formik initialValues={{
                    expenseName: ''
                }} onSubmit={async (values, formikHelpers) => {
                    console.log(values)
                    await dispatch(createExpenseTypes(values))
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

                                <CommonInput label={"Expense Name"} name={'expenseName'}/>

                                <Button type={'submit'} loading={isLoading}>Add Expense</Button>
                            </Form>
                        )
                    }
                </Formik>
            </Modal>
            <Table dataSource={expenseTypes} rowKey={obj => obj.id}>
                <Table.Column title={'Sl'} render={(text, record, index) => index + 1}/>
                <Table.Column title={'Expense Type'} dataIndex={'expenseName'}/>
                <Table.Column title={'Date'}
                              render={(_, expense: IExpense) => new Date(expense.createdAt).toDateString()}/>
                <Table.Column title={'Action'} render={(_, expense: IExpenseType) => {
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

export default ExpenseType