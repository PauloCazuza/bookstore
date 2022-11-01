import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailBook from '../../screens/DetailBook';
import Home from '../../screens/Home';

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="DetailsBook" component={DetailBook} />
        </HomeStack.Navigator>
    );
}