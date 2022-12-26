import { Typography } from 'antd';
import { FaFileExcel, FaFilePdf, FaPrint } from 'react-icons/fa';
import style from 'styled-components';
import toExcel from '../utils/toExcel';

interface PrinAbleLayotProps {
  children: React.ReactNode;
  tableId: string;
  handlePrint: React.MouseEventHandler;
}

const Header = style.div`
  display:flex;
  flex-direction:column;
  margin:30px 0;
  row-gap:10px;
  background:#fff;
  padding:20px 10px;
  border-radius:20px 10px;
`;

const PrintAbleLayout: React.FC<PrinAbleLayotProps> = ({
  children,
  tableId,
  handlePrint
}) => {
  return (
    <div className='w-full flex flex-col'>
      <Header>
        <Typography className='text-xl font-bold'>Export</Typography>
        <div className='flex text-sm gap-x-4 '>
          <div
            title='PDF'
            className='bg-red-900 text-white flex items-center py-0.5 px-2 rounded cursor-pointer'
            onClick={() => {}}
          >
            <FaFilePdf cursor={'pointer'} /> <span>PDF</span>
          </div>
          <div
            title='Excel'
            className='bg-green-600 text-white flex items-center py-0.5 px-2 rounded cursor-pointer'
            onClick={() => toExcel(tableId)}
          >
            <FaFileExcel cursor={'pointer'} />
            <span>EXCEL</span>
          </div>
          <div
            title='Print'
            className='bg-green-600 text-white flex items-center py-0.5 px-2 rounded cursor-pointer'
            onClick={handlePrint}
          >
            <FaPrint cursor={'pointer'} />
            <span>PRINT</span>
          </div>
        </div>
      </Header>
      {children}
    </div>
  );
};

export default PrintAbleLayout;
