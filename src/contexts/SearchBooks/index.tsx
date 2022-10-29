import { createContext } from "react";
import { IBook } from "../../interfaces/IBook";
import { ICollectionBook } from "../../interfaces/ICollectionBook";
import api from "../../config/api";

interface IBookContext {
    searchSimpleBook(dataControl): Promise<FormatList[]>
}

type BookProviderProps = {
    children: JSX.Element;
}

export type FormatList = {
    left: IBook;
    right: IBook;
}

export const BookCtx = createContext<IBookContext>({} as IBookContext);

export function BookProvider({ children }: BookProviderProps) {

    async function searchSimpleBook(dataControl) {
        const res = await api.get<ICollectionBook>("/v1/volumes?q=" + encodeURI(dataControl.search));
        const { data } = res;
        const listItemsAux: FormatList[] = [];

        for (let i = 0; i < data.items.length; i += 2) {
            const left = data.items[i];
            const right = data.items[i + 1];

            listItemsAux.push({ left, right });
        }

        return listItemsAux || [];
    }

    return (
        <BookCtx.Provider value={{ searchSimpleBook }}>
            {children}
        </BookCtx.Provider>
    )
}