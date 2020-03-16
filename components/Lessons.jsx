import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

const Lessons = ({user, unit, active, time}) => {
    return (
        <GroupItem>
            <Avatar/>
            <View style={{flex: 1}}>
                <FullName>{user.fullname}</FullName>
                <GrayText>{unit}</GrayText>
            </View>
            <GroupDate active={active}>{time}</GroupDate>
        </GroupItem>
    );
};

Lessons.defaultProps = {
    title: 'Untitled',
    items: []
};

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

const GroupItem = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
`;

const Container = styled.View`
  flex: 1;
  margin-top: 50px;  
`;

export default Lessons;
