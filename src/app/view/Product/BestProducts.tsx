import React, { useMemo } from "react";
import PrintAbleLayout from "../../components/PrintAbleLayout";
import { Table } from "antd";
import { useTypedSelector } from "../../../redux/store";
import { filter } from "underscore";
import { dateFilter, groupedProducts } from "../../utils";

interface BestProductsProps {}

const BestProducts: React.FC<BestProductsProps> = ({}) => {
  const { products } = useTypedSelector((state) => state.products);

  const soldProducts = useMemo(
    () =>
      groupedProducts(
        filter(products, (p) => p.sellingStatus === "Sold").sort(
          (a, b) => b.quantity - a.quantity
        )
      ).slice(0, 6),
    [products]
  );

  return (
    <PrintAbleLayout
      title="Best Products"
      showExcel={false}
      showPDF={false}
      showPrint={false}
    >
      <Table dataSource={soldProducts}>
        <Table.Column title="Product Name" dataIndex={"productGroup"} />
        <Table.Column title="Sold Qty" dataIndex={"quantity"} />
      </Table>
    </PrintAbleLayout>
  );
};
export default BestProducts;
