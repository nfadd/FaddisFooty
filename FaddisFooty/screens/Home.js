import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import COLORS from '../constants/colors';
import { useState } from 'react';

const Home = () => {

    const items = [
        {
            name: 'Training',
            data: [{
                date: '2024-04-04',
            }]
        },
        {
            name: 'Game',
            data: [{
                date: '2024-04-06',
            }]
        },
        {
            name: 'Sleep',
            data: [{
                date: '2024-04-14',
            }]
        },
    ];

    const renderItem = item => {
        return (
            <View>
                <Text>{item.name}</Text>
            </View>
        );
    };

  return (
    <SafeAreaView style={{flex: 1}}>
        <View>
            <Text style={styles.hello}>Hello,</Text>
            <Text style={styles.userName}>Nick Faddis</Text>
            <Image
                source={require('../assets/nick_faddis.jpeg')}
                style={styles.userImage} 
            />
        </View>
        <CalendarProvider
            date={getCurrentDate()}
        >
            <WeekCalendar 
            />
            <AgendaList 
                sections={items}
                renderItem={renderItem}
                pagingEnabled
            />
        </CalendarProvider>
    </SafeAreaView>
  )
};

function getCurrentDate(){
    let day = new Date();
    const offset = day.getTimezoneOffset();
    day = new Date(day.getTime() - (offset*60*1000));

    return day.toISOString().split('T')[0];
}

const styles = StyleSheet.create({
    hello: {
        fontSize: 50,
        fontWeight: 800,
        marginLeft: 10,
        color: COLORS.primary,
    },
    userName: {
        fontSize: 46,
        fontWeight: 800,
        marginLeft: 10,
        marginBottom: 10,
        color: COLORS.primary,
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.primary,
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 10
    }
});

export default Home;