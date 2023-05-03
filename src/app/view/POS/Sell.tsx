import { Modal, Select, Spin, Table, Tooltip } from "antd";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Barcode from "react-barcode";
import {
  AiFillCloseCircle,
  AiOutlineClose,
  AiOutlineEdit,
} from "react-icons/ai";
import { BiReceipt, BiReset } from "react-icons/bi";
import { FaHandHolding, FaPlus, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { filter, find } from "underscore";
import api from "../../../api";
import { createCustomer, fetchCustomer } from "../../../redux/actions/customer";
import { getInvoice } from "../../../redux/actions/invoice";
import { fetchProduct } from "../../../redux/actions/product";
import { useAppDispatch, useTypedSelector } from "../../../redux/store";
import { Button, CommonInput, SelectInput } from "../../components";
import { rejectedToast, successToast } from "../../utils/toaster";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useSettingContext } from "../../context/SettingProver";
import { fetchEmployee } from "../../../redux/actions/employee";
import { ApiError } from "../../../redux/types";
import { AxiosError } from "axios";
import { PaymentMethod } from "../../../types";

const Sell = () => {
  const { currentUser } = useSettingContext();
  const {
    showroom: { showroom },
    productGroup: { productGroup },
  } = useTypedSelector((sr) => sr);
  const dispatch = useAppDispatch();
  const [confirmationModal, setConfirmationModal] = useState(false);

  useEffect(() => {
    dispatch(getInvoice());
    setUpdateInvoice(false);
    setUpdateInvoiceId(null);
  }, [dispatch]);

  //Invoice

  const invoiceRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const [updateInvoice, setUpdateInvoice] = useState(false);
  const [updateInvoiceId, setUpdateInvoiceId] = useState<number | null>(null);

  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);
  const { invoices, isLoading } = useTypedSelector((state) => state.invoice);
  const [showRecentInvoice, setShowRecentInvoice] = useState(false);
  const [showHoldInvoice, setShowHoldInvoice] = useState(false);

  //Invoice ENd

  //Product
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
    null
  );
  const [cart, setCart] = useState<Product[]>([]);
  const { products } = useTypedSelector((state) => state.products);

  const removeFromCart = (itemCode: string) => {
    const removedCart = cart.filter((item) => item.itemCode !== itemCode);
    setCart(removedCart);
  };

  //Product End

  const [showCustomerModal, setShowModal] = useState(false);
  const [customerTerm, setCustomerTerm] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  //Customer

  const { customers } = useTypedSelector((state) => state.customer);
  //Customer End

  //Employee
  const { employees } = useTypedSelector((state) => state.employee);
  const [empPhone, setEmpPhone] = useState<string | null>(null);
  //Employee End

  const [loading, setLoading] = useState(false);

  const { business } = useTypedSelector((state) => state.business);

  //Employees
  const [sellerEmp, setSellerEmp] = useState<string[]>([]);

  function totalPrice(items: Product[]): number {
    let price: number = 0;
    if (items)
      for (let i = 0; i < items.length; i++) {
        price += items[i].sellPrice;
      }
    return price;
  }

  //Hold Invoice Reset
  const [holdReset, setHoldReset] = useState(false);
  const [invoiceToReset, setInvoiceToReset] = useState<number | null>(null);

  //
  const [showTaglessModal, setShowTaglessModal] = useState(false);
  return (
    <div
      className="bg-white min-h-[50vh] p-4 flex flex-col gap-y-6 rounded-md dark:bg-primaryColor-900"
      onClick={() => setFilteredProducts([])}
    >
      <div className={"flex justify-end"}>
        <button
          className={"flex gap-x-2 items-center px-2 py-1 dark:text-white"}
          onClick={() => setShowRecentInvoice(true)}
        >
          <BiReceipt /> Recent Transactions
        </button>
        <button
          className={"flex gap-x-2 items-center px-2 py-1 dark:text-white"}
          onClick={() => setShowHoldInvoice(true)}
        >
          <FaHandHolding /> Hold Transactions
        </button>
      </div>

      {/*Recent Transactions Modal*/}
      <Modal
        open={showRecentInvoice}
        onCancel={() => setShowRecentInvoice(false)}
        footer={false}
        width={"90vw"}
      >
        <Table
          loading={isLoading}
          className={"text-center"}
          dataSource={invoices}
          rowKey={(obj: Invoice, idx) => obj.id}
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
            title={"Created"}
            render={(text, record: Invoice) => {
              return new Date(record.createdAt).toDateString();
            }}
          />
        </Table>
      </Modal>

      {/*Hold Transactions Modal*/}

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
                      execute={async () => {
                        invoiceToReset &&
                          api
                            .patch(`/invoice/reset-hold/${invoiceToReset}`)
                            .then(() => {
                              successToast(
                                "All Product From This Invoice Ar now unsold"
                              );
                              dispatch(getInvoice());
                              dispatch(fetchProduct());
                            })
                            .catch((err) => {
                              rejectedToast(err);
                            });
                      }}
                    />
                    <button
                      onClick={() => {
                        setUpdateInvoiceId(record.id);
                        setUpdateInvoice(true);
                        setCart(record.products);
                        setCustomerTerm(record.customerName);
                        setCustomerPhone(record.customerMobile);
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
                        setInvoiceToReset(record.id);
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

      {/*



      Invoice Modal Start


      */}

      <Modal
        open={showInvoice}
        closable={true}
        destroyOnClose={true}
        footer={false}
        closeIcon={<AiFillCloseCircle />}
        onCancel={() => setShowInvoice(false)}
      >
        <div className={"w-full overflow-x-hidden"} ref={invoiceRef}>
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
              <h2 className={"text-[12px]"}>{invoiceData?.showroomMobile}</h2>
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
                    <td>{invoiceData?.withoutTax}</td>
                    <td>{invoiceData?.discountAmount}</td>
                    <td>{invoiceData?.invoiceAmount}</td>
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
                        (cr) => cr.customerPhone === invoiceData?.customerMobile
                      )?.crm
                  )?.empName
                }
              </p>
              <div className={"flex mb-2 mt-2 justify-between font-semibold"}>
                <h1>Qty: {invoiceData?.products.length}</h1>

                <h1>T. Payable: {invoiceData?.invoiceAmount}৳</h1>
              </div>
              <div className={"w-full flex text-center mb-2"}>
                <div className={"w-full border border-slate-400 py-1"}>
                  <h1 className={"border-b border-slate-400"}>
                    {invoiceData?.paymentMethod.paymentMethod}Amount
                  </h1>
                  <h1 className={""}>{invoiceData?.paidAmount}৳</h1>
                </div>
                <div
                  className={"border border-slate-400 border-l-0 py-1 w-full"}
                >
                  <h1 className={"border-b border-slate-400"}>Change Amount</h1>
                  <h1>{invoiceData?.changeAmount}৳</h1>
                </div>
              </div>

              <p className={"capitalize text-justify"}>
                in case of any change, please bring this invoice together with
                the product within 3 days
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
              <h2 className={"text-[12px]"}>{invoiceData?.showroomMobile}</h2>
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
                    <td>{invoiceData?.withoutTax}</td>
                    <td>{invoiceData?.discountAmount}</td>
                    <td>{invoiceData?.invoiceAmount}</td>
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
                        (cr) => cr.customerPhone === invoiceData?.customerMobile
                      )?.crm
                  )?.empName
                }
              </p>
              <div className={"flex mb-2 mt-2 justify-between font-semibold"}>
                <h1>Qty: {invoiceData?.products.length}</h1>

                <h1>T. Payable: {invoiceData?.invoiceAmount}৳</h1>
              </div>
              <div className={"w-full flex text-center mb-2"}>
                <div className={"w-full border border-slate-400 py-1"}>
                  <h1 className={"border-b border-slate-400"}>
                    {invoiceData?.paymentMethod.paymentMethod} Amount
                  </h1>
                  <h1 className={""}>{invoiceData?.paidAmount}৳</h1>
                </div>
                <div
                  className={"border border-slate-400 border-l-0 py-1 w-full"}
                >
                  <h1 className={"border-b border-slate-400"}>Change Amount</h1>
                  <h1>{invoiceData?.changeAmount}৳</h1>
                </div>
              </div>

              <p className={"capitalize text-justify"}>
                in case of any change, please bring this invoice together with
                the product within 3 days
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
            setFilteredProducts([]);
            setCart([]);
          }}
        >
          Print
        </button>
      </Modal>
      {/*
       *
       *
       *Invoice End
       *
       *
       */}

      {/*Add Customer Start*/}

      <Modal
        open={showCustomerModal}
        footer={false}
        onCancel={() => setShowModal(false)}
        title={"Add Customer"}
      >
        <Formik
          initialValues={{
            customerName: "",
            customerPhone: "",
            customerEmail: "",
            customerAddress: "",
          }}
          onSubmit={async (values) => {
            await dispatch(
              createCustomer(values, setCustomerTerm, setCustomerPhone)
            );
          }}
        >
          <Form className="space-y-2">
            <CommonInput
              required={true}
              label={"Customer Name"}
              name={"customerName"}
            />
            <CommonInput
              required={true}
              label={"Customer Phone"}
              name={"customerPhone"}
            />
            <CommonInput label={"Customer Email"} name={"customerEmail"} />
            <CommonInput label={"Customer Address"} name={"customerAddress"} />
            <Button type={"submit"} loading={isLoading}>
              Save
            </Button>
          </Form>
        </Formik>
      </Modal>

      {/*
       *
       *
       *Add Customer End
       *
       *
       */}
      <div className="flex w-full gap-x-10">
        {/* Search Customer */}
        <div className="flex relative w-[30%] items-center ">
          <div className={"flex w-full items-center"}>
            <div className="border h-[32px] w-[40px] justify-center border-r-0  border-slate-400 flex items-center dark:text-white">
              <FaUser className="text-slate-500 dark:text-white" />
            </div>
            <Formik
              initialValues={{ customerTerm: "" }}
              onSubmit={({ customerTerm }, { resetForm }) => {
                //
                setLoading(true);
                const searchedCustomer = find(
                  customers,
                  (element) =>
                    element.customerPhone.includes(customerTerm) ||
                    element.customerName.includes(customerTerm)
                );

                if (!searchedCustomer) {
                  toast.error("Please Try A Different Code, Maybe Try Again", {
                    autoClose: 2000,
                  });
                  setLoading(false);
                } else {
                  setCustomerTerm(searchedCustomer.customerName);
                  setCustomerPhone(searchedCustomer.customerPhone);
                  const employee = employees.find(
                    (emp) => emp.empPhone === searchedCustomer.crm
                  );
                  if (employee) {
                    setEmpPhone(employee.empPhone);
                  }
                  setLoading(false);
                }

                resetForm();
              }}
            >
              {() => (
                <Form className={"flex w-full relative"}>
                  <Field
                    className="pl-4 border border-solid h-[32px] w-full border-slate-400 focus:outline-none"
                    type="text"
                    placeholder={customerTerm || "Enter Customer Number-- Name"}
                    name={"customerTerm"}
                  />
                  <div
                    className={
                      "flex justify-center items-center absolute right-3 top-2"
                    }
                  >
                    {loading ? <Spin /> : null}
                  </div>
                </Form>
              )}
            </Formik>

            <div
              className={
                "border h-[32px] w-[40px] justify-center border-l-0  border-slate-400 flex items-center cursor-pointer dark:text-white"
              }
              onClick={() => setShowModal(true)}
            >
              <FaPlus />
            </div>
          </div>
        </div>

        {/**Tagless Product Modal */}

        <Modal
          open={showTaglessModal}
          onCancel={() => {
            setShowTaglessModal(false);
          }}
          footer={false}
        >
          <Formik
            initialValues={{
              size: "",
              sellPrice: 0,
              productGroup: "",
            }}
            onSubmit={async (values) => {
              api
                .post("/product/tagless", values)
                .then((res) => {
                  setCart((prev) => [...prev, res.data]);
                  dispatch(fetchProduct());
                })
                .catch((err) => {
                  rejectedToast(err);
                });
            }}
          >
            {
              <Form className="flex flex-col gap-y-2">
                <CommonInput
                  name="sellPrice"
                  label="Sell Price"
                  type="number"
                />
                <SelectInput label="Product Group" name="productGroup">
                  {productGroup.map((pg) => (
                    <option key={pg.productName} value={pg.productName}>
                      {pg.productName}
                    </option>
                  ))}
                </SelectInput>
                <CommonInput
                  name="size"
                  label="Size"
                  placeholder={"Eg: M,L,42,46"}
                  type="text"
                />
                <Button type="submit" className="btn__common">
                  Add Tagless Product
                </Button>
              </Form>
            }
          </Formik>
        </Modal>

        {/* Search Product */}
        <div className="flex w-[40%] items-center flex-col relative">
          <Formik
            initialValues={{ searchTerm: "" }}
            onSubmit={({ searchTerm }, { resetForm }) => {
              //
              setLoading(true);
              const searchedProduct = filter(
                products,
                (element) =>
                  element.productGroup.includes(searchTerm) ||
                  element.itemCode.includes(searchTerm)
              );

              if (!searchedProduct.length) {
                toast.error("Please Try A Different Code, Maybe Try Again", {
                  autoClose: 2000,
                });
                setLoading(false);
              } else {
                if (searchedProduct.length > 80) {
                  toast.error(
                    "Many Product Found, Please Try To Use Specific Product Code",
                    { autoClose: 2000 }
                  );
                } else if (searchedProduct.length === 1) {
                  if (searchedProduct[0].sellingStatus !== "Unsold") {
                    toast.error(
                      searchedProduct[0].sellingStatus +
                        " product can't be added to cart",
                      {
                        autoClose: 2000,
                      }
                    );
                  } else {
                    if (cart.includes(searchedProduct[0])) {
                      toast.error("This Product Is Already In Cart", {
                        autoClose: 2000,
                      });
                    } else {
                      setCart((prevCart) => [...prevCart, ...searchedProduct]);
                      setFilteredProducts([]);
                    }
                  }
                } else {
                  setFilteredProducts(searchedProduct);
                }
                setLoading(false);
              }

              resetForm();
            }}
          >
            {() => (
              <Form className={"flex w-full relative"}>
                <div className="border  h-[32px] w-[40px] justify-center border-r-0  border-slate-400 flex items-center">
                  <FaSearch className="text-slate-500 dark:text-white" />
                </div>
                <Field
                  className="pl-4 border border-solid h-[32px] w-full border-slate-400 focus:outline-none"
                  type="text"
                  placeholder="Enter Product Name / Item Code / Scan Bar Code ---- Press Enter On Keyboard"
                  name={"searchTerm"}
                />
                <div
                  className={
                    "flex justify-center items-center absolute right-3 top-2"
                  }
                >
                  {loading ? <Spin /> : null}
                </div>

                <div className="border  h-[32px] w-[40px] justify-center border-l-0 border-r-1  border-slate-400 flex items-center">
                  <Tooltip title="Add Tagless Product">
                    <FaPlus
                      onClick={() => setShowTaglessModal(true)}
                      className="text-slate-500 dark:text-white"
                      cursor={"pointer"}
                    />
                  </Tooltip>
                </div>
              </Form>
            )}
          </Formik>
          {filteredProducts?.length ? (
            <ul
              className={
                "absolute top-[110%] w-full border-1 border-slate-400 bg-white z-30 p-10 space-y-2 max-h-[70vh] overflow-y-scroll"
              }
            >
              {filteredProducts.map((product) => {
                return (
                  <li
                    onClick={() => {
                      if (product.sellingStatus !== "Unsold") {
                        toast.error(
                          product.sellingStatus +
                            " product can't be added to cart ",

                          {
                            autoClose: 2000,
                          }
                        );
                      } else {
                        if (cart.includes(product)) {
                          toast.error("This Product Is Already In Cart", {
                            autoClose: 2000,
                          });
                        } else {
                          setCart((prev) => [...prev, product]);
                          setFilteredProducts([]);
                        }
                      }
                    }}
                    className={`flex flex-col gap-y-1 bg-primary-color text-white p-2 rounded cursor-pointer`}
                    key={product.itemCode}
                  >
                    <p className={"flex justify-between"}>
                      <span>{product.productGroup}</span>
                      <span>{product.itemCode}</span>
                    </p>
                    <p className={"flex justify-between"}>
                      <span>Price: {product.sellPrice}</span>
                      <span
                        className={`${
                          product.sellingStatus === "Sold"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {product.sellingStatus}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
        {/*
        *
        *
        *

        Search CRM

        */}
        <div className="flex w-[30%] items-center ">
          <Select
            className={"w-full"}
            filterOption={true}
            value={empPhone}
            onChange={(e) => setEmpPhone(e)}
            placeholder="Select a Employee"
            options={employees.map((item) => ({
              label: item.empName,
              value: item.empPhone,
            }))}
            showSearch={true}
          />
        </div>
      </div>

      {/*



      Product Area */}
      <Formik
        initialValues={{
          discounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          subtotal: totalPrice(cart),
          paidAmount: 0,
          items: cart,
          customerPhone: customerPhone,
          discountTk: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          crmPhone: empPhone,
          vat: business?.defaultTax || 0,
          payable: cart.length
            ? cart.map((item) => item.sellPrice)
            : [0, 0, 0, 0],
          employees: sellerEmp,
          paymentMethod: PaymentMethod.CASH,
        }}
        enableReinitialize
        onSubmit={(values, { resetForm, setFieldValue }) => {
          console.log(values);
          if (!values.employees.length) {
            toast.error("Please Select Employee", {});
          } else {
            if (updateInvoice && updateInvoiceId) {
              api
                .patch(`/invoice/${updateInvoiceId}`, values)
                .then(async (res) => {
                  setInvoiceData(res.data);
                  setShowInvoice(true);
                  await dispatch(fetchProduct());
                  await dispatch(getInvoice());
                  await dispatch(fetchEmployee());
                  await dispatch(fetchCustomer());
                })
                .catch((err: AxiosError<ApiError>) => {
                  rejectedToast(err);
                });
            } else {
              //Creating Invoice
              api
                .post("/invoice", values)
                .then(async (res) => {
                  if (res.data.invoiceStatus !== "Hold") {
                    setInvoiceData(res.data);
                    setShowInvoice(true);
                  } else {
                    toast.success("Invoice Added To Hold");
                  }
                  await dispatch(fetchProduct());
                  await dispatch(getInvoice());
                  await dispatch(fetchEmployee());
                  await dispatch(fetchCustomer());
                })
                .catch((err: AxiosError<ApiError>) => {
                  rejectedToast(err);
                });
            }
            setUpdateInvoice(false);
            setUpdateInvoiceId(null);
            setCart([]);
          }
        }}
      >
        {({ values, handleSubmit, setFieldValue, handleChange, resetForm }) => {
          return (
            <Form
              method={"post"}
              onSubmit={(e) => {
                e.preventDefault();
                if (!values.paidAmount) {
                  return toast.error("Please Pay Amount");
                }
                setConfirmationModal(true);
              }}
            >
              <Modal
                open={confirmationModal}
                footer={false}
                onCancel={() => setConfirmationModal(false)}
              >
                <h1 className="confirm__modal--heading">
                  Are you sure! you want to Continue?
                </h1>
                <div className={"flex gap-x-5"}>
                  <button
                    className={"confirm__modal--btn cancel"}
                    type={"button"}
                    onClick={() => setConfirmationModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type={"button"}
                    className={"confirm__modal--btn continue"}
                    onClick={() => {
                      handleSubmit();
                      setConfirmationModal(false);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </Modal>
              <div className={"flex gap-x-5"}>
                <Table
                  dataSource={cart}
                  rowKey={(obj: Product, index) => obj.id}
                  className={"z-20 flex-1"}
                  pagination={false}
                  rowClassName={
                    "dark:bg-slate-700 dark:text-white dark:hover:text-primaryColor-900"
                  }
                >
                  <Table.Column
                    title={"#"}
                    render={(_text, _record, index) => index + 1}
                  />
                  <Table.Column
                    title={"Product Name, Code"}
                    render={(text, record: Product) => (
                      <span>
                        {record.itemCode} - {record.productGroup}
                      </span>
                    )}
                  />
                  <Table.Column
                    title={"Discount (%)"}
                    render={(text, record: Product, index) => {
                      return (
                        <>
                          <Field
                            className={
                              "text-white border-none focus:outline-none bg-black"
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleChange(e);
                              setFieldValue(
                                `payable[${index}]`,
                                Math.round(
                                  cart[index].sellPrice -
                                    (cart[index].sellPrice / 100) *
                                      Number(e.target.value)
                                )
                              );
                              setFieldValue(
                                `discountTk[${index}]`,
                                Math.round(
                                  (cart[index].sellPrice / 100) *
                                    Number(e.target.value)
                                )
                              );
                            }}
                            name={`discounts[${index}]`}
                            type={"number"}
                          />
                        </>
                      );
                    }}
                  />

                  <Table.Column
                    title={"Employee"}
                    render={(_, _record, index) => {
                      return (
                        <Select
                          className={"w-[140px]"}
                          options={employees.map((emp) => ({
                            label: emp.empName,
                            value: emp.empPhone,
                          }))}
                          onChange={(value) => {
                            if (sellerEmp.length < cart.length) {
                              setSellerEmp((prevState) => [
                                ...prevState,
                                value,
                              ]);
                            }
                          }}
                        />
                      );
                    }}
                  />
                  <Table.Column title={"QTY"} render={() => 1} />
                  <Table.Column title={"T.Price"} dataIndex={"sellPrice"} />
                  <Table.Column
                    title={"D.Price"}
                    render={(_, record: Product, index) => {
                      return record.sellPrice - values.discountTk[index];
                    }}
                  />
                  <Table.Column
                    title={<AiOutlineClose />}
                    render={(_text, record: Product, index) => (
                      <button onClick={() => removeFromCart(record.itemCode)}>
                        X
                      </button>
                    )}
                  />
                </Table>
                <div className={"w-80 flex flex-col space-y-5 dark:text-white"}>
                  <div
                    className={"text-[16px] font-black flex justify-between"}
                  >
                    Subtotal{" "}
                    <input
                      value={values.subtotal}
                      disabled
                      className="border pl-2 rounded-md w-40"
                    />
                  </div>
                  <div
                    className={"text-[16px] font-black flex justify-between"}
                  >
                    - Total Discount (tk)
                    <input
                      value={values.discountTk.reduce((a, b) => a + b)}
                      disabled
                      className="border pl-2 rounded-md w-40"
                    />
                  </div>

                  <div
                    className={"text-[16px] font-black flex justify-between"}
                  >
                    + Vat (%)
                    <Field
                      className="border pl-2 rounded-md w-40"
                      name={"vat"}
                      type={"number"}
                    />
                  </div>
                  <div
                    className={"text-[16px] font-black flex justify-between"}
                  >
                    Total Payable
                    <input
                      value={
                        values.payable.reduce((a, b) => a + b) +
                        Math.round((values.subtotal / 100) * values.vat)
                      }
                      disabled
                      className="border pl-2 rounded-md w-40"
                    />
                  </div>

                  <div
                    className={"text-[16px] font-black flex justify-between"}
                  >
                    Customer Paying
                    <Field
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        setFieldValue("paidAmount", Number(e.target.value));
                      }}
                      className="border pl-2 rounded-md w-40"
                      name={"paidAmount"}
                      type={"number"}
                    />
                  </div>

                  <div
                    className={"text-[16px] font-black flex justify-between"}
                  >
                    <span>
                      {values.paidAmount -
                        (values.payable.reduce((a, b) => a + b) +
                          (values.subtotal / 100) * values.vat) <
                      0
                        ? "Due"
                        : "Change"}
                    </span>
                    <input
                      className="border pl-2 rounded-md w-40"
                      value={
                        values.paidAmount +
                        -(
                          values.payable.reduce((a, b) => a + b) +
                          Math.round((values.subtotal / 100) * values.vat)
                        )
                      }
                      disabled
                    />
                  </div>
                  <div
                    className={"text-[16px] font-black flex justify-between"}
                  >
                    Payment Method
                    <Field
                      className="border pl-2 rounded-md w-40"
                      as="select"
                      name="paymentMethod"
                      children={Object.keys(PaymentMethod).map((key) => (
                        <option value={key}>{key}</option>
                      ))}
                    />
                  </div>
                </div>
              </div>

              {/* Sells Action */}

              <div className={"flex gap-x-10 items-center"}>
                <Link
                  className={
                    "flex items-center gap-x-2 bg-blue-600 px-2 py-1 rounded text-white w-[140px] justify-center"
                  }
                  target={"_blank"}
                  to={"/dashboard/pos"}
                >
                  <FaPlus /> Add New
                </Link>
                <button
                  type={"submit"}
                  onClick={() => {
                    setFieldValue("invoiceStatus", "Hold");
                  }}
                  className={
                    "flex items-center gap-x-2 bg-red-500 text-white w-auto px-2 py-1 rounded min-w-[140px] justify-center"
                  }
                  children={
                    <>
                      <FaHandHolding />
                      Hold
                    </>
                  }
                />
                <button
                  type={"button"}
                  onClick={() => {
                    resetForm();
                    setCustomerTerm("Walker Customer");
                    setCart([]);
                  }}
                  className={
                    "flex items-center gap-x-2 bg-red-500 px-2 py-1 rounded text-white w-[140px] justify-center"
                  }
                >
                  <BiReset />
                  Reset
                </button>
                <button
                  className={
                    "flex items-center gap-x-2 bg-green-500 text-white w-auto px-2 py-1 rounded min-w-[140px] justify-center"
                  }
                  type={"submit"}
                  onClick={() => {
                    setFieldValue("invoiceStatus", "Paid");
                  }}
                >
                  Pay
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Sell;
