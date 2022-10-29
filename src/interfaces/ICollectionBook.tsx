import { IBook } from "./IBook";

export interface ICollectionBook {
    kind: string,
    totalItems: number,
    items: IBook[];
}