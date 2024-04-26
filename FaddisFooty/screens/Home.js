import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import COLORS from '../constants/colors';
import { useEffect, useState, useCallback } from 'react';
import AgendaItem from '../components/AgendaItem';
import { fetchUserId, fetchUserEvents } from '../utils/fetch';

const Home = ({ route }) => {
    const { userId } = route.params;

    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

    const [user, setUser] = useState({});
    const [events, setEvents] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [activeDate, setActiveDate] = useState(getCurrentDate());

    useEffect(() => {
        const getUserData = async () => {
            try{
                const userData = await fetchUserId(userId);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        const getEventData = async () => {
            try{
                const eventData = await fetchUserEvents(userId);
                setEvents(eventData);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        getUserData();
        getEventData();
    }, [userId]);

    useEffect(() => {
        setSelectedStartDate(getStartOfWeek(activeDate));
        setSelectedEndDate(getEndOfWeek(activeDate));
    }, [activeDate]);

    const renderItem = useCallback(item => {
        return <AgendaItem item={item}/>;
    },[]);

    const eventsByDate = events.reduce((acc, event) => {
        const dateKey = event.date.split('T')[0];
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(event);
        return acc;
    }, {});

    const filteredEvents = Object.entries(eventsByDate)
        .filter(([date]) => date >= selectedStartDate && date <= selectedEndDate)
        .map(([date, data]) => ({
            title: date,
            data: data,
        }));
    
    const sortedFilteredEvents = filteredEvents.sort((a, b) => {
        const dateA = new Date(a.title);
        const dateB = new Date(b.title);

        if (dateA < dateB) {
            return -1;
        }
        if (dateA > dateB) {
            return 1;
        }
        return 0;
    });

    function getCurrentDate(){
        let day = new Date();
        const offset = day.getTimezoneOffset();
        day = new Date(day.getTime() - (offset*60*1000));
    
        return day.toISOString().split('T')[0];
    }

    function getStartOfWeek(dateString){
        let date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        date = new Date(date.getTime() + (offset*60*1000));
        const firstDay = new Date(date.setDate((date.getDate()) - date.getDay()));
        
        return firstDay.toISOString().split('T')[0];
    };

    function getEndOfWeek(dateString){
        let date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        date = new Date(date.getTime() + (offset*60*1000));
        const lastDay = new Date(date.setDate((date.getDate()) + (6 - date.getDay())));
        return lastDay.toISOString().split('T')[0];
    };

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
                todayBottomMargin={screenHeight*.125}
                style={styles.calendar}
                onDateChanged={setActiveDate}
                
            >
                <WeekCalendar
                    
                />
                <AgendaList 
                    sections={sortedFilteredEvents}
                    keyExtractor={(event) => event._id}
                    renderItem={renderItem}
                    sectionStyle={styles.section}
                />
            </CalendarProvider>
        </SafeAreaView>
    )
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    hello: {
        fontSize: 30,
        fontWeight: 800,
        marginLeft: 10,
        color: COLORS.primary,
    },
    userName: {
        fontSize: 40,
        fontWeight: 800,
        marginLeft: 10,
        marginBottom: 10,
        color: COLORS.primary,
    },
    userImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.primary,
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 10
    },
    calendar: {
        backgroundColor: COLORS.white,
    },
    section: {
        textAlign: 'center',
        backgroundColor: "transparent",
    },
});

export default Home;