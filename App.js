import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/HomeScreen';
import ZonesScreen from './src/screens/ZonesScreen';
import FavScreen from './src/screens/FavScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#13131a' }}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#1f1f2e', borderBottomWidth: 2, borderBottomColor: '#ef5350' },
          headerTitleAlign: 'center',
          headerTintColor: '#ffffff',
          tabBarStyle: { backgroundColor: '#1c1c24', borderTopColor: '#2c2c38', paddingBottom: 5, height: 60 },
          tabBarActiveTintColor: '#ef5350',
          tabBarInactiveTintColor: '#a0a0b5',
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' }
        }}>
          <Tab.Screen name="Início" component={HomeScreen} options={{ tabBarLabel: 'Início', tabBarIcon: () => <Text>🏠</Text> }} />
          <Tab.Screen name="Habitats" component={ZonesScreen} options={{ tabBarLabel: 'Zonas', tabBarIcon: () => <Text>🗺️</Text> }} />
          <Tab.Screen name="Favoritos" component={FavScreen} options={{ tabBarLabel: 'Favoritos', tabBarIcon: () => <Text>⭐</Text> }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
