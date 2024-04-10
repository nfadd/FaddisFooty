import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import COLORS from '../constants/colors';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AgendaItem from '../components/AgendaItem';

const Home = () => {

    const serv_addr = process.env['API_HOST'] || 'http://localhost:3000';
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Users
        const users_url = `${serv_addr}/api/users`;
        axios.get(users_url)
            .then((response) => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users', error);
            });
        
        // Events
        const events_url = `${serv_addr}/api/events`;
        axios.get(events_url)
            .then((response) => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events', error);
            });
    }, []);

    const renderItem = useCallback(item => {
        return <AgendaItem item={item}/>;
    },[]);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View>
                <Text style={styles.hello}>Hello,</Text>
                {users.length > 0 && (
                    <Text style={styles.userName}>{users[0].first_name} {users[0].last_name}</Text>
                )}
                <Image
                    source={require('../assets/nick_faddis.jpeg')}
                    style={styles.userImage} 
                />
            </View>
            <CalendarProvider
                date={getCurrentDate()}
                showTodayButton
            >
                <WeekCalendar 
                />
                {users.length > 0 && (
                    <AgendaList 
                        sections={[{title: 'Events', data: events}]}
                        keyExtractor={event => event._id}
                        renderItem={renderItem}
                        pagingEnabled
                    />
                )}
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