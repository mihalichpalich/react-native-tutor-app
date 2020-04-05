import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {SectionList, Alert, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Swipeable from 'react-native-swipeable-row';
import dayjs from 'dayjs';

import {Lessons, SectionTitle, PlusButton} from '../components';
import {lessonsApi} from "../utils/api";

const HomeScreen = (props) => {
    const {navigation} = props;
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdateTime, setLastUpdateTime] = useState(null);

    const fetchLessons = () => {
        setIsLoading(true);

        lessonsApi.get().then(({data}) => {
            setData(data.data);
            setIsLoading(false);
        })
            .finally(e => {
                setIsLoading(false);
            });
    };

    useEffect(fetchLessons, [lastUpdateTime]);

    useEffect(fetchLessons, [navigation.state.params]);

    const removeLesson = id => {
        Alert.alert(
          'Удаление урока',
          'Вы действительно хотите удалить урок?',
          [
            {text: 'Отмена', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Удалить', onPress: () => {
                    setIsLoading(true);

                    lessonsApi.remove(id).then(() => {
                        fetchLessons();
                    }).catch(() => {
                        setIsLoading(false);
                    });
                }
            },
          ],
          { cancelable: false }
        );
    };

    const updateLesson = (id, values) => {
        setIsLoading(true);

        lessonsApi.update(id, values).then(() => {
            fetchLessons();
        }).catch(() => {
            setIsLoading(false);
        });
    };

    return (
        <Container>
            {data && (
                <SectionList
                sections={data}
                keyExtractor={item => item._id}
                onRefresh={fetchLessons}
                refreshing={isLoading}
                renderItem={({item}) => (
                    <Swipeable
                        rightButtons={[
                            <SwipeViewButton onPress={navigation.navigate.bind(this, 'EditLesson',
                                                    {lessonId: navigation.getParam('_id', {})})}
                                             style={{ backgroundColor: '#B4C1CB'}}>
                                <Ionicons name="md-create" size={28} color="white"/>
                            </SwipeViewButton>,
                            <SwipeViewButton onPress={removeLesson.bind(this, item._id)}
                                             style={{ backgroundColor: '#F85A5A'}}
                            >
                                <Ionicons name="ios-close" size={48} color="white"/>
                            </SwipeViewButton>
                    ]}>
                        <Lessons onRemove={removeLesson} navigate={navigation.navigate} item={item}/>
                    </Swipeable>
                )}
                renderSectionHeader={({section: {title}}) => (
                    <SectionTitle>{title}</SectionTitle>
                )}
                />
            )}
            <PlusButton onPress={navigation.navigate.bind(this, 'AddStudent')}/>
        </Container>
    )
};

HomeScreen.navigationOptions = ({navigation}) => ({
    title: "Журнал уроков",
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    },
    headerRight: () => (
        <TouchableOpacity onPress={navigation.navigate.bind(this, 'Students')} style={{marginRight: 20}}>
            <Ionicons name="md-people" size={28} color="black"/>
        </TouchableOpacity>
    )
});

const SwipeViewButton = styled.TouchableOpacity`
  display: flex;
  width: 75px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
`;

export default HomeScreen;
