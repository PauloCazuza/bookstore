import { Heading, HStack, Spinner as NBSpinner } from "native-base";

export default function Spinner() {
    return (
        <HStack space={2} my={5} alignItems="center" justifyContent="center">
            <NBSpinner />
            <Heading color="primary.500" fontSize="md">
                Carregando
            </Heading>
        </HStack>
    )
}