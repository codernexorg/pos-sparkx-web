import { Typography } from "antd";
import { Form, Formik } from "formik";
import { addWarehouse } from "../../../redux/actions/warehouse";
import { useAppDispatch, useTypedSelector } from "../../../redux/store";
import { Button, CommonInput } from "../../components";

const AddWH = () => {
    const dispatch = useAppDispatch();
    const {isLoading} = useTypedSelector(state => state.warehouse);
    return (
        <div className='w-full pt-10 flex items-start justify-center flex-col'>
            <Typography className='font-bold text-2xl mb-2 dark:text-white'>
                Add New Location
            </Typography>
            <Formik
                initialValues={
                    {whCode: '', whName: '', whLocation: '', whMobile: ''}
                }
                onSubmit={async (value, {resetForm}) => {
                    await dispatch(addWarehouse(value));
                    resetForm()
                }}
            >
                <Form className='w-full flex flex-col gap-y-6 items-center pt-10 bg-white p-4 dark:bg-primaryColor-900'>
                    <CommonInput
                        required
                        name='whCode'
                        label='Location Code'
                        placeholder='Location Code'
                    />
                    <CommonInput
                        required
                        name='whName'
                        label='Location Name'
                        placeholder='Location Name'
                    />
                    <CommonInput
                        required
                        name='whMobile'
                        label='Location Mobile'
                        placeholder='Location Mobile'
                    />
                    <CommonInput
                        required
                        name='whLocation'
                        label='Current Address'
                        placeholder='Current Address'
                    />
                    <Button type='submit' loading={isLoading} disabled={isLoading}>
                        Save
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default AddWH;
