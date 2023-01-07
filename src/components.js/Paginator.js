import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const Paginator = ({ data, Id }) => {
  return (
    <View>
        <FlatList style={styles.container}
        horizontal
        keyExtractor={(item, index) => index}
        data={data} 
        renderItem={({item}) => {
        return (
          <View
            style={[
              styles.dots,
              {
                width: 10,
                backgroundColor: item.id === Id ? "orange" : "white",
              },
            ]}
          ></View>
        )
      }} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    bottom: 250,
    alignSelf: "center",

  },
  dots: {
    height: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 8,
  },
});

export default Paginator;
