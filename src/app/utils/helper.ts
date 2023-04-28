import printJS from "print-js";
import * as XLSX from "xlsx";
import moment from "moment";
import { rejectedToast, successToast } from "./toaster";
import api from "../../api";

export const uniqueItem = <T>(arr: T[], fn: (x: T) => string): string[] => {
  const set = new Set<string>();
  arr.forEach((x) => set.add(fn(x)));
  return Array.from(set).sort();
};

export const handlePrint = (
  data: any,
  props: any,
  title: string = "Document"
) =>
  printJS({
    printable: data,
    type: "json",
    properties: props,
    header: title,
    headerStyle: "padding:0;text-align:center;margin:0;font-size:28px",
    targetStyle: ["border", "padding"],
    gridStyle:
      "padding:5px 0;border:1px solid lightgray;text-align:center;font-family:Montserrat;font-size:16px",
  });

export const handleExcel = (
  data: any[],
  title: string = "Document",
  file: string = "Excel Data"
) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  const fileName =
    file +
    "_" +
    new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Dhaka",
      day: "numeric",
      hour12: true,
      year: "numeric",
      month: "numeric",
    }) +
    ".xlsx";
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, fileName);
};

export const handleExcelHtml=(tableId: string,title?:string) => {
    const table = document.getElementById(tableId) as HTMLElement;
    const workbook = XLSX.utils.table_to_book(table);
    const ws = workbook.Sheets['Sheet1'];
    XLSX.utils.sheet_add_aoa(
        ws,
        [['Created ' + new Date().toLocaleDateString()],[title]],
        {
            origin: -1
        }
    );
    const fileName =tableId.toUpperCase()+ new Date(Date.now()).toString()+ '.xlsx';

    XLSX.writeFile(workbook, fileName);
};

export const getDayOfMonth = function (
  year: number,
  month: number
): { date: string; day: string }[] {
  const monthIndex = month - 1; // 0..11 instead of 1..12
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const date = new Date(year, monthIndex, 1);
  const result = [];
  while (date.getMonth() === monthIndex) {

    result.push({
      date:
        date.getDate().toString().padStart(2,'0')+ "-" +(date.getMonth() + 1).toString().padStart(2,'0') +"-" +
        date.getFullYear(),
      day: days[moment(date).isoWeekday() - 1],
    });
    date.setDate(date.getDate() + 1);
  }
  return result;
};

export function generateRandomNumber(length:number): string {
    let num = '';
    for (let i = 0; i < length; i++) {
        num += Math.floor(Math.random() * 10).toString();
    }
    return num;
}

export const sendSmsBulk=async (message:string,numbers:string[]):Promise<void> => {
    api
        .post('/sms',{message,numbers:numbers.join(',')})
        .then((response) => {
            successToast('SMS sent successfully')
        })
        .catch((err) => {
            rejectedToast(err);
        });
}
export const sendSmsSingle=async (message:string,numbers:string):Promise<void> => {
    api
        .post("/sms",{message,numbers})
        .then((response) => {
            console.log(response);
            successToast('SMS sent successfully')
        })
        .catch((err) => {
            rejectedToast(err);
        });
}

export const getTotalQuantityByProductName = (
    products: Product[]
) => {
    const soldProducts = products.filter(product => product.sellingStatus === 'Sold'&&moment(product.updatedAt).format('YYYY-MM')===moment().format('YYYY-MM'));
// Group sold products by productGroup and sum the quantities
    const soldProductsByGroup = soldProducts.reduce((accumulator:Record<any, any>, product) => {
        if (accumulator[product.productGroup]) {
            accumulator[product.productGroup] += product.quantity;
        } else {
            accumulator[product.productGroup] = product.quantity;
        }
        return accumulator;
    }, {});

// Find the best selling product by quantity
    let bestSellingProduct = null;
    let maxQuantity = 0;

    for (const productGroup in soldProductsByGroup) {
        if (soldProductsByGroup[productGroup] > maxQuantity) {
            maxQuantity = soldProductsByGroup[productGroup];
            bestSellingProduct = soldProducts.find(product => product.productGroup === productGroup);
        }
    }

    return bestSellingProduct
};