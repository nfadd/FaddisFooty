import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import COLORS from '../constants/colors';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AgendaItem from '../components/AgendaItem';

const Home = ({ route }) => {

    const { userId } = route.params;

    const serv_addr = process.env.API_HOST || 'http://localhost:3000';
    const [user, setUser] = useState({});
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Users
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${serv_addr}/api/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };
        
        // Events
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${serv_addr}/api/events`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        fetchUser();
        fetchEvents();
    }, [userId]);

    const renderItem = useCallback(item => {
        return <AgendaItem item={item}/>;
    },[]);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View>
                <Text style={styles.hello}>Hello,</Text>
                <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
                <Image
                    source={require('../assets/nick_faddis.jpeg')}
                    style={styles.userImage} 
                />
            </View>
            <CalendarProvider
                date={getCurrentDate()}
                showTodayButton
                style={styles.calendar}
            >
                <WeekCalendar 
                />
                <AgendaList 
                    sections={[{title: 'Events', data: events}]}
                    keyExtractor={event => event._id}
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
    },
    calendar: {
        
    }
});

export default Home;