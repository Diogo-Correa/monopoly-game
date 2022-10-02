import { FC } from "react";

export interface SquareThemeData {
    readonly name: string;
    readonly price?: number;
    readonly msg?: string;
    readonly icon?: any;
    readonly other?: boolean | null;
}