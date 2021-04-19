import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import colors from '../../styles/colors';

interface BunttonProps extends TouchableOpacityProps{
    title: string;
}

export function Button({ title }:BunttonProps) {
  return (
    <TouchableOpacity
    style={style.button} 
    activeOpacity={0.8}
    >
        <Text style = {style.buttonText}>
            {title}
        </Text>
    </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    button:{
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10, 
        height: 56,
        width:56
    },
    buttonText:{
        color: colors.white,
        fontSize: 20
    }
});