import { Link } from 'react-router-dom';
import './404.css';
const NotFound = () => {
  return (
    <div className='bg-404  text-2xl relative '>
      <Link
        className='absolute bottom-10 md:bottom-0 left-[8%] border text-gray-400 text-gray-400 px-6 py-2 md:py-1 md:px-4'
        to={'/dashboard'}
      >
        Go To Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
