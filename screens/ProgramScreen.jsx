import React, { useState, useEffect } from 'react';
import {FlatList, Alert, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row';

import { SectionTitle, PlusButton, HeaderButtons } from '../components';
import { programsApi } from '../utils';

const ProgramScreen = props => {
  const { navigation } = props;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPrograms = () => {
    setIsLoading(true);
    programsApi
      .get(navigation.state.params.user)
      .then(({ data }) => {
        setData(data.data);
      })
      .finally(e => {
        setIsLoading(false);
      });
  };

  useEffect(fetchPrograms, []);
  useEffect(fetchPrograms, [navigation.state.params]);

  const removeProgram = id => {
    Alert.alert(
      'Удаление программы',
      'Вы действительно хотите удалить программу?',
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
            programsApi
              .remove(id)
              .then(() => {
                fetchPrograms();
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
          <FlatList
            data={data}
            keyExtractor={item => item._id}
            onRefresh={fetchPrograms}
            refreshing={isLoading}
            renderItem={({ item }) => (
              <Swipeable
                rightButtons={[
                  <SwipeViewButton style={{ backgroundColor: '#B4C1CB' }}
                                   onPress={navigation.navigate.bind(this, 'EditProgram', item)}
                  >
                    <Ionicons name="md-create" size={28} color="white" />
                  </SwipeViewButton>,
                  <SwipeViewButton
                    onPress={removeProgram.bind(this, item._id)}
                    style={{ backgroundColor: '#F85A5A' }}
                  >
                    <Ionicons name="ios-close" size={48} color="white" />
                  </SwipeViewButton>
                ]}
              >
                <ProgramItem>
                  <ProgramText>{item.name}</ProgramText>
                </ProgramItem>
              </Swipeable>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <SectionTitle>{title}</SectionTitle>
            )}
          />
        </>
      )}
      <PlusButton onPress={navigation.navigate.bind(this, 'AddProgram', navigation.state.params)} />
    </Container>
  );
};

ProgramScreen.navigationOptions = ({navigation}) => ({
    title: 'Учебные программы',
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    },
    headerLeft: null,
    headerRight: () => (
        <HeaderButtons>
            <TouchableOpacity
                onPress={navigation.navigate.bind(this, 'Students', {user: navigation.state.params.user})}
                style={{marginRight: 10}}
            >
                <Ionicons name="md-people" size={28} color="black"/>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={navigation.navigate.bind(this, 'Home', {user: navigation.state.params.user})}
                style={{marginRight: 10}}
            >
                <Ionicons name="md-home" size={28} color="black"/>
            </TouchableOpacity>

            <TouchableOpacity onPress={navigation.navigate.bind(this, 'SignIn')}>
                <Ionicons name="md-log-out" size={28} color="black"/>
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

const ProgramText = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

const ProgramItem = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: darkgrey;
`;

const Container = styled.View`
  flex: 1;
`;

export default ProgramScreen;
