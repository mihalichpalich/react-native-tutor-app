import React from 'react';
import styled from 'styled-components/native';
import {Ionicons} from "@expo/vector-icons";

const PlusButton = ({onPress}) => {
    return(
        <Circle onPress={onPress}>
            <Ionicons name="ios-add" size={36} color="white"/>
        </Circle>
    );
};

const Circle = styled.TouchableOpacity`
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
  shadow-opacity: 0.4;
  shadow-radius: 3.5;
  elevation: 4;
`;

export default PlusButton;
