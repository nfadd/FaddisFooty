import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import axios from 'axios';

const Login = ({ navigation }) => {
    const serv_addr = process.env.API_HOST || 'http://localhost:3000';
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role
    }

    const sendLoginDetails = async () => {
        try {
            const response = await axios.post(`${serv_addr}/api/users`, user);
            console.log('Login Successful:', response.data);
            navigation.navigate('NavBar', { userId: response.data.insertedId });
        } catch (err) {
            console.error('Error sending login details', err.response.data);
            throw err;
        }
    };

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, marginHorizontal: 22}}>
            <View style={{marginBottom: 12}}>
                <Text style={styles.title}>First Name</Text>

                <View style={styles.textbox}>
                    <TextInput 
                        placeholder='Enter your first name'
                        placeholderTextColor={COLORS.black}
                        value={firstName}
                        onChangeText={setFirstName}
                    >
                    </TextInput>
                </View>
            </View>

            <View style={{marginBottom: 12}}>
                <Text style={styles.title}>Last Name</Text>

                <View style={styles.textbox}>
                    <TextInput 
                        placeholder='Enter your last name'
                        placeholderTextColor={COLORS.black}
                        value={lastName}
                        onChangeText={setLastName}
                    >
                    </TextInput>
                </View>
            </View>

            <View style={{marginBottom: 12}}>
                <Text style={styles.title}>Email address</Text>

                <View style={styles.textbox}>
                    <TextInput 
                        placeholder='Enter your email address'
                        placeholderTextColor={COLORS.black}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                    >
                    </TextInput>
                </View>
            </View>

            <View style={{marginBottom: 12}}>
                <Text style={styles.title}>Password</Text>

                <View style={styles.textbox}>
                    <TextInput 
                        placeholder='Enter your password'
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={!isPasswordShown}
                        value={password}
                        onChangeText={setPassword}
                    >
                    </TextInput>

                    <TouchableOpacity 
                        onPress={() => setIsPasswordShown(!isPasswordShown)}
                        style={{
                            position: 'absolute',
                            right: 12
                        }}>
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name='eye-off' size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name='eye' size={24} color={COLORS.black} />
                                )
                            }
                    </TouchableOpacity>
                </View>
            </View>

            <Button
                text='Login'
                onPress={sendLoginDetails}
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

export default Login;