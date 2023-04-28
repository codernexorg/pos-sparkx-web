import React, { useEffect, useState } from "react";
import { Button } from "antd";
import moment from "moment";
import api from "../../../api";
import { AxiosError } from "axios";
import { ApiError } from "../../../redux/types";
import { rejectedToast } from "../../utils/toaster";
import printJS from "print-js";
import { getDayOfMonth } from "../../utils/helper";
import { useTypedSelector } from "../../../redux/store";
import JsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ReportLayout from "../../components/ReportLayout";
import { useSettingContext } from "../../context/SettingProver";
import { UserRole } from "../../../types";
import { find } from "underscore";
import { Loader } from "../../components";

interface SalesProps {}

interface DailySales {
  average: number;
  date: string;
  day: string;
  id: string;
  month: string;
  quantity: string;
  total: number;
  year: string;
  totalQty: number;
  totalAmount: number;
  totalAverage: number;
}

interface EmpDailySales {
  empName: string;
  month: string;
  year: number;
  sales: {
    date: string;
    total: 9600;
    day: string;
  }[];
}

const Sales: React.FC<SalesProps> = () => {
  const { showroom, isLoading } = useTypedSelector((state) => state.showroom);
  const [showDailySales, setShowDailySales] = useState(true);
  const [showEmployeeSales, setShowEmployeeSales] = useState(false);
  const [monthNumber, setMonthNumber] = useState(moment().month() + 1);
  const [dailySalesData, setDailySalesData] = useState<DailySales[]>([]);
  const [empDailySalesData, setEmpDailySalesData] = useState<EmpDailySales[]>(
    []
  );
  const [srCode, setSrCode] = useState("");
  const [loading, setLoading] = useState(false);

  //Setting Showroom Code For Current User
  const { currentUser } = useSettingContext();
  useEffect(() => {
    if (currentUser?.role === UserRole[0]) {
      if (setSrCode) {
        setSrCode(showroom[0]?.showroomCode);
      }
    } else {
      const srCode = find(showroom, {
        showroomName: currentUser?.assignedShowroom,
      });
      if (srCode) {
        if (setSrCode) {
          setSrCode(srCode.showroomCode);
        }
      }
    }
  }, [currentUser?.assignedShowroom, currentUser?.role, showroom]);
  const monthData = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];

  const totalAmountArr = function (date: string) {
    let total: number[] = [];
    empDailySalesData.forEach((employee) => {
      const salesForMonth = employee.sales.find((sale) => sale.date === date);
      if (salesForMonth) {
        total.push(salesForMonth.total);
      } else total.push(0);
    });
    return total;
  };

  const totalAmountByDatesAndEmployees = function (
    dates: string[],
    emp: string
  ) {
    let total: number[] = [];
    dates.forEach((date) => {
      empDailySalesData.forEach((employee) => {
        const salesForDate = employee.sales.find((sale) => sale.date === date);
        if (salesForDate && emp === employee.empName) {
          total.push(salesForDate.total);
        } else total.push(0);
      });
    });
    return total;
  };
  const totalAmountByDate = function (dates: string[]) {
    let total: number[] = [];
    dates.forEach((date) => {
      if (date.length)
        empDailySalesData.forEach((employee) => {
          const salesForDate = employee.sales.find(
            (sale) => sale.date === date
          );
          if (salesForDate) {
            total.push(salesForDate.total);
          } else total.push(0);
        });
    });
    return total;
  };

  //Handling PDF Generation
  const handlePdf = () => {
    const doc = new JsPDF();
    doc.text(
      `Daily Sales Data ${dailySalesData[0]?.month} _ ${
        dailySalesData[0]?.year
      } \n${showroom.find((sr) => sr.showroomCode === srCode)?.showroomName}`,
      110,
      10,
      { align: "center" }
    );
    autoTable(doc, {
      startY: 20,

      html: "#printDailySalesData",
      theme: "grid",
      tableWidth: "auto",
    });

    doc.save("daily_sales.pdf");
  };

  const handleEmpPdf = () => {
    const doc = new JsPDF();
    doc.text(
      `Employee Sales Data ${empDailySalesData[0]?.month} _ ${
        empDailySalesData[0]?.year
      } \n${showroom.find((sr) => sr.showroomCode === srCode)?.showroomName}`,
      110,
      10,
      { align: "center" }
    );
    autoTable(doc, {
      startY: 20,
      html: "#printEmpSalesData",
    });

    doc.save("emp_sales.pdf");
  };

  if (isLoading) {
    return <Loader />;
  }

  //Daily Sales
  const DailySales = () => {
    return (
      <ReportLayout
        handleGenerate={() => {
          setLoading(true);
          api
            .get("/reports/sales/daily", {
              params: {
                month: monthNumber,
                showroom: srCode,
              },
            })
            .then((res) => {
              setDailySalesData(res.data);

              setLoading(false);
            })
            .catch((err: AxiosError<ApiError>) => {
              rejectedToast(err);

              setLoading(false);
            });
        }}
        monthData={monthData}
        monthNumber={monthNumber}
        setMonthNumber={setMonthNumber}
        handlePdf={handlePdf}
        handlePrint={() =>
          printJS({
            printable: "printDailySales",
            type: "html",
            targetStyles: ["*"],
          })
        }
        srCode={srCode}
        setSrCode={setSrCode}
        excelTableId={"printDailySalesData"}
        excelTitle={
          "Daily Sales Data " +
          showroom.find((sr) => sr.showroomCode === srCode)?.showroomName
        }
      >
        <div id={'printDailySales'} className={"text-center text-xl font-semibold"}>
          <div className={"report__info"} id={"dailySalesHeader"}>
            <h1>Daily Sales Summary </h1>
            <h2>
              for the {dailySalesData[0]?.month}_{dailySalesData[0]?.year} Of{" "}
              {showroom.find((sr) => sr.showroomCode === srCode)?.showroomName}
            </h2>
          </div>
          <table
            className={"daily__sales-table mt-4 "}
            id={"printDailySalesData"}
          >
            <thead>
              <tr>
                <th>SL</th>
                <th>DATE</th>
                <th>DAY'S</th>
                <th>QUANTITY</th>
                <th>TAKA</th>
                <th>AVERAGE</th>
              </tr>
            </thead>
            <tbody>
              {getDayOfMonth(moment().year(), monthNumber).map(
                (month, index) => {
                  const salesData = dailySalesData.find(
                    (item) => item.date === month.date
                  );
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{month.date}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {month.day}
                      </td>
                      <td>{salesData?.quantity ? salesData.quantity : `-`}</td>
                      <td>{salesData?.total ? salesData.total : `-`}</td>
                      <td>{salesData?.average ? salesData.average : `-`}</td>
                    </tr>
                  );
                }
              )}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>{dailySalesData[0]?.totalQty}</td>
                <td>{dailySalesData[0]?.totalAmount}</td>
                <td>{dailySalesData[0]?.totalAverage}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={'print__footer'}>
          <h2>NOTE:</h2>
          <h2>1. DAILY SALES SUMMARY</h2>
          <h2>2. CALCULATION MUST BE EXCLUDING RETURN QTY & AMOUNT.</h2>
        </div>
      </ReportLayout>
    );
  };

  // Employee Daily Sales

  const EmployeeDailySales = () => {
    return (
      <ReportLayout
        handleGenerate={() => {
          setLoading(true);
          api
            .get("/reports/sales/daily/employee", {
              params: {
                month: monthNumber,
                showroom: srCode,
              },
            })
            .then((res) => {
              setEmpDailySalesData(res.data);
              setLoading(false);
            })
            .catch((err: AxiosError<ApiError>) => {
              rejectedToast(err);
              setLoading(false);
            });

        }}
        handlePdf={handleEmpPdf}
        handlePrint={() =>
          printJS({
            printable: "printDailySales",
            type: "html",
            targetStyles: ["*"],
          })
        }
        srCode={srCode}
        setSrCode={setSrCode}
        monthNumber={monthNumber}
        setMonthNumber={setMonthNumber}
        monthData={monthData}
        excelTableId={"printEmpSalesData"}
        excelTitle={
          "Employee Daily Sales Data " +
          showroom.find((sr) => sr.showroomCode === srCode)?.showroomName
        }
      >
        <div
          id={"printDailySales"}
          className={"text-center text-xl font-semibold"}
        >
          <div className={"report__info"}>
            <h1>Employee Daily Sales Data </h1>
            <h2>
              for {empDailySalesData[0]?.month}_{empDailySalesData[0]?.year} Of{" "}
              {showroom.find((sr) => sr.showroomCode === srCode)?.showroomName}
            </h2>
          </div>
          <table
            className={"daily__sales-table mt-4 "}
            id={"printEmpSalesData"}
          >
            <thead>
              <tr>
                <th>SL</th>
                <th>DATE</th>
                <th>DAY'S</th>
                {empDailySalesData.map((item) => (
                  <th key={item.empName}>{item.empName}</th>
                ))}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {getDayOfMonth(new Date().getFullYear(), monthNumber).map(
                (month, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{month.date}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {month.day}
                      </td>
                      {empDailySalesData.map((item, index) => {
                        const salesData = item.sales.find(
                          (sales) => sales.date === month.date
                        );
                        return <td key={index}>{salesData?.total || `-`}</td>;
                      })}
                      <td>
                        {totalAmountArr(month.date).reduce((a, b) => a + b, 0)}
                      </td>
                    </tr>
                  );
                }
              )}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                {empDailySalesData.map((item, index) => {
                  return (
                    <td key={index}>
                      {totalAmountByDatesAndEmployees(
                        getDayOfMonth(
                          new Date().getFullYear(),
                          monthNumber
                        ).map((item) => item.date),
                        item.empName
                      ).reduce((a, b) => a + b, 0)}
                    </td>
                  );
                })}
                <td>
                  {totalAmountByDate(
                    getDayOfMonth(new Date().getFullYear(), monthNumber).map(
                      (item) => item.date
                    )
                  ).reduce((a, b) => a + b, 0)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className={'print__footer'}>
            <h2>NOTE:</h2>
            <h2>1. EMPLOYEE DAILY SALES.</h2>
          </div>
        </div>
      </ReportLayout>
    );
  };
  return (
    <div>
      <div className={"flex bg-white py-4 gap-x-5 py-2 px-5 rounded mb-4"}>
        <Button
          className={showDailySales ? "btn__active" : ""}
          onClick={() => {
            setShowEmployeeSales(false);
            setShowDailySales(true);
          }}
        >
          Daily Sales Summary
        </Button>
        <Button
          className={showEmployeeSales ? "btn__active" : ""}
          onClick={() => {
            setShowDailySales(false);
            setShowEmployeeSales(true);
          }}
        >
          Employee Daily Sales
        </Button>
      </div>

      <div className={"duration-300 transition-all"}>
        {loading?<Loader/>:null}
        {showDailySales ? <DailySales /> : null}
        {showEmployeeSales ? <EmployeeDailySales /> : null}
      </div>
    </div>
  );
};

export default Sales;
