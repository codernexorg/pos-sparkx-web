import {Spin} from 'antd';
import {AxiosError} from 'axios';
import {Form, Formik} from 'formik';
import {useState} from 'react';
import {useIsAuthenticated, useSignIn} from 'react-auth-kit';
import {FaEnvelope, FaEye, FaEyeSlash, FaLock} from 'react-icons/fa';
import {Navigate, useLocation, useNavigate} from 'react-router';
import api from '../../../api';
import {ApiError} from '../../../redux/types';
import Input from '../../components/Input/Input';
import {rejectedToast} from '../../utils/toaster';
import {useAppDispatch} from "../../../redux/store";
import {fetchProduct} from "../../../redux/actions/product";
import {getSupplier} from "../../../redux/actions/supplier";
import {getShowroom} from "../../../redux/actions/showroom";
import {fetchEmployee} from "../../../redux/actions/employee";
import {fetchCustomer} from "../../../redux/actions/customer";
import {getInvoice} from "../../../redux/actions/invoice";
import {fetchExpense} from "../../../redux/actions/expense";

const Login = () => {
    const isAuth = useIsAuthenticated();
    const {pathname} = useLocation();
    const signIn = useSignIn();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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
                initialValues={{usernameOrEmail: '', password: ''}}
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
                            dispatch(fetchProduct())
                            dispatch(getSupplier())
                            dispatch(getShowroom())
                            dispatch(fetchEmployee())
                            dispatch(fetchCustomer())
                            dispatch(getInvoice())
                            dispatch(fetchExpense())
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
                {({isSubmitting}) => (
                    <Form
                        className='max-h-max min-w-[300px] p-5 rounded-md
        flex space-y-6 flex-col bg-fuchsia-900 items-center text-white'
                    >
                        <h3 className='text-2xl'>Login</h3>

                        <Input
                            required={true}
                            name='usernameOrEmail'
                            type='text'
                            label={<FaEnvelope/>}
                            placeholder='Email'
                        />
                        <div className={'relative'}>
                            <Input
                                required
                                name='password'
                                type={`${showPassword ? 'text' : 'password'}`}
                                label={<FaLock/>}
                                placeholder='Password'
                            />
                            {showPassword ? <FaEyeSlash onClick={() => setShowPassword(false)} cursor={'pointer'}
                                                        className={'absolute top-4 right-0 text-black'}/> :
                                <FaEye onClick={() => setShowPassword(true)} cursor={'pointer'}
                                       className={'absolute top-4 right-0 text-black'}/>}
                        </div>
                        <button type='submit' className='border border-blue-50 px-8'>
                            {isLoading ? <Spin/> : null}login
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
