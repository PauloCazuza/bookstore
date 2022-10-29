import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import {
    VStack,
    HStack,
    Center,
    Box,
    FlatList
} from "native-base";
import Card from "../../components/Card";
import axios from "axios";
import { ICollectionBook } from "../../interfaces/ICollectionBook";
import { IBook } from "../../interfaces/IBook";
import FormSearch from "../../components/FormSearch";

type FormatList = {
    left: IBook;
    right: IBook;
}

export default function Home() {
    const [dataBook, setDataBook] = useState<ICollectionBook>({ items: [] } as ICollectionBook);
    const [listItems, setListItems] = useState<FormatList[]>([]);


    async function handleSignUp(dataControl) {
        console.log(dataControl)
        const res = await axios.get<ICollectionBook>("https://www.googleapis.com/books/v1/volumes?q=" + encodeURI(dataControl.search));
        const { data } = res;
        const listItemsAux: FormatList[] = [];

        for (let i = 0; i < data.items.length; i += 2) {
            const left = data.items[i];
            const right = data.items[i + 1];

            listItemsAux.push({ left, right });
        }

        setListItems(listItemsAux);
        setDataBook(data);
        console.log(data.items.length);
        console.log(data.totalItems);
    }

    return (
        <VStack bgColor="gray .300" flex={1} px={5} my={5}>
            <Center>
                <FormSearch handleClick={handleSignUp} />

                <FlatList data={listItems} width="100%" flexGrow={1} renderItem={({
                    item: { left, right }
                }) => {
                    return (
                        <HStack py={1}>
                            <Box flex={1} px={1} >
                                <Card volumeInfo={left.volumeInfo} />
                            </Box>
                            <Box flex={1} px={1} >
                                <Card volumeInfo={right.volumeInfo} />
                            </Box>
                        </HStack>
                    )
                }
                } keyExtractor={item => item.left.id} />


            </Center>
        </VStack >
    )
}