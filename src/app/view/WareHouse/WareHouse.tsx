import { Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { getWareHouse } from '../../../redux/actions/warehouse';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Warehouse } from '../../../redux/types';
import { Loader, Pagination, PrintAble } from '../../components';

const WareHouse = () => {
  const dispatch = useAppDispatch();
  const whRef = useRef(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const handlePrint = useReactToPrint({
    content: () => whRef.current
  });
  useEffect(() => {
    dispatch(getWareHouse());
  }, [dispatch]);

  const { warehouses, isLoading } = useTypedSelector(state => state.warehouse);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PrintAble tableId='warehouse' handlePrint={handlePrint}>
      <Table
        id='warehouse'
        dataSource={warehouses}
        rowKey={obj => obj.whCode}
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
          title='Warehouse Code'
          dataIndex={'whCode'}
          key='whCode'
        />
        <Table.Column
          title='Warehouse Name'
          dataIndex={'whName'}
          key='whName'
        />
        <Table.Column title='Warehouse Adress' dataIndex={'whLocation'} />
        <Table.Column
          title='Warehouse Actions'
          dataIndex={'whId'}
          render={(_: any, record: Warehouse) => {
            return <Link to={`${record.whId}`}>Edit</Link>;
          }}
        />
      </Table>
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
