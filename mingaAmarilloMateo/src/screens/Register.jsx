import React, { useState, useRef } from "react";
import { StylesNew } from "../../styles/StylesCss";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { Input, Button } from "react-native-elements";
import axios from 'axios';
import apiUrl from "../../api";
import { Text, View, ImageBackground, Pressable, Alert, TouchableOpacity } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";




const Register = () => {
  const password1 = useRef(null);
  const email1 = useRef(null);
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();

  const handleForm = () => {
    const formData = new FormData();
    formData.append('email', email.current);
    formData.append('password', password.current);
    formData.append('photo', photo);
    const data = {
      email: email.current,
      password: password.current,
      photo: photo,
    };

    axios.post(apiUrl + 'auth/signup', formData)
      .then(res => {
        Alert.alert('User registered', '', [{ text: 'Ok' }]);
        navigation.navigate('/');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Check the fields', err.response.data.message, [{ text: 'Ok' }]);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const selectPhoto =  () => {
    launchImageLibrary(
        {includeBase64: true},
        (res) => console.log(res)
      );
  };

  return (
    <View>
      <Text>Register </Text>

      <Input
        placeholder="Email"
        leftIcon={<Icon name="envelope" size={24} color="orange" />}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="Password"
        leftIcon={<Icon name="lock" size={24} color="orange" />}
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity onPress={selectPhoto}>
        <Text>Select Photo</Text>
      </TouchableOpacity>

      {photo && <Text>Selected Photo: {photo}</Text>}

      <Button title="Register" onPress={handleForm} />
    </View>
  );
}

export default Register;