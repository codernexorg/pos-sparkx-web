import { Modal } from "antd";
import { Formik, Form } from "formik";
import React, { SetStateAction } from "react";
import { createCustomer } from "../../../../redux/actions/customer";
import { useAppDispatch, useTypedSelector } from "../../../../redux/store";
import { Button, CommonInput } from "../../../components";

interface CustomerProps {
  showCustomerModal: boolean;
  setShowCustomerModal: React.Dispatch<SetStateAction<boolean>>;
  setCustomerPhone: React.Dispatch<SetStateAction<string | null>>;
}

const Customer: React.FC<CustomerProps> = ({
  setShowCustomerModal,
  showCustomerModal,
  setCustomerPhone,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useTypedSelector((state) => state.customer);
  return (
    <Modal
      open={showCustomerModal}
      footer={false}
      onCancel={() => setShowCustomerModal(false)}
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
          await dispatch(createCustomer(values, setCustomerPhone));
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
  );
};
export default Customer;
