import {Table} from 'antd';
import {useMemo, useRef} from 'react';
import {useReactToPrint} from 'react-to-print';
import {useTypedSelector} from '../../../redux/store';
import {Pagination, PrintAble} from '../../components';
import {useSettingContext} from '../../context/SettingProver';

const AllProducts = () => {
    const tableComponent = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => tableComponent.current,
        documentTitle: 'Spark X Product Data'
    });
    const {page, pageSize, setPage, setPageSize} = useSettingContext();


    const {products: memoProduct, isLoading} = useTypedSelector(state => state.products);
    const products = useMemo(() => memoProduct, [memoProduct])

    function handleClass(text: string) {
        switch (text) {
            case 'Unsold':
                return 'bg-red-400';
            case 'Sold':
                return 'bg-green-600';
            case 'Damage':
                return 'bg-500-500';
            case 'Lost':
                return 'bg-red-700';
        }
    }

    return (
        <PrintAble title={'Products'} handlePrint={handlePrint} tableId='productData'>
            <Table
                dataSource={products}
                id='productData'
                ref={tableComponent}
                rowKey={obj => obj.itemCode}
                loading={isLoading}
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
                    title='Item Code'
                    dataIndex={'itemCode'}
                    sorter={(a: Product, b: Product) =>
                        a.itemCode.localeCompare(b.itemCode)
                    }
                />
                <Table.Column title='Product Code' dataIndex={'productCode'}/>
                <Table.Column title='Product Name' dataIndex={'productGroup'}/>
                <Table.Column title={'Lot Number'} dataIndex={'lotNumber'}/>

                <Table.Column title='Current Location' dataIndex={'whName'}/>
                <Table.Column title='Showroom' dataIndex={'showroomName'}/>
                <Table.Column title='Price' dataIndex={'sellPrice'}/>
                <Table.Column
                    title='Selling Status'
                    dataIndex={'sellingStatus'}
                    render={(text, record: Product) => {
                        return (
                            <button
                                className={` text-slate-100 rounded px-2 py-1 ${handleClass(
                                    text
                                )}`}
                            >
                                {record.sellingStatus}
                            </button>
                        );
                    }}
                    filters={[
                        {text: 'Unsold', value: 'Unsold'},
                        {text: 'Sold', value: 'Sold'}
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
