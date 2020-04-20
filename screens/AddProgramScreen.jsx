import React, {useState} from "react";
import styled from 'styled-components/native';
import {Text} from 'react-native';
import { Item, Input, Label } from 'native-base';

import {Button, Container} from '../components';
import {programsApi} from "../utils/api";

const AddProgramScreen = ({navigation}) => {
    const [values, setValues] = useState({
        name: '',
        user: ''
    });

    const handleChange = (name, e) => {
        const text = e.nativeEvent.text;

        setValues({
            name: text,
            user: navigation.state.params.user
        });
    };

    const onSubmit = () => {
        programsApi.add(values).then(() => {
            navigation.navigate('Program', {user: values.user});
        }).catch(() => {
            alert(`Ошибка! Программа с таким названием уже существует`);
        })
    };

    return (
        <Container>
            <Item style={{marginLeft: 0}} floatingLabel>
                <Label>Название программы</Label>
                <Input
                    onChange={handleChange.bind(this, 'name')}
                    value={values.fullname}
                    autoFocus
                    style={{marginTop: 12}}
                />
            </Item>

            <ButtonView>
                <Button onPress={onSubmit} color="#87CC6F">
                    <Text>Добавить программу</Text>
                </Button>
            </ButtonView>
        </Container>
    )
};

const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

AddProgramScreen.navigationOptions = {
    title: "Добавить программу",
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
};

export default AddProgramScreen;
