import { Table } from 'antd';
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { fetchProduct } from '../../../redux/actions/product';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Loader, Pagination, PrintAble } from '../../components';
import { useSettingContext } from '../../context/SettingProver';

const AllProducts = () => {
  const tableComponent = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => tableComponent.current,
    documentTitle: 'Spark X Product Data'
  });
  const { page, pageSize, setPage, setPageSize } = useSettingContext();
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
            setPage(page);
            setPageSize(size);
          },
          style: {
            display: 'none'
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
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        total={products.length}
        onChange={(page, size) => {
          setPage(page);
          setPageSize(size);
        }}
      />
    </PrintAble>
  );
};

export default AllProducts;
