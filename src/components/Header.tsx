import React , {useEffect, useState}from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import userImg from '../assets/perfilImg.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultImg from '../assets/defaultImg.png'

export function Header(){
    const[userName, setUserName] = useState<string>();
    const[userImage, setUserImage] = useState('');

    useEffect(()=>{
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }

        async function loadStorageUserImg() {
            const image = await AsyncStorage.getItem('@plantmanager:userImg');

            setUserImage(image || '');
        }

        loadStorageUserName();
        loadStorageUserImg();
    },[userName, userImage]);

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            {
                (userImage==='') ? (
                    <Image style={styles.image} source={defaultImg}/>
                ):(
                    <Image style={styles.image} source={{uri: userImage}}/>
                )
            }
                 
        </View>
    );
}

const styles = StyleSheet.create({

    container:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical:20,
        marginTop: getStatusBarHeight()
    },
    greeting:{
        fontSize:32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName:{
        fontSize:32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    },
    image:{
        width:70,
        height:70,
        borderRadius: 35
    }
});