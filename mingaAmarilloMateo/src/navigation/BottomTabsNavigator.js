import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SignIn from '../screens/SignIn';
import Register from '../screens/Register';
import Mangas from "../screens/Mangas";
import Profile from "../screens/Profile"
import DetailsManga from '../screens/DetailsManga';
import Chapter from "../screens/Chapter"
const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="SignIn" component = {SignIn} />
    <Tab.Screen name="Register" component = {Register} />
    <Tab.Screen name="Mangas" component = {Mangas} />
    <Tab.Screen name="Profile" component = {Profile} />
    <Tab.Screen name="Details" component = {DetailsManga} />
    <Tab.Screen name="Chapter" component = {Chapter} />

  </Tab.Navigator>
  );
}
export default BottomTabsNavigator