import moment from "moment";
import { useEffect, useState } from "react";

const dateFilter = <T extends Product>(
  arr: T[],
  startDate: string,
  endDate: string
) => {
  return arr.filter((item) => {
    const momentStart = moment(startDate).format("YYYY-MM-DD");
    const momentEnd = moment(endDate).format("YYYY-MM-DD");
    const formattedDate = moment(item.updatedAt).format("YYYY-MM-DD");

    if (formattedDate >= momentStart && formattedDate <= momentEnd) {
      return item;
    } else {
      return undefined;
    }
  });
};
export const useFilteredSoldProduct = (
  data: Product[],
  start: string,
  end: string
) => {
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  useEffect(() => {
    if (typeof start === "undefined" || typeof end === "undefined") {
      setFilteredData(data);
      return;
    }

    setFilteredData(dateFilter(data, start, end));
  }, [start, end, data]);

  return filteredData;
};
