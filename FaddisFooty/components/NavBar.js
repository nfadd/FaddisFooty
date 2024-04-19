import { StyleSheet, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { Home } from '../screens';
import COLORS from '../constants/colors';

const Tab = createBottomTabNavigator();

const NavBar = ({ route }) => {
  return (
    <Tab.Navigator initalRouteName={'Home'}>
        <Tab.Screen
            name='Home'
            component={Home}
            initialParams={route.params}
            options={{
                ...options.screen,
                tabBarIcon: () => (
                    <Ionicons name='home' size={24} color={COLORS.primary} />
                )
            }}
        />
        <Tab.Screen
            name='Train'
            component={Home}
            options={{
                ...options.screen,
                tabBarIcon: () => (
                    <FontAwesome name='soccer-ball-o' size={24} color={COLORS.primary} />
                )
            }}
        />
        <Tab.Screen
            name='Calendar'
            component={Home}
            options={{
                ...options.screen,
                tabBarIcon: () => (
                    <FontAwesome name='calendar' size={24} color={COLORS.primary} />
                )
            }}
        />
        <Tab.Screen
            name='Chat'
            component={Home}
            options={{
                ...options.screen,
                tabBarIcon: () => (
                    <AntDesign name='message1' size={24} color={COLORS.primary} />
                )
            }}
        />
        <Tab.Screen
            name='Profile'
            component={Home}
            options={{
                ...options.screen,
                tabBarIcon: () => (
                    <Image
                        source={require('../assets/nick_faddis.jpeg')}
                        style={styles.userImage} 
                    />
                )
            }}
        />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    userImage: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        borderWidth: 1,
        borderColor: COLORS.primary,
    }
});

const options = StyleSheet.create({
    screen: {
      headerShown: false,
    }
});

export default NavBar;