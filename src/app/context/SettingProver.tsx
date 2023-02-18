import React, {createContext, useContext, useEffect, useState} from 'react';
import {useAuthUser} from "react-auth-kit";

const defaultContext = {
    isActive: false,
    setActive: () => {
    },
    setProfile: () => {
    },
    profile: false,
    pageSize: 50,
    setPageSize: () => {
    },
    page: 1,
    setPage: () => {
    },
    currentUser: null,
    submitForm: false,
    setSubmitForm: () => {
    },
    showConfirmModal: false,
    setShowConfirmModal: () => {
    }

} as ISettingContext;

const SettingContext = createContext<ISettingContext>(defaultContext);

export default function SettingProvider({
                                            children
                                        }: {
    children: React.ReactNode;
}) {
    const [isActive, setActive] = useState(true);
    const [profile, setProfile] = useState(false);
    const [pageSize, setPageSize] = useState(50);
    const [page, setPage] = useState(1);
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [submitForm, setSubmitForm] = useState(false)
    const user = useAuthUser()

    useEffect(() => {
        const loggedInUser = user() as IUser
        if (loggedInUser) {
            setCurrentUser(loggedInUser)
        }
    }, [user])
    return (
        <SettingContext.Provider
            value={{
                isActive,
                setActive,
                profile,
                setProfile,
                page,
                pageSize,
                setPageSize,
                setPage, currentUser, showConfirmModal, setShowConfirmModal, submitForm, setSubmitForm
            }}
        >
            {children}
        </SettingContext.Provider>
    );
}

export const useSettingContext = () => useContext(SettingContext);
