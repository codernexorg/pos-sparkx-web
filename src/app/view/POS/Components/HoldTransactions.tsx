import { Modal, Table } from "antd";
import React, { SetStateAction, useState } from "react";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { AiOutlineEdit } from "react-icons/ai";
import { BiReset } from "react-icons/bi";

interface HoldTransactionsProps {
  showHoldInvoice: boolean;
  setShowHoldInvoice: React.Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  invoices: Invoice[];
}

const HoldTransactions: React.FC<HoldTransactionsProps> = ({
  showHoldInvoice,
  setShowHoldInvoice,
  isLoading,
  invoices,
}) => {
  const [holdReset, setHoldReset] = useState(false);
  return (
    <Modal
      open={showHoldInvoice}
      onCancel={() => setShowHoldInvoice(false)}
      footer={false}
      width={"90vw"}
    >
      <div>
        <Table
          loading={isLoading}
          className={"text-center"}
          dataSource={invoices.filter(
            (invoice) => invoice.invoiceStatus === "Hold"
          )}
          rowKey={(obj: Invoice, idx) => obj.invoiceNo}
          pagination={{ defaultPageSize: 30 }}
          rowClassName={
            "dark:bg-slate-700 dark:text-white dark:hover:text-primaryColor-900"
          }
        >
          <Table.Column
            title={"#"}
            render={(text, record, index) => index + 1}
          />
          <Table.Column
            title={"Invoice No"}
            dataIndex={"showroomInvoiceCode"}
          />
          <Table.Column
            title={"Invoice Amount"}
            dataIndex="invoiceAmount"
            render={(text) => `${text}৳`}
          />
          <Table.Column
            title={"Invoice Status"}
            dataIndex={"invoiceStatus"}
            render={(text) => (
              <p
                className={`${
                  text === "Paid" ? "text-green-500" : "text-red-500"
                }`}
              >
                {text}
              </p>
            )}
          />
          <Table.Column title={"Customer"} dataIndex={"customerName"} />

          <Table.Column
            title={"Actions"}
            dataIndex={"invoiceNo"}
            render={(text, record: Invoice, index) => {
              return (
                <div className={"flex gap-x-3"}>
                  <ConfirmationModal
                    open={holdReset}
                    setOpen={setHoldReset}
                    execute={async () => {}}
                  />
                  <button
                    onClick={() => {
                      setShowHoldInvoice(false);
                    }}
                    className={"report__btn bg-green-500 text-white"}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    className={"report__btn bg-red-500 text-white"}
                    onClick={() => {
                      setHoldReset(true);
                    }}
                  >
                    <BiReset />
                  </button>
                </div>
              );
            }}
          />
          <Table.Column
            title={"Created"}
            render={(text, record: Invoice) => {
              return new Date(record.createdAt).toDateString();
            }}
          />
        </Table>
      </div>
      ;
    </Modal>
  );
};
export default HoldTransactions;
