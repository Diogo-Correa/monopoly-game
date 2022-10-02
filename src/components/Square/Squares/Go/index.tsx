import { ComponentProps, FC } from "react";
import { BoardTheme } from "../../../Board/theme";
import { SquareProps } from "../../../../interfaces/SquareProps";
import { ColorBar } from "../ColorBar";
import { FaLongArrowAltLeft } from "react-icons/fa";

export const Go: React.FC<SquareProps> = ({ id }) => {
  const name: string | undefined = BoardTheme.get(id)?.name;
  const msg: string | undefined = BoardTheme.get(id)?.msg;
  const icon: FC<ComponentProps<"svg">> | undefined = BoardTheme.get(id)?.icon;
  return (
    <>
      <div className="containerBoard">
        <div className="instructions">
          Collect $200.00 salary as you pass
        </div>
        <div className="go-word">go</div>
      </div>
      <FaLongArrowAltLeft className="arrow" />
    </>
  );
};
