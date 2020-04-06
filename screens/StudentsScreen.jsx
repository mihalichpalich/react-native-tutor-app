import React, { useState, useEffect } from 'react';
import { FlatList, Alert, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row';
import { Item, Input } from 'native-base';

import { Lessons, SectionTitle, PlusButton } from '../components';
import { studentsApi, phoneFormat } from '../utils';

const StudentsScreen = props => {
  const { navigation } = props;
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchStudents = () => {
    setIsLoading(true);
    studentsApi
      .get()
      .then(({ data }) => {
        setData(data.data);
      })
      .finally(e => {
        setIsLoading(false);
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
            data={data.filter(
              item =>
                item.fullname
                  .toLowerCase()
                  .indexOf(searchValue.toLowerCase()) >= 0
            )}
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
                    unit: phoneFormat(item.phone)
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
      <PlusButton onPress={navigation.navigate.bind(this, 'AddStudent')} />
    </Container>
  );
};

StudentsScreen.navigationOptions = {
  title: 'Студенты',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8
  }
};

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
