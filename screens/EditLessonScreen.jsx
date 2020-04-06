import React, {useEffect, useState} from "react";
import styled from 'styled-components/native';
import {Text, View} from 'react-native';
import { Item, Input, Label } from 'native-base';
import DatePicker from 'react-native-datepicker';

import {Button, Container} from '../components';
import {lessonsApi} from "../utils/api";

const EditLessonScreen = ({navigation}) => {
    const [values, setValues] = useState({
        unit: navigation.getParam('unit'),
        date: navigation.getParam('date'),
        time: navigation.getParam('time')
    });

    const fieldsName = {
        unit: 'Название урока',
        date: "Дата",
        time: "Время"
    };

    const setFieldValue = (name, value) => {
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleInputChange = (name, e) => {
        const text = e.nativeEvent.text;
        setFieldValue(name, text);
    };

    const onSubmit = () => {
        lessonsApi.update(navigation.getParam('_id'), values).then(() => {
            navigation.navigate('Home', {lastUpdate: new Date()});
        })
            .catch(e => {
                if (e.response.data && e.response.data.message) {
                    e.response.data.message.forEach(err => {
                        const fieldName = err.param;
                        alert(`Ошибка! Поле "${fieldsName[fieldName]}" указано неверно.`);
                    });
                } else {
                    alert("биба");
                }
        });
    };

    return (
        <Container>
            <Item style={{marginLeft: 0}} floatingLabel>
                <Label>Название урока</Label>
                <Input
                    onChange={handleInputChange.bind(this, 'unit')}
                    value={values.unit}
                    clearButtonMode
                    style={{marginTop: 12}}
                />
            </Item>

            <Item style={{marginTop: 20, marginLeft: 0}}>
                <TimeRow>
                    <View style={{flex: 1}}>
                        <DatePicker
                            mode="date"
                            placeholder="Дата"
                            format="YYYY-MM-DD"
                            minDate={new Date()}
                            confirmBtnText="Сохранить"
                            cancelBtnText="Отмена"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0
                                },
                                dateText: {
                                    fontSize: 18
                                }
                            }}
                            date={values.date}
                            onDateChange={setFieldValue.bind(this, 'date')}
                          />
                    </View>
                    <View style={{flex: 1}}>
                        <DatePicker
                            mode="time"
                            placeholder="Время"
                            format="HH:mm"
                            minDate={new Date()}
                            confirmBtnText="Сохранить"
                            cancelBtnText="Отмена"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0
                                },
                                dateText: {
                                    fontSize: 18
                                }
                            }}
                            date={values.time}
                            onDateChange={setFieldValue.bind(this, 'time')}
                          />
                    </View>
                </TimeRow>
            </Item>

            <ButtonView>
                <Button onPress={onSubmit} color="#2A86FF">
                    <Text>Изменить урок</Text>
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

EditLessonScreen.navigationOptions = {
    title: "Изменить урок",
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
};

export default EditLessonScreen;
