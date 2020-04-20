import React, {useEffect, useState} from "react";
import styled from 'styled-components/native';
import dayjs from 'dayjs';
import {View, ActivityIndicator, Linking, Alert, ScrollView} from 'react-native';
import {Foundation, Ionicons} from '@expo/vector-icons';

import {GrayText, Button, Badge, Container} from "../components";
import {studentsApi, lessonsApi, dateReverse} from "../utils";

const StudentScreen = ({navigation}) => {
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
                <GrayText>{navigation.getParam('student', {}).phone}</GrayText>

                <StudentButtons>
                    <ProgramButtonView>
                        <Button onPress={
                                    navigation.navigate.bind(this, 'AddLesson',
                                        {
                                            studentId: navigation.getParam('student', {})._id,
                                            userId: navigation.getParam('user')
                                        }
                                    )
                                }
                        >Добавить урок</Button>
                    </ProgramButtonView>

                    <PhoneButtonView>
                        <Button onPress={() => Linking.openURL('tel:' + navigation.getParam('student', {}).phone)} color="#84d269">
                            <Foundation name="telephone" size={22} color="white"/>
                        </Button>
                    </PhoneButtonView>
                </StudentButtons>
            </StudentDetails>

            <StudentLessons>
                <ScrollView>
                    <Container>
                        {isLoading ? <ActivityIndicator size="large" color="#2A86FF"/> : lessons.map(lesson => {
                                Date.prototype.addHours= function(h){
                                    this.setHours(this.getHours()+h);
                                    return this;
                                };

                                let dateNow = dayjs(new Date()).format("YYYY-MM-DD");
                                let timeNow = dayjs(new Date()).format("HH:mm");
                                let badgeActive = false;

                                if (lesson.date === dateNow) {
                                    if (lesson.time >= timeNow) {
                                        badgeActive = true;
                                    }
                                } else if (lesson.date > dateNow) {
                                    badgeActive = true;
                                }

                                return(
                                    <LessonCard key={lesson._id}>
                                        <View style={{position: "relative"}}>
                                            <MoreButton style={{right: -20}} onPress={removeLesson.bind(this, lesson._id)}>
                                                <Ionicons name="md-close" size={24} color="red"/>
                                            </MoreButton>
                                            <MoreButton style={{right: 5}} onPress={navigation.navigate.bind(this, 'EditLesson', lesson)}>
                                                <Ionicons name="md-create" size={28} color="green"/>
                                            </MoreButton>
                                        </View>

                                        <LessonCardRow>
                                            <Foundation name="book" size={16} color="#a3a3a3"/>
                                            <LessonCardLabel active={badgeActive} style={{fontWeight: 'bold'}}>{lesson.program_name}</LessonCardLabel>
                                        </LessonCardRow>

                                        <LessonCardRow>
                                            <Foundation name="clipboard-notes" size={16} color="#a3a3a3"/>
                                            <LessonCardLabel active={badgeActive}>{lesson.unit}</LessonCardLabel>
                                        </LessonCardRow>

                                        <LessonCardRow style={{marginTop: 15, justifyContent: 'space-between'}}>
                                            <Badge style={{width: 120}} active={badgeActive}>{dateReverse(lesson.date)}</Badge>
                                            <Badge active={badgeActive}>{lesson.time}</Badge>
                                        </LessonCardRow>

                                        {
                                            (lesson.rate_lesson || lesson.rate_homework) ? (
                                                <View style={{marginTop: 10}}>
                                                    {
                                                        lesson.rate_lesson ? (
                                                            <LessonCardRow style={{marginTop: 5, justifyContent: 'space-between'}}>
                                                                <StudentRateTitle>Оценка за урок:</StudentRateTitle>
                                                                <StudentRate>{lesson.rate_lesson}</StudentRate>
                                                            </LessonCardRow>
                                                        ) : null
                                                    }

                                                    {
                                                        lesson.rate_homework ? (
                                                            <LessonCardRow style={{marginTop: 5, justifyContent: 'space-between'}}>
                                                                <StudentRateTitle>Оценка за домашнее задание:</StudentRateTitle>
                                                                <StudentRate>{lesson.rate_homework}</StudentRate>
                                                            </LessonCardRow>
                                                        ) : null
                                                    }
                                                </View>
                                            ) : null
                                        }

                                        {
                                            lesson.homework ? (<View style={{marginTop: 15}}>
                                                <HomeworkTitle>Домашнее задание:</HomeworkTitle>
                                                <HomeworkText>{lesson.homework}</HomeworkText>
                                            </View>) : null
                                        }
                                    </LessonCard>
                                )
                            }
                        )}
                    </Container>
                </ScrollView>
            </StudentLessons>
        </View>
    )
};

const HomeworkText = styled.Text`
  padding: 3px;
  border: 1px;
`;

const HomeworkTitle = styled.Text`
  text-align: center;
  background-color: gray;
  color: white;
`;

const StudentRate = styled.Text`
  padding: 5px 7px;
  text-align: center;
  background-color: gold;  
  border-radius: 18px;
  font-weight: 800;
  font-size: 14px;
  line-height: 30px;
`;

const StudentRateTitle = styled.Text`
  padding: 5px;
  text-align: center;
  background-color: lightsalmon;  
  border-radius: 18px;
  font-weight: 600;
  font-size: 14px;
  line-height: 30px;
`;

const MoreButton = styled.TouchableOpacity`
  display: flex;
  height: 32px;
  width: 32px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -15px
`;

const LessonCardLabel = styled.Text`
  width: 195px;
  margin-left: 10px;  
  font-size: 16px;
  color: ${props => props.active ? 'black' : 'gray'};
`;

const LessonCardRow = styled.View`
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
