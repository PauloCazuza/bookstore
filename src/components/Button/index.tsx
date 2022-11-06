
import { Button as NBButton, Text, IButtonProps } from "native-base"

type Props = IButtonProps & {
    title: string
}

export default function Button({ title, ...rest }: Props) {
    return (
        <NBButton
            w="full"
            h={16}
            bg="green.700"
            _pressed={{
                color: "green.600"
            }}
            {...rest}
        >
            <Text color="white" fontSize="md" >
                {title}
            </Text>
        </NBButton>
    )
}