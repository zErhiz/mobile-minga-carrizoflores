import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import apiUrl from "../../api";

const Chapter = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const chapterId = route.params?.chapterId;
  const page = route.params?.page;
  const [listComment, setListComment] = useState(false);
  const [chapters, setChapters] = useState(null);
  const [change, setChange] = useState(Number(page));
  const [next, setNext] = useState("");
  const [reload, setReload] = useState(false);


  useEffect(() => {
    axios
      .get(apiUrl + `chapters/${chapterId}`)
      .then((res) => {
        setChapters(res.data.all);
        setNext(res.data.next);
       
      })
      .catch((err) => console.log(err));
  }, [page]);

  const handleNext = () => {
    setChange((prevChange) => prevChange + 1);
    navigation.navigate("Chapter", { chapterId, page: change + 1 });
    if (change >= chapters?.pages.length - 1) {
      navigation.navigate("Chapter", { chapterId: next, page: change });
    }
    if (change >= chapters?.pages.length -1) {
      setChange(change === 0 ) 
    }
    console.log(change)
    console.log(page)
  };
  
  const handleBefore = () => {
    setChange((prevChange) => prevChange - 1);
    navigation.navigate("Chapter", { chapterId: chapterId, page: change - 1 });
    if (change <= 0 && chapters && chapters.manga_id) {
      
      navigation.navigate("Details", { mangaId: chapters.manga_id, page });
    }
    if (change <= 0) {
      setChange(change  +0 ) 
    }
    console.log(change)
  };

  
  const imageUrl = chapters?.pages[change];
 
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.12, backgroundColor: "#F9A8D4", justifyContent: "center", alignItems: "center", marginTop: 0 }}>
        <Text style={{ color: "white", fontSize: 25 }}>°n  {page}  {chapters?.title}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={handleBefore} style={{ position: "absolute", left: 0, width:"50%", height:"90%",zIndex: 10,justifyContent:"center", alignItems:"center", alignContent: "center" }}>
          <Image source={{ uri: 'https://i.ibb.co/8KV9DTT/Arrow-2.png' }} style={{ position: "absolute", left: 0,width: 20, height: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={{ position: "absolute", right: 0, width:"50%", height:"90%", zIndex: 10, justifyContent:"center", alignItems:"center", alignContent: "center" }}>
          <Image source={{ uri: 'https://i.ibb.co/8Yp4jmJ/Arrow-3.png' }}style={{ width: 20, height: 20, position: "absolute", right: 0, }} />
        </TouchableOpacity>
        <Image source={{uri: imageUrl}} style={{ width: "100%", height: "100%", backgroundColor: "gray", resizeMode: "contain" }} />
      </View>
    </View>
  );
}

export default Chapter