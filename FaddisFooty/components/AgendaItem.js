import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import Button from './Button';
import isEmpty from 'lodash/isEmpty';

const AgendaItem = (props) => {
    const {item} = props;

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
                {/* <Text>{item.hour}</Text> */}
                <Text>{item.duration_mins}</Text>
            </View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <View>
                <Button 
                    text='More Info'
                    onPress={buttonPressed}
                    filled    
                />
            </View>
        </TouchableOpacity>
    )
}

export default React.memo(AgendaItem);