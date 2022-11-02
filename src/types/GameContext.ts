import { ReactNode } from "react";
import { Player } from "./Player";

export type GameContextType = {
    hasGame: boolean;
    setHasGame: (newState: boolean) => void;
    isFinished: boolean;
    setIsFinished: (newState: boolean) => void;
    players: Player[];
    setPlayers: (newState: any) => void;
};
  
export type GameContextProps = {
    children: ReactNode;
};