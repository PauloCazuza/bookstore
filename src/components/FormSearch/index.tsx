import { Box, Input, Button } from "native-base";
import { useForm, Controller } from "react-hook-form";

export interface FormDataProps {
    search: string;
}

type FormSearchProps = {
    handleClick: (data) => Promise<void>
}

export default function FormSearch({ handleClick }: FormSearchProps) {
    const { control, handleSubmit } = useForm<FormDataProps>();

    return (
        <Box alignItems="center">
            <Controller
                control={control}
                name="search"
                rules={{
                    required: "Campo obrigatório"
                }}
                render={({ field: { onChange } }) => (
                    <Input
                        w="100%"
                        py="1"
                        InputRightElement={
                            <Button size="xs" rounded="none" w="1/6" h="full" onPress={handleSubmit(handleClick)} >
                                Buscar
                            </Button>
                        }
                        onChangeText={onChange}
                        placeholder="Faça sua busca aqui" />
                )}
            />
        </Box>
    )
}