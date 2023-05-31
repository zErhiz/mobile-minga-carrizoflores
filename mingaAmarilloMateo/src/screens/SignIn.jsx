import React, { useState } from "react";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, ImageBackground, Pressable, Alert, TouchableOpacity, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StylesNew } from "../../styles/StylesCss";
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import apiUrl from "../../api";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  console.log(email)
  console.log(password)
  console.log(apiUrl)
  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(apiUrl + "auth/signin", {
        email: email,
        password: password,
      });

      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

      Alert.alert("Signed in!", "You have been successfully signed in.");

      // Redirigir al usuario a la pantalla de inicio (Home)
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while signing in.");
    }
  };

//navigation 
const handleSignUpPress = () => {
    navigation.navigate("Register");
  };
  const handleHomePress = () =>{
    navigation.navigate("Home")
  }
  return (
    <View>
      <Text>SignIn </Text>
      <Input
  placeholder="Email"
  leftIcon={<Icon name="envelope" size={24} color="orange" />}
  value={email}
  onChangeText={text => setEmail(text)} // Actualizar el valor de email
/>
      <Input
  placeholder="Password"
  leftIcon={<Icon name="lock" size={24} color="orange" />}
  secureTextEntry
  value={password}
  onChangeText={text => setPassword(text)} 
/>
<LinearGradient
        
        colors={['#f9a8d4','#f472b6']}
        style={StylesNew.linearGradient}>
          <Pressable  onPress={handleFormSubmit} >
      <Text style={StylesNew.buttonTextSignIn}>Submit</Text>
    </Pressable>
 </LinearGradient>
      <Text style={StylesNew.signUpText}>
        Don't have an account yet?  <TouchableOpacity onPress={handleSignUpPress } ><Text style={StylesNew.signUpLink} >Sign up</Text></TouchableOpacity>
      </Text>
      <Text style={StylesNew.signUpText}>
        Go back to <TouchableOpacity onPress={handleHomePress } ><Text style={StylesNew.signUpLink} >home page</Text></TouchableOpacity>
      </Text>
   
    </View>
  );
};

export default SignIn;