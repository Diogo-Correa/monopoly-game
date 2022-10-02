import { createContext, ReactNode, useState } from "react";
import { CreateModal } from "../components/CreateModal";
import { SquareModal } from "../components/SquareModal";

type ModalContextType = {
  isSquareModal: boolean;
  squareId?: number,
  isOpenModal: boolean;
  setIsOpenModal: (newState: boolean) => void;
  setSquareOpenModal: (newState: boolean) => void;
  setSquareId: (newState: number) => void;
};

type ModalContextProps = {
  children: ReactNode;
};

const initialValue = {
  isSquareModal: false,
  isOpenModal: false,
  setIsOpenModal: () => {},
  setSquareOpenModal: () => {},
  setSquareId: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialValue);

export const ModalContextProvider = ({ children }: ModalContextProps) => {
  const [squareId, setSquareId] = useState(0);
  const [isSquareModal, setSquareOpenModal] = useState(initialValue.isSquareModal);
  const [isOpenModal, setIsOpenModal] = useState(initialValue.isOpenModal);

  return (
    <ModalContext.Provider value={{ isSquareModal, squareId, setSquareId, isOpenModal, setIsOpenModal, setSquareOpenModal }}>
      {children}
      {isOpenModal && <CreateModal />}
      {isSquareModal && <SquareModal id={squareId}/>}
    </ModalContext.Provider>
  );
};
