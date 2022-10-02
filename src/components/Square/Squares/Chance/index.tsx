import { ComponentProps, FC } from "react";
import { BoardTheme } from "../../../Board/theme";
import { SquareProps } from "../../../../interfaces/SquareProps";

export const Chance: React.FC<SquareProps> = ({ id }) => {
  const name: string | undefined = BoardTheme.get(id)?.name;
  const msg: string | undefined = BoardTheme.get(id)?.msg;
  const icon: any = BoardTheme.get(id)?.icon;
  return (
    <>
    <div className="containerBoard">
      <div className="name">{name}</div>
        {icon}
      <div className="instructions">
        {msg}
      </div>
    </div>
    </>
  );
};
