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
                <FullName>Анжела Матиева</FullName>
            </GroupItem>
        </Group>
    </Container>
  );
}

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

