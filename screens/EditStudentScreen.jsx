import React, {useState} from "react";
import styled from 'styled-components/native';
import {Text} from 'react-native';
import { Item, Input, Label } from 'native-base';

import {Button, Container} from '../components';
import {studentsApi} from "../utils/api";

const EditStudentScreen = ({navigation}) => {
    const [values, setValues] = useState({
        'fullname': navigation.getParam('fullname'),
        'phone': navigation.getParam('phone')
    });

    const handleChange = (name, e) => {
        const text = e.nativeEvent.text;

        setValues({
            ...values,
            [name]: text
        });
    };

    const onSubmit = () => {
        const studentId = navigation.getParam('_id');

        studentsApi.update(studentId, values).then(() => {
            navigation.navigate('Home');
        })
        .catch(e => {
            alert('BAD');
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
                    clearButtonMode
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
                    clearButtonMode style={{marginTop: 12}}
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
