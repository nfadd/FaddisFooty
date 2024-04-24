import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';

const Button = (props) => {

  const filledBgColor = props.color || COLORS.primary;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : COLORS.primary;
  const buttonShadow = props.shadow ? {
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  } : null;

  return (
    <TouchableOpacity style={{
        ...styles.button,
        ...{backgroundColor: bgColor},
        ...buttonShadow,
        ...props.style
        }} 
        onPress={props.onPress}>
        <Text style={{...styles.buttonText, ...{color: textColor}}}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
    }
});

export default Button;