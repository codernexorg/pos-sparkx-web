import { Dropdown, Input, MenuProps, Space, Tooltip } from 'antd';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineDown, AiOutlineMenu } from 'react-icons/ai';
import { GrUser } from 'react-icons/gr';
import { useSettingContext } from '../context/SettingProver';
import CurrentUser from './CurrentUser';
const NavBar = () => {
  const { setActive, isActive, profile, setProfile } = useSettingContext();

  const [searchTerm, setSearchTerm] = useState<string | null | undefined>(
    'Wanna Try?'
  );

  const items: MenuProps['items'] = [
    {
      label: 'For Invoice',
      key: '1'
    },
    {
      label: 'For Product',
      key: '2'
    },
    {
      label: 'For Employee',
      key: '3'
    },
    {
      label: 'For Cost',
      key: '4'
    },
    {
      label: 'For Supply',
      key: '5'
    },
    {
      label: 'For Customer',
      key: '6'
    }
  ];
  const onClick: MenuProps['onClick'] = ({ key }) => {
    const item = items.find(item => item?.key === key) as {
      label: string;
      key: string;
    };
    setSearchTerm(item!.label);
  };

  return (
    <nav className='flex h-[5vh] justify-between items-center px-[15px] text-fuchsia-900 text-xl border-b-1 border-b-gray-400'>
      <div>
        {!isActive ? (
          <AiOutlineMenu
            cursor={'pointer'}
            onClick={() => {
              setActive(true);
            }}
            className='text-fuchsia-900'
          />
        ) : (
          <Tooltip title='Close Menu'>
            <AiOutlineClose
              cursor={'pointer'}
              className='bg-black text-white rounded'
              onClick={() => setActive(false)}
            />
          </Tooltip>
        )}
      </div>
      <div className='flex'>
        <Dropdown
          className='cursor-pointer text-right'
          menu={{ items, onClick }}
        >
          <a onClick={e => e.preventDefault()}>
            <Space className='w-[120px]'>
              <p>{searchTerm}</p>
              <AiOutlineDown />
            </Space>
          </a>
        </Dropdown>
        <form
          onSubmit={e => {
            e.preventDefault();
            alert('Features Under Maintenance');
          }}
        >
          <Input className='w-[250px]' type={'text'} placeholder='Search' />
        </form>
      </div>
      <div className='flex gap-x-14'>
        <div className='relative'>
          <GrUser
            onClick={() => {
              setProfile(prev => !prev);
            }}
            cursor='pointer'
            className='text-fuchsia-900'
          />
          <AnimatePresence>{profile ? <CurrentUser /> : null}</AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
