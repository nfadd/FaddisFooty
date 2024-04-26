import { View, Text, Alert, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useCallback } from 'react'
import Button from './Button';
import isEmpty from 'lodash/isEmpty';
import COLORS from '../constants/colors';

const AgendaItem = (props) => {
    const { item } = props;

    const buttonPressed = useCallback(() => {
        Alert.alert(item.item.title);
    }, []);

    // const itemPressed = useCallback(() => {
    //     Alert.alert(item.item.title);
    // }, []);
 
    if (isEmpty(item)) {
        return (
            <View>
                <Text>No Events Planned Today</Text>
            </View>
        );
    }


    return (
        <View 
            style={styles.itemContainer}
            // onPress={itemPressed}
        >
            <View style={styles.dataContainer}>

                {/* Time Container */}
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>
                        {new Date(item.item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </Text>
                    <Text style={styles.minutesText}>
                        {item.item.duration_mins} mins
                    </Text>
                </View>

                {/* Description Container */}
                <View style={styles.descriptionContainer}>
                    <Text numberOfLines={1} style={styles.titleText}>{item.item.title}</Text>
                    <Text numberOfLines={2} style={styles.descriptionText}>{item.item.description}</Text>
                </View>

            </View>

            {/* Button Container */}
            <View style={styles.buttonContainer} >
                <Button 
                    text='Info'
                    onPress={buttonPressed}
                    style={styles.button} 
                />
            </View>
        </View>
    )
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    itemContainer: {
        paddingVertical: 10,
        borderColor: COLORS.primary,
        borderWidth: 1,
        // borderRadius: 30,
        justifyContent: "center",
    },
    dataContainer: {
        flexDirection: "row",
    },
    button: {
        width: "100%",
        backgroundColor: COLORS.white,
        borderColor: COLORS.white
    },
    buttonContainer: {
        width: "20%",
        position: "absolute",
        alignSelf: "flex-end",
        padding: 10,
        // marginHorizontal: 10
    },
    timeContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    timeText: {
        fontSize: 18,
        // fontWeight: "bold",
        color: COLORS.black,
        paddingHorizontal: 10,
        paddingBottom: 5,
    },
    minutesText:{
        fontSize: 14,
        // fontWeight: "bold",
        color: COLORS.gray,
        paddingLeft: 10,
    },
    descriptionContainer: {
        flex: 1,
        maxWidth: screenWidth * 0.6
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.black,
        paddingHorizontal: 10,
        paddingBottom: 5,
    },
    descriptionText: {
        fontSize: 16,
        color: COLORS.black,
        paddingHorizontal: 10,
        paddingBottom: 5,
    },
});

export default React.memo(AgendaItem);