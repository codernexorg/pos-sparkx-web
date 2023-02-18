import React, {useEffect, useState} from 'react'
import {useAppDispatch, useTypedSelector} from "../../../redux/store";
import {uniqueItem} from "../../utils/helper";
import {Form, Formik} from "formik";
import {Button, CommonInput, SelectInput} from "../../components";
import {filter, find} from "underscore";
import {toast} from "react-toastify";
import {AiOutlineDelete} from "react-icons/ai";
import {Modal, Spin, Table} from "antd";
import useDebounce from "react-debounced";
import api from "../../../api";
import {rejectedToast, successToast} from "../../utils/toaster";
import {AxiosError} from "axios";
import {ApiError} from "../../../redux/types";
import {fetchTransfers} from "../../../redux/actions/transferred";
import {FaHistory} from "react-icons/fa";

interface TransferProductProps {
}

const TransferProduct: React.FC<TransferProductProps> = () => {
    const dispatch = useAppDispatch()
    const {products} = useTypedSelector(state => state.products)
    const {showroom} = useTypedSelector(state => state.showroom)
    const [uniqueLotNumber, setUniqueLotNumber] = useState<string[]>([])
    const [transferAbleProduct, setTransferAbleProduct] = React.useState<Product[]>([])
    const [selectedTransfer, setSelectedTransfer] = React.useState<Product[]>([])
    const [showRemoveBtn, setShowRemoveBtn] = React.useState<null | number>(null)
    const [onPageLoading, setPageLoading] = useState(false)
    const debounce = useDebounce(2000)
    const [confirmationModal, setConfirmationModal] = useState(false)

    const initialValues = {
        itemCodes: [{itemCode: ''}],
        showroomName: '',
        whName: '',
        lotNumber: ''
    }
    const {transferred} = useTypedSelector((state) => state.transferred)
    useEffect(() => {
        setUniqueLotNumber(uniqueItem<Product>(products, item => item.lotNumber))
        dispatch(fetchTransfers())

    }, [products, dispatch])

    const [showModal, setShowModal] = useState(false)
    return (
        <div className={'mt-10'}>
            <Modal width={800} open={showModal} footer={false} onCancel={() => setShowModal(false)}>
                <Table dataSource={transferred} rowKey={obj => obj.id}>
                    <Table.Column title={'SL'} render={(_, rec, index) => index + 1}/>
                    <Table.Column title={'P. Location'} dataIndex={'prevLocation'}/>
                    <Table.Column title={'C. Location'} dataIndex={'currentLocation'}/>
                    <Table.Column title={'T. Products'} dataIndex={'productCount'}/>
                    <Table.Column title={'Lot Number'} dataIndex={'transferredLot'}/>
                </Table>
            </Modal>
            <div className={'mb-10'}>
                <button className={'px-2 py-1 border border-slate-400 w-fit flex gap-x-2 items-center'}
                        onClick={() => setShowModal(true)}>
                    <FaHistory/> History
                </button>
            </div>

            <Formik initialValues={initialValues} onSubmit={(values, {resetForm}) => {
                values.itemCodes = selectedTransfer.map(item => ({itemCode: item.itemCode}))

                api.post('/product/transfer', values).then(res => {
                    successToast('Transfer Success, Please Reload To See In Action')
                    resetForm()
                    setTransferAbleProduct([])
                    setSelectedTransfer([])

                }).catch((error: AxiosError<ApiError>) => {
                    rejectedToast(error)
                })
            }}>
                {
                    ({setFieldValue, values, handleChange, handleSubmit, errors, touched}) => {
                        return (
                            <Form method={'post'} className={'h-full'} onSubmit={(event) => {
                                event.preventDefault()
                                setConfirmationModal(true)
                            }
                            }>
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
                                <div className={'flex space-x-6 mb-10'}>
                                    <SelectInput
                                        label={"Select Lot Number"}
                                        name={'lotNumber'}
                                        onChange={e => {
                                            setPageLoading(true)
                                            debounce(() => {
                                                setPageLoading(false)
                                            })

                                            handleChange(e)
                                            setFieldValue('lotNumber', e.target.value)
                                            setFieldValue('whName', find(products, item => item.lotNumber === e.target.value)?.whName)
                                            setTransferAbleProduct(filter(products, item => item.lotNumber === e.target.value))
                                            setSelectedTransfer([])

                                        }}>
                                        {
                                            uniqueLotNumber.map((item, i) => <option key={i}
                                                                                     value={item}>{item}</option>)
                                        }

                                    </SelectInput>

                                    <CommonInput
                                        disabled={true} label={"From"} name={'whName'}
                                        placeholder={'From'} required={true}/>
                                    <SelectInput label={"Select Planned Showroom"}
                                                 name={'showroomName'}>
                                        {
                                            showroom.map((item, i) => <option key={i}
                                                                              value={item.showroomName}>{item.showroomName}</option>)
                                        }
                                    </SelectInput>
                                    <Button type={'submit'}>Transfer</Button>

                                </div>

                            </Form>
                        )
                    }

                }

            </Formik>
            {
                onPageLoading ? <Spin/> : (
                    <div className={'flex w-full space-x-5'}>
                        <div className={'w-full flex flex-col gap-3'}>
                            <div className={'flex justify-between'}>
                                <h1 className={'text-xl font-semibold'}>Select Product To Transfer</h1>
                                <button type={'button'}
                                        className={'bg-dark-purple text-white px-2 py-0.5 rounded'}
                                        onClick={() => {
                                            setSelectedTransfer(transferAbleProduct)
                                        }}>Select All
                                </button>
                            </div>

                            <ul className={'h-[400px] space-y-2 overflow-y-scroll p-4 scrollbar-thin scrollbar-thumb-amber-700 scrollbar-thumb-rounded '}>

                                {
                                    transferAbleProduct ? transferAbleProduct.map((item, index) => <li onClick={() => {
                                        if (selectedTransfer.includes(item)) {
                                            return toast.error("Product Already Selected")
                                        } else {
                                            setSelectedTransfer(prev => [...prev, item])
                                        }
                                    }}
                                                                                                       className={'rounded-md bg-dark-purple text-white p-4 cursor-pointer flex justify-between'}
                                                                                                       key={index}>
                                        <span>{item.productGroup}</span> <span>{item.itemCode}</span></li>) : <Spin/>
                                }
                            </ul>
                        </div>
                        <div className={'w-full flex flex-col gap-3 '}>
                            <div className={'flex justify-between'}>
                                <h1 className={'text-xl font-semibold'}>Selected Products
                                    : {selectedTransfer.length} Items</h1>
                                <button type={'button'} className={'bg-red-900 text-white px-2 py-0.5 rounded'}
                                        onClick={() => {
                                            setSelectedTransfer([])
                                        }}>Remove All
                                </button>
                            </div>
                            <ul className={'h-[400px] space-y-2 overflow-y-scroll p-4 scrollbar-thin scrollbar-thumb-amber-700 scrollbar-thumb-rounded'}>
                                {
                                    selectedTransfer.map((item, index) => (

                                        <div key={index} onMouseEnter={() => setShowRemoveBtn(index)}
                                             onMouseLeave={() => setShowRemoveBtn(null)} className={'relative'}>
                                            <li
                                                className={'z-10 rounded-md bg-dark-purple text-white p-4 cursor-pointer flex justify-between'}

                                            >
                                                <span>{item.productGroup}</span>
                                                <span>{item.itemCode}</span>
                                            </li>
                                            {
                                                showRemoveBtn === index ? (
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            () => {
                                                                setSelectedTransfer(prevState => {
                                                                    return [...prevState.filter(p => p.itemCode !== item.itemCode)]
                                                                })
                                                            }
                                                        }

                                                        className={'absolute duration-300 z-50 top-0 right-0 flex items-center justify-center h-full w-[80px] bg-red-500 text-white'}>
                                                        <AiOutlineDelete/>
                                                    </button>
                                                ) : null
                                            }
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default TransferProduct