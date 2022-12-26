import { Spin } from 'antd';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Navigate, useLocation, useNavigate } from 'react-router';
import api from '../../../api';
import { ApiError } from '../../../redux/types';
import Input from '../../components/Input/Input';
import { rejectedToast } from '../../utils/toaster';
const Login = () => {
  const isAuth = useIsAuthenticated();
  const { pathname } = useLocation();
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (isAuth()) {
    return (
      <Navigate
        to={'/dashboard'}
        replace
        state={{
          from: pathname
        }}
      />
    );
  }

  return (
    <div className='w-[100%] min-h-screen flex items-center justify-center'>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async value => {
          setIsLoading(true);
          api
            .post('/auth/login', value)
            .then(res => {
              signIn({
                token: res.data!.token,
                authState: res.data!.user,
                expiresIn: 1000 * 60 * 60 * 24 * 365,
                tokenType: 'Bearer'
              });
              localStorage.setItem('token', res.data!.token);
              navigate('/dashboard', {
                replace: true
              });
            })
            .catch((err: AxiosError<ApiError>) => {
              rejectedToast(err);
            });

          setIsLoading(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form
            className='max-h-max min-w-[300px] p-5 rounded-md
        flex space-y-6 flex-col bg-fuchsia-900 items-center text-white'
          >
            <h3 className='text-2xl'>Login</h3>

            <Input
              name='usernameOrEmail'
              type='text'
              label={<FaEnvelope />}
              placeholder='Email'
            />
            <Input
              name='password'
              type='text'
              label={<FaLock />}
              placeholder='Password'
            />
            <button type='submit' className='border border-blue-50 px-8'>
              {isLoading ? <Spin /> : null}login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
