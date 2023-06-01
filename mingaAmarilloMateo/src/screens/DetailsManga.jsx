import apiUrl from "../../api";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Button, Image, ScrollView,TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";


const DetailsManga = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const mangaId = route.params?.mangaId;

  const { id, page } = route.params;

  const [mangas, setMangas] = useState([]);
  const [reload, setReload] = useState(false);
  const [pageChange, setPage] = useState(Number(page));
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
    navigation.navigate("Manga", { id: id, page: pageChange + 1 });
  };

  const PREV = () => {
    if (pageChange > 1) {
      setPage((prevPage) => prevPage - 1);
      setReload(!reload);
      navigation.navigate("Manga", { id: id, page: pageChange - 1 });
    }
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}chapters?manga_id=${mangaId}`)
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
              height: "4%"
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
          
            <ScrollView>
          <View>
            {chapters.map((chapt) => (
              <View
                style={{
                  width: "90%",
                  marginBottom: 20,
                  height: 80,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: 32,
                }}
                key={chapt.title}
              >
                <Image
                  style={{
                    height: 64,
                    width: 80,
                    backgroundColor: "gray",
                    borderRadius: 20,
                  }}
                  source={{ uri: chapt.cover_photo }}
                />
                <View style={{ width: "33%", height: 64 }}>
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Text style={{ fontSize: 24 }}>{chapt.title}</Text>
                    <Text>{chapt.order}</Text>
                  </View>
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Text style={{ width: 10 }}>...</Text>
                    <Text>401</Text>
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
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                {pageChange !== 1 && (
                  <Button
                    title="Previous"
                    onPress={PREV}
                    color="#F97316"
                    style={{
                      width: 100,
                      height: 40,
                      backgroundColor: "#F97316",
                      borderRadius: 20,
                      color: "white",
                    }}
                  />
                )}
                {pageChange !== canpages && (
                  <Button
                    title="Next"
                    onPress={NEXT}
                    color="#F97316"
                    style={{
                      width: 100,
                      height: 40,
                      backgroundColor: "#F97316",
                      borderRadius: 20,
                      color: "white",
                    }}
                  />
                )}
              </View>
            )}

          </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default DetailsManga;
