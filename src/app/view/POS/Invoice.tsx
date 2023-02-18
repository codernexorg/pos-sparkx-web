import React, {useEffect, useMemo, useRef, useState} from "react";
import {Button, Modal, Table} from "antd";
import {AiFillCloseCircle, AiOutlineDelete, AiOutlineEdit, AiOutlineEye} from "react-icons/ai";
import Barcode from "react-barcode";
import {useReactToPrint} from "react-to-print";
import {useAppDispatch, useTypedSelector} from "../../../redux/store";
import {deleteInvoice, getInvoice} from "../../../redux/actions/invoice";


const Invoice = () => {
    const [showInvoice, setShowInvoice] = useState<boolean>(false)
    const [invoiceData, setInvoiceData] = useState<Invoice>()
    const invoiceRef = useRef<HTMLDivElement>(null)
    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current
    })
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getInvoice())
    }, [dispatch])

    const {invoices, isLoading} = useTypedSelector((state) => state.invoice)

    const memorizedData = useMemo(() => invoices, [invoices])

    return <div>
        <Modal open={showInvoice} closable={true} destroyOnClose={true} footer={false}
               closeIcon={<AiFillCloseCircle/>}
               onCancel={() => setShowInvoice(false)}
               width={350}
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
                        <Table.Column className={'text-[10px] font-semibold'} width={25} colSpan={1} title={'T.Price'}
                                      dataIndex={'sellPrice'} render={(text) => `${text}৳`}/>
                        <Table.Column className={'text-[10px] font-semibold'} width={25} colSpan={1} title={'Dis(%)'}
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
                        <h1 className={'text-[12px] font-semibold'}>Tax({invoiceData?.vat}%)
                            :{Math.round(invoiceData ? invoiceData?.invoiceAmount / 100 * invoiceData.vat : 0)} ৳</h1>


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

            }
            }>Print
            </button>
        </Modal>
        <Table loading={isLoading} className={'text-center'} dataSource={memorizedData}
               rowKey={(obj, idx) => obj.invoiceNo + obj.id}
               pagination={{defaultPageSize: 30}}>
            <Table.Column title={"#"} render={(text, record, index) => index + 1}/>
            <Table.Column title={'Invoice No'} dataIndex={'showroomInvoiceCode'}/>
            <Table.Column title={"Invoice Amount"} dataIndex='invoiceAmount' render={(text) => `${text}৳`}/>
            <Table.Column title={"Invoice Status"} dataIndex={'invoiceStatus'} render={(text) => <p
                className={`${text === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>{text}</p>}/>
            <Table.Column title={"Customer"} dataIndex={'customerName'}/>
            {
                invoiceData?.invoiceStatus === "Due" ?
                    <Table.Column title={'Due'} dataIndex={'dueAmount'} render={(text, rec: Invoice, index) => {
                        if (rec.dueAmount > 0) {
                            return `${rec.dueAmount}৳`
                        } else {
                            return `-`
                        }
                    }
                    }/>
                    : null
            }

            <Table.Column title={'Actions'} dataIndex={'invoiceNo'} render={(text, record: Invoice, index) => {
                return (
                    <div className={'flex'}>
                        <Button onClick={() => {
                            setShowInvoice(true)
                            const filtered = invoices.find(invoice => invoice.invoiceNo === record.invoiceNo)
                            if (filtered) {
                                setInvoiceData(filtered)
                            }
                        }
                        }><AiOutlineEye/></Button>
                        <Button onClick={async () => {
                            await dispatch(deleteInvoice(record.id))
                        }
                        }><AiOutlineDelete/></Button>
                        <Button onClick={() => {

                        }
                        }><AiOutlineEdit/></Button>
                    </div>
                )
            }}/>
            <Table.Column title={'Created'} render={(text, record: Invoice) => {
                return new Date(record.createdAt).toDateString()
            }
            }/>
        </Table>
    </div>;
};

export default Invoice;
