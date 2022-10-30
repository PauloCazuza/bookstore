import { Heading, HStack, Spinner as NBSpinner } from "native-base";

export default function Spinner() {
    return (
        <HStack space={2} alignItems="center" justifyContent="center">
            <NBSpinner />
        </HStack>
    )
}