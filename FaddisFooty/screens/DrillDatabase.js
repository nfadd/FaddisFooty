import { View, Text, TextInput, StyleSheet, SafeAreaView, StatusBar, Dimensions, FlatList, Animated, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import COLORS from '../constants/colors';
import { fetchDrills } from '../utils/fetch';
import { Ionicons } from '@expo/vector-icons';

const DrillDatabase = ({ navigation }) => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

    const searchAnimation = useRef(new Animated.Value(0)).current;
    const searchBarRef = useRef(null);
    const [drills, setDrills] = useState([]);

    const onSearch = () => {
        Animated.spring(searchAnimation, {
            toValue: screenWidth * 1,
            useNativeDriver: true,
        }).start();
        searchBarRef.current.focus();
    };

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

    const renderItem =  (item, index, currentPage, section) => {
      // const animatedWidth = new Animated.Value(screenWidth * 0.6);
      // const animatedScale = new Animated.Value(1);

      // if (section === activeSection && index === currentPage) {
      //     animate(animatedWidth, animatedScale);
      // }

      // return (
      //     <Animated.View
      //         style={{
      //                 ...styles.card,
      //                 transform: [{ scale: animatedScale }],
      //         }}
      //     >
      //         <View>
      //             <Text style={styles.itemTitle}>{item.title}</Text>
      //             <Text>{item.description}</Text>
      //         </View>
      //     </Animated.View>
      // );

      return (
        <View style={styles.card}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
        </View>
      );
  };

    return (
      <SafeAreaView style={{
          flex: 1, 
          marginTop: StatusBar.currentHeight || 0,
          backgroundColor: COLORS.white
        }}
      >
        <View>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack(null)}
            >
                <Ionicons 
                    name='arrow-back' 
                    size={24} 
                    color={COLORS.primary}
                />
            </TouchableOpacity>
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

        <FlatList
            data={drills}
            renderItem={({ item, index }) => renderItem(item, index)}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cardContainer}
        >
        </FlatList>
      </SafeAreaView>
    )
};

export default DrillDatabase;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  backButton: {
      position: 'absolute',
      alignSelf: 'flex-start',
      left: '5%',
      marginTop: '3%',
  },
  textbox: {
      width: '70%',
      height: 48,
      borderColor: COLORS.primary,
      borderWidth: 1,
      borderRadius: 30,
      alignSelf: 'center',
      justifyContent: 'center',
      paddingLeft: 22,
      backgroundColor: COLORS.white,
  },
  search: {
      position: 'absolute',
      alignSelf: 'flex-end',
      right: '5%',
      marginTop: '3%',
  },
  cardContainer: {
      paddingVertical: 20,
  },
  card: {
      width: screenWidth * 0.9,
      height: screenHeight * 0.2,
      padding: 20,
      marginBottom: 20,
      borderColor: COLORS.primary,
      borderWidth: 1,
      borderRadius: 10,
      alignSelf: 'center',
  },
  itemTitle: {
      fontWeight: 'bold',
      paddingBottom: 20,
  },
})