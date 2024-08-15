import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FleshScreen from '../Screen/WithoutLogin';
import Backdownscreen from '../Screen/backdownscreen';
import LoginScreen from '../Screen/LoginScreen';
import Loading from '../Screen/loadingscreen';
import Home from '../Screen/home';
import Calender from '../Screen/calender';
import Papper from '../Screen/papper';
import Message from '../Screen/message';



const Stack = createNativeStackNavigator(); 

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FleshScreen'>
        
        <Stack.Screen name="FleshScreen"component={FleshScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Backdownscreen'component={Backdownscreen} options={{ headerShown: false }}/>
        <Stack.Screen name='LoginScreen'component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Loading'component={Loading} options={{ headerShown: false }}/>
        <Stack.Screen name='Home'component={Home}options={{ headerShown: false }}/>
        <Stack.Screen name='Calender'component={Calender}options={{ headerShown: false }}/>
        <Stack.Screen name='Papper'component={Papper}options={{ headerShown: false }}/>
        <Stack.Screen name='Message'component={Message}options={{ headerShown: false }}/>

        
        
      

      </Stack.Navigator>
    </NavigationContainer>
  );
}
