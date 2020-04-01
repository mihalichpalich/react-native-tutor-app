import React from "react";
import styled from 'styled-components/native';
import {View, Text} from 'react-native';
import {Foundation, MaterialIcons, Ionicons} from '@expo/vector-icons';

import {GrayText, Button, Badge, Container} from "../components";

const StudentScreen = ({navigation, index}) => {
    return (
        <View style={{flex: 1}}>
            <StudentDetails>
                <StudentFullname>{navigation.getParam('user', {}).fullname}</StudentFullname>
                <GrayText>{navigation.getParam('user', {}).phone}</GrayText>

                <StudentButtons>
                    <ProgramButtonView>
                        <Button>Программа</Button>
                    </ProgramButtonView>

                    <PhoneButtonView>
                        <Button color="#84d269">
                            <Foundation name="telephone" size={22} color="white"/>
                        </Button>
                    </PhoneButtonView>
                </StudentButtons>
            </StudentDetails>

            <StudentLessons>
                <Container>
                    <LessonCard>
                        <MoreButton>
                            <Ionicons name="md-more" size={24} color="rgba(0, 0, 0, 0.4)"/>
                        </MoreButton>

                        <LessonCardRow>
                            <MaterialIcons name="school" size={16} color="#a3a3a3"/>
                            <LessonCardLabel><Text style={{fontWeight: '800'}}>Занятие {index}</Text></LessonCardLabel>
                        </LessonCardRow>

                        <LessonCardRow>
                            <Foundation name="clipboard-notes" size={16} color="#a3a3a3"/>
                            <LessonCardLabel>Базы данных</LessonCardLabel>
                        </LessonCardRow>

                        <LessonCardRow style={{marginTop: 15, justifyContent: 'space-between'}}>
                            <Badge style={{width: 150}} active>11.10.2019 - 15:40</Badge>
                        </LessonCardRow>
                    </LessonCard>
                </Container>
            </StudentLessons>
        </View>
    )
};

const MoreButton = styled.TouchableOpacity`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 15px;
  top: 10px;
`;

const LessonCardLabel = styled.Text`
  margin-left: 10px;
  font-size: 16px;
`;

const LessonCardRow = styled.View`
  margin-top: 3.5px;
  margin-bottom: 3.5px;
  flex-direction: row;
  align-items: center;
`;

const LessonCard = styled.View`
  padding: 20px 25px;
  background: white;
  border-radius: 10px;
  shadow-color: gray;
  shadow-opacity: 0.4;
  shadow-radius: 10;
  elevation: 0.5;
`;

const StudentDetails = styled(Container)`
  flex: 0.3%;
`;

const StudentLessons = styled.View`
  flex: 1;
  background: #f8fafd;
`;

const ProgramButtonView = styled.View`
  flex: 1;
`;

const PhoneButtonView = styled.View`
  width: 45px;
  margin-left: 10px;
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

StudentScreen.navigationOptions = {
    title: "Данные студента",
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
};

export default StudentScreen;
