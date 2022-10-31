import { useEffect, useState } from "react";
import { AspectRatio, Heading, HStack, Image, Text, VStack } from "native-base";
import { RouteProp, useRoute } from '@react-navigation/native';
import axios from "axios";
import { IBook, IVolumeInfo } from "../../interfaces/Book/IBook";

type CardParamList = {
    DetailsBook: { link: string };
};

const uriImageNotFound = "https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif/image";

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
        console.log(volumeInfo.imageLinks.thumbnail)
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
        <VStack bgColor="gray .300" flex={1} px={5} my={5}>
            <VStack flex={6} >
                <VStack flex={1} >
                    <Heading size="lg" color="blue.400" my={1} >
                        {infoBook?.title}
                    </Heading>
                    <Heading size="sm">
                        {infoBook?.authors}
                    </Heading>
                </VStack>
                <HStack>
                    <VStack flex={1} >
                        <AspectRatio ratio={{
                            base: 3 / 4,
                            md: 9 / 10
                        }} height={{
                            base: 250,
                            md: 400
                        }}>
                            <Image resizeMode="contain" source={{
                                uri: FindUri()
                            }} alt="image" />
                        </AspectRatio>
                    </VStack>
                    <VStack flex={1} >
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
            <VStack flex={6} backgroundColor="blue.100" borderRadius={20}>
                <Text padding={5}>{infoBook?.description}</Text>
            </VStack>
        </VStack>
    )
}