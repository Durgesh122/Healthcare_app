import React, { useEffect, useRef } from 'react';
import { View, Animated, Image } from 'react-native';
import style from './style';

export default function Loading() {
  const wave1Anim = useRef(new Animated.Value(0)).current;
  const wave2Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startWave1Animation = () => {
      Animated.loop(
        Animated.timing(wave1Anim, {
          toValue: 1,
          duration: 3000, 
          useNativeDriver: true,
        })
      ).start();
    };

    const startWave2Animation = () => {
      Animated.loop(
        Animated.timing(wave2Anim, {
          toValue: 1,
          duration: 3000, 
          useNativeDriver: true,
        })
      ).start();
    };

    startWave1Animation();
    startWave2Animation();
  }, [wave1Anim, wave2Anim]);

  const wave1TranslateX = wave1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-style.circle2.width, style.circle2.width],
  });

  const wave2TranslateX = wave2Anim.interpolate({
    inputRange: [0,1],
    outputRange: [style.circle2.width, -style.circle2.width],
  });

  return (
    <View style={style.container}>
      <View style={style.circle}>
        <View style={style.circle2}>
          <Animated.Image
            source={require('../Assets/Icon/waveback.png')}
            style={[
              style.wavestyle,
              { transform: [{ translateX: wave1TranslateX }] },
            ]}
            resizeMode="cover"
          />
          <Animated.Image
            source={require('../Assets/Icon/wave.png')}
            style={[
              style.wavestyle,
              { transform: [{ translateX: wave2TranslateX }] },
            ]}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
}
