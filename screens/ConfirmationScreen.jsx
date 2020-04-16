import React, {useEffect, useState} from "react";
import styled from 'styled-components/native';
import {Text} from 'react-native';
import { Item, Input } from 'native-base';

import {Button, Container} from '../components';
import {usersApi} from "../utils/api";

const ConfirmationScreen = ({navigation}) => {
    const [code, setCode] = useState([]);

    const [values, setValues] = useState({
        confirmation_code: ''
    });

    useEffect(() => {
        const id = navigation.getParam('user')._id;

        usersApi.getConfirmCode(id).then(({data}) => {
            setCode(data);
        }).catch((e) => {
            console.log(e);
        });
    }, []);

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
        const id = navigation.getParam('user')._id;

        if (code === values.confirmation_code) {
            usersApi.confirm(id).then(({data}) => {
                navigation.navigate('Login');
            }).catch((e) => {
                console.log(e);
            });
        } else {
            alert('Введен неправильный код подтверждения');
        }
    };

    return (
        <Container>
            <ConfirmationText>Введите код подтверждения регистрации:</ConfirmationText>

            <Item style={{marginTop: 20, marginLeft: 0}}>
                <Input
                    onChange={handleInputChange.bind(this, 'confirmation_code')}
                    value={values.confirmation_code}
                    autoFocus
                    style={{marginTop: 12}}
                />
            </Item>

            <ButtonView>
                <Button onPress={onSubmit} color="#87CC6F">
                    <Text>Подтвердить</Text>
                </Button>
            </ButtonView>
        </Container>
    )
};

const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

const ConfirmationText = styled.Text`
  font-size: 16px;
`;

ConfirmationScreen.navigationOptions = {
    title: "Подтверждение регистрации",
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
};

export default ConfirmationScreen;
