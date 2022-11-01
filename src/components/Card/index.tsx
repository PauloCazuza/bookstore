import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import {
    HStack,
    Heading,
    Center,
    Box,
    Text,
    AspectRatio,
    Image,
    Stack,
    Pressable
} from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { IBook, IVolumeInfo } from "../../interfaces/Book/IBook";
import { FavoriteCtx } from "../../contexts/Favorites";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CardProps = {
    book?: IBook;
}

type HomeParamList = {
    DetailsBook: { link: string };
};


const uriImageNotFound = "https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif/image";

export default function Card({ book }: CardProps) {
    const navigation = useNavigation<NativeStackNavigationProp<HomeParamList>>();
    const { favorites, addFavorites, removeFavorite } = useContext(FavoriteCtx);
    const [star, setStar] = useState<boolean>(false);
    const { title = "Sem título", description = "Sem descrição", subtitle = "" } = book.volumeInfo;
    const uriPhoto = FindUri();

    useEffect(() => {
        verifyIsFavorite();
    }, [favorites]);

    function verifyIsFavorite() {
        const isFavorite = favorites.findIndex((element) => element.left?.id === book.id || element.right?.id === book.id);
        setStar(isFavorite !== -1);
    }

    function FindUri() {
        const { volumeInfo } = book;
        if (volumeInfo.imageLinks && volumeInfo.imageLinks?.thumbnail !== "")
            return volumeInfo.imageLinks.thumbnail

        for (const property in volumeInfo.imageLinks) {
            if (volumeInfo.imageLinks[property] !== "")
                return volumeInfo.imageLinks[property]
        }

        return uriImageNotFound;
    }

    function setFavorite() {
        if (!star)
            addFavorites(book);
        else
            removeFavorite(book);
    }

    return (
        <Pressable onPress={() => navigation.navigate("DetailsBook", { link: book.selfLink })} onLongPress={setFavorite}  >
            <Box rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _light={{
                backgroundColor: "gray.50"
            }}>
                <Box>
                    <AspectRatio >
                        <Image source={{
                            uri: uriPhoto
                        }} alt="image" />
                    </AspectRatio>
                    <Center bg="rgba(0, 0, 0, 0.5)" borderBottomLeftRadius={5} _dark={{
                        bg: "yellow.400"
                    }} position="absolute" right="0" px="3" py="1.5">
                        <AntDesign name={star ? "star" : "staro"} size={24} color="yellow" onPress={setFavorite} />
                    </Center>
                </Box >
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1" numberOfLines={3}>
                            {title + "\n\n"}
                        </Heading>
                        <Text fontSize="xs" _light={{
                            color: "violet.500"
                        }} _dark={{
                            color: "violet.400"
                        }} fontWeight="500" ml="-0.5" mt="-1" numberOfLines={2}>
                            {subtitle + "\n\n"}
                        </Text>
                    </Stack>
                    <Text fontWeight="400" numberOfLines={3} >
                        {description + "\n\n"}
                    </Text>
                </Stack>
            </Box >
        </Pressable>
    );
}