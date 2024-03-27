import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';

const Register = () => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, marginHorizontal: 22}}>
            <View style={{marginBottom: 12}}>
                <Text style={styles.title}>Email address</Text>

                <View style={styles.textbox}>
                    <TextInput 
                        placeholder='Enter your email address'
                        placeholderTextColor={COLORS.black}
                        keyboardType='email-address'>
                    </TextInput>
                </View>
            </View>

            <View style={{marginBottom: 12}}>
                <Text style={styles.title}>Password</Text>

                <View style={styles.textbox}>
                    <TextInput 
                        placeholder='Enter your password'
                        placeholderTextColor={COLORS.black}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={!isPasswordShown}>
                    </TextInput>

                    <TouchableOpacity 
                        onPress={() => setIsPasswordShown(!isPasswordShown)}
                        style={{
                            position: 'absolute',
                            right: 12
                        }}>
                            {
                                isPasswordShown === true ? (
                                    <Ionicons name='eye-off' size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name='eye' size={24} color={COLORS.black} />
                                )
                            }
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{marginBottom: 12}}>
                <Text style={styles.title}>Confirm Password</Text>

                <View style={styles.textbox}>
                    <TextInput 
                        placeholder='Confirm your password'
                        placeholderTextColor={COLORS.black}
                        onChangeText={text => setConfirmedPassword(text)}
                        secureTextEntry={true}>
                    </TextInput>
                    {
                        password !== confirmedPassword ? (
                            <Text style={{color:'red'}}>Passwords do not match</Text>
                        ) : null
                    }
                </View>
            </View>

            <Button
                text='Register'
                filled
                style={{
                    marginTop: 18,
                    marginBottom: 4
                }}
            >
            </Button>
        </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    textbox: {
        width: '100%',
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        // alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 22
    },
    title: {
        fontSize: 16,
        fontWeight: 400,
        marginVertical: 8
    }
})

export default Register;