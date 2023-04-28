import React, { useState } from "react";
import { Input, Select } from "antd";
import { useTypedSelector } from "../../../redux/store";
import { Button } from "../../components";
import { sendSmsBulk } from "../../utils/helper";
import { toast } from "react-toastify";

interface MarketingProps {}

const Marketing: React.FC<MarketingProps> = () => {
  const [message, setMessage] = useState("");
  const [customer, setCustomer] = useState<string[]>([]);
  const { TextArea } = Input;
  const { customers } = useTypedSelector((state) => state.customer);
    console.log(customer)
  return (
    <div className={"mt-10"}>

      <div className={"flex justify-center"}>
        <div className={"min-w-[800px] bg-white mt-4 p-4 rounded space-y-2"}>
            <h1 className={"text-xl font-semibold"}>Promotional SMS</h1>
          <TextArea
            className={"w-full"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={"Enter Your Message"}
          />
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select Customer"
            value={customer}
            options={customers.map((customer) => ({
              value: customer.customerPhone,
              label: customer.customerName,
            }))}
            onChange={(value) => setCustomer(value)}
          />
            <button className={'dark:bg-white bg-slate-900 dark:text-primaryColor-900 text-white block w-[140px] py-1 rounded-md dark:border border-slate-400'} onClick={()=>setCustomer(customers.map(customer=>customer.customerPhone))}>Select All</button>
          <Button
            onClick={async () =>{
                if (customer.length && message) {
                    await   sendSmsBulk(message,customer)
                }else {
                toast.error('Please Check if you enter message & selected customer')
                }
            }}
          >
            Send SMS
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
