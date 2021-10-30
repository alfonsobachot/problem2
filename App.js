import React, { useState, useEffect, } from 'react';
//import axios from "axios";
import { StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'

import Index from './components/screens/Index';
import Details from './components/screens/Details';

import orders from "./data/orders.json";

import { storeOrders, getOrders } from './ordersStorage'

export default function App() {

  storeOrders(JSON.stringify(orders));

  useEffect(() => {
    //axios.get('./orders.json').then((res) => setOrders(res.data));
  });

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Order List" component={Index} />
        <Stack.Screen name="Order Detail" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
