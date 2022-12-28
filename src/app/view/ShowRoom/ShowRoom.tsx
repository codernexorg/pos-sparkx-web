import { Table } from 'antd';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { getShowroom } from '../../../redux/actions/showroom';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Loader, Pagination, PrintAble } from '../../components';
import { useSettingContext } from '../../context/SettingProver';

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
  const { page, pageSize, setPage, setPageSize } = useSettingContext();

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
        pagination={{
          current: page,
          total: shorooms.length,
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
      <Pagination
        currentPage={page}
        total={shorooms.length}
        onChange={(page, size) => {
          setPage(page);
          setPageSize(size);
        }}
        pageSize={pageSize}
      />
    </PrintAble>
  );
};

export default Showroom;
