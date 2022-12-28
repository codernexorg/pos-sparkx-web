import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { AuthStateUserObject } from 'react-auth-kit/dist/types';
import api from '../../api';

const CurrentUser = () => {
  const userData = useAuthUser();
  const [user, setUser] = useState<IUser | AuthStateUserObject | null>(null);
  const logout = useSignOut();

  const signOut = async () => {
    api.post('/auth/logout').then(() => {
      logout();
      localStorage.clear();
    });
  };

  useEffect(() => {
    const loggedUser = userData();
    setUser(loggedUser);
  }, [userData]);
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
        y: '-300px'
      }}
      animate={{
        y: '0px',
        opacity: 1,
        scale: 1
      }}
      exit={{
        y: '-300px',
        opacity: 0,
        transition: { duration: 0.7 }
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='border w-[350px] h-[200px] absolute left-[-300px] p-4 bottom-[-210px] rounded-md flex flex-col gap-y-3 items-start'
    >
      <p className='font-bold text-slate-900'>{user?.username}</p>
      <p className='font-bold text-slate-900'>{user?.role}</p>

      <button
        onClick={signOut}
        className='text-slate-900 font-semibold border border-slate-900 px-3
      '
      >
        Logout
      </button>
    </motion.div>
  );
};

export default CurrentUser;
