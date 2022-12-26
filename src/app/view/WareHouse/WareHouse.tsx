import { Table } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWareHouse } from '../../../redux/actions/warehouse';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Warehouse } from '../../../redux/types';
import { Loader, PrintAble } from '../../components';

const WareHouse = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWareHouse());
  }, [dispatch]);

  const { warehouses, isLoading } = useTypedSelector(state => state.warehouse);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PrintAble tableId='warehouse' handlePrint={() => {}}>
      <Table
        id='warehouse'
        dataSource={warehouses}
        rowKey={obj => obj.whCode}
        pagination={false}
      >
        <Table.Column
          title='Ware House Code'
          dataIndex={'whCode'}
          key='whCode'
        />
        <Table.Column
          title='Ware House Name'
          dataIndex={'whName'}
          key='whName'
        />
        <Table.Column title='Ware House Adress' dataIndex={'whAddress'} />
        <Table.Column
          title='Ware House Actions'
          dataIndex={'whId'}
          render={(_: any, record: Warehouse) => {
            return <Link to={`${record.whId}`}>Edit</Link>;
          }}
        />
      </Table>
    </PrintAble>
  );
};

export default WareHouse;
