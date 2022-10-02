import { ComponentProps, FC } from "react";
import { BoardTheme } from "../../../Board/theme";
import { SquareProps } from "../../../../interfaces/SquareProps";
import { FaFrown } from "react-icons/fa";

export const Jail: React.FC<SquareProps> = ({ id }) => {
  return (
    <>
      <div className="just">Just</div>
      <div className="drawing">
        <div className="containerBoard">
          <div className="name">In</div>
          <div className="window">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <FaFrown className="person" />
          </div>
          <div className="name">Jail</div>
        </div>
      </div>
      <div className="visiting">Visiting</div>
    </>
  );
};
