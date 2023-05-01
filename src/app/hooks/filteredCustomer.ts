import { useState, useEffect } from "react";

export const useFilteredHook = <T extends { updatedAt: string }>(
  start: string,
  end: string,
  data: T[]
): T[] => {
  const [filteredData, setFilteredData] = useState<T[]>(data);

  useEffect(() => {
    if (typeof start === "undefined" || typeof end === "undefined") {
      setFilteredData(data);
      return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    const filtered = data.filter((item) => {
      const itemDate = new Date(item.updatedAt);
      return itemDate >= startDate && itemDate <= endDate;
    });

    setFilteredData(filtered);
  }, [start, end, data]);

  return filteredData;
};
