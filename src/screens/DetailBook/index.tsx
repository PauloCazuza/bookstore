import { useEffect, useState } from "react";
import { AspectRatio, Heading, HStack, Image, Text, VStack } from "native-base";
import { RouteProp, useRoute } from '@react-navigation/native';
import axios from "axios";
import { IBook, IVolumeInfo } from "../../interfaces/Book/IBook";
import { ScrollView } from "react-native";
import Input from "../../components/Input";
import { uriImageNotFound } from "../../constants/Images";

type CardParamList = {
    DetailsBook: { link: string };
};


export default function DetailBook() {
    const { params: { link } } = useRoute<RouteProp<CardParamList>>();
    const [infoBook, setInfoBook] = useState<IVolumeInfo | undefined>();

    useEffect(() => {
        getDetalisBook();
    }, []);

    async function getDetalisBook() {
        const res = await axios.get<IBook>(link);
        const { data: { volumeInfo } } = res;

        setInfoBook(volumeInfo);
    }

    function FindUri() {
        if (infoBook?.imageLinks && infoBook?.imageLinks?.thumbnail !== "")
            return infoBook?.imageLinks.thumbnail

        for (const property in infoBook?.imageLinks) {
            if (infoBook?.imageLinks[property] !== "")
                return infoBook?.imageLinks[property]
        }

        return uriImageNotFound;
    }

    function dateEnToPT(date?: string) {
        if (!date)
            return "";

        const day = date.substring(8, 10);
        const month = date.substring(5, 7);
        const year = date.substring(0, 4);

        return day + "-" + month + "-" + year;
    }

    return (
        <ScrollView>
            <VStack bgColor="gray .300" flex={1} px={5} my={5}>
                <VStack flex={6} >
                    <VStack flex={1} my={1}>
                        <Heading size="lg" color="blue.400" my={1} >
                            {infoBook?.title}
                        </Heading>
                        <Heading size="sm">
                            {infoBook?.authors}
                        </Heading>
                    </VStack>
                    <HStack>
                        <VStack flex={1} alignItems="center" >
                            <AspectRatio height={{
                                base: 250,
                                md: 400
                            }} maxW={200} >
                                <Image resizeMode="contain" source={{
                                    uri: FindUri()
                                }} alt="image" />
                            </AspectRatio>
                        </VStack>
                        <VStack flex={1} padding={2} >
                            <Heading size="sm" mx={2} >
                                Editora:
                            </Heading>
                            <Text mx={2} marginBottom={2}>
                                {infoBook?.publisher}
                            </Text>
                            <Heading size="sm" mx={2} >
                                Data de publicação:
                            </Heading>
                            <Text mx={2} marginBottom={2}>
                                {dateEnToPT(infoBook?.publishedDate)}
                            </Text>
                            <Heading size="sm" mx={2} >
                                {infoBook?.pageCount} páginas | {infoBook?.language}
                            </Heading>
                        </VStack>
                    </HStack>
                </VStack>
                <VStack flex={6} maxH={"300px"} backgroundColor="blue.100" borderRadius={20} marginTop={5}>
                    <ScrollView>
                        <HStack>
                            <Text padding={3} textAlign="justify">
                                <Heading size="sm">
                                    Descrição: {"\t"}
                                </Heading>
                                {infoBook?.description}
                            </Text>
                        </HStack>
                    </ScrollView>
                </VStack>
            </VStack>
        </ScrollView>
    )
}