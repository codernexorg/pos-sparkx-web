import {Modal, Table, Upload} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {useReactToPrint} from 'react-to-print';
import {getSupplier} from '../../../redux/actions/supplier';
import {useAppDispatch, useTypedSelector} from '../../../redux/store';
import {Pagination, PrintAble} from '../../components';
import {useSettingContext} from '../../context/SettingProver';
import {DraggerProps} from "antd/es/upload";
import {baseURL} from "../../../api";
import {toast} from "react-toastify";

interface DataType {
    key: React.Key;
    supplierName: string;
    supplierContact: string;
    supplierAddress: string;
    id: number;
}

const Supplier = () => {
    const {isLoading, suppliers} = useTypedSelector(state => state.supplier);
    const {page, pageSize, setPage, setPageSize} = useSettingContext();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSupplier());
    }, [dispatch]);
    const cRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => cRef.current
    });

    const [showImportModal, setShowImportModal] = useState(false);

    const {Dragger} = Upload;

    const uploaderProps: DraggerProps = {
        name: 'file',
        multiple: false,
        action: `${baseURL}/supplier/import`,
        onChange(info: any) {
            const {status, response} = info.file;
            if (status === 'done') {
                toast.success(`Data Importing On Background, Please Reload After Some Time`);
            } else if (status === 'error') {
                toast.error(`${info.file.name} ${response?.message}`);
            }
        },
        withCredentials: true,
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        accept: '.xlsx'
        // iconRender: (file, _listType) => {
        //   return <FaFileExcel className='text-green-600' />;
        // }
    };

    return (
        <PrintAble title={'Suppliers'} handlePrint={handlePrint} tableId='supplierData' btnText={'Import Supplier'}
                   handleClick={() => setShowImportModal(true)}

        >
            <Modal footer={false} open={showImportModal} onCancel={() => setShowImportModal(false)}>
                <Dragger {...uploaderProps}>
                    <p className='text-lg font-semibold'>
                        Click or drag file to this area to upload
                    </p>
                </Dragger>
            </Modal>
            <Table
                dataSource={suppliers}
                id='supplierData'
                ref={cRef}
                loading={isLoading}
                rowKey={object => object.supplierName}
                pagination={{
                    current: page,
                    total: suppliers.length,
                    pageSize: pageSize,
                    onChange: (page, size) => {
                        setPage(page);
                        setPageSize(size);
                    },
                    style: {
                        display: 'none'
                    }
                }}
            >
                <Table.Column
                    title='Supplier Name'
                    dataIndex={'supplierName'}
                    key='supplierName'
                />
                <Table.Column
                    title='Contact Person'
                    dataIndex={'contactPersonName'}
                    key='contactPersonName'
                />
                <Table.Column
                    title='Contact Number'
                    dataIndex={'contactPersonNumber'}
                    key='contactPersonNumber'
                />
                <Table.Column
                    title='Alt Number'
                    dataIndex={'altContactNumber'}
                    key={'altContactNumber'}
                />
                <Table.Column
                    title='Supplier Email'
                    dataIndex={'supplierEmail'}
                    key='supplierEmail'
                />
                <Table.Column
                    title='Supplier Adress'
                    dataIndex={'supplierAddress'}
                    key='supplierAddress'
                />
                <Table.Column
                    title='Supplier Actions'
                    dataIndex={'id'}
                    key={'id'}
                    render={(_: any, record: DataType) => {
                        return <Link to={`${record.id}`}>Edit</Link>;
                    }}
                />
            </Table>

            <Pagination
                currentPage={page}
                total={suppliers.length}
                onChange={(page, size) => {
                    setPage(page);
                    setPageSize(size);
                }}
                pageSize={pageSize}
            />
        </PrintAble>
    );
};

export default Supplier;
