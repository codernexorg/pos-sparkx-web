import React, { createContext, useContext, useState } from 'react';

const defaultContext = {
  chart: false,
  isActive: false,
  setActive: () => {},
  chat: false,
  notification: false,
  setNotification: () => {},
  setProfile: () => {},
  profile: false
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
        setProfile
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}

export const useSettingContext = () => useContext(SettingContext);
