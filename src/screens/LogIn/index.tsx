import { useContext } from "react";
import { AspectRatio, Center, Heading, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import { AuthGoogleCtx } from "../../contexts/AuthGoogle";

export default function LogIn() {
    const { handleGoogleSignIn, setUser } = useContext(AuthGoogleCtx);

    function continueNotAuth() {
        setUser({
            id: "",
            email: "",
            name: "",
            picture: ""
        })
    }

    return (
        <VStack flex={1} >
            <VStack flex={2} alignItems="center" justifyContent="center" >
                <AspectRatio height={{
                    base: 200,
                    md: 400
                }} >
                    <Image resizeMode="cover" height="100%" width="100%" source={require('../../assets/icon/icon.png')} alt="image" />
                </AspectRatio>
                <Heading size="md">
                    BOOKSTORE
                </Heading>
            </VStack>
            <VStack flex={1} alignItems="center" >
                <Button
                    title="Fazer login com Google"
                    width="80%"
                    borderRadius={20}
                    marginBottom={10}
                    onPress={handleGoogleSignIn}
                >
                    <Image resizeMode="cover" height="30px" width="30px" source={require('../../assets/icon/Google.png')} alt="image" />
                </Button>
                <TouchableOpacity onPress={continueNotAuth} >
                    <Heading size="sm" numberOfLines={3}>
                        Continuar sem login
                    </Heading>
                </TouchableOpacity>
                <VStack
                    position="absolute"
                    bottom={0}
                    right={-50}
                    height="50%"
                    width="50%"
                    borderTopLeftRadius={1000}
                    backgroundColor="red.200" >

                </VStack>
                <VStack
                    position="absolute"
                    bottom={0}
                    left={0}
                    height="20%"
                    width="20%"
                    borderTopLeftRadius={100}
                    borderTopRightRadius={1000}
                    backgroundColor="red.400" >

                </VStack>
            </VStack>
        </VStack>
    )
}