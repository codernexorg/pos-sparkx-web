import { Table } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCat } from '../../../redux/actions/category';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Category } from '../../../redux/types';
import { PrintAble } from '../../components';
import Loader from '../../components/Loader';

const Categories = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCat());
  }, [dispatch]);

  const { categories, isLoading } = useTypedSelector(state => state.category);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <PrintAble handlePrint={() => {}} tableId='any'>
        <Table dataSource={categories} rowKey={object => object.categoryName}>
          <Table.Column
            title='Category Name'
            dataIndex={'categoryName'}
            key='categoryName'
          />
          <Table.Column
            title='Actions'
            dataIndex={'id'}
            render={(value, record: Category) => {
              return <Link to={`${record.id}`}>Edit</Link>;
            }}
          />
        </Table>
      </PrintAble>
    </div>
  );
};

export default Categories;
