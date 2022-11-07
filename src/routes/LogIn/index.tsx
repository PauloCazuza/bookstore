import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailBook from '../../screens/DetailBook';
import Login from '../../screens/LogIn';

const LoginStack = createNativeStackNavigator();

export default function LoginStackScreen() {
    return (
        <LoginStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <LoginStack.Screen name="Login" component={Login} />
        </LoginStack.Navigator>
    );
}