import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

export default function FleshScreen() {
  const navigation = useNavigation();
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backgroundColorAnim, {
      toValue: 1,
      duration: 2000, 
      easing: Easing.linear,
      useNativeDriver: false, 
    }).start(() => {
    
      navigation.navigate('Backdownscreen');
    });
  }, [backgroundColorAnim, navigation]);

  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(83, 145, 180, 1)', 'rgba(0, 128, 0, 1)'], 
  });

  return (
    <Animated.View style={[styles.contnaire, { backgroundColor :"white"}]}>
      <View style={styles.contnaire2}>
        <Text style={styles.Textstyles}>Healthcare</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  contnaire: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contnaire2: {
    backgroundColor: "rgba(83, 145, 180, 1)",
    height: responsiveHeight(30),
    width: responsiveWidth(60),
    borderRadius: responsiveWidth(100),
    justifyContent: "center",
  },
  Textstyles: {
    fontSize: responsiveFontSize(5),
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
