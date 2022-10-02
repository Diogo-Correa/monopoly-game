import { FC } from "react";
import { BoardTheme } from "../../../Board/theme";
import { SquareProps } from "../../../../interfaces/SquareProps";
import { ColorBar } from "../ColorBar";

export const Property: React.FC<SquareProps> = ({ id }) => {
  const name: string | undefined = BoardTheme.get(id)?.name;
  const price: number | undefined = BoardTheme.get(id)?.price;
  return (
    <div className="containerBoard">
      <ColorBar id={id} />
      <div className="name">{name}</div>
      <div className="price">Price ${price}</div>
    </div>
  );
};
