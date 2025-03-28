// Home.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';  // Main home content
import Search from './Search';  // Search screen
import Profile from './Profile';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='HomeScreen'>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

const SearchNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='SearchMain'>
            <Stack.Screen name="SearchMain" component={Search} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

const ProfileNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='ProfileMain'>
            <Stack.Screen name="ProfileMain" component={Profile} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export { HomeNavigation, SearchNavigation, ProfileNavigation };
