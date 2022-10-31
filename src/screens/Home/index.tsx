import { useState, useContext } from "react";
import {
    VStack,
    HStack,
    Center,
    Box,
    FlatList,
    Switch
} from "native-base";
import FormSearch, { FormDataProps } from "../../components/FormSearch";
import Spinner from "../../components/Spinner";
import { BookCtx } from "../../contexts/SearchBooks";
import { LoadingCtx } from "../../contexts/Loading";
import { IFormatList } from "../../interfaces/FormatData";
import ListCards from "../../components/ListCards";
import { AntDesign } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home() {
    const [listItems, setListItems] = useState<IFormatList[]>([]);
    const { loading } = useContext(LoadingCtx);
    const { searchSimpleBook } = useContext(BookCtx);
    const [form, setForm] = useState<FormDataProps>({ search: "" } as FormDataProps);
    const [indexList, setIndexList] = useState<number>(0);
    const [modeView, setModeView] = useState<"unic" | "double">("double");
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
                <HStack justifyContent="flex-end" width="100%" py={2} >
                    <Ionicons name={modeView === "unic" ? "grid-outline" : "grid-sharp"} size={25} onPress={() => setModeView(modeView === "unic" ? "double" : "unic")} />
                </HStack>

                {loading && listItems.length === 0 && < Spinner />}

                <ListCards
                    listItems={listItems}
                    modeView={modeView}
                    actionEndReached={() => {
                        const indexAux = indexList + 10;
                        setIndexList(indexAux);
                        update(form.search, indexAux, maxResults);
                    }}
                />
            </Center>
        </VStack >
    )
}