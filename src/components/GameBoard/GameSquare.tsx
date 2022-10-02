import { FC } from "react";
import { BoardSection } from "../../util/BoardSection";
import { SquareConfigData } from "../Square/data";
import { Square } from "../Square";
import { SquareType } from "../../util/SquareType";
import { SquareProps } from "../../interfaces/SquareProps";

export const GameSquare: FC<SquareProps> = ({ id }) => {
  const squareType: SquareType = SquareConfigData.get(id)?.type!;

  const squareTypeClass = new Map<SquareType, string>([
    [SquareType.Railroad, "railroad"],
    [SquareType.Chance, "chance"],
    [SquareType.Chest, "community-chest"],
    [SquareType.Go, "corner go"],
    [SquareType.GoToJail, "corner go-to-jail"],
    [SquareType.Jail, "corner jail"],
    [SquareType.Property, "property"],
    [SquareType.FreePark, "corner free-parking"],
    [SquareType.Utility, "utility"],
  ]);

  const getSpaceClassName = () => {
    return `space ${squareTypeClass.get(squareType)}`;
  };

  return (
    <div className={getSpaceClassName()}>
        <Square id={id} />
    </div>
  );
};
