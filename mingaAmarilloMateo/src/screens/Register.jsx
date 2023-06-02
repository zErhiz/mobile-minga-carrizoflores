import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Input, Button } from "react-native-elements";
import axios from 'axios';
import apiUrl from "../../api";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, TouchableOpacity, Alert,Image,ImageBackground  } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
const Register = () => {
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
 const handleForm = () => {
  if (!email || !password || !photo) {
    Alert.alert('Missing Fields', 'Please fill in all the fields', [{ text: 'Ok' }]);
    return;
  }

  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('photo', photo);


  axios.post(apiUrl + 'auth/signup', {email: email,
    password: password, photo: photo})
    .then(res => {
      Alert.alert('User registered', 'check your email to verify your account', [{ text: 'Ok' }]);
      navigation.navigate('SignIn');
    })
    .catch(err => {
      console.log(err);
      const errorMessage = err.response?.data?.message || 'An error occurred';
      Alert.alert('Check the fields', errorMessage, [{ text: 'Ok' }]);
    });
};

const selectPhoto = async () => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    Alert.alert('Permission to access camera roll is required!');
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    setPhoto(result.uri);
    setImage(result.uri);
  }
};

  return (
    <ImageBackground
    source={{ uri: 'https://i.pinimg.com/474x/f7/08/d8/f708d83e9991edcae7ccf6e2b232e6d4.jpg' }}
    style={{flex: 1, }}> 
    <View>
    <View style={{ height:"30%", marginTop:24, justifyContent:"center"}}> 
      <View style={{ alignItems:"center",height:"50%"}}>
    <Image style={{ height: "100%", width: "20%", }} source={{ uri: 'https://i.ibb.co/rtmJBwV/Logo-4.png' }} />
    </View>
    <View style={{width:"100%", alignItems:"center"}}>
      <Text style={{fontSize: 24, color:"black",fontWeight:"bold"}}> Welcome!</Text>
      <Text style={{color:"#1F1F1F", width:"80%"}}>Discover manga, manhua and manhwa, track your progress, have fun, read manga. </Text>
      </View>
      </View>

      <Input
        placeholder="Email"
        placeholderTextColor="black"
        leftIcon={<Icon name="envelope" size={24} color="pink" />}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="Password"
        placeholderTextColor="black"
        leftIcon={<Icon name="lock" size={24} color="pink" />}
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity style={{ height: "10%", padding:5}} onPress={selectPhoto}>
      <LinearGradient
           colors={['rgba(232,191,237,0.4813647871257878)', 'rgba(207,39,196,0.41693901681766454)']}
           start={{ x: 0, y: 1 }}
           end={{ x: 0, y: 0 }}
        style={{width:"80%", height:"100%",  justifyContent:"center", justifyContent:"center", alignContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:18,}}>Select an avatar image</Text>
        </LinearGradient>
      </TouchableOpacity>

      {image && <Text>Selected Photo: {image}</Text>}
      <View style={{ height:"10%", justifyContent:"center", alignItems:"center",marginTop:20}}> 
  <TouchableOpacity style={{height: "100%", width:"100%", justifyContent:"center",alignItems:"center"}} onPress={handleForm}>
     <LinearGradient
        colors={['#f9a8d4','#f472b6']}
        style={{width:"40%", height:"100%",  justifyContent:"center", borderRadius:50, justifyContent:"center", alignContent:"center",alignItems:"center"}}>
      <Text style={{color:"white", fontWeight:"bold", fontSize:20}}>Register</Text>
     </LinearGradient>
   </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
}

export default Register;