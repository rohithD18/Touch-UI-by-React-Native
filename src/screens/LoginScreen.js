import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { userInfo } from "../redux/Actions";
import { login } from "../components.js/Apis";

const LoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const body = {
    mobile: mobile,
    password: password,
    udid: "dummyUniqueDeviceId",
    fcm_token: "fcmTokenTest1",
  };
  const handleSubmit = () => {
    login
      .post("/", body)
      .then((res) => {
        // console.log("response", res.data.data)
        if (res.data.status === 200) {
          dispatch(userInfo(res.data.data.token));
          navigation.navigate("Home");
        }
      })
      .catch((err) => {
        Alert.alert("Mobile No or password is incorrect!!!");
      });
  };
  return (
    <View style={styles.container}>
      <Text>Mobile Number</Text>
      <TextInput
        style={styles.input}
        value={mobile}
        placeholder="Enter Mobile number..."
        onChangeText={(text) => setMobile(text)}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        placeholder="password..."
        onChangeText={(input) => setPassword(input)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 50,
    height: 450,
    paddingVertical: 110,
    borderRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: "rgb(200, 200, 205)",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 45,
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 20,
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: "green",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default LoginScreen;
