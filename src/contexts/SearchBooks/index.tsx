import { createContext } from "react";
import { IBook } from "../../interfaces/IBook";
import { ICollectionBook } from "../../interfaces/ICollectionBook";
import api from "../../config/api";

interface IBookContext {
    searchSimpleBook(search, index?: number, maxResults?: number): Promise<FormatList[]>
}

type BookProviderProps = {
    children: JSX.Element;
}

export type FormatList = {
    left: IBook;
    right: IBook;
}

export const BookCtx = createContext<IBookContext>({} as IBookContext);

const keyGoogle = "AIzaSyANuB4Wcsp0srEUZeZCLE55eM8W7rZIu8o";

export function BookProvider({ children }: BookProviderProps) {

    async function searchSimpleBook(search: string, index = 0, maxResults = 10) {
        const url = `/v1/volumes?q=${encodeURI(search)}&startIndex=${index}&maxResults=${maxResults}&key=${keyGoogle}`;
        const res = await api.get<ICollectionBook>(url);
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