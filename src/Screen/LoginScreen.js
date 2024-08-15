import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView, Animated, Easing } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [backgroundColorAnim] = useState(new Animated.Value(0)); 

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLoading = () => {
    navigation.navigate('Loading');
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000); 
  };

  const handleLogin = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    }

    if (isValid) {
      handleLoading();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerTwo}>
          <Text style={styles.textStyle}>LOGIN</Text>
          <Text style={styles.textStyle02}>Healthcare</Text>
        </View>

        <View style={styles.box}>
          <Image source={require("../Assets/Icon/Email.png")} style={styles.iconStyle} />
          <TextInput
            style={styles.inputField}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.dot}>
            <Text style={styles.Textsty}>Email Id</Text>
          </View>
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={styles.box}>
          <Image source={require("../Assets/Icon/Lock.png")} style={styles.iconStyle2} />
          <TextInput
            style={styles.inputField}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={styles.dot}>
            <Text style={styles.Textsty}>Password</Text>
          </View>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <View style={styles.forpasssty}>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.forpasstext}>Forgot Password!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.direction}>
          <Text style={styles.Donthave}>Don’t Have an Account: </Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.forpasstext}>Click here to register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.direction2}>
          <TouchableOpacity style={styles.loginBtn} activeOpacity={0.9} onPress={handleLogin}>
            <Text style={styles.logtext}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerTwo: {
    alignItems: "center",
  },
  container3: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: responsiveHeight(10),
  },
  textStyle: {
    fontSize: responsiveFontSize(2),
    letterSpacing: 1,
    marginTop: responsiveHeight(7),
    color: "black",
    fontWeight: "500",
  },
  direction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: responsiveHeight(5),
  },
  direction2: {
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle02: {
    fontSize: responsiveFontSize(5),
    letterSpacing: 1,
    marginTop: responsiveHeight(10),
    marginBottom: responsiveHeight(10),
    color: "black",
    fontWeight: "470",
  },
  inputField: {
    height: responsiveHeight(8),
    width: responsiveWidth(70),
    borderColor: "rgba(0, 0, 0, 1)",
    borderRadius: responsiveWidth(2),
  },
  loginBtn: {
    height: responsiveHeight(9.5),
    width: responsiveWidth(90),
    backgroundColor: "rgba(83, 145, 180, 1)",
    borderRadius: responsiveWidth(2),
    padding: responsiveWidth(5),
    marginTop: responsiveHeight(8),
  },
  iconStyle: {
    height: responsiveHeight(2),
    width: responsiveWidth(5.5),
    margin: responsiveHeight(2.5),
  },
  iconStyle2: {
    height: responsiveHeight(3),
    width: responsiveWidth(5.5),
    margin: responsiveHeight(2.5),
  },
  Textsty: {
    color: "black",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    padding: 10,
    borderWidth: 1,
    height: responsiveHeight(10),
    width: responsiveWidth(90),
    marginTop: responsiveHeight(5),
    marginLeft: responsiveWidth(5),
    position: 'relative',
    borderRadius: responsiveWidth(3),
    backgroundColor: "white",
    flexDirection: "row",
  },
  dot: {
    position: 'absolute',
    marginTop: responsiveHeight(-1.7),
    left: '50%',
    marginLeft: responsiveWidth(-35),
    width: responsiveWidth(17),
    backgroundColor: "white",
  },
  forpasssty: {
    marginLeft: responsiveWidth(66),
    marginTop: responsiveHeight(3),
  },
  forpasstext: {
    color: "rgba(4, 35, 142, 1)",
  },
  Donthave: {
    color: "black",
  },
  logtext: {
    color: "white",
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
  errorText: {
    color: "red",
    marginLeft: responsiveWidth(6),
    marginTop: responsiveHeight(1),
  },
});
