import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screens/Splash';
import ListaSensor from '../screens/ListaSensor';
import SensorDetail from '../screens/SensorDetail';
import Config from '../screens/Config';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListaSensor"
          component={ListaSensor}
          options={{ title: 'Sensores' }}
        />
        <Stack.Screen
          name="SensorDetail"
          component={SensorDetail}
          options={{ title: 'Detalhe do Sensor' }}
        />
        <Stack.Screen
          name="Config"
          component={Config}
          options={{ title: 'Configurações' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}