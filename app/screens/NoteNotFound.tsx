import {StyleSheet, Text, View} from "react-native";

export default function NoteNotFound({note}: string) {
  return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={{fontSize: 24}}>
            Cannot find note for ID: {note}
          </Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
});