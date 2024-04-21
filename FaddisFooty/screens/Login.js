import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { fetchUserEmail } from '../utils/fetch';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoginClicked, setIsLoginClicked] = useState(false);

    const user = {
        email: email,
        password: password,
    }

    useEffect(() => {
        validateForm();
    }, [email, password]);

    const validateForm = () => {
        let errors = {};
        
        if (!email) {
            errors.email = '*Email is required';
        }

        if (!password) {
            errors.password = '*Password is required';
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    const sendLoginDetails = async () => {
        setIsLoginClicked(true);

        if (isFormValid) {
            try {
                const response = await fetchUserEmail(user);
                if (response === '*Invalid email or password'){
                    setErrors({login: response});
                } else {
                    console.log('Login Successful');
                    navigation.navigate('NavBar', { userId: response._id });
                }
            } catch (err) {
                console.error('Error sending login details', err);
                throw err;
            }
        } else {
            console.log('Unfilled login information');
        }
    };

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, marginHorizontal: 22}}>
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
                {isLoginClicked && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                )}
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
                {isLoginClicked && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                )}
            </View>

            {isLoginClicked && errors.login && (
                <Text style={styles.error}>{errors.login}</Text>
            )}
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

export default Login;