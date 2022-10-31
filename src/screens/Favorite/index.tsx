import { useState, useContext, useCallback } from "react";
import {
    VStack,
    Text,
    HStack,
} from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormSearch, { FormDataProps } from "../../components/FormSearch";
import Spinner from "../../components/Spinner";
import { BookCtx } from "../../contexts/SearchBooks";
import { LoadingCtx } from "../../contexts/Loading";
import { IFormatList } from "../../interfaces/FormatData";
import ListCards from "../../components/ListCards";
import { FavoriteCtx } from "../../contexts/Favorites";
import { useFocusEffect } from '@react-navigation/native';

export default function Favorties() {
    const { favorites, filterFavorites } = useContext(FavoriteCtx);
    const [listFavorites, setListFavorites] = useState<IFormatList[]>(favorites);
    const { loading } = useContext(LoadingCtx);
    const { searchSimpleBook } = useContext(BookCtx);
    const [form, setForm] = useState<FormDataProps>({ search: "" } as FormDataProps);

    useFocusEffect(
        useCallback(() => {
            setListFavorites(favorites);
        }, [favorites])
    );

    async function submit(dataControl: FormDataProps) {
        const data = filterFavorites(dataControl.search);

        setListFavorites(data);
    }
    return (
        <VStack bgColor="gray .300" flex={1} px={5} my={5}>
            <VStack flex={1}>
                <FormSearch handleClick={submit} />
            </VStack>

            {loading && favorites.length === 0 && < Spinner />}
            <VStack flex={11}>
                <ListCards
                    listItems={listFavorites}
                />
            </VStack>
        </VStack >
    )
}