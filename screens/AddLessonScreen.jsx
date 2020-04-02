import React, {useState} from "react";
import styled from 'styled-components/native';
import {Text, View} from 'react-native';
import { Item, Input, Label, DatePicker } from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Button, Container} from '../components';
import {studentsApi} from "../utils/api";

const AddLessonScreen = ({navigation}) => {
    const [values, setValues] = useState({});

    const handleChange = (name, e) => {
        const text = e.nativeEvent.text;

        setValues({
            ...values,
            [name]: text
        });
    };

    const onSubmit = () => {
        studentsApi.add(values).then(() => {
            navigation.navigate('Home');
        });
    };

    return (
        <Container>
            <Item style={{marginLeft: 0}} floatingLabel>
                <Label>Название урока</Label>
                <Input
                    onChange={handleChange.bind(this, 'unit')}
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

            <Item style={{marginTop: 20, marginLeft: 0}}>
                <TimeRow>
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        is24Hour="true"
                        display="default"
                    />
                </TimeRow>
            </Item>

            <ButtonView>
                <Button onPress={onSubmit} color="#87CC6F">
                    <Ionicons name="ios-add" size={24} color="white"/>
                    <Text>Добавить урок</Text>
                </Button>
            </ButtonView>
        </Container>
    )
};

const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

const TimeRow = styled.View`
  flex-direction: row;
`;

AddLessonScreen.navigationOptions = {
    title: "Добавить урок",
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
};

export default AddLessonScreen;
