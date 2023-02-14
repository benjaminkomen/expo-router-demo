import React, {useMemo} from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Note from "./Note";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Button} from "../../etc/button";
import Compose from "./Compose";
import {useNotes} from "../../context/notes";

export default function App() {
  const {notes} = useNotes();

  if (!notes) {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator/>
        </View>
    );
  }

  return <Index/>;
}

function Index() {
  return (
      <>
        <NotesList/>
        <Footer/>
      </>
  );
}

function useQueriedNotes() {
  const notes = useNotes();
  const route = useRoute();
  let q = null;

  if (route.params) {
    q = route.params;
  }

  return useMemo(
      () =>
          notes.notes.filter((item) => {
            if (!q) {
              return true;
            }
            return item.text.toLowerCase().includes(q.toLowerCase());
          }),
      [q, notes.notes]
  );
}

function NotesList() {
  const notes = useQueriedNotes();
  // const notes = [{
  //   id: "someId",
  //   text: "foo",
  //   date: "2022-03-12",
  //   priority: 3
  // }];
  const {width} = useWindowDimensions();
  const innerWindow = width - 48;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
      <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={[
            {
              maxWidth: 960,
              paddingVertical: 20,
              paddingHorizontal: Math.max(20, insets.left + insets.right),
              flexDirection: "row",
              flexWrap: "wrap",
              marginHorizontal: "auto",
            },
            {},
          ]}
      >
        {!notes.length && <ListEmptyComponent/>}
        {notes.map((item) => (
            <Button
                style={{
                  minWidth: Math.min(300, innerWindow),
                  padding: 4,
                  flex: 1,
                  flexBasis: Math.min(300, innerWindow),
                }}
                key={item.id}
                onPress={() => {
                  navigation.navigate('Note', {
                        note: item.id
                      }
                  )
                }
                }

            >
              <Pressable>
                {({hovered, pressed}) => (
                    <View
                        style={{
                          backgroundColor: "white",
                          borderRadius: 12,
                          overflow: "hidden",
                          flex: 1,
                        }}
                    >
                      <View
                          style={[
                            {
                              flex: 1,
                              paddingHorizontal: 20,
                              paddingVertical: 12,
                              transitionDuration: "200ms",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            },
                            hovered && {backgroundColor: "rgba(0,0,0,0.1)"},
                            pressed && {backgroundColor: "rgba(0,0,0,0.2)"},
                          ]}
                      >
                        <View>
                          <Text style={{fontSize: 18, fontWeight: "bold"}}>
                            {item.text}
                          </Text>
                          {item.date && (
                              <Text
                                  style={{fontSize: 12, marginTop: 4, color: "#38434D"}}
                              >
                                {new Date(item.date).toDateString()}
                              </Text>
                          )}
                        </View>
                        <View style={{flexDirection: "row"}}>
                          {!!item.priority && (
                              <Text
                                  style={{
                                    fontSize: 16,
                                    textAlign: "center",
                                    lineHeight: 16,
                                    paddingHorizontal: 16,
                                    fontWeight: "bold",
                                    color: "#919497",
                                  }}
                              >
                                {new Array(item.priority).fill("!")}
                              </Text>
                          )}

                          <FontAwesome
                              name="chevron-right"
                              size={16}
                              color="#919497"
                          />
                        </View>
                      </View>
                    </View>
                )}
              </Pressable>
            </Button>
        ))}
      </ScrollView>
  );
}

function Footer() {
  const {left, bottom} = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
      <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 48 + bottom,
            paddingBottom: bottom,
            paddingLeft: Math.max(8, left),
            padding: 8,
            alignItems: "flex-start",
            paddingHorizontal: 8,
            backgroundColor: "white",
            borderTopColor: "#ccc",
            borderTopWidth: StyleSheet.hairlineWidth,
          }}
      >
        <Pressable onPress={() => navigation.navigate('Compose')}>
          {({hovered, pressed}) => (
              <View
                  style={[
                    {
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 8,
                      flexDirection: "row",
                      alignItems: "center",
                    },
                    hovered && {backgroundColor: "rgba(0,0,0,0.1)"},
                    pressed && {backgroundColor: "rgba(0,0,0,0.2)"},
                  ]}
              >
                <FontAwesome
                    style={{marginRight: 8}}
                    name="plus-circle"
                    size={32}
                    color="black"
                />
                <Text
                    style={{color: "black", fontSize: 16, fontWeight: "bold"}}
                >
                  Create Note
                </Text>
              </View>
          )}
        </Pressable>
      </View>
  );
}

function ListEmptyComponent() {
  // const { q } = useSearchParams();
  const q = " ";

  const message = React.useMemo(() => {
    return q != null ? "No items found: " + q : "Create an item to get started";
  }, [q]);

  return (
      <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
      >
        <Text style={{fontSize: 16, textAlign: "center"}}>{message}</Text>
      </View>
  );
}