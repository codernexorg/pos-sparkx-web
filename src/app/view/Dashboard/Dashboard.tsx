import {Col, Row} from 'antd';
import {FaProductHunt, FaUser, FaWarehouse} from 'react-icons/fa';
import {HiOfficeBuilding} from 'react-icons/hi';
import styled from 'styled-components';
import {useAppDispatch, useTypedSelector} from '../../../redux/store';
import {Stats} from '../../components';
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip} from 'chart.js'
import {useEffect} from "react";
import {getInvoice} from "../../../redux/actions/invoice";

const Wrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100vh;
`;
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend)

const Dashboard = () => {

    const {products, isLoading} = useTypedSelector(state => state.products);
    const {showroom} = useTypedSelector(state => state.showroom);
    const {warehouses} = useTypedSelector(state => state.warehouse);
    const {suppliers} = useTypedSelector(state => state.supplier);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getInvoice())
    }, [dispatch])


    return (
        <Wrapper>
            <Row>
                <Col sm={12} lg={5} md={4}>
                    <Stats
                        title='Products'
                        value={products.length}
                        isLoading={isLoading}
                        icon={<FaProductHunt/>}
                    />
                </Col>
                <Col sm={12} lg={5} md={4}>
                    <Stats
                        title='Showrooms'
                        value={showroom.length}
                        isLoading={isLoading}
                        icon={<HiOfficeBuilding/>}
                    />
                </Col>
                <Col sm={12} lg={5} md={4}>
                    <Stats
                        title='Locations'
                        value={warehouses.length}
                        isLoading={isLoading}
                        icon={<FaWarehouse/>}
                    />
                </Col>
                <Col sm={12} lg={5} md={4}>
                    <Stats
                        title='Suppliers'
                        value={suppliers.length}
                        isLoading={isLoading}
                        icon={<FaUser/>}
                    />
                </Col>
            </Row>
            {/*<Line*/}
            {/*    datasetIdKey='id'*/}
            {/*    data={{*/}
            {/*        labels: invoices.map(iv => new Date(iv.createdAt)),*/}
            {/*        datasets: [{*/}
            {/*            label: 'Daily Sales',*/}
            {/*            data: invoices.map(iv => iv.invoiceAmount),*/}
            {/*            borderColor: 'red',*/}
            {/*            animation: {*/}
            {/*                easing: 'easeInCirc'*/}
            {/*            },*/}
            {/*            type: 'line',*/}
            {/*            pointStyle: 'circle'*/}
            {/*        }],*/}
            {/*    }}*/}
            {/*/>*/}


        </Wrapper>
    );
};

export default Dashboard;
