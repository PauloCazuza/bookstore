import { useState, useContext } from "react";
import {
    VStack,
    Center,
} from "native-base";
import FormSearch, { FormDataProps } from "../../components/FormSearch";
import Spinner from "../../components/Spinner";
import { BookCtx } from "../../contexts/SearchBooks";
import { LoadingCtx } from "../../contexts/Loading";
import { IFormatList } from "../../interfaces/FormatData";
import ListCards from "../../components/ListCards";
import { FavoriteCtx } from "../../contexts/Favorites";

export default function Favorties() {
    const { favorites } = useContext(FavoriteCtx);
    const { loading } = useContext(LoadingCtx);
    const { searchSimpleBook } = useContext(BookCtx);
    const [form, setForm] = useState<FormDataProps>({ search: "" } as FormDataProps);

    async function submit(dataControl: FormDataProps) {
        setForm(dataControl);
        const data = await searchSimpleBook(dataControl.search);
        // setListItems(data);
    }

    // async function update(search: string, index: number, maxResults: number) {
    //     const data = await searchSimpleBook(search, index, maxResults);
    //     const listAux = listItems;
    //     const arrayConcat = listAux.concat(data);
    //     setListItems(arrayConcat);
    // }

    return (
        <VStack bgColor="gray .300" flex={1} px={5} my={5}>
            <Center>
                <FormSearch handleClick={submit} />

                {loading && favorites.length === 0 && < Spinner />}

                <ListCards
                    listItems={favorites}
                    actionEndReached={() => {
                        // const indexAux = indexList + 10;
                        // setIndexList(indexAux);
                        // update(form.search, indexAux, maxResults);
                    }}
                />
            </Center>
        </VStack >
    )
}