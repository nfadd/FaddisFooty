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
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

    const searchAnimation = useRef(new Animated.Value(0)).current;
    const searchBarRef = useRef(null);
    const [activeSection, setActiveSection] = useState("drills");
    const [currentDrillPage, setCurrentDrillPage] = useState(0);
    const [currentFitnessPage, setCurrentFitnessPage] = useState(0);
    const [currentWeightsPage, setCurrentWeightsPage] = useState(0);
    const [currentNutritionPage, setCurrentNutritionPage] = useState(0);
    const [drills, setDrills] = useState([]);
    const scrollViewRef = useRef(null);
    const drillsRef = useRef(null);
    const fitnessRef = useRef(null);
    const weightsRef = useRef(null);
    const nutritionRef = useRef(null);


    const onSearch = () => {
        Animated.spring(searchAnimation, {
            toValue: screenWidth * 1,
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

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY < screenHeight * (0.515 / 2)) {
            setActiveSection("drills");
        } else if (offsetY >= screenHeight * (0.515 / 2) && offsetY < screenHeight * (0.515 + (0.515 / 3))) {
            setActiveSection("fitness");
        } else if (offsetY >= screenHeight * (0.515 + (0.515 / 3)) && offsetY < screenHeight * (1.0275 + (1.0275 / 4))) {
            setActiveSection("weights");
        } else {
            setActiveSection("nutrition");
        }
    };

    const scrollToItem = (index) => {
        const itemWidth = screenWidth * 0.6 + 20;
        const offset = index * itemWidth;
        // const offset = index * itemWidth - (screenWidth / 2) + itemWidth / 2;
        // console.log('scroll', offset);
        drillsRef.current.scrollToOffset({ animated: true, offset});
    };

    const scrollToSection = (ref, section) => {
        switch (section) {
            case "drills":
                ref.current.scrollTo({ animated: true, y: 0 });
                break;
            case "fitness":
                ref.current.scrollTo({ animated: true, y: screenHeight * 0.515 });
                break;
            case "weights":
                ref.current.scrollTo({ animated: true, y: screenHeight * 1.0275 });
                break;
            case "nutrition":
                ref.current.scrollToEnd({ animated: true });
                break;
            default:
                break;
        }
    };

    const findCurrentIndexOfItem = (event, section) => {
        const { contentOffset } = event.nativeEvent;
        const currentIndex = Math.floor(contentOffset.x / (screenWidth * 0.6 - 20));
        switch (section) {
            case "drills":
                setCurrentDrillPage(currentIndex);
                break;
            case "fitness":
                setCurrentFitnessPage(currentIndex);
                break;
            case "weights":
                setCurrentWeightsPage(currentIndex);
                break;
            case "nutrition":
                setCurrentNutritionPage(currentIndex);
                break;
            default:
                break;
        }
    };

    const animate = (animatedWidth, animatedScale) => {
        Animated.spring(animatedWidth, {
            toValue: screenWidth * 0.7,
            useNativeDriver: true,
        }).start();
        Animated.spring(animatedScale, {
            toValue: 1.1,
            useNativeDriver: true,
        }).start();
    }

    const renderItem =  (item, index, ref, currentPage, setCurrentPage) => {
        const animatedWidth = new Animated.Value(screenWidth * 0.6);
        const animatedScale = new Animated.Value(1);

        // if (section === "drills" && index === currentDrillPage) {
        //     animate(animatedWidth, animatedScale);
        // } else if (section === "fitness" && index === currentFitnessPage) {
        //     animate(animatedWidth, animatedScale);
        // } else if (section === "weights" && index === currentWeightsPage) {
        //     animate(animatedWidth, animatedScale);
        // } else if (section === "nutrition" && index === currentNutritionPage) {
        //     animate(animatedWidth, animatedScale);
        // }

        if (index === currentPage) {
            animate(animatedWidth, animatedScale);
        }


        return (
            <Animated.View
                style={{
                        ...styles.card,
                        transform: [{ scale: animatedScale }],
                }}
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
                filled={activeSection === "drills" ? false : true}
                style={styles.category}
                onPress={() => scrollToSection(scrollViewRef, "drills")}
            />
            <Button
                text='Fitness'
                filled={activeSection === "fitness" ? false : true}
                style={styles.category}
                onPress={() => scrollToSection(scrollViewRef, "fitness")}
            />
            <Button
                text='Weights'
                filled={activeSection === "weights" ? false : true}
                style={styles.category}
                onPress={() => scrollToSection(scrollViewRef, "weights")}
            />
            <Button
                text='Nutrition'
                filled={activeSection === "nutrition" ? false : true}
                style={styles.category}
                onPress={() => scrollToSection(scrollViewRef, "nutrition")}
            />
        </View>

        <View>
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ paddingBottom: screenHeight*.15}} 
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {/* Drills section */}
                <View style={styles.drills}>
                    <Text>Drills</Text>
                    <FlatList
                        data={drills}
                        ref={drillsRef}
                        renderItem={({ item, index }) => renderItem(item, index, drillsRef, currentDrillPage)}
                        keyExtractor={(item) => item._id}
                        horizontal
                        // pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => findCurrentIndexOfItem(event, "drills")}
                        snapToInterval={screenWidth * 0.6 + 20}
                        decelerationRate="fast"
                        onMomentumScrollEnd={() => scrollToItem(currentDrillPage)}
                        contentContainerStyle={styles.cardContainer}
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
                        ref={fitnessRef}
                        renderItem={({ item, index }) => renderItem(item, index, fitnessRef, currentFitnessPage)}
                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => findCurrentIndexOfItem(event, "fitness")}
                        contentContainerStyle={styles.cardContainer}
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
                        ref={weightsRef}
                        renderItem={({ item, index }) => renderItem(item, index, weightsRef, currentWeightsPage)}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => findCurrentIndexOfItem(event, "weights")}
                        contentContainerStyle={styles.cardContainer}
                    >
                    </FlatList>
                    <PaginationDots 
                        data={DATA}
                        activeIndex={currentWeightsPage}
                    />
                </View>

                {/* Nutrition section */}
                <View style={styles.drills}>
                    <Text>Nutrition</Text>
                    <FlatList
                        data={DATA}
                        ref={nutritionRef}
                        renderItem={({ item, index }) => renderItem(item, index, nutritionRef, currentNutritionPage)}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => findCurrentIndexOfItem(event, "nutrition")}
                        contentContainerStyle={styles.cardContainer}
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

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    textbox: {
        width: '80%',
        height: 48,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: 'center',
        paddingLeft: 22,
        marginLeft: 10,
        backgroundColor: COLORS.white,
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
    cardContainer: {
        paddingVertical: 20,
        paddingRight: 20
    },
    card: {
        width: screenWidth * 0.6,
        height: screenHeight * 0.4,
        padding: 20,
        marginLeft: 20,
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