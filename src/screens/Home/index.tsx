import { VStack, HStack, Heading, Center, Box } from "native-base";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";

type FormDataProps = {
    search: string;
}

export default function Home() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>();

    function handleSignUp(data) {
        console.log(data);
    }

    return (
        <VStack bgColor="gray .300" flex={1} px={5}>
            <Center>
                <Heading my={10}>
                    Bookstore
                </Heading>
                <HStack flex={1}>
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
            </Center>
        </VStack>
    )
}