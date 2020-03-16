import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
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
                      active: true,
                      unit: 'базы данных',
                      user: {
                          fullname: "Вася Пупкин"
                      }
                  },
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
                      active: true,
                      unit: 'базы данных',
                      user: {
                          fullname: "Вася Пупкин"
                      }
                  },
                  {
                      time: '15:30',
                      active: true,
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
                      active: true,
                      unit: 'базы данных',
                      user: {
                          fullname: "Вася Пупкин"
                      }
                  },
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
                      active: true,
                      unit: 'базы данных',
                      user: {
                          fullname: "Вася Пупкин"
                      }
                  },
                  {
                      time: '15:30',
                      active: true,
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
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  margin-top: 30px;
`;

