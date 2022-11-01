import React, { createContext, useEffect, useState } from "react";
import api from "../../config/api";
import { IBook } from "../../interfaces/Book/IBook";
import { IFormatList } from "../../interfaces/FormatData";

interface IFavoriteContext {
    favorites: IFormatList[];
    addFavorites(newFavorite: IBook): void;
    removeFavorite(book: IBook): void;
    filterFavorites(title: string);
}

export const FavoriteCtx = createContext<IFavoriteContext>({} as IFavoriteContext);

type FavoriteProps = {
    children: JSX.Element;
}

export function FavoriteProvider({ children }: FavoriteProps) {
    const [favorites, setFavorites] = useState<IFormatList[]>([]);

    useEffect(() => {
        console.log(favorites.length);
    }, [favorites]);

    function addFavorites(newFavorite: IBook) {
        const favoritesIsEmpty = favorites.length === 0;
        const favoriteLocaly = [...favorites];

        if (favoritesIsEmpty) {
            const newitem: IFormatList = { left: newFavorite }
            favoriteLocaly.push(newitem);
        } else {
            const indexEnd = favoriteLocaly.length - 1;
            const lastItem = favoriteLocaly[indexEnd];

            if (lastItem.right) {
                const newitem: IFormatList = { left: newFavorite }
                favoriteLocaly.push(newitem);
            } else {
                lastItem.right = newFavorite;
                favoriteLocaly[indexEnd] = lastItem;
            }
        }
        setFavorites(favoriteLocaly);
    }

    function removeFavorite(book: IBook) {
        const favoriteLocaly = [...favorites];
        const indexObj = favoriteLocaly.findIndex((element) => element.left?.id === book.id || element.right?.id === book.id);
        const bookRemove = favoriteLocaly[indexObj];
        const isLeftOrRight = bookRemove.left?.id === book.id ? "left" : "right";
        bookRemove.left = isLeftOrRight === "left" ? undefined : bookRemove.left;
        bookRemove.right = isLeftOrRight === "right" ? undefined : bookRemove.right;

        if (bookRemove.left === undefined && bookRemove.right === undefined)
            favoriteLocaly.splice(indexObj, 1);

        setFavorites(favoriteLocaly);
        console.log("removido")
    }

    function filterFavorites(title: string) {
        const listFilter: IFormatList[] = [];
        let objAux: IFormatList = {};

        favorites.forEach(element => {
            if (element.left?.volumeInfo.title.includes(title)) {
                if (objAux.left === undefined)
                    objAux.left = element.left;
                else
                    objAux.right = element.left;
            }
            if (element.right?.volumeInfo.title.includes(title)) {
                if (objAux.left === undefined)
                    objAux.left = element.right;
                else
                    objAux.right = element.right;
            }
            if (objAux.left && objAux.right) {
                listFilter.push({ ...objAux });
                objAux = { left: undefined, right: undefined };
            }
        });

        if (objAux.left !== undefined && objAux.right === undefined)
            listFilter.push({ ...objAux });

        return listFilter;
    }

    return (
        <FavoriteCtx.Provider
            value={{ favorites, addFavorites, removeFavorite, filterFavorites }}
        >
            {children}
        </FavoriteCtx.Provider>

    )

}