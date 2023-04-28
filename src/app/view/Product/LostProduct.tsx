import React, { useEffect, useState } from "react";
import PrintAbleLayout from "../../components/PrintAbleLayout";
import { useTypedSelector } from "../../../redux/store";
import { filter } from "underscore";
import { Table } from "antd";

type Props = {};

const LostProduct = (props: Props) => {
  const { products } = useTypedSelector((state) => state.products);

  const [lostProducts, setLostProducts] = useState<Product[]>([]);

  useEffect(() => {
    setLostProducts(filter(products, (pr) => pr.sellingStatus === "Lost"));
  }, [products]);
  return (
    <PrintAbleLayout title="Lost Products">
      <Table
        dataSource={lostProducts}
        rowKey={(obj: Product) => obj.id}
        pagination={{
          pageSize: 50,
        }}
      >
        <Table.Column title="Item Code" dataIndex={"itemCode"} />
        <Table.Column title="Product Name" dataIndex={"productGroup"} />
        <Table.Column title="Product Status" dataIndex={"sellingStatus"} />
        <Table.Column title="Sell Price" dataIndex={"sellPrice"} />
      </Table>
    </PrintAbleLayout>
  );
};

export default LostProduct;
