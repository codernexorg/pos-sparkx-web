import {Dropdown, Input, MenuProps, Space} from 'antd';
import {AnimatePresence} from 'framer-motion';
import {useState} from 'react';
import {AiOutlineDown} from 'react-icons/ai';
import {GrUser} from 'react-icons/gr';
import {useSettingContext} from '../context/SettingProver';
import CurrentUser from './CurrentUser';
import {Link} from "react-router-dom";
import {FaCashRegister} from "react-icons/fa";

const NavBar = () => {
    const {profile, setProfile} = useSettingContext();

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
    const onClick: MenuProps['onClick'] = ({key}) => {
        const item = items.find(item => item?.key === key) as {
            label: string;
            key: string;
        };
        setSearchTerm(item!.label);
    };

    return (
        <nav
            className='flex h-[48px] justify-between items-center px-[15px] text-dark-purple text-xl border-b border-gray-400'>

            <div className='flex'>
                <Dropdown
                    className='cursor-pointer text-right'
                    menu={{items, onClick}}
                >
                    <button onClick={e => e.preventDefault()}>
                        <Space className='w-[120px]'>
                            <p>{searchTerm}</p>
                            <AiOutlineDown/>
                        </Space>
                    </button>
                </Dropdown>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        alert('Features Under Maintenance');
                    }}
                >
                    <Input className='w-[250px]' type={'text'} placeholder='Search'/>
                </form>
            </div>

            <div className='flex gap-x-14'>
                <Link to={'pos'}>
                    <FaCashRegister/>
                </Link>
                <div className='relative' onMouseLeave={() => setProfile(false)} onMouseEnter={() => setProfile(true)}>
                    <GrUser
                        cursor='pointer'
                        className='text-fuchsia-900'
                    />
                    <AnimatePresence>{profile ? <CurrentUser/> : null}</AnimatePresence>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
