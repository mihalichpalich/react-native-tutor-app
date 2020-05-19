import React, {useState} from "react";
import styled from 'styled-components/native';
import {Text, View} from 'react-native';
import { Item, Input, Label } from 'native-base';
import * as Google from 'expo-google-app-auth';

import {Button, Container} from '../components';
import {usersApi, programsApi, lessonsApi} from "../utils/api";

const SignInScreen = ({navigation}) => {
    const [values, setValues] = useState({
        email: '',
        googleID: ''
    });

    const signIn = async function signInWithGoogleAsync() {
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
            } else {
                console.log('cancelled');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const onSubmit = () => {
        usersApi.login(values).then((res) => {
            if (res.status === 404) {
                alert('Введен неправильный номер телефона или пароль');
            } else if (res.status === 200) {
                usersApi
                    .getByPhone(values.phone)
                    .then(({data}) => {
                        const userId = data.data.user._id;

                        programsApi.get(userId)
                            .then(({data}) => {
                                if (data.data.length == 0) {
                                    navigation.navigate('Program', {user: userId});
                                } else {
                                    lessonsApi.get(userId)
                                        .then(({data}) => {
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
        })
            .catch(
                e => {
                    console.log(e);
                    if (e.response.data && e.response.data.message) {
                        e.response.data.message.forEach(err => {
                            console.log(err);

                            if (err.value === "") {
                                const fieldName = err.param;
                                alert(`Ошибка! Поле "${fieldsName[fieldName]}" пустое.`);
                            }
                        });
                    }
                }
            );
    };

    return (
        <Container>
            <Item style={{marginLeft: 0}} floatingLabel>
                <Label>Телефон</Label>
                <Input
                    onChange={handleInputChange.bind(this, 'phone')}
                    value={values.phone}
                    autoFocus
                    style={{marginTop: 12}}
                />
            </Item>

            <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                <Label>Пароль</Label>
                <Input
                    onChange={handleInputChange.bind(this, 'password')}
                    value={values.password}
                    secureTextEntry={true}
                    style={{marginTop: 12}}
                />
            </Item>

            <ButtonView>
                <Button onPress={onSubmit} color="#87CC6F">
                    <Text>Вход</Text>
                </Button>
            </ButtonView>

            <View style={{flex: 3}}>
                <RegisterLink onPress={navigation.navigate.bind(this, 'Registration')}>Зарегистрироваться</RegisterLink>
            </View>
        </Container>
    )
};

const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

const RegisterLink = styled.Text`
  text-align: center;
  font-size: 16px;
  color: dodgerblue;
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
