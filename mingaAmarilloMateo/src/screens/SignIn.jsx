import React, { useState } from "react";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, ImageBackground, Pressable, Alert, TouchableOpacity,Image } from "react-native";
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
    <ImageBackground
    source={{ uri: 'https://i.ibb.co/MRJvPbG/photo.jpg' }}
    style={{flex: 1, }}> 
    <View>
      <View style={{ height:"30%", marginTop:20, justifyContent:"center"}}> 
      <View style={{ alignItems:"center",height:"50%"}}>
    <Image style={{ height: "100%", width: "20%", }} source={{ uri: 'https://i.ibb.co/rtmJBwV/Logo-4.png' }} />
    </View>
    <View style={{width:"100%", alignItems:"center"}}>
      <Text style={{fontSize: 24, color:"black",fontWeight:"bold"}}> Welcome <Text style={{fontWeight:"bold",color:"pink", fontSize: 20,}}>back</Text>!</Text>
      <Text style={{color:"#1F1F1F", width:"80%"}}>Discover manga, manhua and manhwa, track your progress, have fun, read manga. </Text>
      </View>
      </View>
      <Input
      style={{width: "100%", height: "20%", }}
  placeholder="Email"
  placeholderTextColor="black"
  leftIcon={<Icon name="envelope" size={24} color="pink" />}
  value={email}
  onChangeText={text => setEmail(text)} // Actualizar el valor de email
/>
      <Input
        style={{width: "100%", height: "20%",}}
  placeholder="Password"
  placeholderTextColor="black"
  leftIcon={<Icon name="lock" size={24} color="pink" />}
  secureTextEntry
  value={password}
  onChangeText={text => setPassword(text)} 
/>
        
<TouchableOpacity  style={{ height:"10%", alignItems:"center"}} onPress={handleFormSubmit} >
<LinearGradient
        colors={['#f9a8d4','#f472b6']}
        style={{width:"50%", height:"100%",  justifyContent:"center", borderRadius:50}}>
      <Text style={StylesNew.buttonTextSignIn}>Submit</Text>
 </LinearGradient>
    </TouchableOpacity>
      <Text style={StylesNew.signUpText}>
        Don't have an account yet?  <Text  onPress={handleSignUpPress} style={StylesNew.signUpLink} >Sign up</Text>
      </Text>
      <Text style={StylesNew.signUpText}>
        Go back to <Text onPress={handleHomePress } style={StylesNew.signUpLink} >home page</Text>
      </Text>
   
    </View>
    </ImageBackground>
  );
};

export default SignIn;