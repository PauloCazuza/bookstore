import { Input as NBInput, IInputProps, FormControl } from "native-base";

type Props = IInputProps & {
    errorMessage?: string | null;
}

export default function Input({ errorMessage, isInvalid, ...rest }: Props) {
    const invalid = !!errorMessage || isInvalid;

    return (
        <FormControl mb={4} isInvalid={invalid} >
            <NBInput
                bg="gray.200"
                fontSize="md"
                h={16}
                mb={4}
                _focus={{
                    bg: "gray.300",
                    borderWidth: 2,
                    borderColor: "green.500"
                }}
                _invalid={{
                    borderWidth: 1,
                    borderColor: "red.500"
                }}
                {...rest}
            />

            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>

        </FormControl>
    )
}