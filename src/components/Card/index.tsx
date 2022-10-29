import { useState } from "react";
import { Alert } from "react-native";
import {
    VStack,
    HStack,
    Heading,
    Center,
    Box,
    FlatList,
    Text,
    AspectRatio,
    Image,
    Stack,
    Pressable
} from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { IVolumeInfo } from "../../interfaces/IBook";

type CardProps = {
    volumeInfo?: IVolumeInfo;
}

export default function Card({ volumeInfo }: CardProps) {
    const uriPhoto = FindUri();
    const [favorite, setFavorite] = useState<boolean>(false);

    function FindUri() {
        if (volumeInfo.imageLinks && volumeInfo.imageLinks?.thumbnail !== "")
            return volumeInfo.imageLinks.thumbnail

        for (const property in volumeInfo.imageLinks) {
            if (volumeInfo.imageLinks[property] !== "")
                return volumeInfo.imageLinks[property]
        }

        return "";
    }

    return (
        <Pressable onPress={() => Alert.alert("teste")} onLongPress={() => setFavorite(!favorite)}  >
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
                        <AntDesign name={favorite ? "star" : "staro"} size={24} color="yellow" onPress={() => setFavorite(!favorite)} />
                    </Center>
                </Box >
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1" numberOfLines={3}>
                            {volumeInfo.title + "\n\n"}
                        </Heading>
                        <Text fontSize="xs" _light={{
                            color: "violet.500"
                        }} _dark={{
                            color: "violet.400"
                        }} fontWeight="500" ml="-0.5" mt="-1" numberOfLines={2}>
                            {volumeInfo.subtitle + "\n\n"}
                        </Text>
                    </Stack>
                    <Text fontWeight="400" numberOfLines={3} >
                        {volumeInfo.description + "\n\n"}
                    </Text>
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                        <HStack alignItems="center">
                            <Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }} fontWeight="400">
                                6 mins ago
                            </Text>
                        </HStack>
                    </HStack>
                </Stack>
            </Box >
        </Pressable>
    );
}