import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Backdownscreen() {
  const navigation = useNavigation();
  const translateY = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 1000, 
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('LoginScreen');
    });
  }, [navigation, translateY]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedView, { transform: [{ translateY }] }]}>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedView: {
    flex: 1,
    backgroundColor: 'rgba(83, 145, 180, 1)', 
  },
});
