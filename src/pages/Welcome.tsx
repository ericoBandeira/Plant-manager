import React, { useState } from 'react';
import { Text, SafeAreaView, Image, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../styles/colors';

import { Button } from '../components/Button';

import wateringImg from '../assets/watering.png'


export function Welcome(){
    const [visible, setVisible] = useState(false);

    function handleVisibility(){
        setVisible(true);
    }
    return(
        <SafeAreaView style={style.container}>
            <Text style={style.title}>
                Gerencie {'\n'} suas plantas {'\n'} de forma fácil
            </Text>

            <Image source={wateringImg} style={style.image} />

            <Text style={style.subtitle}>
                Não esqueça mais de regar suas plantas. 
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>
            <Button title="Go" onPress={handleVisibility}/>

        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        margin:30,
        marginTop:38
    },
    subtitle:{
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        margin:30,
        color: colors.heading
    },
    image:{
        width: 292,
        height:284
    }
});