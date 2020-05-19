import React, { useState, useEffect } from 'react';
import {FlatList, Alert, View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row';
import { Item, Input } from 'native-base';

import { Lessons, SectionTitle, PlusButton, HeaderButtons } from '../components';
import { studentsApi, programsApi } from '../utils';

const StudentsScreen = props => {
    const { navigation } = props;
    const [data, setData] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const fetchStudents = () => {
        setIsLoading(true);

        programsApi
            .get(navigation.state.params.user)
            .then(({ data }) => {
                if (data.data.length != 0) {
                    studentsApi
                        .get(navigation.state.params.user)
                        .then(({ data }) => {
                            setData(data.data.students);
                            setIsAdding(true);
                        })
                        .finally(e => {
                            setIsLoading(false);
                        });
                } else {
                    alert("Добавьте учебные программы, чтобы добавлять студентов");
                }
            })
            .finally(e => {
                setIsAdding(false);
            });
    };

    useEffect(fetchStudents, []);

    useEffect(fetchStudents, [navigation.state.params]);

    const onSearch = e => {
        setSearchValue(e.nativeEvent.text);
    };

    const removeStudent = id => {
        Alert.alert(
          'Удаление студента',
          'Вы действительно хотите удалить студента?',
          [
            {
              text: 'Отмена',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            {
              text: 'Удалить',
              onPress: () => {
                setIsLoading(true);
                studentsApi
                  .remove(id)
                  .then(() => {
                    fetchStudents();
                  })
                  .catch(() => {
                    setIsLoading(false);
                  });
              }
            }
          ],
          { cancelable: false }
        );
    };

  return (
    <Container>
      {data && (
        <>
          <View style={{ padding: 20 }}>
            <Item style={{ paddingLeft: 15, borderRadius: 30 }} regular>
              <Input onChange={onSearch} placeholder="Поиск..." />
            </Item>
          </View>
          <FlatList
            data={(data !== null) ? (data.filter(
              item =>
                item.fullname
                  .toLowerCase()
                  .indexOf(searchValue.toLowerCase()) >= 0
            )) : null}
            keyExtractor={item => item._id}
            onRefresh={fetchStudents}
            refreshing={isLoading}
            renderItem={({ item }) => (
              <Swipeable
                rightButtons={[
                  <SwipeViewButton style={{ backgroundColor: '#B4C1CB' }}
                                   onPress={navigation.navigate.bind(this, 'EditStudent', item)}
                  >
                    <Ionicons name="md-create" size={28} color="white" />
                  </SwipeViewButton>,
                  <SwipeViewButton
                    onPress={removeStudent.bind(this, item._id)}
                    style={{ backgroundColor: '#F85A5A' }}
                  >
                    <Ionicons name="ios-close" size={48} color="white" />
                  </SwipeViewButton>
                ]}
              >
                <Lessons
                  navigate={navigation.navigate}
                  item={{
                    student: item,
                    unit: item.phone,
                    user: navigation.state.params.user
                  }}
                />
              </Swipeable>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <SectionTitle>{title}</SectionTitle>
            )}
          />
        </>
      )}
      {isAdding && (<PlusButton onPress={navigation.navigate.bind(this, 'AddStudent', navigation.state.params)} />)}
    </Container>
  );
};

StudentsScreen.navigationOptions = ({navigation}) => ({
    title: 'Студенты',
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    },
    headerLeft: null,
    headerRight: () => (
        <HeaderButtons>
            <TouchableOpacity
                onPress={navigation.navigate.bind(this, 'Program', {user: navigation.state.params.user})}
                style={{marginRight: 10}}
            >
                <Ionicons name="md-school" size={28} color="black"/>
            </TouchableOpacity>

            <TouchableOpacity onPress={navigation.navigate.bind(this, 'Home', {user: navigation.state.params.user})}>
                <Ionicons name="md-home" size={28} color="black"/>
            </TouchableOpacity>
        </HeaderButtons>
    )
});

const SwipeViewButton = styled.TouchableOpacity`
  width: 75px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
`;

export default StudentsScreen;
