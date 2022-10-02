import { ComponentProps, FC } from "react";
import { BoardTheme } from "../../../Board/theme";
import { SquareProps } from "../../../../interfaces/SquareProps";
import { FaCar } from "react-icons/fa";

export const FreeParking: React.FC<SquareProps> = ({ id }) => {
  const name: string | undefined = BoardTheme.get(id)?.name;
  const msg: string | undefined = BoardTheme.get(id)?.msg;
  const icon: FC<ComponentProps<"svg">> | undefined = BoardTheme.get(id)?.icon;
  return (
      <div className="containerBoard">
        <div className="name">Free</div>
        <FaCar className="drawing" />
        <div className="name">Parking</div>
      </div>
  );
};
