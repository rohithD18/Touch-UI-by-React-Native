import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { feeds, postDetails } from "../components.js/Apis";
import { getFeeds, getPostDetails } from "../redux/Actions";
import { Video } from "expo-av";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const video = React.useRef(null);

  const token = useSelector((state) => state.loginReducer.token);

  const body = { offset: 0 };

  const allFeeds = useSelector((state) => state.feedsReducer.homeFeeds);
  // const [status, setStatus] = useState({});
  useEffect(() => {
    feeds
      .post("/getFeeds", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(getFeeds(res.data.data));
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const videoPlayer = (postFile) => {
    const videoData =
      JSON.parse(postFile)[0].path != ""
        ? JSON.parse(postFile)[0].path
        : "NO Video";
    return (
        <Video
          source={{
            uri: videoData
          }}
          ref={video}
          useNativeControls
          style={{ width: width, height: 300 }}
          resizeMode="cover"
        />
    );
  };

  const handlePost = (id) => {
    const postId = { post_id: id };
    postDetails
      .post("/", postId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(getPostDetails(res.data.message));
          navigation.navigate("PostDetails");
        }
      })
      .catch((err) => console.log(err));
      
    video.current.pauseAsync();
  };
  return (
    <View style={{ backgroundColor: "#111432" }}>
      {allFeeds.length === 0 ? (
        <Text>No feeds to show</Text>
      ) : (
        <FlatList
          keyExtractor={(item, index) => index}
          data={allFeeds}
          renderItem={({ item }) => {
            return (
              <View key={item.post_id} style={styles.feedsContainer}>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                  <Image
                    source={{ uri: item.profile_pic }}
                    style={styles.profilePic}
                  />
                  <Text style={styles.profileName}>{item.username} </Text>
                </View>
                <TouchableOpacity onPress={() => handlePost(item.postid)}>
                  {item.post_file === undefined ? (
                    <Text style={{ color: "white", alignSelf: "center" }}>
                      No Post
                    </Text>
                  ) : JSON.parse(item.post_file)[0].type === "image" ? (
                    <Image
                      source={{
                        uri: JSON.parse(item.post_file)[0].path,
                      }}
                      style={{ width: width, height: 400 }}
                    />
                  ) : (
                    <View>
                       {videoPlayer(item.post_file)}
                    </View>                   
                  )}
                </TouchableOpacity>
                <Text style={styles.likes}>{item.like_count} likes</Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  feedsContainer: {
    marginVertical: 5,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  profileName: {
    alignSelf: "center",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  likes: {
    color: "white",
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default HomeScreen;
