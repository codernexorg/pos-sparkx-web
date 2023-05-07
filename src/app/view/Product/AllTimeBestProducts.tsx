import React, { useMemo } from "react";
import { useTypedSelector } from "../../../redux/store";
import { groupedProducts } from "../../utils";
import PrintAbleLayout from "../../components/PrintAbleLayout";
import { Table } from "antd";

const AllTimeBestProducts: React.FC = () => {
  const { products } = useTypedSelector((state) => state.products);

  const bestProducts = useMemo(
    () =>
      groupedProducts(products.filter((p) => p.sellingStatus === "Sold")).sort(
        (a, b) => b.quantity - a.quantity
      ),
    [products]
  );

  return (
    <PrintAbleLayout
      title="All Time Best Products"
      showExcel={false}
      showPDF={false}
      showPrint={false}
    >
      <Table
        dataSource={bestProducts}
        rowKey={(obj: Product) => obj.id}
        pagination={false}
      >
        <Table.Column title="SL" render={(_, p, i) => i + 1} />
        <Table.Column title="Product Name" dataIndex={"productGroup"} />
        <Table.Column
          title="Total Sold Amount"
          render={(_, p: Product) => p.sellPriceAfterDiscount * p.quantity}
        />
        <Table.Column title="Sold Qty" dataIndex={"quantity"} />
      </Table>
    </PrintAbleLayout>
  );
};
export default AllTimeBestProducts;
