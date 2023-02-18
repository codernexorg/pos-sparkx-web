import {FaHandHolding, FaPlus, FaSearch, FaUser} from 'react-icons/fa';

import {useAppDispatch, useTypedSelector} from "../../../redux/store";
import React, {useEffect, useRef, useState} from "react";
import {Button, CommonInput} from "../../components";
import {Modal, Select, Spin, Table} from "antd";
import {AiFillCloseCircle, AiOutlineClose, AiOutlineEdit} from "react-icons/ai";
import {Field, Form, Formik} from "formik";
import {useReactToPrint} from "react-to-print";
import {filter} from 'underscore'
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {BiReceipt, BiReset} from "react-icons/bi";
import {getInvoice} from "../../../redux/actions/invoice";
import Barcode from "react-barcode";
import {createCustomer} from "../../../redux/actions/customer";
import api from "../../../api";
import {fetchProduct} from "../../../redux/actions/product";
import {ApiError} from "../../../redux/types";
import {AxiosError} from "axios";
import {rejectedToast} from "../../utils/toaster";

const Sell = () => {
    const dispatch = useAppDispatch()
    const [confirmationModal, setConfirmationModal] = useState(false)

    useEffect(() => {
        dispatch(getInvoice())
        setUpdateInvoice(false)
        setUpdateInvoiceId(null)
    }, [dispatch])

    //Invoice

    const invoiceRef = useRef<HTMLDivElement>(null)
    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current
    })

    const [updateInvoice, setUpdateInvoice] = useState(false)
    const [updateInvoiceId, setUpdateInvoiceId] = useState<number | null>(null)

    const [showInvoice, setShowInvoice] = useState(false)
    const [invoiceData, setInvoiceData] = useState<Invoice | null>(null)
    const {invoices, isLoading} = useTypedSelector(state => state.invoice)
    const [showRecentInvoice, setShowRecentInvoice] = useState(false)
    const [showHoldInvoice, setShowHoldInvoice] = useState(false)

    //Invoice ENd

    //Product
    const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null)
    const [cart, setCart] = useState<Product[]>([])
    const {products} = useTypedSelector(state => state.products)

    const removeFromCart = (itemCode: string) => {
        const removedCart = cart.filter(item => item.itemCode !== itemCode)
        setCart(removedCart)
    }

    //Product End


    const [showCustomerModal, setShowModal] = useState(false);
    const [customerTerm, setCustomerTerm] = useState<string>('Walker Customer')
    //Customer

    const {customers} = useTypedSelector(state => state.customer)
    //Customer End

    //Employee
    const {employees} = useTypedSelector(state => state.employee)
    const [empName, setEmpName] = useState<string>('Select Employee')
    //Employee End


    const [loading, setLoading] = useState(false)

    const {business} = useTypedSelector(state => state.business)

    function totalPrice(items: Product[]): number {
        let price: number = 0
        for (let i = 0; i < items.length; i++) {
            price += items[i].sellPrice
        }
        return price
    }

    return (
        <div className='bg-white min-h-[50vh] p-4 flex flex-col gap-y-6 rounded-md'
             onClick={() => setFilteredProducts([])}>

            <div className={'flex justify-end'}>
                <button className={'flex gap-x-2 items-center px-2 py-1 '} onClick={() => setShowRecentInvoice(true)}>
                    <BiReceipt/> Recent Transactions
                </button>
                <button className={'flex gap-x-2 items-center px-2 py-1 '} onClick={() => setShowHoldInvoice(true)}>
                    <FaHandHolding/> Hold Transactions
                </button>
            </div>

            {/*Recent Transactions Modal*/}
            <Modal open={showRecentInvoice} onCancel={() => setShowRecentInvoice(false)} footer={false} width={'90vw'}>
                <div>
                    <Table loading={isLoading} className={'text-center'} dataSource={invoices}
                           rowKey={(obj, idx) => obj.invoiceNo}
                           pagination={{defaultPageSize: 30}}>
                        <Table.Column title={"#"} render={(text, record, index) => index + 1}/>
                        <Table.Column title={'Invoice No'} dataIndex={'invoiceNo'}/>
                        <Table.Column title={"Invoice Amount"} dataIndex='invoiceAmount' render={(text) => `${text}৳`}/>
                        <Table.Column title={"Invoice Status"} dataIndex={'invoiceStatus'} render={(text) => <p
                            className={`${text === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>{text}</p>}/>
                        <Table.Column title={"Customer"} dataIndex={'customerName'}/>
                        {
                            invoiceData?.invoiceStatus !== "Due" ?
                                <Table.Column title={'Due'} dataIndex={'dueAmount'}
                                              render={(text, rec: Invoice, index) => {
                                                  if (rec.dueAmount > 0) {
                                                      return `${rec.dueAmount}৳`
                                                  } else {
                                                      return `-`
                                                  }
                                              }
                                              }/>
                                : null
                        }
                        <Table.Column title={'Created'} render={(text, record: Invoice) => {
                            return new Date(record.createdAt).toDateString()
                        }
                        }/>
                    </Table>
                </div>
                ;
            </Modal>

            {/*Hold Transactions Modal*/}

            <Modal open={showHoldInvoice} onCancel={() => setShowHoldInvoice(false)} footer={false} width={'90vw'}>
                <div>
                    <Table loading={isLoading} className={'text-center'}
                           dataSource={invoices.filter(invoice => invoice.invoiceStatus === "Hold")}
                           rowKey={(obj, idx) => obj.invoiceNo}
                           pagination={{defaultPageSize: 30}}>
                        <Table.Column title={"#"} render={(text, record, index) => index + 1}/>
                        <Table.Column title={'Invoice No'} dataIndex={'invoiceNo'}/>
                        <Table.Column title={"Invoice Amount"} dataIndex='invoiceAmount' render={(text) => `${text}৳`}/>
                        <Table.Column title={"Invoice Status"} dataIndex={'invoiceStatus'} render={(text) => <p
                            className={`${text === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>{text}</p>}/>
                        <Table.Column title={"Customer"} dataIndex={'customerName'}/>
                        {
                            invoiceData?.invoiceStatus !== "Due" ?
                                <Table.Column title={'Due'} dataIndex={'dueAmount'}
                                              render={(text, rec: Invoice, index) => {
                                                  if (rec.dueAmount > 0) {
                                                      return `${rec.dueAmount}৳`
                                                  } else {
                                                      return `-`
                                                  }
                                              }
                                              }/>
                                : null
                        }

                        <Table.Column title={'Actions'} dataIndex={'invoiceNo'}
                                      render={(text, record: Invoice, index) => {
                                          return (
                                              <Button onClick={() => {
                                                  setUpdateInvoiceId(record.id)
                                                  setUpdateInvoice(true)
                                                  setCart(record.products)
                                                  setCustomerTerm(record.customerName)
                                                  setShowHoldInvoice(false)
                                              }

                                              }><AiOutlineEdit/></Button>
                                          )
                                      }}/>
                        <Table.Column title={'Created'} render={(text, record: Invoice) => {
                            return new Date(record.createdAt).toDateString()
                        }
                        }/>
                    </Table>
                </div>
                ;
            </Modal>

            {/*Invoice Start*/}
            <Modal open={showInvoice} closable={true} destroyOnClose={true} footer={false}
                   closeIcon={<AiFillCloseCircle/>}
                   onCancel={() => setShowInvoice(false)}
            >
                <div className={'w-full overflow-x-hidden'} ref={invoiceRef}>
                    <body className={'flex flex-col'}>
                    <header className={'flex flex-col items-center border-b border-dashed border-slate-400'}>
                        <h1 className={'text-2xl text-center font-bold'}>{invoiceData?.businessName}</h1>
                        <h2 className={'text-[12px]'}>{invoiceData?.showroomAddress ? invoiceData?.showroomAddress : 'Head Office'}</h2>
                        <h2 className={'text-[12px]'}>{invoiceData?.showroomMobile}</h2>
                    </header>
                    <div className={'flex justify-center '}>
                        <h1 className={'border border-dashed border-slate-400 border-t-0 px-2'}>Invoice</h1>
                    </div>
                    <main className={' mt-2'}>
                        <div className={'text-[12px]'}>
                            <div className={'flex justify-between'}><h1>Invoice No :</h1>
                                <h1>{invoiceData?.showroomInvoiceCode}</h1></div>
                            <div className={'flex justify-between'}><h1>Date :</h1>
                                <h1>{invoiceData?.createdAt && new Date(invoiceData.createdAt).toDateString()}</h1>
                            </div>
                            <div className={'flex justify-between'}><h1>Customer :</h1>
                                <h1>{invoiceData?.customerName}</h1></div>
                            <div className={'flex justify-between'}><h1>Mobile :</h1>
                                <h1>{invoiceData?.customerMobile}</h1></div>
                        </div>
                        <Table bordered={true} className={'text-[10px] mt-4 invoice-table'}
                               dataSource={invoiceData?.products}
                               pagination={false}>
                            <Table.Column width={10} className={'text-[10px] font-semibold ml-0 pl-0'} title={'sl'}
                                          render={(text, record, index) => index + 1}/>
                            <Table.Column width={100} className={'text-[10px] w-fit font-semibold'} title={"P.Name"}
                                          render={(text, record: Product) => {
                                              return (
                                                  <>
                                                      <p>{record.productGroup}</p>
                                                      <p>{record.itemCode}</p>
                                                  </>
                                              )
                                          }
                                          }/>

                            <Table.Column width={10} className={'text-[10px] font-semibold'} title={'Qty'}
                                          render={() => 1}/>
                            <Table.Column className={'text-[10px] font-semibold'} width={25} colSpan={1}
                                          title={'T.Price'}
                                          dataIndex={'sellPrice'} render={(text) => `${text}৳`}/>
                            <Table.Column className={'text-[10px] font-semibold'} width={25} colSpan={1}
                                          title={'Dis(%)'}
                                          dataIndex={'discount'}/>

                            <Table.Column className={'text-[10px] font-semibold'} width={40} title={"D.Price"}
                                          dataIndex={"sellPriceAfterDiscount"}
                                          render={(text) => `${text}৳`}/>
                        </Table>

                    </main>
                    <footer className={'w-full '}>
                        <div
                            className={'flex flex-col items-end pb-2 mt-2 border-b border-dashed border-slate-400'}>
                            <h1 className={'text-[12px] font-semibold'}>Subtotal
                                {/*- Math.round((invoiceData ? invoiceData?.invoiceAmount / 100 * invoiceData.vat : 0))*/}
                                {/*+ invoiceData?.discountAmount*/}
                                : {invoiceData && invoiceData?.invoiceAmount - Math.round((invoiceData ? invoiceData?.invoiceAmount / 100 * invoiceData.vat : 0))}৳</h1>
                            {/*<h1 className={'text-[12px] font-semibold'}>Discount (-)*/}
                            {/*    : {invoiceData?.discountAmount || 0}৳</h1>*/}
                            {
                                <h1 className={'text-[12px] font-semibold'}>Tax({invoiceData?.vat}%)
                                    :{Math.round(invoiceData ? invoiceData?.invoiceAmount / 100 * invoiceData.vat : 0)} ৳</h1>
                            }
                        </div>
                        <div className={'flex mb-2 mt-2 justify-between font-semibold'}>
                            <h1>Qty: {invoiceData?.products.length}</h1>
                            <h1>T. Payable: {invoiceData?.invoiceAmount}৳</h1>
                        </div>
                        <div
                            className={'w-full flex text-center'}>
                            <div className={'w-full border border-slate-400 py-1'}>
                                <h1 className={'border-b border-slate-400'}>Cash Amount</h1>
                                <h1 className={''}>{invoiceData?.paidAmount}৳</h1>
                            </div>
                            <div className={'border border-slate-400 border-l-0 py-1 w-full'}>
                                <h1 className={'border-b border-slate-400'}>Change Amount</h1>
                                <h1>{invoiceData?.changeAmount}৳</h1>
                            </div>
                        </div>

                        <div className={'flex justify-center mt-2'}>
                            {
                                invoiceData?.showroomInvoiceCode && <div className={'flex gap-x-5'}>
                                    <Barcode
                                        width={0.8}
                                        height={25}
                                        margin={0}
                                        value={invoiceData?.showroomInvoiceCode}
                                        displayValue={true}
                                        format='CODE128'
                                        textAlign='center' fontSize={12}/>

                                </div>
                            }
                        </div>
                        <p className={
                            'flex flex-col items-center'
                        }>
                            Thanks for shopping with us!
                            <span>Please Come Again</span>
                        </p>
                    </footer>
                    </body>
                    <body className={'flex flex-col mt-6'}>
                    <header className={'flex flex-col items-center border-b border-dashed border-slate-400'}>
                        <h1 className={'text-2xl text-center font-bold'}>{invoiceData?.businessName}</h1>
                        <h2 className={'text-[12px]'}>{invoiceData?.showroomAddress ? invoiceData?.showroomAddress : 'Head Office'}</h2>
                        <h2 className={'text-[12px]'}>{invoiceData?.showroomMobile}</h2>
                    </header>
                    <div className={'flex justify-center '}>
                        <h1 className={'border border-dashed border-slate-400 border-t-0 px-2'}>Invoice</h1>
                    </div>
                    <main className={' mt-2'}>
                        <div className={'text-[12px]'}>
                            <div className={'flex justify-between'}><h1>Invoice No :</h1>
                                <h1>{invoiceData?.showroomInvoiceCode}</h1></div>
                            <div className={'flex justify-between'}><h1>Date :</h1>
                                <h1>{invoiceData?.createdAt && new Date(invoiceData.createdAt).toDateString()}</h1>
                            </div>
                            <div className={'flex justify-between'}><h1>Customer :</h1>
                                <h1>{invoiceData?.customerName}</h1></div>
                            <div className={'flex justify-between'}><h1>Mobile :</h1>
                                <h1>{invoiceData?.customerMobile}</h1></div>
                        </div>
                        <Table bordered={true} className={'text-[10px] mt-4 invoice-table'}
                               dataSource={invoiceData?.products}
                               pagination={false}>
                            <Table.Column width={10} className={'text-[10px] font-semibold ml-0 pl-0'} title={'sl'}
                                          render={(text, record, index) => index + 1}/>
                            <Table.Column width={100} className={'text-[10px] w-fit font-semibold'} title={"P.Name"}
                                          render={(text, record: Product) => {
                                              return (
                                                  <>
                                                      <p>{record.productGroup}</p>
                                                      <p>{record.itemCode}</p>
                                                  </>
                                              )
                                          }
                                          }/>

                            <Table.Column width={10} className={'text-[10px] font-semibold'} title={'Qty'}
                                          render={() => 1}/>
                            <Table.Column className={'text-[10px] font-semibold'} width={25} colSpan={1}
                                          title={'T.Price'}
                                          dataIndex={'sellPrice'} render={(text) => `${text}৳`}/>
                            <Table.Column className={'text-[10px] font-semibold'} width={25} colSpan={1}
                                          title={'Dis(%)'}
                                          dataIndex={'discount'}/>

                            <Table.Column className={'text-[10px] font-semibold'} width={40} title={"D.Price"}
                                          dataIndex={"sellPriceAfterDiscount"}
                                          render={(text) => `${text}৳`}/>
                        </Table>

                    </main>
                    <footer className={'w-full '}>
                        <div
                            className={'flex flex-col items-end pb-2 mt-2 border-b border-dashed border-slate-400'}>
                            <h1 className={'text-[12px] font-semibold'}>Subtotal
                                {/*- Math.round((invoiceData ? invoiceData?.invoiceAmount / 100 * invoiceData.vat : 0))*/}
                                {/*+ invoiceData?.discountAmount*/}
                                : {invoiceData && invoiceData?.invoiceAmount - Math.round((invoiceData ? invoiceData?.invoiceAmount / 100 * invoiceData.vat : 0))}৳</h1>
                            {/*<h1 className={'text-[12px] font-semibold'}>Discount (-)*/}
                            {/*    : {invoiceData?.discountAmount || 0}৳</h1>*/}
                            {
                                <h1 className={'text-[12px] font-semibold'}>Tax({invoiceData?.vat}%)
                                    :{Math.round(invoiceData ? invoiceData?.invoiceAmount / 100 * invoiceData.vat : 0)} ৳</h1>
                            }
                        </div>
                        <div className={'flex mb-2 mt-2 justify-between font-semibold'}>
                            <h1>Qty: {invoiceData?.products.length}</h1>
                            <h1>T. Payable: {invoiceData?.invoiceAmount}৳</h1>
                        </div>
                        <div
                            className={'w-full flex text-center'}>
                            <div className={'w-full border border-slate-400 py-1'}>
                                <h1 className={'border-b border-slate-400'}>Cash Amount</h1>
                                <h1 className={''}>{invoiceData?.paidAmount}৳</h1>
                            </div>
                            <div className={'border border-slate-400 border-l-0 py-1 w-full'}>
                                <h1 className={'border-b border-slate-400'}>Change Amount</h1>
                                <h1>{invoiceData?.changeAmount}৳</h1>
                            </div>
                        </div>

                        <div className={'flex justify-center mt-2'}>
                            {
                                invoiceData?.showroomInvoiceCode && <div className={'flex gap-x-5'}>
                                    <Barcode
                                        width={0.8}
                                        height={25}
                                        margin={0}
                                        value={invoiceData?.showroomInvoiceCode}
                                        displayValue={true}
                                        format='CODE128'
                                        textAlign='center' fontSize={12}/>

                                </div>
                            }
                        </div>
                        <p className={
                            'flex flex-col items-center'
                        }>
                            Thanks for shopping with us!
                            <span>Please Come Again</span>
                        </p>
                    </footer>
                    </body>
                </div>
                <button className={'bg-green-500 text-white px-3 py-1 rounded'} onClick={() => {
                    handlePrint()
                    setShowInvoice(false)
                    setFilteredProducts([])
                    setCart([])
                }
                }>Print
                </button>

            </Modal>
            {/*
            *
            *
            *Invoice End
            *
            *
            */}

            {/*Add Customer Start*/}
            <Modal open={showCustomerModal}
                   footer={false}
                   onCancel={() => setShowModal(false)}
                   title={'Add Customer'}
            >
                <Formik initialValues={{
                    customerName: '',
                    customerPhone: '',
                    customerEmail: '',
                    customerAddress: ''
                }satisfies ICustomer} onSubmit={async values => {
                    await dispatch(createCustomer(values, setCustomerTerm))
                }}>
                    <Form className='space-y-2'>
                        <CommonInput required={true} label={"Customer Name"} name={'customerName'}/>
                        <CommonInput required={true} label={"Customer Phone"} name={'customerPhone'}/>
                        <CommonInput label={"Customer Email"} name={'customerEmail'}/>
                        <CommonInput label={"Customer Address"} name={'customerAddress'}/>
                        <Button type={'submit'} loading={isLoading}>Save</Button>
                    </Form>

                </Formik>
            </Modal>

            {/*
            *
            *
            *Add Customer End
            *
            *
            */}
            <div className='flex w-full gap-x-10'>
                <div className='flex relative w-[30%] items-center '>
                    <div className={'flex w-full items-center'}>
                        <div
                            className='border h-[32px] w-[40px] justify-center border-r-0  border-slate-400 flex items-center'>
                            <FaUser className='text-slate-500'/>
                        </div>
                        <Select
                            className={'w-full'}
                            filterOption={true}
                            value={customerTerm}
                            onChange={e => setCustomerTerm(e)}
                            defaultValue={'Walker Customer'}
                            options={customers.map(item => ({label: item.customerName, value: item.customerName}))}
                            showSearch={true}
                        />

                        <div
                            className={'border h-[32px] w-[40px] justify-center border-l-0  border-slate-400 flex items-center cursor-pointer'}
                            onClick={() => setShowModal(true)}
                        >
                            <FaPlus/>
                        </div>
                    </div>


                </div>
                <div className='flex w-[40%] items-center flex-col relative'>
                    <Formik initialValues={{searchTerm: ''}} onSubmit={({searchTerm}, {resetForm}) => {
                        //
                        setLoading(true)
                        const searchedProduct = filter(products, (element) => element.productGroup.includes(searchTerm) || element.itemCode.includes(searchTerm))


                        if (!searchedProduct.length) {
                            toast.error('Please Try A Different Code, Maybe Try Again', {autoClose: 2000})
                            setLoading(false)
                        } else {
                            if (searchedProduct.length > 80) {
                                toast.error('Many Product Found, Please Try To Use Specific Product Code', {autoClose: 2000})
                            } else if (searchedProduct.length === 1) {
                                if (searchedProduct[0].sellingStatus === 'Sold') {
                                    toast.error('This Product Is Already Sold', {autoClose: 2000})

                                } else {
                                    if (cart.includes(searchedProduct[0])) {
                                        toast.error("This Product Is Already In Cart", {autoClose: 2000})
                                    } else {
                                        setCart(prevCart => [...prevCart, ...searchedProduct])
                                        setFilteredProducts([])
                                    }
                                }

                            } else {
                                setFilteredProducts(searchedProduct)

                            }
                            setLoading(false)
                        }

                        resetForm()

                    }
                    }>
                        {() => (
                            <Form className={'flex w-full relative'}>
                                <div
                                    className='border  h-[32px] w-[40px] justify-center border-r-0  border-slate-400 flex items-center'>
                                    <FaSearch className='text-slate-500'/>
                                </div>
                                <Field
                                    className='pl-4 border border-solid h-[32px] w-full border-slate-400 focus:outline-none'
                                    type='text'
                                    placeholder='Enter Product Name / Item Code / Scan Bar Code ---- Press Enter On Keyboard'
                                    name={'searchTerm'}
                                />
                                <div className={'flex justify-center items-center absolute right-3 top-2'}>
                                    {
                                        loading ? <Spin/> : null
                                    }
                                </div>
                            </Form>
                        )}
                    </Formik>
                    {
                        filteredProducts?.length ?
                            (
                                <ul className={'absolute top-[110%] w-full border-1 border-slate-400 bg-white z-30 p-10 space-y-2 max-h-[70vh] overflow-y-scroll'}>
                                    {
                                        filteredProducts.map((product) => {
                                            return (
                                                <li
                                                    onClick={() => {
                                                        if (product.sellingStatus === 'Sold') {
                                                            toast.error('This Product Is Already Sold', {autoClose: 3000})
                                                        } else {
                                                            if (cart.includes(product)) {
                                                                toast.error("This Product Is Already In Cart", {autoClose: 2000})
                                                            } else {
                                                                setCart(prev => [...prev, product])
                                                                setFilteredProducts([])
                                                            }
                                                        }
                                                    }}
                                                    className={`flex flex-col gap-y-1 bg-dark-purple text-white p-2 rounded cursor-pointer`}
                                                    key={product.itemCode}>
                                                    <p className={'flex justify-between'}>
                                                        <span>{product.productGroup}</span>
                                                        <span>{product.itemCode}</span>
                                                    </p>
                                                    <p className={'flex justify-between'}>
                                                        <span>Price: {product.sellPrice}</span>
                                                        <span
                                                            className={`${product.sellingStatus === 'Sold' ? 'text-red-500' : 'text-green-500'}`}>{product.sellingStatus}</span>
                                                    </p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>) : null
                    }
                </div>
                <div className='flex relative w-[30%] items-center '>

                    <Select
                        className={'w-full'}
                        filterOption={true}
                        onChange={e => setEmpName(e)}
                        placeholder="Select a Employee"
                        options={employees.map(item => ({label: item.empName, value: item.empName}))}
                        showSearch={true}
                    />
                </div>
            </div>

            {/* Product Area */}
            <Formik initialValues={
                {
                    discounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    subtotal: totalPrice(cart),
                    paidAmount: 0,
                    items: cart,
                    customerName: customerTerm,
                    discountTk: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    empName: empName,
                    vat: business?.defaultTax || 0,
                    payable: cart.length ? cart.map(item => item.sellPrice) : [0, 0, 0, 0]

                }
            } enableReinitialize onSubmit={(values, {resetForm, setFieldValue}) => {
                if (updateInvoice && updateInvoiceId) {
                    console.log('Product Selling From Hold')
                    api.patch(`/invoice/${updateInvoiceId}`, values).then(async (res) => {
                        setInvoiceData(res.data)
                        setShowInvoice(true)
                        await dispatch(fetchProduct())
                        await dispatch(getInvoice())
                        setCart([])
                        setUpdateInvoice(false)
                        setUpdateInvoiceId(null)
                    }).catch((err: AxiosError<ApiError>) => {
                        rejectedToast(err)
                    })

                } else {
                    console.log('Product Selling From Here')
                    api.post('/invoice', values).then(async (res) => {
                        if (res.data.invoiceStatus !== 'Hold') {
                            setInvoiceData(res.data)
                            setShowInvoice(true)
                            setCart([])
                        } else {
                            toast.success('Invoice Added To Hold')
                        }
                        setUpdateInvoice(false)
                        setUpdateInvoiceId(null)
                        await dispatch(fetchProduct())
                        await dispatch(getInvoice())
                    }).catch((err: AxiosError<ApiError>) => {
                        rejectedToast(err)
                    })
                }

            }}>
                {
                    ({values, enableReinitialize, handleSubmit, setFieldValue, handleChange, resetForm}) => {

                        return (
                            <Form method={'post'} onSubmit={(e) => {
                                e.preventDefault()
                                setConfirmationModal(true)
                            }}>
                                <Modal open={confirmationModal} footer={false}
                                       onCancel={() => setConfirmationModal(false)}>
                                    <h1 className="confirm__modal--heading">Are you sure! you want to Continue?</h1>
                                    <div className={'flex gap-x-5'}>
                                        <button className={'confirm__modal--btn cancel'} type={'button'}
                                                onClick={() => setConfirmationModal(false)}>Cancel
                                        </button>
                                        <button type={'button'} className={'confirm__modal--btn continue'}
                                                onClick={() => {
                                                    handleSubmit()
                                                    setConfirmationModal(false)
                                                }
                                                }>Confirm
                                        </button>
                                    </div>
                                </Modal>
                                <div className={'flex gap-x-5'}>
                                    <Table dataSource={cart} rowKey={(obj: Product, index) => obj.itemCode + index}
                                           className={'z-20 flex-1'}
                                           pagination={false}>
                                        <Table.Column title={"#"} render={
                                            (text, record, index) => index + 1
                                        }/>
                                        <Table.Column title={"Product Name, Code"} render={(text, record: Product) =>
                                            <span>{record.itemCode} - {record.productGroup}</span>}/>
                                        <Table.Column title={'Discount'}
                                                      render={(text, record: Product, index) => {
                                                          return (
                                                              <>
                                                                  <Field
                                                                      className={'text-white border-none focus:outline-none bg-black'}
                                                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                          handleChange(e)
                                                                          setFieldValue(`payable[${index}]`, Math.round(cart[index].sellPrice - Number(e.target.value)))
                                                                          setFieldValue(`discountTk[${index}]`, Math.round(Number(e.target.value)))
                                                                      }}
                                                                      name={`discounts[${index}]`}
                                                                      type={'number'}/>


                                                              </>
                                                          )
                                                      }

                                                      }/>
                                        <Table.Column title={"QTY"} render={() => 1}/>
                                        <Table.Column title={"T.Price"} dataIndex={'sellPrice'}/>
                                        <Table.Column title={"D.Price"} render={(_, record: Product, index) => {
                                            return (record.sellPrice - values.discountTk[index])
                                        }
                                        }/>
                                        <Table.Column title={<AiOutlineClose/>}
                                                      render={(text, record: Product, index) => <button
                                                          onClick={() => removeFromCart(record.itemCode)}>X</button>}/>
                                    </Table>
                                    <div className={'w-80 flex flex-col space-y-5'}>
                                        <div className={'text-[16px] font-black flex'}>Subtotal
                                            : {
                                                values.subtotal
                                            }</div>
                                        <div className={'text-[16px] font-black'}>- Total Discount
                                            (tk): {values.discountTk.reduce((a, b) => a + b)}</div>

                                        <div className={'text-[16px] font-black flex'}>+ Vat (%) : <Field
                                            className={'border border-amber-200 focus:outline-none'}
                                            name={'vat'} type={'number'}/></div>
                                        <div className={'text-[16px] font-black flex'}>Total Payable
                                            : {
                                                values.payable.reduce((a, b) => a + b) + Math.round((values.subtotal / 100) * (values.vat))
                                            }</div>


                                        <div className={'text-[16px] font-black flex'}>Customer Paying : <Field
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                handleChange(e)
                                                setFieldValue('paidAmount', Number(e.target.value))
                                            }}
                                            className={'border border-amber-200 focus:outline-none max-w-fit'}
                                            name={'paidAmount'} type={'number'}/></div>

                                        <div className={'text-[16px] font-black flex'}>
                                            <span>{((values.paidAmount) - (
                                                values.payable.reduce((a, b) => a + b) + (values.subtotal / 100) * (values.vat)
                                            ) < 0 ? 'Due' : 'Change')}</span> :{

                                            (values.paidAmount) + -
                                                (values.payable.reduce((a, b) => a + b) + Math.round((values.subtotal / 100) * (values.vat)))
                                        }</div>
                                    </div>
                                </div>
                                <div className={'flex gap-x-10 items-center'}>
                                    <Link
                                        className={'flex items-center gap-x-2 bg-blue-600 px-2 py-1 rounded text-white w-[140px] justify-center'}
                                        target={'_blank'}
                                        to={'/dashboard/pos'}> <FaPlus/> Add New</Link>
                                    <button type={'submit'} onClick={() => {
                                        setFieldValue('invoiceStatus', 'Hold')
                                    }}
                                            className={'flex items-center gap-x-2 bg-red-500 text-white w-auto px-2 py-1 rounded min-w-[140px] justify-center'}
                                            children={<><FaHandHolding/>Hold</>}/>
                                    <button type={'button'}

                                            onClick={() => {
                                                resetForm()
                                                setCustomerTerm('Walker Customer')
                                                setEmpName('')
                                                setCart([])
                                            }}
                                            className={'flex items-center gap-x-2 bg-red-500 px-2 py-1 rounded text-white w-[140px] justify-center'}>
                                        <BiReset/>Reset
                                    </button>
                                    <button
                                        className={'flex items-center gap-x-2 bg-green-500 text-white w-auto px-2 py-1 rounded min-w-[140px] justify-center'}
                                        type={'submit'} onClick={() => {
                                        setFieldValue('invoiceStatus', 'Paid')
                                    }}>Pay
                                    </button>
                                </div>

                            </Form>

                        )
                    }
                }
            </Formik>

        </div>
    );
};

export default Sell;
