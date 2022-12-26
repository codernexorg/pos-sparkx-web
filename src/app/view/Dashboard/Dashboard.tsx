import { Col, Row } from 'antd';
import { FaProductHunt, FaUser, FaWarehouse } from 'react-icons/fa';
import { HiOfficeBuilding } from 'react-icons/hi';
import styled from 'styled-components';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';

import { Stats } from '../../components';
const Wrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100vh;
`;

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { products, isLoading } = useTypedSelector(state => state.products);
  const { shorooms } = useTypedSelector(state => state.showroom);
  const { warehouses } = useTypedSelector(state => state.warehouse);
  const { suppliers } = useTypedSelector(state => state.supplier);

  return (
    <Wrapper>
      <Row>
        <Col sm={12} lg={5} md={4}>
          <Stats
            title='Products'
            value={products.length}
            isLoading={isLoading}
            icon={<FaProductHunt />}
          />
        </Col>
        <Col sm={12} lg={5} md={4}>
          <Stats
            title='Showrooms'
            value={shorooms.length}
            isLoading={isLoading}
            icon={<HiOfficeBuilding />}
          />
        </Col>
        <Col sm={12} lg={5} md={4}>
          <Stats
            title='Warehouses'
            value={warehouses.length}
            isLoading={isLoading}
            icon={<FaWarehouse />}
          />
        </Col>
        <Col sm={12} lg={5} md={4}>
          <Stats
            title='Suppliers'
            value={suppliers.length}
            isLoading={isLoading}
            icon={<FaUser />}
          />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Dashboard;
