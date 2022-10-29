import { useForm, Controller } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";

import {
    VStack,
    HStack,
    Heading,
    Center,
    Box,
    FlatList,
    Text,
    Avatar,
    Spacer
} from "native-base";
import Card from "../../components/Card";
import { useEffect } from "react";
import axios from "axios";

type FormDataProps = {
    search: string;
}

const data = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    fullName: "Aafreen Khan",
    timeStamp: "12:47 PM",
    recentText: "Good Day!",
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}, {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    fullName: "Sujitha Mathur",
    timeStamp: "11:11 PM",
    recentText: "Cheer up, there!",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    fullName: "Anci Barroco",
    timeStamp: "6:22 PM",
    recentText: "Good Day!",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
}, {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    fullName: "Aniket Kumar",
    timeStamp: "8:56 PM",
    recentText: "All the best",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
}, {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
}];

export default function Home() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>();


    async function handleSignUp(dataControl) {
        const res = await axios.get("https://www.googleapis.com/books/v1/volumes?q=" + dataControl.search);
        const { data } = res;

        console.log(dataControl.search);
    }

    return (
        <VStack bgColor="gray .300" flex={1} px={5}>
            <Center>
                <Heading my={10}>
                    Bookstore
                </Heading>
                <HStack>
                    <Box flex={4} px={1}>
                        <Controller
                            control={control}
                            name="search"
                            rules={{
                                required: "Campo obrigatório"
                            }}
                            render={({ field: { onChange } }) => (
                                <Input placeholder="search" isInvalid errorMessage={errors.search?.message} onChangeText={onChange} />
                            )}
                        />
                    </Box>
                    <Box flex={2} >
                        <Button title="Buscar" onPress={handleSubmit(handleSignUp)} />
                    </Box>
                </HStack>

                <FlatList data={data} width="100%" renderItem={({
                    item
                }) =>
                    <HStack>
                        <Box flex={1} px={1} >
                            <Card />
                        </Box>
                        <Box flex={1} px={1} >
                            <Card />
                        </Box>
                    </HStack>
                } keyExtractor={item => item.id} />


            </Center>
        </VStack >
    )
}