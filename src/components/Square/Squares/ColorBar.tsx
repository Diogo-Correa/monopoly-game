import { FC } from "react";
import { SquareProps } from "../../../interfaces/SquareProps";
import { SquareConfigData, squareGroupColor } from "../data";

export const ColorBar: FC<SquareProps> = ({ id }) => {
  const groupId: number = SquareConfigData.get(id)?.groupId!;

  const getClassName = () => {
    return `color-bar ${squareGroupColor.get(groupId)}`;
  };

  return <div className={getClassName()}></div>;
};
