import { Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { fetchProduct } from '../../../redux/actions/product';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Loader, PrintAble } from '../../components';

const AllProducts = () => {
  const tableComponent = useRef<HTMLDivElement>(null);
  const [pagination, setPagination] = useState(true);
  const handlePrint = useReactToPrint({
    content: () => tableComponent.current,
    documentTitle: 'Spark X Product Data',
    onBeforeGetContent: () => {
      setPagination(false);
    }
  });

  const [page, setpage] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const { products, isLoading } = useTypedSelector(state => state.products);
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
        pagination={{
          total: products.length,
          pageSize: pageSize,
          current: page,
          onChange: (page, size) => {
            setpage(page);
            setPageSize(size);
          }
        }}
        bordered
      >
        <Table.Column
          title='ItemCode'
          dataIndex={'itemCode'}
          sorter={(a: Product, b: Product) =>
            a.itemCode.localeCompare(b.itemCode)
          }
        />
        <Table.Column title='Product Code' dataIndex={'productCode'} />
        <Table.Column title='Product Name' dataIndex={'productGroup'} />
        <Table.Column title='WareHouse' dataIndex={'whName'} />
        <Table.Column title='Showroom' dataIndex={'showroomName'} />
        <Table.Column
          title='Selling Status'
          dataIndex={'sellingStatus'}
          render={(text, record: Product) => {
            return (
              <button className='bg-green-600 text-slate-100 rounded px-2 py-1'>
                {record.sellingStatus}
              </button>
            );
          }}
          filters={[
            { text: 'Unsold', value: 'unsold' },
            { text: 'Sold', value: 'sold' }
          ]}
          onFilter={(value, record) => record.sellingStatus === value}
        />
      </Table>
    </PrintAble>
  );
};

export default AllProducts;
