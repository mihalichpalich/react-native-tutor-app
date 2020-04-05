import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import dayjs from 'dayjs';

import Badge from './Badge';
import GrayText from "./GrayText";
import getAvatarColor from "../utils/getAvatarColor";

const Lessons = ({navigate, item}) => {
    const {student, unit, date, time} = item;
    const avatarColors = getAvatarColor(student.fullname[0].toUpperCase());

    let dateNow = dayjs(new Date()).format("YYYY-MM-DD");
    let timeNow = dayjs(new Date()).format("HH:mm");
    let badgeActive = false;

    if (date === dateNow) {
        if (time >= timeNow) {
            badgeActive = true;
        }
    } else if (date > dateNow) {
        badgeActive = true;
    }

    return (
        <GroupItem onPress={navigate.bind(this, 'Student', item)}>
            <Avatar style={{
                backgroundColor: avatarColors.background
            }}>
                <AvatarLetter style={{color: avatarColors.color}}>{student.fullname[0].toUpperCase()}</AvatarLetter>
            </Avatar>
            <View style={{flex: 1}}>
                <FullName>{student.fullname}</FullName>
                <GrayText>{unit}</GrayText>
            </View>
            {time && <Badge active={badgeActive}>{time}</Badge>}
        </GroupItem>
    );
};

Lessons.defaultProps = {
    title: 'Untitled',
    items: []
};

const AvatarLetter = styled.Text`
  margin-bottom: 1px;
  font-size: 20px;
  font-weight: bold;
`;

const FullName = styled.Text`
  font-weight: 600;
  font-size: 16px;  
`;

const Avatar = styled.View`
  align-items:center;
  justify-content:center;
  margin-right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;

const GroupItem = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
`;

export default Lessons;
