import { Table } from 'antd';
import { useEffect } from 'react';
import { getProductGroup } from '../../../redux/actions/productGroup';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Loader, Pagination, PrintAble } from '../../components';
import { useSettingContext } from '../../context/SettingProver';

const ProductGroup = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductGroup());
  }, [dispatch]);

  const { isLoading, productGroup } = useTypedSelector(
    state => state.productGroup
  );
  const { page, setPage, pageSize, setPageSize } = useSettingContext();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PrintAble handlePrint={() => {}} tableId='productGroup'>
      <Table
        id='productGroup'
        dataSource={productGroup}
        rowKey={obj => obj.productName}
        pagination={false}
      >
        <Table.Column
          title='Product Name'
          dataIndex='productName'
          key='productName'
        />
        <Table.Column
          title='Product Code'
          dataIndex='productCode'
          key='productCode'
        />
        <Table.Column
          title='Category'
          dataIndex='productCategory'
          key='productCategory'
        />
      </Table>
      <Pagination
        currentPage={page}
        total={productGroup.length}
        onChange={(page, size) => {
          setPage(page);
          setPageSize(size);
        }}
        pageSize={pageSize}
      />
    </PrintAble>
  );
};

export default ProductGroup;
