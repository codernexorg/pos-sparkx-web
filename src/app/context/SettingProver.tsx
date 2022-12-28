import React, { createContext, useContext, useState } from 'react';

const defaultContext = {
  chart: false,
  isActive: false,
  setActive: () => {},
  chat: false,
  notification: false,
  setNotification: () => {},
  setProfile: () => {},
  profile: false,
  pageSize: 50,
  setPageSize: () => {},
  page: 1,
  setPage: () => {}
} as ISettingContext;

const SettingContext = createContext<ISettingContext>(defaultContext);

export default function SettingProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [chat, setChat] = useState(false);
  const [chart, setChart] = useState(false);
  const [notification, setNotification] = useState(false);
  const [isActive, setActive] = useState(true);
  const [profile, setProfile] = useState(false);
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  return (
    <SettingContext.Provider
      value={{
        chart,
        chat,
        notification,
        isActive,
        setActive,
        setNotification,
        profile,
        setProfile,
        page,
        pageSize,
        setPageSize,
        setPage
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}

export const useSettingContext = () => useContext(SettingContext);
