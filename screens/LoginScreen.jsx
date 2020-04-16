import React, {useState} from "react";
import styled from 'styled-components/native';
import {Text, View} from 'react-native';
import { Item, Input, Label } from 'native-base';

import {Button, Container} from '../components';
import {usersApi} from "../utils/api";

const LoginScreen = ({navigation}) => {
    const [values, setValues] = useState({
        phone: '',
        password: ''
    });

    const fieldsName = {
        phone: 'Телефон',
        password: "Пароль"
    };

    const setFieldValue = (name, value) => {
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleInputChange = (name, e) => {
        const text = e.nativeEvent.text;
        setFieldValue(name, text)
    };

    const onSubmit = () => {
        usersApi.login(values).then((res) => {
            if (res.status === 404) {
                alert('Введен неправильный номер телефона или пароль');
            } else if (res.status === 200) {
                window.axios.defaults.headers.common['token'] = res.data.token;
                window.localStorage['token'] = res.data.token;

                usersApi
                    .getByPhone(values.phone)
                    .then(({data}) => {
                        navigation.navigate('Students', data.data);
                    }).catch(e => {
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

LoginScreen.navigationOptions = {
    title: "Вход",
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
};

export default LoginScreen;
