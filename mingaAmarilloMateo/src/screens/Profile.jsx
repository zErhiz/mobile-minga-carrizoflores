import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import apiUrl from '../../api';
import { StylesNew } from "../../styles/StylesCss";

const Profile = () => {
    const navigation = useNavigation();
    const backHome = async () => {
        try {
            navigation.navigate("Register");
          const token = await AsyncStorage.getItem('token');
          const user = await AsyncStorage.getItem('user');
          const headers = { headers: { Authorization: `Bearer ${token}` } };
    
          await axios.post(apiUrl + 'auth/signout', null, headers);
    
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
    
          
        } catch (error) {
          Alert.alert('Error', error.message);
        }
      };
    
      return (
        <View style = {StylesNew.containerHome}>
          <TouchableOpacity onPress={backHome}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      );
    };
    

export default Profile