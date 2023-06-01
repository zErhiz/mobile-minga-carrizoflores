import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Image } from "react-native";
import axios from "axios";
import apiUrl from "../../api";
import Cards from "../components/Cards";
import { Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
const Manga = () => {
  const navigation = useNavigation();
  const titleRef = useRef("");
  const categoryRef = useRef([]);

  const [categories, setCategories] = useState([]);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  useEffect(() => {
    axios(apiUrl + "categories")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    let categories = Object.values(categoryRef.current);
    let values = [];
    categories.forEach((each) => {
      if (each.checked) {
        values.push(each.value);
      }
    });
  
    axios(
      apiUrl +
        `mangas?title=${titleRef.current}&category_id=${values.join(",")}&page=${page}&limit=6&order=1`
    )
      .then((res) => {
        setMangas(res.data.response);
        setHasNextPage(res.data.response.length > 0);
        setHasPrevPage(page > 1);
      })
      .catch((err) => console.log(err));
  }, [reload, page]);


  const [mangas, setMangas] = useState([]);

  let newMangas = mangas.map((m) => {
    const category = categories.find((c) => c._id === m.category_id);
    return (
      <Cards
        key={m._id}
        title={m.title}
        img={m.cover_photo}
        color={category ? category.color : null}
        onPress={() => navigation.navigate("Details", { mangaId: `${m._id}` })}
      />
      
    );
  });

  const captureText = () => {
    setReload(!reload);
  };

  const next = () => {
    if (mangas.length > 0) {
      setPage(page + 1);
    }
  };
  
  const prev = () => {
    if (mangas) setPage(page - 1);
  };

  return (
    <View style={{ flex: 1, }}>
      <ImageBackground
        source={{ uri: 'https://i.ibb.co/vvXWzcg/pexels-lisa-fotios-1454906-1.png' }}
        style={{ flex: 0.5,}}
      >
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 52 }}>
          <Text style={{ fontSize: 48, color: "white", paddingBottom: 9 }}>Mangas</Text>
          <Input
  style={{ fontSize: 20, width: "100%", padding: 4, borderRadius: 20, backgroundColor: "white" }}
  leftIcon={<Icon name="search" size={24} color="pink" />}
  defaultValue={titleRef.current}
  placeholder="Find your manga here"
  onChangeText={(text) => {
      titleRef.current = text;
      captureText();
    }}
  
/>
        </View>
      </ImageBackground>
      {mangas.length > 0 ? ( 
        <ScrollView style={{ flex: 1, borderColor: "black", borderWidth: 2, }}>
          <View style={{ height: 100,flexDirection: "column",  alignItems: "center",}}>
            <Text style={{ fontWeight: "bold", fontSize: 20, }}>Explore</Text>
            <View style={{ height: "80%", width:"70%", flexDirection: "row", gap:13, }}> 
            <Image style={{ height: "100%", width: "30%", }} source={{ uri: 'https://i.ibb.co/DQf4PH4/image.png' }} />
            <Image style={{ height: "100%", width: "30%", }} source={{ uri: 'https://i.ibb.co/HNTW6Yd/image.png' }} />
            <Image style={{ height: "100%", width: "30%", }} source={{ uri: 'https://i.ibb.co/vVrkJrP/image.png' }} />
            </View>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 16  }}>
            {newMangas}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center", padding: 16 }}>
            {hasPrevPage && (
              <TouchableOpacity
                style={{
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 18,
                  backgroundColor: "#f472b6",
                  padding: 16,
                  marginRight: 8,
                }}
                onPress={prev}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>PREV</Text>
              </TouchableOpacity>
            )}
            {hasNextPage && (
              <TouchableOpacity
                style={{
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 18,
                  backgroundColor: "#f472b6",
                  padding: 16,
                }}
                onPress={next}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>NEXT</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      ) : (
        <ImageBackground
          source={{ uri: 'https://i.ibb.co/23x1BHP/c870e1f8060b559a624ff4c42d6365b9-2.png' }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ textAlign: "center", backgroundColor: "#eea8f9", color: "black", fontWeight: "bold", fontSize: 20 }}>
              Not found, maybe you want to use the prev button to go back?
            </Text>
            {hasPrevPage && (
              <TouchableOpacity
                style={{
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 18,
                  backgroundColor: "#f472b6",
                  padding: 16,
                  marginRight: 8,
                }}
                onPress={prev}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>PREV</Text>
              </TouchableOpacity>
            )}
            {hasNextPage && (
              <TouchableOpacity
                style={{
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 18,
                  backgroundColor: "#f472b6",
                  padding: 16,
                }}
                onPress={next}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>NEXT</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

export default Manga;