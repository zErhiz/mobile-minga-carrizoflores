
import { NavigationContainer } from "@react-navigation/native";
import NavigateStack from "./src/navigation/navigate"

import { Provider } from 'react-redux'
import store from "./store/store"

export default function App() {
  return (
<Provider store={store}> 
   <NavigationContainer>
      <NavigateStack />

   </NavigationContainer>
</Provider>
  );
}

