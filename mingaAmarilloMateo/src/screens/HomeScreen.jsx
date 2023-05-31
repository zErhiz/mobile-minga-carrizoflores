import React from 'react';
import { Text, View, ImageBackground,Pressable,TouchableOpacity  } from 'react-native';
import { StylesNew } from "../../styles/StylesCss";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
const HomeScreen = () => {
    const navigation = useNavigation();
  return (
    <ImageBackground
    source={{ uri: 'https://i.ibb.co/MDKnYv8/7d0eea20d6c53007b24b7e2c4342b819-1.png' }}
    style={StylesNew.containerHome}
    
  >
    <View style={StylesNew.viewHome1}>
      <Text style={StylesNew.title}>Live the emotion of the manga</Text>
      <Text style = {StylesNew.parrafo}>Find the perfect manga for you </Text>
<TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
      <LinearGradient
        
        colors={['#f9a8d4','#f472b6']}
        style={StylesNew.linearGradient}>
        <Text style={StylesNew.buttonTextSignIn}>Sign In!</Text>
    </LinearGradient>
      </TouchableOpacity>
    </View>
  </ImageBackground>
  )
}

export default HomeScreen