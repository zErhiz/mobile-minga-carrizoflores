import apiUrl from "../../api";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Button, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { color } from "react-native-reanimated";

const DetailsManga = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const mangaId = route.params?.mangaId;
  const dispatch = useDispatch();

  const { id, page } = route.params;

  const [mangas, setMangas] = useState([]);
  const [reload, setReload] = useState(false);
  const [pageChange, setPage] = useState(Number(page));
  const [chapters, setChapters] = useState([]);
  const [count, setCount] = useState("");
  const [canpages, setCanpages] = useState([]);

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
      .get(`${apiUrl}chapters?manga_id=${mangaId}&page=${page}&limit=4`)
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
              fontSize: 24,
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
                backgroundColor: "#EF8481",
                textAlign: "center",
                lineHeight: 36,
                color: "white",
                fontWeight: "bold"
              }}
            >
              {mangas.category_id?.name}
            </Text>
            <Text style={{ fontSize: 24, color: "green" }}>{mangas.author_id?.name}</Text>
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
          <View style={{ marginTop: 8, height: 200, width: "80%" }}>
            <ScrollView>
              <Text style={{ fontSize: 18, marginTop: 9 }}>
                {mangas.description}
              </Text>
            </ScrollView>
          </View>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-around",
              borderRadius: 20,
            }}
          >
            <Button
              title="Mangas"
              onPress={() => setShowMangaContent(true)}
              color={showMangaContent ? "#F97316" : undefined}
              style={{ width: "50%", borderRadius: 20 }}
            />
            <Button
              title="Chapters"
              onPress={() => setShowMangaContent(false)}
              color={!showMangaContent ? "#F97316" : undefined}
              style={{ width: "50%", borderRadius: 20 }}
            />
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
              justifyContent: "space-around",
              borderRadius: 20,
            }}
          >
            <Button
              title="Mangas"
              onPress={() => setShowMangaContent(true)}
              color={showMangaContent ? undefined : "#EBEBEB"}
              style={{ width: "50%", borderRadius: 20 }}
            />
            <Button
              title="Chapters"
              onPress={() => setShowMangaContent(false)}
              color={!showMangaContent ? undefined : "#F97316"}
              style={{ width: "50%", borderRadius: 20 }}
            />
          </View>
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
                    <Button
                      title="Read"
                      onPress={() =>
                        navigation.navigate("Chapter", {
                          chapterId: chapt._id,
                          page: 0,
                        })
                      }
                      color="#F97316"
                      style={{
                        borderRadius: 20,
                        height: 80,
                        width: 100,
                        fontSize: 20,
                        color: "white",
                      }}
                    />
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
        </View>
      )}
    </>
  );
};

export default DetailsManga;
