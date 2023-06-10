import { Modal } from "antd";
import React, { SetStateAction, useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useTypedSelector } from "../../../../redux/store";
import { PaymentMethod } from "../../../../types";
import Barcode from "react-barcode";
import { useReactToPrint } from "react-to-print";

interface SingleInvoiceProps {
  showInvoice: boolean;
  setShowInvoice: React.Dispatch<SetStateAction<boolean>>;
  invoiceData: Invoice | null;
}

const SingleInvoice: React.FC<SingleInvoiceProps> = ({
  showInvoice,
  setShowInvoice,
  invoiceData,
}) => {
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const { employees } = useTypedSelector((state) => state.employee);
  const { customers } = useTypedSelector((state) => state.customer);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });
  return (
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
                <h1 className={"text-2xl text-center font-bold capitalize"}>
                  {invoiceData?.businessName.toLocaleLowerCase()}
                </h1>
                <h2 className={"text-[12px]"}>
                  {invoiceData?.showroomName
                    ? invoiceData?.showroomName
                    : "Head Office"}{" "}
                  Outlet
                </h2>
                <h2 className={"text-[12px]"}>
                  Mobile No: {invoiceData?.showroomMobile}
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
                      <td>{invoiceData?.subtotal}</td>
                      <td>{invoiceData?.discountAmount}</td>
                      <td>{invoiceData?.netAmount}</td>
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
                <div className={"flex mb-2 mt-2 justify-between font-semibold"}>
                  <h1>Qty: {invoiceData?.products.length}</h1>
                  {invoiceData?.vat ? (
                    <h1>
                      Vat ({invoiceData.vat}% ):
                      {invoiceData.invoiceAmount - invoiceData.netAmount}৳
                    </h1>
                  ) : (
                    ""
                  )}
                  <h1>T. Payable: {invoiceData?.invoiceAmount}৳</h1>
                </div>
                <div className={"w-full flex text-center mb-2"}>
                  <div className={"w-full border border-slate-400 py-1"}>
                    <h1 className={"border-b border-slate-400"}>
                      {invoiceData?.paymentMethod.paymentMethod ===
                      PaymentMethod.MULTIPLE
                        ? "Multiple Payment"
                        : `${invoiceData?.paymentMethod.paymentMethod} Amount`}
                    </h1>
                    <h1 className={""}>{invoiceData?.paidAmount}৳</h1>
                  </div>
                  <div
                    className={"border border-slate-400 border-l-0 py-1 w-full"}
                  >
                    <h1 className={"border-b border-slate-400"}>
                      Change Amount
                    </h1>
                    <h1>{invoiceData?.changeAmount}৳</h1>
                  </div>
                </div>

                <p className={"capitalize text-justify text-[12px]"}>
                  in case of any change, please bring this invoice together with
                  the product within 3 days
                </p>

                <div className={"flex justify-center mt-2 mb-2"}>
                  {invoiceData?.showroomInvoiceCode && (
                    <div className={"flex gap-x-5"}>
                      <Barcode
                        width={1.1}
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
  );
};
export default SingleInvoice;
