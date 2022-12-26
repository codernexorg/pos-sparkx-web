import { Table } from 'antd';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { getShowroom } from '../../../redux/actions/showroom';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Loader, PrintAble } from '../../components';

interface DataType {
  key: React.Key;
  showroomName: string;
  showroomCode: string;
  showroomAddress: string;
  id: number;
}

const Showroom = () => {
  const cRef = useRef(null);

  const dispatch = useAppDispatch();

  const handlePrint = useReactToPrint({
    content: () => cRef.current
  });

  useEffect(() => {
    dispatch(getShowroom());
  }, [dispatch]);

  const { shorooms, isLoading } = useTypedSelector(state => state.showroom);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PrintAble handlePrint={handlePrint} tableId='showroomData'>
      <Table
        dataSource={shorooms}
        id='showroomData'
        ref={cRef}
        rowKey={obj => obj.showroomCode}
      >
        <Table.Column
          title='Showroom Code'
          dataIndex={'showroomCode'}
          key='showroomCode'
        />
        <Table.Column
          title='Showroom Name'
          dataIndex={'showroomName'}
          key='showroomName'
        />
        <Table.Column
          title='Showroom Adress'
          dataIndex={'showroomAddress'}
          key='showroomAddress'
        />
        <Table.Column
          title='Showroom Actions'
          dataIndex={'id'}
          render={(_: any, record: DataType) => {
            return <Link to={`${record.id}`}>Edit</Link>;
          }}
        />
      </Table>
    </PrintAble>
  );
};

export default Showroom;
