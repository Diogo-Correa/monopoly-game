import { createContext, FC, ReactNode, useContext, useState } from "react";
import { CreateModal } from "../components/CreateModal";

type ModalContextType = {
    isOpenModal: boolean;
    setIsOpenModal: (newState: boolean) => void;
}

type ModalContextProps = {
    children: ReactNode;
}

const initialValue = {
    isOpenModal: false,
    setIsOpenModal: () => {},
}

export const ModalContext = createContext<ModalContextType>(initialValue);

export const ModalContextProvider = ({ children }: ModalContextProps) => {
    const [isOpenModal, setIsOpenModal] = useState(initialValue.isOpenModal);

    return (
        <ModalContext.Provider value={{ isOpenModal, setIsOpenModal }}>
            {children}
            { isOpenModal && <CreateModal/>}
        </ModalContext.Provider>
    )
}
