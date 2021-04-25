import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    Platform,
    Image,
    Alert
} from 'react-native';
import { Button } from '../components/Button';
import {Feather} from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function newPhoto(){

    const [image, setImage] = useState('');


    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Desculpa, precisamos da permissão para usar essa função 😢');
            }
          }
        })();
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        
        
        console.log(result);
    
        if (!result.cancelled) {
            await setImage(result.uri);
        }
      };


    const navigation = useNavigation();

    async function handleUserIdentification(){
        navigation.navigate('UserIdentification')

        try{

            await AsyncStorage.setItem('@plantmanager:userImg', image);
            
            navigation.navigate('UserIdentification')

        }catch{
            Alert.alert('Não foi possível salvar a sua foto 😢')
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                
                <Text style={styles.emoji}>
                    🤭
                </Text>

                <Text style={styles.title}>
                    Me mostra você! 
                </Text>

            </View>

            <View>
                {(image!=='')&&
                    <>
                    <TouchableOpacity onPress={pickImage}>
                        <Image 
                            source={{ uri: image }} 
                            style={styles.imageInput} 
                        /> 
                    </TouchableOpacity>
                    <Text style={ styles.imgText }> Clique na foto para alterar</Text>
                    </>
                }
                {!image &&
                    <TouchableOpacity style={styles.buttonIcon} onPress={pickImage} >
                        <Feather name="user" style={styles.buttonText}/>
                    </TouchableOpacity>
                }
                
            </View>

           

            <View style={styles.footer}>
                <Button
                    title={"Confirmar"}
                    onPress={handleUserIdentification}
                />
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        height: 56,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 30
    },
    footer:{
        marginTop: 40,
        width: '100%',
        paddingHorizontal:20
    },
    header:{
        alignItems: 'center',
    },
    title:{
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    buttonIcon:{
        backgroundColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        height: 100,
        width: 100

    },imageInput:{
        width: 200, 
        height: 200,
        borderRadius: 100 
    },buttonText:{
        alignItems:'center',
        justifyContent:'center',
        fontSize: 40,
        color: colors.white
    },
    imgText:{
        color: colors.heading,
        textAlign:'center',
        fontFamily: fonts.heading,
        fontSize: 16,
        marginTop: 15
    },
    emoji:{
        fontSize: 44
    }
})