import React, { useRef, useState } from "react";
import { Button, DatePicker, Modal, Select, Table } from "antd";
import { AiFillCloseCircle, AiOutlineEye } from "react-icons/ai";
import Barcode from "react-barcode";
import { useReactToPrint } from "react-to-print";
import { useAppDispatch, useTypedSelector } from "../../../redux/store";
import { filterInvoice } from "../../../redux/actions/invoice";
import { useSettingContext } from "../../context/SettingProver";
import { UserRole } from "../../../types";
import { Button as CustomButton } from "../../components";
import { Link } from "react-router-dom";
import { FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";

const Invoice = () => {
  const [showInvoice, setShowInvoice] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<Invoice>();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });
  const dispatch = useAppDispatch();
  const { currentUser } = useSettingContext();
  const [showroomName, setShowroomName] = useState<string>("");
  const { customers } = useTypedSelector((state) => state.customer);
  const { invoices, isLoading } = useTypedSelector((state) => state.invoice);
  const { showroom } = useTypedSelector((state) => state.showroom);
  const [date, setDate] = useState<string[]>([]);
  const { employees } = useTypedSelector((state) => state.employee);
  const { RangePicker } = DatePicker;

  return (
    <div>
      <Modal
        open={showInvoice}
        closable={true}
        destroyOnClose={true}
        footer={false}
        closeIcon={<AiFillCloseCircle />}
        onCancel={() => setShowInvoice(false)}
        width={350}
      >
        {invoiceData ? (
          <>
            <div className={"w-full overflow-x-hidden"} ref={invoiceRef}>
              {/*Invoice Start*/}

              <body className={"flex flex-col mt-6"}>
                <header
                  className={
                    "flex flex-col items-center border-b border-dashed border-slate-400"
                  }
                >
                  <h1 className={"text-2xl text-center font-bold"}>
                    {invoiceData?.businessName}
                  </h1>
                  <h2 className={"text-[12px]"}>
                    {invoiceData?.showroomAddress
                      ? invoiceData?.showroomAddress
                      : "Head Office"}
                  </h2>
                  <h2 className={"text-[12px]"}>
                    {invoiceData?.showroomMobile}
                  </h2>
                </header>
                <div className={"flex justify-center "}>
                  <h1
                    className={
                      "border border-dashed border-slate-400 border-t-0 px-2"
                    }
                  >
                    Invoice
                  </h1>
                </div>
                <main className={"mt-2 mb-2"}>
                  <div className={"text-[12px]"}>
                    <div className={"flex justify-between"}>
                      <h1>Invoice No :</h1>
                      <h1>{invoiceData?.showroomInvoiceCode}</h1>
                    </div>
                    <div className={"flex justify-between"}>
                      <h1>Date :</h1>
                      <h1>
                        {invoiceData?.createdAt &&
                          new Date(invoiceData.createdAt).toDateString()}
                      </h1>
                    </div>
                    <div className={"flex justify-between"}>
                      <h1>Customer :</h1>
                      <h1>{invoiceData?.customerName}</h1>
                    </div>
                    <div className={"flex justify-between"}>
                      <h1>Mobile :</h1>
                      <h1>{invoiceData?.customerMobile}</h1>
                    </div>
                  </div>
                  <table className={"invoice__table"}>
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>P.Name</th>
                        <th>T.Price</th>
                        <th>Dis</th>
                        <th>Net Taka</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData?.products.map((pr, idx) => {
                        return (
                          <tr key={pr.id}>
                            <td>{idx + 1}</td>
                            <td>
                              <p>{pr.productGroup}</p>
                              <p>{pr.itemCode}</p>
                            </td>
                            <td>{pr.sellPrice}</td>
                            <td>{pr.sellPrice - pr.sellPriceAfterDiscount}</td>
                            <td>{pr.sellPriceAfterDiscount}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td>TOTAL</td>
                        <td></td>
                        <td>{invoiceData.withoutTax}</td>
                        <td>{invoiceData.discountAmount}</td>
                        <td>{invoiceData.invoiceAmount}</td>
                      </tr>
                    </tbody>
                  </table>
                </main>
                <footer className={"w-full "}>
                  <p className={"mt-2"}>
                    CRM:{" "}
                    {
                      employees.find(
                        (em) =>
                          em.empPhone ===
                          customers.find(
                            (cr) =>
                              cr.customerPhone === invoiceData?.customerMobile
                          )?.crm
                      )?.empName
                    }
                  </p>
                  <div
                    className={"flex mb-2 mt-2 justify-between font-semibold"}
                  >
                    <h1>Qty: {invoiceData?.products.length}</h1>

                    <h1>T. Payable: {invoiceData?.invoiceAmount}৳</h1>
                  </div>
                  <div className={"w-full flex text-center mb-2"}>
                    <div className={"w-full border border-slate-400 py-1"}>
                      <h1 className={"border-b border-slate-400"}>
                        Cash Amount
                      </h1>
                      <h1 className={""}>{invoiceData?.paidAmount}৳</h1>
                    </div>
                    <div
                      className={
                        "border border-slate-400 border-l-0 py-1 w-full"
                      }
                    >
                      <h1 className={"border-b border-slate-400"}>
                        Change Amount
                      </h1>
                      <h1>{invoiceData?.changeAmount}৳</h1>
                    </div>
                  </div>

                  <p className={"capitalize text-justify"}>
                    in case of any change, please bring this invoice together
                    with the product within 3 days
                  </p>

                  <div className={"flex justify-center mt-2 mb-2"}>
                    {invoiceData?.showroomInvoiceCode && (
                      <div className={"flex gap-x-5"}>
                        <Barcode
                          width={0.8}
                          height={25}
                          margin={0}
                          value={invoiceData?.showroomInvoiceCode}
                          displayValue={true}
                          format="CODE128"
                          textAlign="center"
                          fontSize={12}
                        />
                      </div>
                    )}
                  </div>
                  <p className={"capitalize text-center"}>
                    "Smart Customer, Smart Bangladesh"
                  </p>
                </footer>
              </body>
            </div>
            <button
              className={"bg-green-500 text-white px-3 py-1 rounded"}
              onClick={() => {
                handlePrint();
                setShowInvoice(false);
              }}
            >
              Print
            </button>
          </>
        ) : null}
      </Modal>
      <div className={"flex justify-end my-4 space-x-2"}>
        <button
          className={"report__btn text-white bg-green-500"}
          onClick={() => {
            // Create a new workbook
            const workbook = XLSX.utils.book_new();

            // Create a new worksheet for the product data
            const productsWorksheet = XLSX.utils.json_to_sheet(
              invoices.flatMap(
                ({
                  showroomInvoiceCode,
                  customerName,
                  customerMobile: customerPhone,
                  products,
                  createdAt,
                }) =>
                  products.map(
                    ({
                      productGroup,
                      sellPriceAfterDiscount,
                      sellPrice,
                      itemCode,
                      employee,
                    }) => ({
                      Invoice_Code: showroomInvoiceCode,
                      Customer_Name: customerName,
                      Customer_Mobile: customerPhone,
                      Product_Name: productGroup,
                      Product_Code: itemCode,
                      EMP_NAME: employee?.empName,
                      Discount_Price: sellPriceAfterDiscount,
                      Tag_Price: sellPrice,
                      Date: new Date(createdAt).toLocaleTimeString("en-US", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      }),
                    })
                  )
              )
            );

            // Add the product worksheet to the workbook
            XLSX.utils.book_append_sheet(
              workbook,
              productsWorksheet,
              "Invoices"
            );

            // Write the workbook to a file
            XLSX.writeFile(workbook, "invoice.xlsx");
          }}
        >
          <FaFileExcel />
          Excel
        </button>
        <Select
          className={"w-[200px]"}
          placeholder={"Select Showroom"}
          onChange={(e) => {
            setShowroomName(e);
          }}
          options={showroom.map((sr) => ({
            value: sr.showroomName,
            label: sr.showroomName,
          }))}
        />
        <RangePicker
          onChange={(_, values) => {
            setDate(values);
          }}
        />
        <CustomButton
          onClick={async () => {
            if (date.length) {
              await dispatch(filterInvoice(date[0], date[1], showroomName));
            }
          }}
        >
          Filter
        </CustomButton>
      </div>
      <Table
        loading={isLoading}
        className={"text-center"}
        dataSource={invoices}
        rowKey={(obj: Invoice) => obj.id}
        pagination={{ defaultPageSize: 30 }}
        rowClassName={
          "dark:bg-slate-700 dark:text-white dark:hover:text-primaryColor-900"
        }
      >
        <Table.Column title={"#"} render={(text, record, index) => index + 1} />
        <Table.Column title={"Invoice No"} dataIndex={"showroomInvoiceCode"} />
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
        <Table.Column
          title={"Customer"}
          render={(_, record: Invoice) => {
            const customer = customers.find(
              (c) => c.customerPhone === record.customerMobile
            );
            return (
              <Link to={`/dashboard/customer/${customer?.id}`}>
                {record.customerName}
              </Link>
            );
          }}
        />

        {currentUser?.role.includes(UserRole[0]) ? (
          <Table.Column
            title={"Showroom"}
            dataIndex={"showroomName"}
            filters={invoices.map((iv) => ({
              text: iv.showroomName,
              value: iv.showroomName,
            }))}
          />
        ) : null}

        <Table.Column
          title={"Actions"}
          dataIndex={"invoiceNo"}
          render={(text, record: Invoice, index) => {
            return (
              <div className={"flex"}>
                <Button
                  onClick={() => {
                    setShowInvoice(true);
                    setInvoiceData(record);
                  }}
                >
                  <AiOutlineEye />
                </Button>
                {/*<Button onClick={() => {}}>*/}
                {/*  <AiOutlineEdit />*/}
                {/*</Button>*/}
              </div>
            );
          }}
        />
        <Table.Column
          title={"Created"}
          render={(text, record: Invoice) => {
            return new Date(record.createdAt).toLocaleDateString();
          }}
        />
      </Table>
    </div>
  );
};

export default Invoice;
