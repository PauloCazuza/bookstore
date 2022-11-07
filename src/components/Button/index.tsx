
import { Button as NBButton, Text, IButtonProps, HStack, View } from "native-base"

type Props = IButtonProps & {
    title: string
}

export default function Button({ title, ...rest }: Props) {
    return (
        <NBButton
            w="full"
            h={16}
            bg="blue.400"
            _pressed={{
                color: "blue.600"
            }}
            {...rest}
        >
            <HStack flex={1} alignItems="center" justifyContent="center" width="100%" >
                <View flexDirection="row" alignItems="center" justifyContent="center" height="100%" width="100%">
                    {
                        rest.children &&
                        <View width="10%" alignItems="center" >
                            {rest.children}
                        </View>
                    }
                    <Text textAlign="center" fontWeight="bold" color="white" fontSize="md" width={rest.children ? "70%" : "100%"} >
                        {title}
                    </Text>
                </View>
            </HStack>
        </NBButton>
    )
}