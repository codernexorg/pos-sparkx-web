import { Table } from 'antd';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { getSupplier } from '../../../redux/actions/supplier';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Loader, Pagination, PrintAble } from '../../components';
import { useSettingContext } from '../../context/SettingProver';

interface DataType {
  key: React.Key;
  supplierName: string;
  supplierContact: string;
  supplierAddress: string;
  id: number;
}

const Supplier = () => {
  const { isLoading, suppliers } = useTypedSelector(state => state.supplier);
  const { page, pageSize, setPage, setPageSize } = useSettingContext();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSupplier());
  }, [dispatch]);
  const cRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => cRef.current
  });
  if (isLoading) {
    return <Loader />;
  }

  return (
    <PrintAble handlePrint={handlePrint} tableId='supplierData'>
      <Table
        dataSource={suppliers}
        id='supplierData'
        ref={cRef}
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
