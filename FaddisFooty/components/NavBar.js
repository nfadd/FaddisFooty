import { StyleSheet, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome, AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { Home, Train } from '../screens';
import COLORS from '../constants/colors';
import { BlurView } from 'expo-blur';

const Tab = createBottomTabNavigator();

const NavBar = ({ route }) => {
  return (
    <Tab.Navigator
        initalRouteName={'Home'}
        screenOptions={{
            tabBarStyle: {...styles.navbar},
            tabBarBackground: () => (
                <BlurView
                    intensity={90}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        ...styles.blur
                    }}
                />
            ),
            tabBarShowLabel: false,
        }}
    >
        <Tab.Screen
            name='Home'
            component={Home}
            initialParams={route.params}
            options={{
                ...options.screen,
                tabBarIcon: ({ focused }) => (
                    <Feather name='home' size={24} color={focused ? COLORS.contrast : COLORS.primary} />
                )
            }}
        />
        <Tab.Screen
            name='Train'
            component={Train}
            initialParams={route.params}
            options={{
                ...options.screen,
                tabBarIcon: ({ focused }) => (
                    // <FontAwesome name='soccer-ball-o' size={24} color={COLORS.primary} />
                    <MaterialIcons name='sports-soccer' size={24} color={focused ? COLORS.contrast : COLORS.primary} />
                )
            }}
        />
        <Tab.Screen
            name='Calendar'
            component={Home}
            initialParams={route.params}
            options={{
                ...options.screen,
                tabBarIcon: ({ focused }) => (
                    <Feather name='calendar' size={24} color={focused ? COLORS.contrast : COLORS.primary} />
                )
            }}
        />
        <Tab.Screen
            name='Chat'
            component={Home}
            initialParams={route.params}
            options={{
                ...options.screen,
                tabBarIcon: ({ focused }) => (
                    // <AntDesign name='message1' size={24} color={COLORS.primary} />
                    <Feather name='message-circle' size={24} color={focused ? COLORS.contrast : COLORS.primary} />
                )
            }}
        />
        <Tab.Screen
            name='Profile'
            component={Home}
            initialParams={route.params}
            options={{
                ...options.screen,
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../assets/nick_faddis.jpeg')}
                        style={{
                            ...styles.userImage,
                            borderColor: focused ? COLORS.contrast : COLORS.primary
                        }}
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
        // borderColor: COLORS.primary,
    },
    navbar: {
        position: "absolute",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    blur: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        // backgroundColor: 'transparent'
        // backgroundColor: COLORS.contrast,
    }
});

const options = StyleSheet.create({
    screen: {
      headerShown: false,
    }
});

export default NavBar;