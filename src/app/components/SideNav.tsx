import Link from 'antd/es/typography/Link';
import { AnimatePresence, motion } from 'framer-motion';
import { FaAngleRight } from 'react-icons/fa';
import { SiShopware } from 'react-icons/si';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSettingContext } from '../context/SettingProver';

import navigation from './navigation';

const CustomLink = styled(NavLink)`
  display: flex;
  align-items: center;
  column-gap: 16px;
  padding: 3px 0px 2.5px 4px;
  border-radius: 5px;
  font-size: 16px;
  color: #313131;
  margin: 12px;
  &:hover {
    color: #0f172a;
    background: #ededed;
  }
`;

const SimpleLink = styled(Link)`
  color: #0f172a;
  font-weight: bold;
  display: flex;
  column-gap: 12px;
  align-items: center;
`;

const SideBar = styled(motion.div)`
  height: 100vh;
  overflow: auto;
  padding-bottom: 35px;
  --webik-scrollbar: {
    display: none;
  }
  border-right: 1px solid rgb(156, 163, 175);
  @media (max-width: 1400px) {
    overflow: hidden;
    &:hover {
      overflow: auto;
    }
  }
`;

const SideNav = () => {
  const { isActive } = useSettingContext();

  return (
    <SideBar className='scrollbar-hide'>
      <AnimatePresence>
        {isActive ? (
          <motion.div
            // initial={{
            //   x: '-350px',
            //   opacity: 0
            // }}
            // animate={{
            //   x: 0,
            //   opacity: 1,
            //   animationDirection: 'alternate-reverse'
            // }}
            exit={{
              x: '-300px',
              opacity: 0,
              transition: { duration: 0.3, ease: 'easeOut' }
            }}
            transition={{ duration: 0.5, easings: ['easeIn', 'easeOut'] }}
          >
            <motion.div
              transition={{ duration: 0.5 }}
              className='w-250 flex justify-between items-center m-3 mt-4'
            >
              <SimpleLink>
                <SiShopware /> POS SparkX
              </SimpleLink>
            </motion.div>

            <div className='mt-10'>
              {navigation.map((item, i) => (
                <div key={i}>
                  <p className='m-3 mt-4 text-gray-400 uppercase flex items-center'>
                    {item.title} <FaAngleRight />
                  </p>
                  {item.links.map((link, i) => (
                    <CustomLink to={link.to} key={i}>
                      <link.Icon />
                      <span className='capitalize'>{link.text}</span>
                    </CustomLink>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SideBar>
  );
};

export default SideNav;
