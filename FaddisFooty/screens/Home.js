import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import COLORS from '../constants/colors';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {

    const serv_addr = process.env['API_HOST'] || 'http://localhost:3000';
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const url = `${serv_addr}/api/users`;
        axios.get(url)
            .then((response) => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users', error);
            });
    }, []);

    const renderItem = item => {
        return (
            <View>
                {/* <Text>{item.username}</Text>
                <Text>{item.email}</Text> */}
                <Text>Hello</Text>
            </View>
        );
    };

  return (
    <SafeAreaView style={{flex: 1}}>
        <View>
            <Text style={styles.hello}>Hello,</Text>
            <Text style={styles.userName}>{users[0].first_name} {users[0].last_name}</Text>
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
            {/* <AgendaList 
                sections={users}
                // keyExtractor={user => user._id}
                renderItem={renderItem}
                // pagingEnabled
            /> */}
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