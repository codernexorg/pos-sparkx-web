import { Typography } from 'antd';
import { Form, Formik } from 'formik';
import { createShowroom } from '../../../redux/actions/showroom';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Showroom } from '../../../redux/types';
import { Button, CommonInput } from '../../components';

const AddSR = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useTypedSelector(state => state.showroom);

  return (
    <div>
      <Typography className='text-2xl my-10'>Add New Showroom</Typography>
      <Formik
        initialValues={
          {
            showroomName: '',
            showroomAddress: '',
            showroomCode: ''
          } satisfies Showroom
        }
        onSubmit={(value, { resetForm }) =>
          dispatch(createShowroom(value, resetForm))
        }
      >
        <Form className='bg-white p-10 rounded flex flex-col gap-y-6 items-center'>
          <CommonInput
            name='showroomCode'
            label='Showroom Code'
            placeholder='Showroom Code'
          />
          <CommonInput
            name='showroomName'
            label='Showroom Name'
            placeholder='Showroom Name'
          />
          <CommonInput
            name='showroomAddress'
            label='Showroom Address'
            placeholder='Showroom Address'
          />
          <Button type='submit' loading={isLoading} disabled={isLoading}>
            Save
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddSR;
