import React, {useState} from "react";
import styled from 'styled-components/native';
import {Text} from 'react-native';
import { Item, Input, Label } from 'native-base';

import {Button, Container} from '../components';
import {usersApi} from "../utils/api";

const RegistrationScreen = ({navigation}) => {
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
        usersApi.registration(values).then(() => {
            usersApi
                .getByPhone(values.phone)
                .then(({data}) => {
                    navigation.navigate('Confirmation', data.data);
                }).catch(e => {
                console.log(e);
            });
        })
            .catch(e => {
                if (e.response.data.message.code === 11000) {
                    alert(`Пользователь с введенным номером телефона уже существует!`);
                }

                if (e.response.data && e.response.data.message) {
                    e.response.data.message.forEach(err => {
                        if (err.value === "") {
                            const fieldName = err.param;
                            alert(`Ошибка! Поле "${fieldsName[fieldName]}" пустое.`);
                        }

                        if (err.param === "phone") {
                            alert(`Ошибка! Введен неправильный телефон.`);
                        }

                        if (err.param === "password") {
                            alert(`Ошибка! Пароль должен содержать минимум 7 символов: только латинские буквы и цифры.`);
                        }
                    });
                }
            });
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
                    <Text>Регистрация</Text>
                </Button>
            </ButtonView>
        </Container>
    )
};

const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

RegistrationScreen.navigationOptions = {
    title: "Регистрация",
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
};

export default RegistrationScreen;
