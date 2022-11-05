import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailBook from '../../screens/DetailBook';
import Favorties from '../../screens/Favorite';

const FavoritesStack = createNativeStackNavigator();

export default function FavoritesStackScreen() {
    return (
        <FavoritesStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <FavoritesStack.Screen name="Favorites" component={Favorties} />
            <FavoritesStack.Screen name="DetailsBook" component={DetailBook} />
        </FavoritesStack.Navigator>
    );
}