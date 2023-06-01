import apiUrl from "../../api";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Button, Image, ScrollView,TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const DetailsManga = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const mangaId = route.params?.mangaId;



  const [mangas, setMangas] = useState([]);
  const [reload, setReload] = useState(false);
  const [pageChange, setPage] = useState(Number(1));
  console.log(pageChange)
  const [chapters, setChapters] = useState([]);
  const [count, setCount] = useState("");
  const [canpages, setCanpages] = useState([]);
console.log(chapters)
  useEffect(() => {
    axios(`${apiUrl}mangas/${mangaId}`)
      .then((res) => {
        setMangas(res.data.response);
      })
      .catch((err) => console.log(err));
  }, [mangaId]);
  const NEXT = () => {
    setPage((prevPage) => prevPage + 1);
    setReload(!reload);
   
  };

  const PREV = () => {
    if (pageChange > 1) {
      setPage((prevPage) => prevPage - 1);
      setReload(!reload);
   
    }
  };

  useEffect(() => {
    axios
      .get(apiUrl + `chapters?manga_id=${mangaId}&page=${pageChange}&limit=4`)
      .then((res) => {
        const data = res.data.response;
        setChapters(data);
        setCount(res.data.count);
        setCanpages(res.data.cantPages);
      })
      .catch((err) => console.log(err));
  }, [mangaId, pageChange, reload]);

  const [showMangaContent, setShowMangaContent] = useState(true);

  return (
    <>
      {showMangaContent ? (
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <Image
            style={{
              marginTop: 16,
              width: "90%",
              aspectRatio: 1,
              borderRadius: 20,
            }}
            source={{ uri: mangas.cover_photo }}
          />
          <Text
            style={{
              fontSize: 28,
              textAlign: "center",
              marginTop: 5,
              color: "#222222",
            }}
          >
            {mangas.title}
          </Text>
          <View
            style={{
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 3,
            }}
          >
            <Text
              style={{
                borderRadius: 20,
                width: "30%",
                height: "100%",
                backgroundColor: "#f0a7e8",
                textAlign: "center",
                lineHeight: 36,
                color: "white",
                fontWeight: "bold"
              }}
            >
              {mangas.category_id?.name}
            </Text>
            <Text style={{ fontSize: 24, color: "#cf27c4" }}>{mangas.author_id?.name}</Text>
          </View>
          <View
            style={{
              backgroundColor: "#EBEBEB",
              shadowColor: "#000",
              shadowOpacity: 0.5,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 5,
              marginTop: 4,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              height: 80,
              width: "90%",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 24 }}>4.5/5</Text>
              <Text style={{ fontSize: 16 }}>Rating</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 24 }}>265</Text>
              <Text style={{ fontSize: 16 }}>Chapters</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 24 }}>Eng</Text>
              <Text style={{ fontSize: 16 }}>Language</Text>
            </View>
            
          </View>
          <View
            style={{
              marginTop: 8,
              flexDirection: "row",
              
              borderRadius: 20,
              borderWidth: 2,
              borderColor: "black",
              width:"80%",
              height: "5%"
            }}
          >
         <TouchableOpacity
  onPress={() => setShowMangaContent(true)}
  style={{
    width: '50%',
    borderRadius: 50,
    justifyContent: "center",
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: showMangaContent ? "#F9A8D4" : undefined,
  }}
>
  <Text style={{ textAlign: 'center', color: "white" }}>Manga</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => setShowMangaContent(false)}
  style={{
    width: '50%',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
    backgroundColor: !showMangaContent ? undefined : '#EBEBEB',
  }}
>
  <Text style={{ textAlign: 'center' }}>Chapters</Text>
</TouchableOpacity>
          </View>
          <View style={{ marginTop: 8, height: 150, width: "80%" }}>
            <ScrollView >
              <Text style={{ fontSize: 18, marginTop: 9, }}>
                {mangas.description}
              </Text>
            </ScrollView>
          
          </View>
        </View>
      ) : (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            style={{
              marginTop: 16,
              width: "90%",
              aspectRatio: 1,
              borderRadius: 20,
            }}
            source={{ uri: mangas.cover_photo }}
          />
          <Text
            style={{
              fontSize: 24,
              textAlign: "center",
              marginTop: 5,
              color: "#222222",
              marginTop: 10,
            }}
          >
            Chapters
          </Text>
          <View
            style={{
              marginTop: 8,
              flexDirection: "row",
              
              borderRadius: 20,
              borderWidth: 2,
              borderColor: "black",
              width:"80%",
              height: "4.5%"
            }}
          >
         <TouchableOpacity
  onPress={() => setShowMangaContent(true)}
  style={{
    width: '50%',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
    backgroundColor: showMangaContent ? "#F9A8D4" : "#EBEBEB",
  }}
>
  <Text style={{ textAlign: 'center', color: "black" }}>Manga</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => setShowMangaContent(false)}
  style={{
    width: '50%',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
    backgroundColor: !showMangaContent ? "#F9A8D4" : undefined,
  }}
>
  <Text style={{ textAlign: 'center',  color: "white"  }}>Chapters</Text>
</TouchableOpacity>
          </View>
          
           
          <View style={{ height: 300, borderWidth: 2, borderColor: 'black', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <ScrollView>
            {chapters.map((chapt) => (
                <View
                style={{
                  width: "100%",
                  marginBottom: 20,
                  height: 100,
                  flexDirection: "row",
                  justifyContent: 'space-between',
                  alignItems: "center",
                  marginTop: 32,
                  borderWidth: 2,
                  borderColor: "black"
                }}
                key={chapt.title}
              >
                <Image
                  style={{
                    height: "100%",
                    width: "30%",
                    backgroundColor: "gray",
                    borderRadius: 20,
                  }}
                  source={{ uri: chapt.cover_photo }}
                />
                <View style={{ width: "33%", height: 64 }}>
                  <View
                    style={{ flexDirection: "column", justifyContent: "center" }}
                  >
                    <Text style={{ fontSize: 17 }}>{chapt.title}</Text>
                    <View style ={{flexDirection:"row", alignItems: "center"}}> 
                    <Icon name="users" size={17} style={{ marginLeft: 5, color:"pink" }} /> 
                    <Text style={{ fontSize: 17 }}>169</Text>
                    </View>
                  </View>
                 
                </View>
                <View style={{ width: "30%" }}>
                  {chapt._id && (
                <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Chapter', {
                    chapterId: chapt._id,
                    page: 0,
                  })
                }
                style={{
                  borderRadius: 80,
                  height: "80%",
                  width: 100,
                  backgroundColor: '#F472B6',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 20, color: 'white', fontWeight: "bold" }}>Read</Text>
              </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
            {count >= 5 && (
              <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              {pageChange !== 1 && (
                <TouchableOpacity
                  onPress={PREV}
                  style={{
                    width: 100,
                    height: 40,
                    backgroundColor: '#f472b6',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: "bold" }}>Previous</Text>
                </TouchableOpacity>
              )}
              {pageChange !== canpages && (
                <TouchableOpacity
                  onPress={NEXT}
                  style={{
                    width: 100,
                    height: 40,
                    backgroundColor: '#f472b6',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white',fontWeight: "bold" }}>Next</Text>
                </TouchableOpacity>
              )}
            </View>
            )}

            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
};

export default DetailsManga;
