import React from 'react'
import {Form, Formik} from "formik";
import {useAppDispatch, useTypedSelector} from "../../../redux/store";
import {createCustomer} from "../../../redux/actions/customer";
import {Button, CommonInput} from "../../components";

interface AddCustomerProps {
}

const AddCustomer: React.FC<AddCustomerProps> = () => {
    const dispatch = useAppDispatch();
    const {isLoading} = useTypedSelector(state => state.customer)
    return (
        <div className={'mt-10'}>
            <h1 className={'text-2xl mb-10'}>Create New Customer</h1>
            <Formik initialValues={{
                customerName: '',
                customerPhone: '',
                customerEmail: '',
                customerAddress: ''
            }satisfies ICustomer} onSubmit={async (values, {resetForm}) => {
                await dispatch(createCustomer(values))
                resetForm()
            }}>
                <Form className='space-y-2'>
                    <CommonInput required={true} label={"Customer Name"} name={'customerName'}/>
                    <CommonInput required={true} label={"Customer Phone"} name={'customerPhone'}/>
                    <CommonInput label={"Customer Email"} name={'customerEmail'}/>
                    <CommonInput label={"Customer Address"} name={'customerAddress'}/>
                    <Button type={'submit'} loading={isLoading}>Save</Button>
                </Form>

            </Formik>
        </div>
    )
}

export default AddCustomer