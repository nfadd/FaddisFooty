import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Animated, Dimensions, FlatList, StatusBar, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import Button from '../components/Button';
import { fetchDrills } from '../utils/fetch';

const PaginationDots = ({ data, activeIndex }) => {
    return (
        <View style={styles.paginationContainer}>
            {data.map((_, index) => (
                <View key={index} style={index === activeIndex ? styles.activeDot : styles.inactiveDot}></View>
            ))}
        </View>
    );
};

const Train = () => {
    const { width, height } = Dimensions.get('window');
    const animation = useRef(new Animated.Value(0)).current;
    const searchBarRef = useRef(null);
    const [currentDrillPage, setCurrentDrillPage] = useState(0);
    const [currentFitnessPage, setCurrentFitnessPage] = useState(0);
    const [currentGymPage, setCurrentGymPage] = useState(0);
    const [currentNutritionPage, setCurrentNutritionPage] = useState(0);
    const [drills, setDrills] = useState([]);
    const drillsRef = useRef(null);


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
          description: 'This is an item description.',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
          description: 'This is an item description.',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
          description: 'This is an item description.',
        },
    ];

    useEffect(() => {
        getDrills();
    }, []);

    const getDrills = async () => {
        try{
            const drillsList = await fetchDrills();
            setDrills(drillsList);
        } catch (error) {
            console.error('Error fetching drills', error);
        }
    };

    const scrollToItem = (index) => {
        const offset = index * (width * 0.4);
        // console.log('scroll', offset);
        drillsRef.current.scrollToOffset({ animated: true, offset});
    };

    const findCurrentIndexOfItem = (event, section) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const currentIndex = Math.floor(contentOffset.x / (width * 0.4));
        // console.log('calculate', contentOffset.x, width * 0.3, currentIndex);
        if (section === 'drills') {
            setCurrentDrillPage(currentIndex);
        } else if (section === 'fitness') {
            setCurrentFitnessPage(currentIndex);
        } else if (section === 'gym') {
            setCurrentGymPage(currentIndex);
        } else if (section === 'nutrition') {
            setCurrentNutritionPage(currentIndex);
        }
    };

    const renderItem = ({ item, index }) => {
        const scale = new Animated.Value(1);
        const shadowOpacity = new Animated.Value(0);

        const handleFocus = (isFocused) => {
            Animated.parallel([
                Animated.spring(scale, {
                    toValue: isFocused ? 1.1 : 1,
                    useNativeDriver: true,
                }),
                Animated.timing(shadowOpacity, {
                    toValue: isFocused ? 0.2 : 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        };

        return (
            <Animated.View
                style={[
                    styles.card,
                    {
                        // width: index === 2 ? focusedItemWidth : itemWidth,
                        transform: [{ scale }],
                        shadowOpacity,
                    },
                ]}
                onFocus={() => handleFocus(true)}
                onBlur={() => handleFocus(false)}
            >
                <View>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text>{item.description}</Text>
                </View>
            </Animated.View>
        );
    };

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
                text='Fitness'
                // filled
                style={styles.category}
            />
            <Button
                text='Weights'
                // filled
                style={styles.category}
            />
            <Button
                text='Nutrition'
                // filled
                style={styles.category}
            />
        </View>

        <View>
            <ScrollView
                contentContainerStyle={{ paddingBottom: height*.15}} 
                showsVerticalScrollIndicator={false}
            >
                {/* Drills section */}
                <View style={styles.drills}>
                    <Text>Drills</Text>
                    <FlatList
                        data={drills}
                        ref={drillsRef}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        horizontal
                        // pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => findCurrentIndexOfItem(event, "drills")}
                        snapToInterval={width*.4}
                        decelerationRate="fast"
                        onMomentumScrollEnd={() => scrollToItem(currentDrillPage)}
                    >
                    </FlatList>
                    <PaginationDots 
                        data={drills}
                        activeIndex={currentDrillPage}
                    />
                </View>
                
                {/* Fitness section */}
                <View style={styles.drills}>
                    <Text>Fitness</Text>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => findCurrentIndexOfItem(event, "fitness")}
                    >
                    </FlatList>
                    <PaginationDots 
                        data={DATA}
                        activeIndex={currentFitnessPage}
                    />
                </View>

                {/* Weights section */}
                <View style={styles.drills}>
                    <Text>Weights</Text>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => findCurrentIndexOfItem(event, "gym")}
                    >
                    </FlatList>
                    <PaginationDots 
                        data={DATA}
                        activeIndex={currentGymPage}
                    />
                </View>

                {/* Nutrition section */}
                <View style={styles.drills}>
                    <Text>Nutrition</Text>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => findCurrentIndexOfItem(event, "nutrition")}
                    >
                    </FlatList>
                    <PaginationDots 
                        data={DATA}
                        activeIndex={currentNutritionPage}
                    />
                </View>
            </ScrollView>
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
        paddingBottom: 20,
        flexDirection: 'row'
    },
    category: {
        //TODO:
        // Fix the padding/margin issue for other phone sizes
        width: '22.5%',
        marginLeft: 7,
        borderRadius: 30,
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
    itemTitle: {
        fontWeight: 'bold',
        paddingBottom: 20,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    activeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#333',
        marginHorizontal: 5,
    },
    inactiveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
})

export default Train;