import { Modal, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  deleteWarehouse,
  getWareHouse,
  updateWarehouse,
} from "../../../redux/actions/warehouse";
import { useAppDispatch, useTypedSelector } from "../../../redux/store";
import { Warehouse } from "../../../redux/types";
import {
  Button,
  CommonInput,
  Loader,
  Pagination,
  PrintAble,
} from "../../components";
import { Form, Formik } from "formik";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { handleExcel, handlePrint } from "../../utils/helper";

const WareHouse = () => {
    const dispatch = useAppDispatch();
    const whRef = useRef(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [editAble, setEditAble] = useState<Warehouse | null>(null);
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        dispatch(getWareHouse());
    }, [dispatch]);

    const {warehouses, isLoading} = useTypedSelector(state => state.warehouse);

    if (isLoading) {
        return <Loader/>;
    }
    return (
        <PrintAble title={'Locations'} handlePrint={() => {
            handlePrint(warehouses, [
                {field: 'whName', displayName: 'Location'},
                {field: 'whCode', displayName: 'Code'},
                {field: 'whMobile', displayName: 'Mobile'},
                {field: 'whLocation', displayName: 'Address'},
            ], 'Locations')
        }
        } handleExcel={() => handleExcel(warehouses, '_', 'Locations')}>
            <Table
                id='warehouse'
                dataSource={warehouses}
                rowKey={obj => obj.whId}
                rowClassName={'dark:bg-slate-700 dark:text-white dark:hover:text-primaryColor-900'}
                pagination={{
                    current: page,
                    total: warehouses.length,
                    onChange: (page, size) => {
                        setPage(page);
                        setPageSize(size);
                    },
                    pageSize: pageSize,
                    style: {
                        display: 'none'
                    }
                }}
                ref={whRef}
            >
                <Table.Column
                    title='Location Code'
                    dataIndex={'whCode'}
                    key='whCode'
                />
                <Table.Column
                    title='Location Name'
                    dataIndex={'whName'}
                    key='whName'
                />
                <Table.Column
                    title='Location Mobile'
                    dataIndex={'whMobile'}
                    key='whMobile'
                />
                <Table.Column title='Location Address' dataIndex={'whLocation'}/>
                <Table.Column
                    title='Location Actions'
                    dataIndex={'whId'}
                    render={(_: any, record: Warehouse) => {
                        return (
                            <div className={'flex gap-x-2 text-xl'}>
                                <AiOutlineEdit cursor={'pointer'} onClick={() => {
                                    setOpenModal(true)
                                    setEditAble(record)
                                }
                                }/>
                                <AiOutlineDelete cursor={'pointer'}
                                                 onClick={async () => {
                                                     await dispatch(deleteWarehouse(record.whId))
                                                 }}/>
                            </div>
                        )
                    }}
                />
            </Table>
            <Modal open={openModal} onCancel={() => {
                setEditAble(null)
                setOpenModal(false)
            }}
                   footer={false}>
                {
                    editAble && <Formik initialValues={editAble} enableReinitialize={true}
                                        onSubmit={async values => {
                                            console.log(values)
                                            await dispatch(updateWarehouse(values))
                                            setOpenModal(false)
                                            setEditAble(null)

                                        }}>
                        {
                            () => (
                                <Form>
                                    <CommonInput label={"Location Code"} name={'whCode'}/>
                                    <CommonInput label={"Location Name"} name={'whName'}/>
                                    <CommonInput label={"Location Mobile"} name={'whMobile'}/>
                                    <CommonInput label={"Location Address"} name={'whLocation'}/>
                                    <Button type={'submit'} loading={isLoading}>Update</Button>
                                </Form>
                            )
                        }
                    </Formik>
                }
            </Modal>
            <Pagination
                currentPage={page}
                total={warehouses.length}
                onChange={(page, size) => {
                    setPage(page);
                    setPageSize(size);
                }}
                pageSize={pageSize}
            />
        </PrintAble>
    );
};

export default WareHouse;
