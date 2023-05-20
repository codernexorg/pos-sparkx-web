import React, { useState } from "react";
import ReportLayout from "../../components/ReportLayout";
import api from "../../../api";
import { rejectedToast } from "../../utils/toaster";
import { formatPrice } from "../../utils";
import printJS from "print-js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ReturnReportProps {}

interface ReturnReportData {
  day: string;
  date: string;
  id: number;
  tagPrice: number[];
  finalPrice: number[];
  invoiceNo: string;
  seller: { empName: string; empPhone: string }[];
  check: string;
  customer: string;
  products: { itemCode: string; productName: string }[];
}

const ReturnReport: React.FC<ReturnReportProps> = ({}) => {
  const [reportData, setReportData] = useState<ReturnReportData[]>([]);

  console.log(reportData);

  return (
    <ReportLayout
      handleGenerate={() => {
        api
          .get("/reports/return")
          .then((res) => setReportData(res.data))
          .catch((err) => rejectedToast(err));
      }}
      excelTitle="Return Report"
      handlePdf={() => {
        const doc = new jsPDF("landscape");
        doc.text(
          `Return Report
          `,
          150,
          10,
          { align: "center" }
        );
        autoTable(doc, {
          html: "#returnReport",
          startY: 20,
        });
        doc.save("return.pdf");
      }}
      handlePrint={() => {
        printJS({
          printable: "returnReport",
          type: "html",
          targetStyles: ["*"],
        });
      }}
      excelTableId="returnReport"
    >
      <h1 className="text-xl font-semibold">Return Reports</h1>
      <table id="returnReport" className="return__table">
        <thead>
          <tr>
            <th className="text-left">SL</th>
            <th className="text-left">DAY</th>
            <th className="text-left">DATE</th>
            <th className="text-left">CODE</th>
            <th className="text-right">TAG PRICE</th>
            <th className="text-right">FINAL PRICE</th>
            <th className="text-left">INVOICE</th>
            <th className="text-left">PRODUCT NAME</th>
            <th className="text-left">SELLER</th>
            <th className="text-left">%CHECK</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((r, i) => {
            return (
              <tr key={i}>
                <td className="text-left">{i + 1}</td>
                <td className="text-left">{r.day}</td>
                <td className="text-left">{r.date}</td>
                <td className="text-left">
                  {r.products.map((p, i) => (
                    <tr key={i}>
                      <td>{p.itemCode}</td>
                    </tr>
                  ))}
                </td>
                <td>
                  {r.tagPrice.map((p, i) => (
                    <tr className="flex flex-col items-end w-[100%]" key={i}>
                      <td>{formatPrice(p)}</td>
                    </tr>
                  ))}
                </td>
                <td>
                  {r.finalPrice.map((p, i) => (
                    <tr className="flex flex-col items-end w-[100%]" key={i}>
                      <td>{formatPrice(p)}</td>
                    </tr>
                  ))}
                </td>
                <td className="text-left">{r.invoiceNo}</td>
                <td className="text-left">
                  {r.products.map((p, i) => (
                    <tr key={i}>
                      <td>{p.productName}</td>
                    </tr>
                  ))}
                </td>
                <td className="text-left">
                  {r.seller.map((p, i) => (
                    <tr key={i}>
                      <td>{p.empName}</td>
                    </tr>
                  ))}
                </td>
                <td className="text-left">{r.check}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ReportLayout>
  );
};
export default ReturnReport;