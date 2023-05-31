import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator, SignInStackNavigator } from './BottomTabsNavigator';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomTabsNavigator} />
        <Stack.Screen name="SignIn" component={SignInStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;