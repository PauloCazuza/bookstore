import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import Home from '../../screens/Home';
import Favorties from '../../screens/Favorite';

const Tab = createBottomTabNavigator();

export default function Router() {

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = "";

                        iconName = route.name === "Home" ? "home" : iconName;
                        iconName = route.name === "Favorites" ? "star" : iconName;

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Favorites" component={Favorties} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}