import { Table } from 'antd';
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { fetchProduct } from '../../../redux/actions/product';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Loader, PrintAble } from '../../components';

const AllProducts = () => {
  const tableComponent = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => tableComponent.current
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const { products, isLoading, hasMore } = useTypedSelector(
    state => state.products
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <PrintAble handlePrint={handlePrint} tableId='productData'>
      <Table
        dataSource={products}
        id='productData'
        ref={tableComponent}
        rowKey={obj => obj.itemCode}
        pagination={false}
      >
        <Table.Column title='ItemCode' dataIndex={'itemCode'} />
        <Table.Column title='Product Code' dataIndex={'productCode'} />
        <Table.Column title='Product Name' dataIndex={'productGroup'} />
        <Table.Column title='WareHouse' dataIndex={'whName'} />
        <Table.Column title='Showroom' dataIndex={'showroomName'} />
        <Table.Column title='Selling Status' dataIndex={'sellingStatus'} />
      </Table>
    </PrintAble>
  );
};

export default AllProducts;
