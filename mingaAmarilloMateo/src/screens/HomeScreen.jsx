import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import { StylesNew } from "../../styles/StylesCss";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [token, setToken] = useState(null);
  const isFocused = useIsFocused();

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, [isFocused]);

  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{ uri: 'https://i.ibb.co/MDKnYv8/7d0eea20d6c53007b24b7e2c4342b819-1.png' }}
      style={StylesNew.containerHome}
    >
      <View style={StylesNew.viewHome1}>
        <Text style={StylesNew.title}>Live the emotion of the manga</Text>
        <Text style={StylesNew.parrafo}>Find the perfect manga for you </Text>

        {token ? (
          <TouchableOpacity onPress={() => navigation.navigate('Mangas')}>
            <LinearGradient
              colors={['#f9a8d4','#f472b6']}
              style={{borderRadius:50, width:150,height:50, justifyContent:'center',}}
            >
              <Text style={StylesNew.buttonTextSignIn}>Explore </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity  onPress={() => navigation.navigate('SignIn')}>
            <LinearGradient
              colors={['#f9a8d4','#f472b6']}
              style={{borderRadius:50, width:150,height:50, justifyContent:'center',}}
            >
              <Text style={StylesNew.buttonTextSignIn}>Sign In!</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;