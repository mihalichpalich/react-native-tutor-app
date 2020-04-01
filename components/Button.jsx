import React from "react";
import styled from 'styled-components/native';

import GrayText from "./GrayText";

const Button = ({children, color, onPress}) => (
    <ButtonWrapper onPress={onPress} color={color}>
        <ButtonText>{children}</ButtonText>
    </ButtonWrapper>
);

Button.defaultProps = {
    color: '#2a86ff'
};

const ButtonWrapper = styled.TouchableOpacity`
  height: 45px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: ${props => props.color};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 16px;
`;

export default Button;
