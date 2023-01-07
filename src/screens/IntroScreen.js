import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Paginator from "../components.js/Paginator";
import slides from "../components.js/Slides";

const IntroScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { height } = useWindowDimensions();

  const [currentId, setCurrentId] = useState("");
  const slideRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const handlePress = (id) => {
    setCurrentId(id);
    if (currentId < slides.length - 1) {
      slideRef.current.scrollToIndex({ index: currentId + 1 });
    }
  };
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        ref={slideRef}
        data={slides}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            }],
          { useNativeDriver: false}
        )}
        renderItem={({ item }) => {
          return (
            <View>
              <Image
                source={item.image}
                style={{ width: width, height: height, marginHorizontal: 1 }}
              />
              <Text style={styles.title}>{item.title} </Text>
              <Text style={styles.description}>{item.description} </Text>
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  { display: item.id === 4 ? "none" : "flex" },
                ]}
                onPress={() => handlePress(item.id)}
              >
                <Text style={styles.next}>Next</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={[
                  styles.LoginButton,
                  { display: item.id != 4 ? "none" : "flex" },
                ]}
              >
                <Text style={styles.login}>Login</Text>
              </TouchableOpacity>
              <Paginator data={slides} Id={item.id} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    position: "absolute",
    bottom: 350,
    alignSelf: "center",
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  description: {
    position: "absolute",
    bottom: 300,
    alignSelf: "center",
    color: "white",
    fontSize: 20,
  },
  nextButton: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "orange",
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderRadius: 5,
  },
  next: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  LoginButton: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "orange",
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderRadius: 5,
  },
  login: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
});

export default IntroScreen;
