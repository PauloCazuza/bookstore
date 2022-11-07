import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthGoogleCtx } from '../../contexts/AuthGoogle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

//Screens
import LoginStackScreen from '../LogIn';
import HomeStackScreen from '../Home';
import FavoritesStackScreen from '../Favorites';
import Button from '../../components/Button';
import { HStack, Image, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

export default function Router() {
    const { user, setUser } = useContext(AuthGoogleCtx);

    if (user === undefined) {
        return (
            <NavigationContainer>
                <LoginStackScreen />
            </NavigationContainer>
        )
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({

                    tabBarIcon: ({ color, size }) => {
                        let iconName = "";

                        iconName = route.name === "Inicio" ? "home" : iconName;
                        iconName = route.name === "Favoritos" ? "star" : iconName;

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Inicio" component={HomeStackScreen} options={{
                    headerTitle: () => {
                        if (!user.name)
                            return <Text fontSize={15} fontWeight="bold" > Bem vindo !</Text>;

                        return (
                            <HStack justifyContent="center" alignItems="center" >
                                <Image borderRadius={50} height="30px" width="30px" source={{
                                    uri: user.picture
                                }} alt="foto de perfil" />
                                <Text fontSize={15} fontWeight="bold" > Bem vindo, </Text>
                                <Text fontSize={15} > {user.name} </Text>
                            </HStack>
                        )
                    },
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={() => setUser(undefined)} >
                                <HStack mx={5}>
                                    <AntDesign name="logout" size={24} color="black" />
                                    <Text marginLeft={2}>
                                        Sair
                                    </Text>
                                </HStack>
                            </TouchableOpacity>
                        )
                    },
                }} />
                <Tab.Screen name="Favoritos" component={FavoritesStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}