import { Breadcrumb } from 'antd';
import { motion } from 'framer-motion';
import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { NavBar, SideNav } from '../../components';

const Footer = styled.div`
  width: 100%;
  height: 5vh;
  padding: 0 15px;
  display: flex;
  align-items: center;
  color: #gajkfa;
  border-top: 1px solid rgb(156, 163, 175);
`;
const Layout = () => {
  const isAuth = useIsAuthenticated();
  const location = useLocation();
  if (!isAuth()) {
    return (
      <Navigate to={'/login'} state={{ from: location.pathname }} replace />
    );
  }
  return (
    <div className='dark:bg-slate-900 w-[100%] h-screen scrollbar-hide'>
      <div className='flex scrollbar-hide'>
        <motion.div className='w-auto'>
          <SideNav />
        </motion.div>
        <div className='w-full  h-screen scrollbar-hide'>
          <NavBar />
          <main className='overflow-y-scroll h-[90vh] md:p-[15px] p-[30px]  bg-slate-100'>
            <Breadcrumb>
              <Breadcrumb.Item className='capitalize mb-4'>
                {location.pathname}
              </Breadcrumb.Item>
            </Breadcrumb>
            <Outlet />
          </main>
          <Footer>
            <p>&copy;2023 SparkX Fashion Wear </p>
          </Footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
