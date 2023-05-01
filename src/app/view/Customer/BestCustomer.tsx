import React, { useState } from "react";
import PrintAbleLayout from "../../components/PrintAbleLayout";
import { Table } from "antd";
import { useTypedSelector } from "../../../redux/store";
import Filter from "../../components/DateFilter";
import { useFilteredHook } from "../../hooks";

interface BestCustomerProps {}

const BestCustomer: React.FC<BestCustomerProps> = ({}) => {
  const { customers } = useTypedSelector((state) => state.customer);
  const [dates, setDates] = useState<string[]>([]);

  const filteredCustomer = useFilteredHook<ICustomer>(
    dates[0],
    dates[1],
    customers
  );

  return (
    <PrintAbleLayout
      title="Top 5 Best Customers"
      showExcel={false}
      showPDF={false}
      showPrint={false}
    >
      <Filter onChange={setDates} />
      <Table
        dataSource={filteredCustomer
          .sort((a, b) => b.paid - a.paid)
          .slice(0, 6)}
        rowKey={(obj: ICustomer) => obj.id + obj.customerName}
        pagination={false}
      >
        <Table.Column title="SL" render={(_, r, index) => index + 1} />
        <Table.Column title="Customer Name" dataIndex={"customerName"} />
        <Table.Column title="Customer Phone" dataIndex={"customerPhone"} />
        <Table.Column title="Total Paid" dataIndex={"paid"} />
      </Table>
    </PrintAbleLayout>
  );
};
export default BestCustomer;
