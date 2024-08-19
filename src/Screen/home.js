import {Image, Modal, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import { responsiveFontSize,responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';

export default function Home({navigation}) {

  const [modalvisible,setModaleVisibal]=useState(false)
  const handlemessage=()=>{

    navigation.navigate("Message")
  }
  const handleClaneder=()=>{

    navigation.navigate("Calender")
  }

  const handlepage=()=>{

    navigation.navigate("Papper")
  }


  
  return (
    <View style={styles.Contnaire}>
      <View style={styles.Contnaire2}>
        <TouchableOpacity onPress={()=>setModaleVisibal(true)}>
          <Image
            source={require('../Assets/Image/Linetabmodal.png')}
            style={styles.linestyle}
          />
        </TouchableOpacity>
        <Image
          source={require('../Assets/Image/logo3.png')}
          style={styles.logostyle}
        />
        <View style={styles.miccirl}>
          <TouchableOpacity>
            <Image
              source={require('../Assets/Image/mic.png')}
              style={styles.logomic}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.direction}>
          <TouchableOpacity>
            <View style={styles.box}>
              <Text style={styles.textstyle}>Questions</Text>
              <Image
                source={require('../Assets/Image/qutionmark.png')}
                style={styles.questionsty}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.box}>
              <Text style={styles.textstyle}>Reminders</Text>
              <Image
                source={require('../Assets/Image/page.png')}
                style={styles.questionsty}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.direction2}>
          <TouchableOpacity>
            <View style={styles.box}>
              <Text style={styles.textstyle}>Messages</Text>
              <Image
                source={require('../Assets/Image/men.png')}
                style={styles.questionsty}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.box}>
              <Text style={styles.textstyle}>Calendar</Text>
              <Image
                source={require('../Assets/Image/calender.png')}
                style={styles.questionsty}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.textconten}>
          <Text style={styles.textstyl2}>UPLOAD PRESCRIPTION</Text>
          <Text style={styles.textstyl3}>
            Upload a Prescription and Tell Us What you Need. We do the Rest. !
          </Text>

          <View>
            <Text style={styles.textstyl4}>Flat 25% OFF ON </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black', fontWeight: '500'}}>MEDICINES</Text>
              <TouchableOpacity style={styles.ORDERnowbtn}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>ORDER NOW</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.pickbackborder}>
          <View style={styles.pickbackborder2}>
            <Text style={styles.textstyl5}>Get the Best</Text>
            <Text style={styles.textstyl5}>Medical Service</Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={styles.textstyl6}>
                  Rem illum facere quo corporis Quis in saepe
                </Text>
                <Text style={styles.textstyl6}>
                  itaque ut quos pariatur. Qui numquam rerum
                </Text>
                <Text style={styles.textstyl6}>
                  hic repudiandae rerum id amet tempore nam
                </Text>
                <Text style={styles.textstyl6}>
                  molestias omnis qui earum voluptatem!
                </Text>
              </View>
              <Image
                source={require('../Assets/Image/drhard.png')}
                style={{
                  height: responsiveWidth(30),
                  width: responsiveWidth(15),
                  marginLeft: responsiveWidth(5),
                  marginTop: responsiveHeight(-6),
                }}
              />
            </View>
          </View>

          <View style={styles.pickbackborder3}>
            <View style={{flexDirection: 'row'}}>
            <Image
                source={require('../Assets/Image/persent.png')}
                style={{
                  height: responsiveWidth(25),
                  width: responsiveWidth(40),
                  marginLeft: responsiveWidth(1),
                
                }}
              />
               <Image
                source={require('../Assets/Image/medbox.png')}
                style={{
                  height: responsiveWidth(30),
                  width: responsiveWidth(30),
                  marginLeft: responsiveWidth(15),
                  marginTop:responsiveHeight(1)

                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require('../Assets/Image/homeicone2.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleClaneder}>
          <Image
            style={styles.icon2}
            source={require('../Assets/Image/darkcalender.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlepage}>
          <Image
            style={styles.icon3}
            source={require('../Assets/Image/page2.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>handlemessage()}>
          <Image
            style={styles.icon4}
            source={require('../Assets/Image/message.png')}
          />
        </TouchableOpacity>
      </View>
      <Modal 
      animationType="fade"
      visible={modalvisible}
      onRequestClose={()=>setModaleVisibal(false)}
      transparent={true}>
        <TouchableNativeFeedback onPress={()=>setModaleVisibal(false)}>
        <View style={styles.modlecontnair}>
          <View style={styles.modlecontnair2}>

          </View>


        </View>
        </TouchableNativeFeedback>
        
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  Contnaire: {
    flex: 1,
    backgroundColor: 'white',
  },
  modlecontnair:{
    flex:1,
    
  },
  modlecontnair2:{
    backgroundColor:'rgba(255, 255, 255, 0.8)',
    height:responsiveHeight(80),
    width:responsiveWidth(60),
    marginTop:responsiveHeight(10),
    borderTopRightRadius:responsiveWidth(5),
    borderBottomRightRadius:responsiveWidth(5),
    borderWidth:2,
    borderColor:"rgba(217, 217, 217, 1)"
  },
  scrollContent: {
    paddingBottom: responsiveHeight(10), 
  },
  direction: {
    flexDirection: 'row',
    marginTop: responsiveHeight(3),
  },
  direction2: {
    flexDirection: 'row',
    marginTop: responsiveHeight(3),
  },
  Contnaire2: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: responsiveHeight(10),
    width: responsiveWidth(100),
    backgroundColor: 'white',
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
  linestyle: {
    height: responsiveHeight(3),
    width: responsiveWidth(7),
    marginLeft: responsiveWidth(2),
  },
  logostyle: {
    height: responsiveHeight(5.9),
    width: responsiveWidth(10.2),
    marginLeft: responsiveWidth(5),
  },
  miccirl: {
    borderRadius: responsiveWidth(100),
    borderWidth: 2,
    height: responsiveWidth(15),
    width: responsiveWidth(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(95, 91, 91, 1)',
    marginLeft: responsiveWidth(52),
  },
  logomic: {
    height: responsiveHeight(3),
    width: responsiveWidth(5),
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
  box: {
    borderRadius: responsiveWidth(3),
    borderWidth: 1,
    height: responsiveHeight(8),
    width: responsiveWidth(42),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: responsiveWidth(5),
  },
  questionsty: {
    height: responsiveHeight(5),
    width: responsiveWidth(10),
  },
  textstyle: {
    fontSize: responsiveFontSize(2),
  },
  textconten: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(5),
  },
  textstyl2: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    fontWeight: 'bold',
  },
  textstyl3: {
    color: 'black',
    marginTop: responsiveHeight(1),
  },
  textstyl4: {
    color: 'black',
    marginTop: responsiveHeight(2.5),
    fontWeight: 'bold',
  },
  textstyl5: {
    color: 'black',
    marginTop: responsiveHeight(1),
    fontWeight: 'bold',
    marginLeft: responsiveWidth(5),
  },
  textstyl6: {
    color: 'black',
    fontWeight: '400',
    marginLeft: responsiveWidth(5),
    fontSize: responsiveFontSize(1.5),
  },
  ORDERnowbtn: {
    height: responsiveHeight(7),
    width: responsiveWidth(40),
    marginLeft: responsiveWidth(23),
    borderRadius: responsiveWidth(3),
    marginTop: responsiveHeight(-3),
    backgroundColor: 'rgba(28, 130, 223, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickbackborder: {
    borderTopRightRadius: responsiveWidth(3),
    borderBottomRightRadius: responsiveWidth(3),
    height: responsiveHeight(20),
    width: responsiveWidth(40),
    backgroundColor: 'rgba(245, 225, 233, 1)',
    marginTop: responsiveHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickbackborder2: {
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(18),
    width: responsiveWidth(90),
    backgroundColor: 'rgba(200, 245, 196, 1)',
    marginLeft: responsiveWidth(60),
  },
  pickbackborder3: {
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(18),
    width: responsiveWidth(90),
    backgroundColor: 'rgba(215, 208, 255, 1)',
    marginLeft: responsiveWidth(60),
    marginTop: responsiveHeight(1),
  },
});
