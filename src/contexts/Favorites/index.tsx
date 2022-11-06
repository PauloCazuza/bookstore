import React, { createContext, useEffect, useState } from "react";
import { IBook } from "../../interfaces/Book/IBook";
import { IFormatList } from "../../interfaces/FormatData";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const keyStore = "favorites";

    useEffect(() => {
        getFavoritesSave();
    }, []);

    async function getFavoritesSave() {
        setFavorites(await getData());
    }

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
        storeData(favoriteLocaly);
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
        storeData(favoriteLocaly);
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

    async function storeData(value: IFormatList[]) {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(keyStore, jsonValue)
        } catch (e) {
        }
    }

    async function getData() {
        try {
            const jsonValue = await AsyncStorage.getItem(keyStore)
            return jsonValue != null ? JSON.parse(jsonValue) as IFormatList[] : [];
        } catch (e) {
            return [];
        }
    }

    return (
        <FavoriteCtx.Provider
            value={{ favorites, addFavorites, removeFavorite, filterFavorites }}
        >
            {children}
        </FavoriteCtx.Provider>

    )

}