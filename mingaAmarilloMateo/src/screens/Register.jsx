import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Input, Button } from "react-native-elements";
import axios from 'axios';
import apiUrl from "../../api";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

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

  axios.post(apiUrl + 'auth/signup', formData)
    .then(res => {
      Alert.alert('User registered', '', [{ text: 'Ok' }]);
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

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Text>Register </Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity onPress={selectPhoto}>
        <Text>Select Photo</Text>
      </TouchableOpacity>

      {image && <Text>Selected Photo: {image}</Text>}

      <Button title="Register" onPress={handleForm} />
    </View>
  );
}

export default Register;