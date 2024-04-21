import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import axios from 'axios';

const Register = ({ navigation }) => {
    const serv_addr = process.env.API_HOST || 'http://localhost:3000';
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isRegisterClicked, setIsRegisterClicked] = useState(false);

    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role
    };

    useEffect(() => {
        validateForm();
    }, [firstName, lastName, email, password, confirmedPassword, role]);

    const validateForm = () => {
        let errors = {};

        if (!firstName) {
            errors.firstName = '*First name is required';
        }

        if (!lastName) {
            errors.lastName = '*Last name is required';
        }

        if (!email) {
            errors.email = '*Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = '*Invalid email';
        }

        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        if (!password) {
            errors.password = '*Password is required';
        } else if (password.length < minLength) {
            errors.password = '*Password must be at least 8 characters';
        } else if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSymbol) {
            errors.password = '*Password must include at least one:\n- uppercase letter\n- lowercase letter\n- number\n- special character';
        }

        if (!confirmedPassword) {
            errors.confirmedPassword = '*Confirmation is required';
        }

        if (password !== confirmedPassword) {
            errors.confirmedPassword = '*Passwords do not match';
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    const sendRegisterDetails = async () => {
        setIsRegisterClicked(true);

        if (isFormValid) {
            try {
                const response = await axios.post(`${serv_addr}/api/register`, user);
                console.log('Registration Successful:', response.data);
                navigation.navigate('NavBar', { userId: response.data.insertedId });
            } catch (err) {
                console.error('Error sending registration details', err.response.data);
                throw err;
            }
        } else {
            console.log('Unfilled registration information');
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
                {isRegisterClicked && errors.firstName && (
                    <Text style={styles.error}>{errors.firstName}</Text>
                )}
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
                {isRegisterClicked && errors.lastName && (
                    <Text style={styles.error}>{errors.lastName}</Text>
                )}
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
                {isRegisterClicked && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                )}
            </View>

            <View style={{marginBottom: 12}}>
                <Text style={styles.title}>Password</Text>

                <View style={styles.textbox}>
                    <TextInput 
                        placeholder='Enter your password'
                        placeholderTextColor={COLORS.black}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        onEndEditing={({ nativeEvent }) => {
                            // Update the password state with the latest value from nativeEvent
                            setPassword(nativeEvent.text || '');
                        }}
                        secureTextEntry={!isPasswordShown}
                    >
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
                {isRegisterClicked && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                )}
            </View>

            <View style={{marginBottom: 12}}>
                <Text style={styles.title}>Confirm Password</Text>

                <View style={styles.textbox}>
                    <TextInput 
                        placeholder='Confirm your password'
                        placeholderTextColor={COLORS.black}
                        value={confirmedPassword}
                        onChangeText={text => setConfirmedPassword(text)}
                        secureTextEntry={true}>
                    </TextInput>
                </View>
                {isRegisterClicked && confirmedPassword && (
                    <Text style={styles.error}>{errors.confirmedPassword}</Text>
                )}
            </View>

            <Button
                text='Register'
                onPress={sendRegisterDetails}
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
    },
    error: {
        fontSize: 14,
        color:'red',
        marginVertical: 2
    }
})

export default Register;