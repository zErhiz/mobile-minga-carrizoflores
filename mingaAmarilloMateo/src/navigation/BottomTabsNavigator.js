import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SignIn from '../screens/SignIn';
import Register from '../screens/Register';
const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="SignIn" component = {SignIn} />
    <Tab.Screen name="Register" component = {Register} />

  </Tab.Navigator>
  );
}
export default BottomTabsNavigator