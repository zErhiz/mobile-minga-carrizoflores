import React from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';

const Cards = ({ title, img,color, onPress }) => {
    
  return (
    <View style={{ width: "100%" , padding: 16 }}>
      <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', border: 1, width: "100%", borderRadius: 16, height: 130 }}>
      <View style={{ height: "80%", width: '2%', backgroundColor: color }}></View>
        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 16, alignItems: "center", }}>
          <Text>{title}</Text>
          <TouchableOpacity onPress={onPress} style={{backgroundColor: "#cdf9a8", padding: 10, borderRadius: 16, width: "40%", alignItems: 'center'}}>
            <Text style={{  fontWeight: 'bold', color: 'green', fontSize: 12 }}>Read</Text>
          </TouchableOpacity>
        </View>
        <Image style={{ height: "100%", width: "40%", resizeMode: 'cover', borderTopLeftRadius: 1000,borderBottomLeftRadius: 1000,}} source={{ uri: img }} />
      </View>
    </View>
  );
};

export default Cards;