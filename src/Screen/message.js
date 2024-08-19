import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
  ScrollView,
  Animated,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { PermissionsAndroid, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function Message({ navigation }) {
  const [city, setCity] = useState(null);
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const animatedValue = useRef(new Animated.Value(0)).current;  

  const saveFileList = async (files) => {
    try {
      const filesJson = JSON.stringify(files);
      await AsyncStorage.setItem('@fileList', filesJson);
    } catch (error) {
      console.error('Failed to save the file list.', error);
    }
  };

  const loadFileList = async () => {
    try {
      const savedFiles = await AsyncStorage.getItem('@fileList');
      if (savedFiles) {
        setFileList(JSON.parse(savedFiles));
        console.log('Loaded file list:', JSON.parse(savedFiles));
      }
    } catch (error) {
      console.error('Failed to load the file list.', error);
    }
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(res);
      const updatedFileList = [...fileList, res];
      setFileList(updatedFileList);
      await saveFileList(updatedFileList);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.error('Unknown Error: ', err);
      }
    }
  };

  useEffect(() => {
    loadFileList();

    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location to show your current position.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
          setCity('Location permission not granted.');
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          )
            .then(response => response.json())
            .then(data => {
              const city =
                data.address?.city ||
                data.address?.town ||
                data.address?.village ||
                'City not available';
              setCity(city);
            })
            .catch(error => {
              console.error(error);
              Alert.alert('Error', 'Unable to fetch city information.');
              setCity('City not available');
            });
        },
        error => {
          console.error(error);
          Alert.alert('Error', 'Unable to get current location.');
          setCity('City not available');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };

    requestLocationPermission();
    const bounceAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    bounceAnimation();
  }, []);

  const handleCalendar = () => {
    navigation.navigate('Calender');
  };

  const handlePage = () => {
    navigation.navigate('Papper');
  };

  const handleHome = () => {
    navigation.navigate('Home');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderFileItem = ({ item, index }) => (
    <View style={styles.scrillbox} key={index}>
      {item.type.startsWith('image/') ? (
        <Image
          source={{ uri: item.uri }}
          style={styles.imagestyle}
        />
      ) : (
        <Image
          source={require('../Assets/Image/file.png')}
          style={styles.imagestyle}
        />
      )}
      <Text style={styles.textstyle}> Path lab pharmacy</Text>
      <Text style={styles.textstyle2}>5km Away</Text>
      <View style={styles.direction}>
        <Image style={styles.ratingstyle}source={require("../Assets/Image/star.png")}/>
        <Text style={{fontSize:responsiveFontSize(1.5),marginLeft:responsiveWidth(1)}}>4.5 (120 review)</Text>

      </View>
    </View>
  );

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={require('../Assets/Image/arrow.png')}
            style={styles.linestyle}
          />
        </TouchableOpacity>
        <Animated.View style={{ transform: [{ translateY }] }}>
          <Image
            source={require('../Assets/Image/location.png')}
            style={styles.logostyle}
          />
        </Animated.View>
        <Text style={styles.citynamestyle}>{city || 'Fetching city...'}</Text>
      </View>

      <ScrollView>
        <View style={styles.centeredView}>
          <Text style={styles.centeredText}>Pharmacy Nearby</Text>
          <FlatList
            horizontal
            data={fileList}
            renderItem={renderFileItem}
            keyExtractor={(item, index) => `${item.uri}-${index}`} 
            contentContainerStyle={styles.flatListContainer}
          />
          <View style={styles.textfix}>
            <Text style={styles.textstyle3}>Upload Prescription</Text>
            <Text style={styles.textstyle4}>
              We will show the pharmacy that fits as per
            </Text>
            <Text style={styles.textstyle4}>your prescription.</Text>
          </View>
          <View style={styles.fileuplodebox}>
            <View style={styles.fileuplodebox2}>
              <View style={styles.direction}>
                <TouchableOpacity>
                  <View style={{ marginTop: responsiveHeight(3), marginLeft: responsiveWidth(10) }}>
                    <Image style={styles.udatelink} source={require("../Assets/Image/file.png")} />
                    <Text style={styles.textstyle}>Upload Link</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickDocument}>
                  <View style={{ marginTop: responsiveHeight(3), marginLeft: responsiveWidth(30) }}>
                    <Animated.View style={{ transform: [{ translateY }] }}>
                      <Image style={styles.udatelink} source={require("../Assets/Image/upload.png")} />
                    </Animated.View>
                    <Text style={styles.textstyle}>Upload File</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
      <View style={styles.btnview}>
        <TouchableOpacity style={styles.continuebtn}>
          <Text style={styles.logtext}>Continue</Text>

        </TouchableOpacity>
        
    
    </View>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity onPress={handleHome}>
          <Image
            style={styles.icon}
            source={require('../Assets/Image/Home.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCalendar}>
          <Image
            style={styles.icon2}
            source={require('../Assets/Image/darkcalender.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePage}>
          <Image
            style={styles.icon3}
            source={require('../Assets/Image/page2.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.icon4}
            source={require('../Assets/Image/messageicone2.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  direction: {
    flexDirection: 'row',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: responsiveHeight(10),
    width: responsiveWidth(100),
    backgroundColor: 'white',
  },
  linestyle: {
    height: responsiveHeight(5),
    width: responsiveWidth(10),
    marginLeft: responsiveWidth(5),
  },
  logostyle: {
    height: responsiveHeight(3),
    width: responsiveWidth(7),
    marginLeft: responsiveWidth(5),
  },
  bottom: {
    flexDirection: 'row',
    height: responsiveHeight(10),
    width: responsiveWidth(100),
    backgroundColor: 'rgba(217, 217, 217, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: responsiveWidth(5),
    borderTopLeftRadius: responsiveWidth(5),
  },
  textstyle: {
    fontSize: responsiveFontSize(1.5),
    color: 'black',
    fontWeight: 'bold',
    marginLeft: responsiveWidth(2),
    marginTop:responsiveWidth(1)
  },
  textstyle2: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '450',
    marginLeft: responsiveWidth(2),
  },
  icon: {
    height: responsiveHeight(4),
    width: responsiveWidth(8),
    marginLeft: responsiveWidth(1),
  },
  icon2: {
    height: responsiveHeight(4),
    width: responsiveWidth(8),
    marginLeft: responsiveWidth(18),
  },
  icon3: {
    height: responsiveHeight(4),
    width: responsiveWidth(8),
    marginLeft: responsiveWidth(18),
  },
  icon4: {
    height: responsiveHeight(4),
    width: responsiveWidth(8),
    marginLeft: responsiveWidth(18),
  },
  citynamestyle: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginLeft: responsiveWidth(4),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(5),
    marginLeft: responsiveWidth(5),
  },
  centeredText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    color: 'black',
  },
  scrillbox: {
    borderWidth: 1,
    height: responsiveHeight(20),
    width: responsiveWidth(42),
    marginTop: responsiveHeight(5),
    borderRadius: responsiveWidth(5),
    marginLeft: responsiveWidth(5),
  },
  imagestyle: {
    height: responsiveHeight(12),
    width: responsiveWidth(41.5),
    borderTopRightRadius: responsiveWidth(5),
    borderTopLeftRadius: responsiveWidth(5),

  },
  ratingstyle: {
    marginLeft: responsiveWidth(2),
    marginTop: responsiveHeight(0.5),
  },
  textfix: {
    alignItems: 'center',
    marginTop: responsiveHeight(5),
  },
  textstyle3: {
    fontSize: responsiveFontSize(3),
    color: 'black',
    fontWeight: 'bold',
  },
  textstyle4: {
    color: 'black',
    fontWeight: '400',
  },
  flatListContainer: {
    paddingHorizontal: responsiveWidth(5),
  },
  fileuplodebox: {
    marginTop: responsiveHeight(5),
  },
  fileuplodebox2: {
    borderRadius: responsiveWidth(5),
    borderWidth: 1,
    height: responsiveHeight(20),
    width: responsiveWidth(90),
  },
  udatelink: {
    height: responsiveHeight(10),
    width: responsiveWidth(20),
  },
  btnview:{
    marginTop:responsiveHeight(5),
    justifyContent:"center",
    alignItems:'center'
  },
  continuebtn:{
    height:responsiveHeight(10),
    width:responsiveWidth(90),
    borderRadius:responsiveWidth(5),
    backgroundColor:"rgba(83, 145, 180, 1)",
    marginBottom:responsiveHeight(5),
    marginLeft:responsiveWidth(-5),
    justifyContent:"center"
  },
  logtext: {
    color: "white",
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
});
