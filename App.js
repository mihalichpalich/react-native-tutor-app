import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import styled from 'styled-components/native';

import {Lessons, SectionTitle} from './components';

const DATA = [
    {
        title: '14 сентября',
        data: [
                  {
                      time: '15:30',
                      active: true,
                      unit: 'базы данных',
                      user: {
                          fullname: "Вася Пупкин"
                      }
                  },
                  {
                      time: '15:30',
                      unit: 'базы данных',
                      user: {
                          fullname: "Вася Пупкин"
                      }
                  },
                  {
                      time: '15:30',
                      unit: 'базы данных',
                      user: {
                          fullname: "Вася Пупкин"
                      }
                  },
                  {
                      time: '15:30',
                      unit: 'базы данных',
                      user: {
                          fullname: "Вася Пупкин"
                      }
                  },
                  {
                      time: '15:30',
                      unit: 'базы данных',
                      user: {
                          fullname: "Вася Пупкин"
                      }
                  }
               ]
    },
    {
        title: '16 сентября',
        data: [
                  {
                      time: '15:30',
                      unit: 'базы данных',
                      user: {
                          fullname: "Вася Пупкин"
                      }
                  },
                  {
                      time: '15:30',
                      unit: 'базы данных',
                      user: {
                          fullname: "Вася Пупкин"
                      }
                  },
                  {
                      time: '15:30',
                      unit: 'базы данных',
                      user: {
                          fullname: "Вася Пупкин"
                      }
                  },
                  {
                      time: '15:30',
                      unit: 'базы данных',
                      user: {
                          fullname: "Вася Пупкин"
                      }
                  }
               ]
    }
];

export default function App() {
  return (
    <Container>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <Lessons {...item} />}
        renderSectionHeader={({ section: { title } }) => (
          <SectionTitle>{title}</SectionTitle>
        )}
      />
      <PlusButton>
          <Ionicons name="ios-add" size={36} color="white"/>
      </PlusButton>
    </Container>
  );
}

const PlusButton = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 25px;
  bottom: 25px;
  border-radius: 50px;
  background: #2a86ff;
  shadow-color: #2a86ff;
  shadow-opacity: 0.7;
  shadow-radius: 3.5;
  elevation: 4;
`;

const Container = styled.View`
  flex: 1;
  margin-top: 30px;
`;

