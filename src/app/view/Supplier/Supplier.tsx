import { Table } from 'antd';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { getSupplier } from '../../../redux/actions/supplier';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Loader, PrintAble } from '../../components';

interface DataType {
  key: React.Key;
  supplierName: string;
  supplierContact: string;
  supplierAddress: string;
  id: number;
}

const Supplier = () => {
  const { isLoading, suppliers, error } = useTypedSelector(
    state => state.supplier
  );

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
        pagination={false}
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
    </PrintAble>
  );
};

export default Supplier;
