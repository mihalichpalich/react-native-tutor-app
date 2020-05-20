import React, {useState, useEffect} from "react";
import styled from 'styled-components/native';
import {Button} from 'react-native';
import * as Google from 'expo-google-app-auth';

import {usersApi, programsApi, lessonsApi} from "../utils/api";

const SignInScreen = ({navigation}) => {
    const onSubmit = async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                androidClientId: "588758140087-i1d4o42r9i56cbcdift9679trblfrtv8.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                usersApi.signIn(
                        {
                            email: result.user.email,
                            googleID: result.user.id
                        }
                    ).then((res) => {
                        if (res.status === 201 || res.status === 500) {
                            usersApi.getByEmail(result.user.email).then(({data}) => {
                                const userId = data.data.user._id;

                                programsApi.get(userId).then(({data}) => {
                                    if (data.data.length == 0) {
                                        navigation.navigate('Program', {user: userId});
                                    } else {
                                        lessonsApi.get(userId).then(({data}) => {
                                            if (data.data.length == 0) {
                                                navigation.navigate('Students', {user: userId});
                                            } else {
                                                navigation.navigate('Home', {user: userId});
                                            }
                                        })
                                        .catch(e => {
                                            console.log(e);
                                        });
                                    }
                                })
                                .catch(e => {
                                    console.log(e);
                                });
                            })
                            .catch(e => {
                                console.log(e);
                            });
                        }
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

SignInScreen.navigationOptions = {
    headerShown: false
};

export default SignInScreen;
