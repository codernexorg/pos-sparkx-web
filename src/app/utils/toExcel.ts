import * as XLSX from 'xlsx';

const handleExcel = (tableId: string) => {
  const table = document.getElementById(tableId) as HTMLElement;
  const workbook = XLSX.utils.table_to_book(table);
  const ws = workbook.Sheets['Sheet1'];
  XLSX.utils.sheet_add_aoa(
    ws,
    [['Created ' + new Date().toLocaleDateString()]],
    {
      origin: -1
    }
  );
  const fileName = new Date(Date.now()).toString() + '.xlsx';

  XLSX.writeFile(workbook, fileName);
};

export default handleExcel;
