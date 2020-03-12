import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

export default function App() {
  return (
    <Container>
        <Group>
            <GroupTitle>11 сентября</GroupTitle>
            <GroupItem>
                <Avatar/>
                <View style={{flex: 1}}>
                    <FullName>Анжела Матиева</FullName>
                    <GrayText>Базы данных.</GrayText>
                </View>
                <GroupDate active>12:30</GroupDate>
            </GroupItem>
            <GroupItem>
                <Avatar/>
                <View style={{flex: 1}}>
                    <FullName>Анжела Матиева</FullName>
                    <GrayText>Базы данных.</GrayText>
                </View>
                <GroupDate>12:30</GroupDate>
            </GroupItem>
        </Group>
    </Container>
  );
}

const GroupDate = styled.Text`
  background: ${props => props.active ? '#2a86ff' : '#e9f5ff'};
  color: ${props => props.active ? '#fff' : '#4294ff'};
  width: 70px;
  height: 32px;
  text-align: center;
  border-radius: 18px;
  font-weight: 600;
  font-size: 14px;
  line-height: 28px;
`;

const GrayText = styled.Text`
  font-size: 16px;
  color: #8b979f;
`;

const FullName = styled.Text`
  font-weight: 600;
  font-size: 16px;  
`;

const Avatar = styled.View`
  margin-right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50px;  
  background-color: yellow;
`;

const GroupItem = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 20px 0;
`;

const Group = styled.View`
  padding: 0 20px;
`;

const GroupTitle = styled.Text`
  font-weight: 800;
  font-size: 22px;
  color: #000;
`;

const Container = styled.View`
  flex: 1;
  margin-top: 50px;  
`;

