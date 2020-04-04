import React, {useEffect, useState} from "react";
import styled from 'styled-components/native';
import {View, Text, ActivityIndicator, Linking, Alert} from 'react-native';
import {Foundation, MaterialIcons, Ionicons} from '@expo/vector-icons';

import {GrayText, Button, Badge, Container, PlusButton} from "../components";
import {studentsApi, phoneFormat, lessonsApi} from "../utils";

const StudentScreen = ({navigation, index}) => {
    const [lessons, setLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const id = navigation.getParam('student')._id;
        studentsApi.show(id).then(({data}) => {
            setLessons(data.data.lessons);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });
    }, []);

    const removeLesson = id => {
        Alert.alert(
          'Удаление урока',
          'Вы действительно хотите удалить урок?',
          [
            {text: 'Отмена', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Удалить', onPress: () => {
                    setIsLoading(true);

                    lessonsApi.remove(id).then(() => {
                        const id = navigation.getParam('student')._id;
                        studentsApi.show(id).then(({data}) => {
                            setLessons(data.data.lessons);
                            setIsLoading(false);
                        }).catch(() => {
                            setIsLoading(false);
                        });
                    }).catch(() => {
                        setIsLoading(false);
                    });
                }
            },
          ],
          { cancelable: false }
        );
    };

    return (
        <View style={{flex: 1}}>
            <StudentDetails>
                <StudentFullname>{navigation.getParam('student', {}).fullname}</StudentFullname>
                <GrayText>{phoneFormat(navigation.getParam('student', {}).phone)}</GrayText>

                <StudentButtons>
                    <ProgramButtonView>
                        <Button>Программа</Button>
                    </ProgramButtonView>

                    <PhoneButtonView>
                        <Button onPress={() => Linking.openURL('tel:' + navigation.getParam('student', {}).phone)} color="#84d269">
                            <Foundation name="telephone" size={22} color="white"/>
                        </Button>
                    </PhoneButtonView>
                </StudentButtons>
            </StudentDetails>

            <StudentLessons>
                <Container>
                    {isLoading ? <ActivityIndicator size="large" color="#2A86FF"/> : lessons.map(lesson => {
                            return(
                                <LessonCard key={lesson._id}>
                                    <MoreButton onPress={removeLesson.bind(this, lesson._id)}>
                                        <Ionicons name="md-close" size={24} color="red"/>
                                    </MoreButton>

                                    {/*<LessonCardRow>*/}
                                        {/*<MaterialIcons name="school" size={16} color="#a3a3a3"/>*/}
                                        {/*<LessonCardLabel><Text*/}
                                            {/*style={{fontWeight: '800'}}>Занятие {index}</Text></LessonCardLabel>*/}
                                    {/*</LessonCardRow>*/}

                                    <LessonCardRow>
                                        <Foundation name="clipboard-notes" size={16} color="#a3a3a3"/>
                                        <LessonCardLabel>{lesson.unit}</LessonCardLabel>
                                    </LessonCardRow>

                                    <LessonCardRow style={{marginTop: 15, justifyContent: 'space-between'}}>
                                        <Badge style={{width: 150}} active>{lesson.date} - {lesson.time}</Badge>
                                    </LessonCardRow>
                                </LessonCard>
                            )
                        }
                    )}
                </Container>
            </StudentLessons>
            <PlusButton onPress={
                    navigation.navigate.bind(this, 'AddLesson',
                    {studentId: navigation.getParam('student', {})._id})
                }
            />
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
  margin-bottom: 20px;
  background: white;
  border-radius: 10px;
  shadow-color: gray;
  shadow-opacity: 0.4;
  shadow-radius: 10;
  elevation: 0.5;
`;

const StudentDetails = styled(Container)`
  flex: 0.3;
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
