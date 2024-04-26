import { View, Text, Alert, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useCallback } from 'react'
import Button from './Button';
import isEmpty from 'lodash/isEmpty';

const AgendaItem = (props) => {
    const { item } = props;

    const buttonPressed = useCallback(() => {
        Alert.alert('Show me more');
    }, []);

    const itemPressed = useCallback(() => {
        Alert.alert(item.title);
    }, []);
 
    if (isEmpty(item)) {
        return (
            <View>
                <Text>No Events Planned Today</Text>
            </View>
        );
    }


    return (
        <TouchableOpacity onPress={itemPressed}>
            <View>
                <Text>{item.hour}</Text>
                <Text>{item.item.duration_mins}</Text>
            </View>
            <Text>{item.item.title}</Text>
            <Text>{item.item.description}</Text>
            <View style={styles.buttonContainer} >
                <Button 
                    text='More Info'
                    onPress={buttonPressed}
                    filled
                    style={styles.button} 
                />
            </View>
        </TouchableOpacity>
    )
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
        width: "75%",
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
    }
});

export default React.memo(AgendaItem);