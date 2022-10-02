import { ComponentProps, FC } from "react";
import { BoardTheme } from "../../../Board/theme";
import { SquareProps } from "../../../../interfaces/SquareProps";

export const Utility: React.FC<SquareProps> = ({ id }) => {
  const name: string | undefined = BoardTheme.get(id)?.name;
  const price: number | undefined = BoardTheme.get(id)?.price;
  const icon: FC<ComponentProps<"svg">> | undefined = BoardTheme.get(id)?.icon;
  console.log(icon);
  return (
    <>
    <div className="containerBoard">
      <div className="name">{name}</div>
        {icon}
      <div className="price">Price ${price}</div>
    </div>
    </>
  );
};
