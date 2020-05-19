import React, {useState, useEffect} from "react";
import styled from 'styled-components/native';
import {Text, View} from 'react-native';
import { Item, Input, Label, Picker } from 'native-base';
import DatePicker from 'react-native-datepicker';

import {Button, Container} from '../components';
import {lessonsApi, programsApi} from "../utils/api";

const AddLessonScreen = ({navigation}) => {
    const [programNames, setProgramNames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [values, setValues] = useState({
        program_name: '',
        unit: '',
        date: null,
        time: null,
        rate_lesson: 0,
        rate_homework: 0,
        homework: '',
        student: navigation.getParam('studentId'),
        user: navigation.getParam('userId')
    });

    const fieldsName = {
        unit: 'Название урока',
        date: "Дата",
        time: "Время"
    };

    const fetchPrograms = () => {
        programsApi
            .get(values.user)
            .then(({ data }) => {
                data.data.map(res => {
                    programNames.push(res.name);
                });
                setProgramNames(programNames);
                setIsLoading(false);
            })
            .finally(e => {
                console.log(e);
                setIsLoading(false);
            });
    };

    useEffect(fetchPrograms, []);

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
        lessonsApi.add(values).then(() => {
            navigation.navigate('Home', {user: values.user});
        })
            .catch(e => {
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
            <Item style={{marginLeft: 0}} picker>
                <Picker
                    mode="dropdown"
                    style={{ width: '100%' }}
                    onValueChange={setFieldValue.bind(this, 'program_name')}
                    selectedValue={values.program_name}
                    placeholder="Выберите учебную программу"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                >
                    {(programNames && !isLoading) && (programNames.map(name => <Picker.Item label={name} value={name} key={name}/>))}
                </Picker>
            </Item>

            <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                <Label>Название урока</Label>
                <Input
                    onChange={handleInputChange.bind(this, 'unit')}
                    value={values.fullname}
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

            <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                <Label>Домашнее задание</Label>
                <Input
                    onChange={handleInputChange.bind(this, 'homework')}
                    value={values.homework}
                    style={{marginTop: 12}}
                />
            </Item>

            <ButtonView>
                <Button onPress={onSubmit} color="#87CC6F">
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
