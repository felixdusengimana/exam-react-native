import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/login';
import Onboard from '../screens/auth/onboard';
import Register from '../screens/auth/register';
import TabsNavigator from './TabsNavigator';

const Stack = createNativeStackNavigator();
const {Navigator, Screen} = Stack;

const  AppStack = () =>  {
  return (
    <Navigator>
      <Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Screen name="Onboard" component={TabsNavigator} options={{ headerShown: false }} />
    </Navigator>
  );
}

export default AppStack;