import {Typography} from 'antd';
import {Form, Formik} from 'formik';
import {useRef, useState} from 'react';
import BarcodeGeneratorComponent from 'react-barcode';
import {FaPrint} from 'react-icons/fa';
import {useReactToPrint} from 'react-to-print';
import {printBarcode} from '../../../redux/actions/barcode';
import {useAppDispatch, useTypedSelector} from '../../../redux/store';
import {Button, CommonInput, Loader} from '../../components';

const Barcode = () => {
    const dispatch = useAppDispatch();


    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => printRef.current
    });
    const {products, isLoading} = useTypedSelector(state => state.barcode);

    const [isClicked, setIsClicked] = useState<boolean>(false);

    // useEffect(() => {
    //   fetchProduct();
    // }, [dispatch]);
    const LotForm = () => {
        return (
            <div>
                <Formik
                    initialValues={{lotNumber: 0}}
                    onSubmit={value => {
                        dispatch(printBarcode(value));
                        setIsClicked(true);
                    }}
                >
                    {() => (
                        <Form className='bg-white p-10 rounder flex flex-col items-center gap-y-4'>
                            <CommonInput label='Lot Number' name='lotNumber'/>
                            <Button type='submit'>Go</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    };

    if (!isClicked) {
        return <LotForm/>;
    }
    if (isLoading) {
        return <Loader/>;
    }

    if (!products?.length) {
        return (
            <div className='w-full h-screen flex flex-col items-center justify-center bg-white'>
                <Typography.Title level={3}>
                    No Product To Print Barcode ! Please Try A Different Lot Number
                </Typography.Title>
                <Button type='button' onClick={() => setIsClicked(false)}>
                    Go Back
                </Button>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between items-center'>
                <Typography.Title level={3}>Barcodes</Typography.Title>
                <div className={'flex gap-x-5'}>
                    <span className={'text-xl font-semibold'}>Lot Number: {products[0].lotNumber}</span>

                    <span className={'text-xl font-semibold'}>Total Products: {products.length}</span></div>
                <div className='flex gap-x-10'>
                    <Button
                        onClick={() => {
                            setIsClicked(false);
                        }}
                    >
                        Back
                    </Button>
                    <button
                        onClick={handlePrint}
                        className='flex gap-x-2 bg-yellow-300 items-center px-4 rounded py-1'
                    >
                        <FaPrint/>
                        Print
                    </button>
                </div>
            </div>
            <div className='barcode__container' ref={printRef}>
                {products?.map((product, i) => {
                    return (
                        <div className='barcode__wrapper'>
                            <div
                                className='barcode__item'>
                                <p
                                    className='text-[11px] font-bold text-center'
                                >
                                    {product.productGroup}
                                </p>
                                <p
                                    className='text-[11px] font-bold'
                                >
                                    Taka: {product.sellPrice}
                                </p>
                                <BarcodeGeneratorComponent
                                    key={i}
                                    width={1}
                                    height={25}
                                    value={product.itemCode.toString()}
                                    displayValue={false}
                                    margin={0}
                                    format='CODE128'
                                    textAlign='center'
                                />
                                <p className='text-[13px] font-bold'>{product.itemCode}</p>
                            </div>
                            {/*w-[320px] h-[110px] items-center bg-white flex flex-col justify-center*/}
                            <div
                                className='barcode__item'>

                                <p
                                    className='text-[11px] font-bold text-center'
                                >
                                    {product.productGroup}
                                </p>
                                <p
                                    className='text-[11px] font-bold'
                                >
                                    Taka: {product.sellPrice}
                                </p>
                                <BarcodeGeneratorComponent
                                    key={i}
                                    width={1}
                                    height={25}
                                    margin={0}
                                    value={product.itemCode.toString()}
                                    displayValue={false}
                                    format='CODE128'
                                    textAlign='center'
                                />
                                <p className='text-[13px] font-bold'>{product.itemCode}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Barcode;
