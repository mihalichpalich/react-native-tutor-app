import React from "react";
import styled from 'styled-components/native';
import {Text} from 'react-native';

import {GrayText, Button} from "../components";

const StudentScreen = () => {
    return (
        <Container>
            <StudentFullname>Марина Алмазова</StudentFullname>
            <GrayText>+79116969690</GrayText>
            <StudentButtons>
                <ProgramButton>Программа</ProgramButton>
                <Button color="green">P</Button>
            </StudentButtons>
        </Container>
    )
};

const ProgramButton = styled(Button)`
  flex: 1;
`;

const StudentButtons = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 20px;  
`;

const StudentFullname = styled.Text`
  margin-bottom: 3px;
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
`;

const Container = styled.View`
  padding: 25px;
`;

StudentScreen.navigationOptions = {
    title: "Данные студента",
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
};

export default StudentScreen;