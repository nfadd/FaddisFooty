import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Animated, Dimensions, FlatList, StatusBar } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import Button from '../components/Button';

const Train = () => {
    const { width } = Dimensions.get('window');
    const animation = useRef(new Animated.Value(0)).current;
    const searchBarRef = useRef(null);

    const onSearch = () => {
        Animated.spring(animation, {
            toValue: width * 1,
            useNativeDriver: true,
        }).start();
        searchBarRef.current.focus();
    };

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
    ];

    const Item = ({ exercise }) => {
        return (
            <View>
                <Text style={styles.card}>{exercise.title}</Text>
            </View>
        );
    }

  return (
    <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight || 0}}>
        <View>
            <View style={styles.textbox}>
                <TextInput
                    ref={searchBarRef}
                    placeholder='Search'
                >
                </TextInput>
            </View>
            <TouchableOpacity 
                style={styles.search}
                onPress={onSearch}
            >
                <Ionicons 
                    name='search' 
                    size={24} 
                    color={COLORS.primary}
                />
            </TouchableOpacity>
        </View>

        <View style={styles.categories}>
            <Button
                text='Drills'
                filled
                style={styles.category}
            />
            <Button
                text='Gym'
                // filled
                style={styles.category}
            />
            <Button
                text='Fitness'
                // filled
                style={styles.category}
            />
            <Button
                text='Nutrition'
                // filled
                style={styles.category}
            />
        </View>

        <View style={styles.drills}>
            <FlatList
                data={DATA}
                renderItem={({item}) => <Item exercise={item}/>}
                keyExtractor={(item) => item.id}
                horizontal
            >
            </FlatList>
        </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    textbox: {
        width: '80%',
        height: 48,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        paddingLeft: 22,
        marginLeft: 10
    },
    search: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: '5%',
        marginTop: '3%',
    },
    categories: {
        paddingTop: 20,
        flexDirection: 'row'
    },
    category: {
        //TODO:
        // Fix the padding/margin issue for other phone sizes
        width: '22.5%',
        marginLeft: 7
    },
    drills: {
        marginTop: 20,
    },
    card: {
        width: 150,
        height: 300,
        padding: 20,
        marginLeft: 10,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 10,
    },
})

export default Train;