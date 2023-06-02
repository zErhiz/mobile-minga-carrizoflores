import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import Mangas from "../screens/Mangas";
import Profile from "../screens/Profile";
import DetailsManga from "../screens/DetailsManga";
import Chapter from "../screens/Chapter";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            color: "#F9A8D4",
            fontWeight: "bold",
          },

          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color="pink" size={size} />
          ),
        }}
      />
      
     
      <Tab.Screen name="Mangas" component={Mangas}
         options={{
          tabBarLabel: "Mangas",
          tabBarLabelStyle: {
            color: "#F9A8D4",
            fontWeight: "bold",
          },

          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" color="pink" size={size} />
          ),
        }} />
      <Tab.Screen name="Profile" component={Profile} 
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: {
            color: "#F9A8D4",
            fontWeight: "bold",
          },

          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color="pink" size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
}

export default BottomTabsNavigator;
