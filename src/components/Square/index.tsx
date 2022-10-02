import { FC } from "react";
import { SquareType } from "../../util/SquareType";
import { SquareConfigData } from "./data";
import { SquareProps } from "../../interfaces/SquareProps";
import { Property } from "./Squares/Property";
import { Go } from "./Squares/Go";
import { Railroad } from "./Squares/Railroad";
import { Chance } from "./Squares/Chance";
import { FreeParking } from "./Squares/FreeParking";
import { Utility } from "./Squares/Utility";
import { Jail } from "./Squares/Jail";
import { GoToJail } from "./Squares/GoToJail";
import { Chest } from "./Squares/Chest";

export const Square: FC<SquareProps> = ({ id }) => {
  const type: SquareType | undefined = SquareConfigData.get(id)?.type;

  const getSquare = () => {

    if(type === SquareType.Go) return <Go id={id} />
    if(type === SquareType.Railroad) return <Railroad id={id} />
    if(type === SquareType.Chance) return <Chance id={id} />
    if(type === SquareType.Chest) return <Chest id={id} />
    if(type === SquareType.FreePark) return <FreeParking id={id} />
    if(type === SquareType.Utility) return <Utility id={id} />
    if(type === SquareType.Jail) return <Jail id={id} />
    if(type === SquareType.GoToJail) return <GoToJail id={id} />

    return <Property id={id} />;
  };

  return getSquare();
};
