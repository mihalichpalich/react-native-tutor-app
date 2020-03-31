import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

import Badge from './Badge';
import GrayText from "./GrayText";

const Lessons = ({navigate, item}) => {
    const {user, lesson, active, time} = item;

    return (
        <GroupItem onPress={navigate.bind(this, 'Student', item)}>
            <Avatar/>
            <View style={{flex: 1}}>
                <FullName>{user.fullname}</FullName>
                <GrayText>{lesson}</GrayText>
            </View>
            <Badge active={active}>{time}</Badge>
        </GroupItem>
    );
};

Lessons.defaultProps = {
    title: 'Untitled',
    items: []
};

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

const GroupItem = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
`;

export default Lessons;
