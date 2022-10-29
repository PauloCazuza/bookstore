import { useState, useContext } from "react";
import {
    VStack,
    HStack,
    Center,
    Box,
    FlatList
} from "native-base";
import Card from "../../components/Card";
import FormSearch from "../../components/FormSearch";
import { BookCtx, FormatList } from "../../contexts/SearchBooks";
import Spinner from "../../components/Spinner";
import { LoadingCtx } from "../../contexts/Loading";

export default function Home() {
    const [listItems, setListItems] = useState<FormatList[]>([]);
    const { loading } = useContext(LoadingCtx);
    const { searchSimpleBook } = useContext(BookCtx);

    async function submit(dataControl) {
        const data = await searchSimpleBook(dataControl);
        setListItems(data);
    }

    return (
        <VStack bgColor="gray .300" flex={1} px={5} my={5}>
            <Center>
                <FormSearch handleClick={submit} />

                {loading && <Spinner />}

                {!loading && (
                    <FlatList data={listItems} marginTop={5} width="100%" flexGrow={1} renderItem={({
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
                )
                }



            </Center>
        </VStack >
    )
}