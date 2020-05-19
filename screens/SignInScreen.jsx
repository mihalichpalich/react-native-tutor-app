import React, {useState} from "react";
import styled from 'styled-components/native';
import {Text, View, Button} from 'react-native';
import { Item, Input, Label } from 'native-base';
import * as Google from 'expo-google-app-auth';

import {usersApi, programsApi, lessonsApi} from "../utils/api";

const SignInScreen = ({navigation}) => {
    const [values, setValues] = useState({
        email: '',
        googleID: ''
    });

    const onSubmit = async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                androidClientId: "588758140087-i1d4o42r9i56cbcdift9679trblfrtv8.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                setValues({
                    email: result.user.email,
                    googleID: result.user.id
                });
                usersApi.signIn(values).then(() => {
                    navigation.navigate('Home');
                }).catch(e => {
                    console.log(e);
                })
            } else {
                console.log('cancelled');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <SignInContainer>
            <Button title="Войти с помощью Google" onPress={onSubmit}/>
        </SignInContainer>
    )
};

const SignInContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #fff;
`;

const SignInHeader = styled.Text`
    font-size: 25px;
`;


SignInScreen.navigationOptions = {
    title: "Вход",
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
};

export default SignInScreen;
