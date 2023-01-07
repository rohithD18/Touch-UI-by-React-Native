import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { Video } from "expo-av";

const PostDetailScreen = () => {
  const { width } = useWindowDimensions();
  const { height } = useWindowDimensions();
  const video = React.useRef(null);
  const postInfo = useSelector((state) => state.postDetailsReducer.postDetails);
  // console.log("postInfo", postInfo);
  return (
    <View style={[styles.container, { width: width, height: height }]}>
      <Text>Post Details Screen</Text>
      <FlatList
        keyExtractor={(item) => item}
        data={postInfo}
        renderItem={({ item, index }) => {
          return (
            <SafeAreaView key={index}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: item.postData.profile_pic }}
                  style={styles.profilePic}
                />
                <View>
                  <Text style={styles.username}>{item.postData.username} </Text>
                  <Text style={styles.location}>
                    {item.postData.location_name}{" "}
                  </Text>
                </View>
              </View>
              {JSON.parse(item.postData.post_file)[0].type === "image" ? (
                <Image
                  style={{ width: width, height: 400 }}
                  source={{ uri: JSON.parse(item.postData.post_file)[0].path }}
                />
              ) : (
                <Video
                  source={{
                    uri: JSON.parse(item.postData.post_file)[0].path,
                  }}
                  ref={video}
                  useNativeControls
                  style={{ width: width, height: 400 }}
                  resizeMode="contain"
                  isLooping
                  shouldPlay={true}
                />
              )}
              <Text style={styles.likes}>{item.postData.like_count} Likes</Text>
            </SafeAreaView>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
    marginLeft: 5,
    marginBottom: 10,
  },
  username: {
    color: "white",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    color: "white",
    marginLeft: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
  likes: {
    color: "white",
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 5,
  },
});
export default PostDetailScreen;
