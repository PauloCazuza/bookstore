import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import HomeStackScreen from '../Home';
import FavoritesStackScreen from '../Favorites';

const Tab = createBottomTabNavigator();

export default function Router() {

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
                <Tab.Screen name="Inicio" component={HomeStackScreen} />
                <Tab.Screen name="Favoritos" component={FavoritesStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}