import { useState, useContext } from "react";
import {
    VStack,
    HStack,
    Center,
    Box,
    FlatList,
    Text
} from "native-base";
import Card from "../../components/Card";
import FormSearch, { FormDataProps } from "../../components/FormSearch";
import { BookCtx, FormatList } from "../../contexts/SearchBooks";
import Spinner from "../../components/Spinner";
import { LoadingCtx } from "../../contexts/Loading";

export default function Home() {
    const [listItems, setListItems] = useState<FormatList[]>([]);
    const { loading, setLoading } = useContext(LoadingCtx);
    const { searchSimpleBook } = useContext(BookCtx);
    const [form, setForm] = useState<FormDataProps>({ search: "" } as FormDataProps);
    const [indexList, setIndexList] = useState<number>(0);
    const maxResults = 10;

    async function submit(dataControl: FormDataProps) {
        setForm(dataControl);
        const data = await searchSimpleBook(dataControl.search);
        setListItems(data);
    }

    async function update(search: string, index: number, maxResults: number) {
        const data = await searchSimpleBook(search, index, maxResults);
        const listAux = listItems;
        const arrayConcat = listAux.concat(data);
        setListItems(arrayConcat);
    }

    return (
        <VStack bgColor="gray .300" flex={1} px={5} my={5}>
            <Center>
                <FormSearch handleClick={submit} />

                {loading && listItems.length === 0 && < Spinner />}

                {listItems.length >= 0 && (<FlatList
                    data={listItems}
                    marginTop={2}
                    width="100%"
                    keyExtractor={item => item.left.id + item.right.id}
                    flexGrow={1}
                    renderItem={({
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
                    }}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={listItems.length > 0 && <Spinner />}
                    onEndReached={() => {
                        const indexAux = indexList + 10;
                        setIndexList(indexAux);
                        update(form.search, indexAux, maxResults);
                    }}
                />)}
            </Center>
        </VStack >
    )
}