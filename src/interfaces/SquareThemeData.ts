import { ComponentProps, FC } from "react";

export interface SquareThemeData {
    readonly name: string;
    readonly price?: number;
    readonly msg?: string;
    readonly icon?: FC<ComponentProps<'svg'>>;
}