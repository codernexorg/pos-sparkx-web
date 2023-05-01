import React, { SetStateAction, useEffect, useState } from "react";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

interface DateProps {
  onChange: React.Dispatch<SetStateAction<string[]>>;
}

const DateFilter: React.FC<DateProps> = ({ onChange }) => {
  const [dateRange, setDateRange] = useState<string[]>([]);

  useEffect(() => {
    onChange(dateRange);
  }, [dateRange, onChange]);

  return (
    <div className="flex justify-between my-3">
      <div></div>
      <RangePicker
        onChange={(_, values) => {
          setDateRange(values);
        }}
      />
    </div>
  );
};

export default DateFilter;
