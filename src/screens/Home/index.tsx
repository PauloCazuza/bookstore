import { useState, useContext } from "react";
import {
    VStack,
    HStack,
    Center,
    Text,
} from "native-base";
import FormSearch, { FormDataProps } from "../../components/FormSearch";
import Spinner from "../../components/Spinner";
import { BookCtx } from "../../contexts/SearchBooks";
import { LoadingCtx } from "../../contexts/Loading";
import { IFormatList } from "../../interfaces/FormatData";
import ListCards from "../../components/ListCards";
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
        setListItems([]);
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
            <VStack flex={2} >
                <FormSearch handleClick={submit} />
                <HStack justifyContent="flex-end" alignItems="center" width="100%" py={2} >
                    <Text> Modo de Visualização:  </Text>
                    <Ionicons name={modeView === "unic" ? "grid-outline" : "grid-sharp"} size={25} onPress={() => setModeView(modeView === "unic" ? "double" : "unic")} />
                </HStack>
            </VStack>

            {loading && listItems.length === 0 && < Spinner />}
            <VStack flex={10}>
                <ListCards
                    listItems={listItems}
                    modeView={modeView}
                    actionEndReached={() => {
                        const indexAux = indexList + 10;
                        setIndexList(indexAux);
                        update(form.search, indexAux, maxResults);
                    }}
                />
            </VStack>
        </VStack >
    )
}