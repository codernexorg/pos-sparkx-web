import React, { useState } from "react";
import { useAppDispatch, useTypedSelector } from "../../../redux/store";
import { Field, Form, Formik } from "formik";
import { find } from "underscore";
import { toast } from "react-toastify";
import { Button, Tooltip } from "antd";
import ConfirmationModal from "../../components/ConfirmationModal";
import api from "../../../api";
import { rejectedToast, successToast } from "../../utils/toaster";
import { ApiError } from "../../../redux/types";
import { AxiosError } from "axios";
import { fetchProduct } from "../../../redux/actions/product";
import { fetchCustomer } from "../../../redux/actions/customer";
import { getInvoice } from "../../../redux/actions/invoice";
import { fetchEmployee } from "../../../redux/actions/employee";

interface ReturnProductProps {}

const ReturnProduct: React.FC<ReturnProductProps> = () => {
  const dispatch = useAppDispatch();
  const { invoices } = useTypedSelector((state) => state.invoice);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [returnProduct, setReturnProduct] = useState<Product[]>([]);
  const [check, setCheck] = useState("");
  let totalPrice = 0;
  if (returnProduct) {
    for (let i = 0; i < returnProduct.length; i++) {
      totalPrice += returnProduct[i].sellPriceAfterDiscount;
    }
  }
  const [confirmationModal, setConfirmationModal] = useState(false);
  return (
    <div className={"mt-10 flex-col items-center"}>
      <ConfirmationModal
        open={confirmationModal}
        setOpen={setConfirmationModal}
        execute={async () => {
          api
            .post("/invoice/return", {
              productCodes: returnProduct.map((p) => p.itemCode),
              invoiceId: invoice?.id,
              check,
            })
            .then((res) => {
              successToast("Product Returned Successfully");
              dispatch(fetchProduct());
              dispatch(fetchCustomer());
              dispatch(getInvoice());
              dispatch(fetchEmployee());
              setInvoice(null)
              setReturnProduct([])
            })
            .catch((err: AxiosError<ApiError>) => {
              rejectedToast(err);
            });
        }}
      />
      <div className={"flex justify-center"}>
        <Formik
          initialValues={{ showroomInvoiceCode: "" }}
          onSubmit={({ showroomInvoiceCode }) => {
            const invoice = find(invoices, { showroomInvoiceCode });
            if (invoice) {
              setInvoice(invoice);
            } else {
              toast.error("Invoice not found");
            }
          }}
        >
          <Form
            className={
              "flex flex-col items-center min-w-[800px] bg-primary-color px-5 py-6 rounded dark:bg-slate-700"
            }
          >
            <h1 className={"text-white text-3xl mb-2"}>Return Product</h1>
            <Field
              name={"showroomInvoiceCode"}
              placeholder={"Enter Sales Invoice Code"}
              className={
                "w-full rounded border border-slate-400 focus:outline-none h-[32px] pl-2"
              }
            />
          </Form>
        </Formik>
      </div>
      <div>
        {invoice ? (
          <div>
            <div className={"flex gap-x-5 bg-white px-2 py-3 mt-2 rounded"}>
              <div className={"text-center w-1/2 mt-10 "}>
                <h1 className={"font-semibold text-2xl"}>Invoice</h1>
                <h1 className={"font-semibold text-xl"}>
                  Invoice NO: {invoice.showroomInvoiceCode}
                </h1>
                <h1 className={"text-2xl"}>Return Able Product</h1>
                <table className={"cursor-pointer customer__table"}>
                  <thead>
                    <tr>
                      <th>Product/Item Code</th>
                      <th>Sell Price</th>
                    </tr>
                  </thead>
                  {invoice.products.map((product, index) => (
                    <tbody
                      key={index}
                      className={"w-full"}
                      onClick={() => {
                        if (returnProduct?.includes(product)) {
                          toast.error("Product already selected for return");
                        } else {
                          setReturnProduct((prev) => [...prev, product]);
                        }
                      }}
                    >
                      <tr>
                        <td>
                          <Tooltip title={"Select Product To Return"}>
                            <p>{product.productGroup}</p>
                            <p>{product.itemCode}</p>
                          </Tooltip>
                        </td>
                        <td>{product.sellPriceAfterDiscount}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>

              <div className={"mt-10 text-center w-1/2"}>
                <h1 className={"text-2xl font-semibold"}>Returning Product</h1>
                <h1 className={"text-2xl font-semibold"}>
                  Return Amount:{totalPrice}
                </h1>
                <table className={"cursor-pointer customer__table mt-7"}>
                  <thead>
                    <tr>
                      <th>Product/Item Code</th>
                      <th>Sell Price</th>
                    </tr>
                  </thead>
                  {returnProduct.map((product, index) => (
                    <tbody
                      key={index}
                      className={"w-full"}
                      onClick={() => {
                        setReturnProduct((prev) =>
                          prev.filter((p) => p.itemCode !== product.itemCode)
                        );
                      }}
                    >
                      <tr>
                        <td>
                          <Tooltip title={"Select Product To Remove"}>
                            <p>{product.productGroup}</p>
                            <p>{product.itemCode}</p>
                          </Tooltip>
                        </td>
                        <td>{product.sellPriceAfterDiscount}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
            <div className={'flex justify-center mt-4'}>
              <input
                className={
                  "dark:bg-slate-700 bg-white dark:text-white border-none focus:outline-none py-2 px-3 w-96 rounded-md"
                }
                type="text"
                value={check}
                placeholder={"Check"}
                onChange={(e) => setCheck(e.target.value)}
              />
            </div>
            <div className={"mt-10 text-center"}>
              <Button
                className={"dark:text-white"}
                onClick={() => setConfirmationModal(true)}
              >
                Return Product
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ReturnProduct;
