import { View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import Button from '../components/Button';

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient style={{flex: 1}} colors={[COLORS.secondary, COLORS.primary]}>
        <View>
            <Text style={styles.title}>Welcome to Faddis Footy</Text>

            <View>
                <Button text='Login' 
                onPress={() => navigation.navigate('Login')}
                style={styles.button}></Button>

                <Button text='Register' 
                onPress={() => navigation.navigate('Register')}
                style={styles.button}></Button>
            </View>
        </View>
    </LinearGradient>
  )
};

const styles = {
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        position: 'relative',
        top: 100,
        color: COLORS.white,
    },
    button: {
        position: 'relative',
        top: 500,
        margin: 10,
    }
}

export default Welcome;