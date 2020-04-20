import React, {useState} from "react";
import styled from 'styled-components/native';
import {Text} from 'react-native';
import { Item, Input, Label } from 'native-base';

import {Button, Container} from '../components';
import {studentsApi} from "../utils/api";

const EditStudentScreen = ({navigation}) => {
    const [values, setValues] = useState({
        fullname: navigation.getParam('fullname'),
        phone: navigation.getParam('phone'),
        user: ''
    });

    const handleChange = (name, e) => {
        const text = e.nativeEvent.text;

        setValues({
            ...values,
            [name]: text,
            user: navigation.getParam('user')
        });
    };

    const fieldsName = {
        fullname: 'Имя и фамилия',
        phone: "Номер телефона"
    };

    const onSubmit = () => {
        const studentId = navigation.getParam('_id');

        studentsApi.update(studentId, values).then(() => {
            navigation.navigate('Students', {user: values.user});
        })
        .catch(e => {
            if (e.response.data.message.code === 11000) {
                alert(`Студент с введенным номером телефона уже существует!`);
            }

            if (e.response.data && e.response.data.message) {
                e.response.data.message.forEach(err => {
                    const fieldName = err.param;
                    alert(`Ошибка! Поле "${fieldsName[fieldName]}" пустое либо содержит недостаточно символов.`);
                });
            }
        });
    };

    return (
        <Container>
            <Item style={{marginLeft: 0}} floatingLabel>
                <Label>Имя и фамилия</Label>
                <Input
                    onChange={handleChange.bind(this, 'fullname')}
                    value={values.fullname}
                    autoFocus
                    style={{marginTop: 12}}
                />
            </Item>

            <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                <Label>Номер телефона</Label>
                <Input
                    onChange={handleChange.bind(this, 'phone')}
                    value={values.phone}
                    keyboardType="numeric"
                    dataDetectorTypes="phoneNumber"
                    style={{marginTop: 12}}
                />
            </Item>

            <ButtonView>
                <Button onPress={onSubmit} color="#2A86FF">
                    <Text>Изменить студента</Text>
                </Button>
            </ButtonView>
        </Container>
    )
};

const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

EditStudentScreen.navigationOptions = {
    title: "Изменить студента",
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
};

export default EditStudentScreen;
