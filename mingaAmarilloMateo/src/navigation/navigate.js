import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import Mangas from "../screens/Mangas";
import Profile from "../screens/Profile";
import BottomTabsNavigator from "./BottomTabsNavigator"
import DetailsManga from '../screens/DetailsManga';
import Chapter from "../screens/Chapter";
import Register from '../screens/Register';
import SignIn from '../screens/SignIn';
const Stack = createStackNavigator();


export default function NavigateStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabsNavigator} />
      <Stack.Screen name="Details" component={DetailsManga} />
      <Stack.Screen name="Chapter" component={Chapter} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}