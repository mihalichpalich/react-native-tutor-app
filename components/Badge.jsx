import React from "react";
import styled from 'styled-components/native';

export default styled.Text`
  background: ${props => props.active ? '#2a86ff' : '#e9f5ff'};
  color: ${props => props.active ? '#fff' : '#4294ff'};
  width: 70px;
  height: 32px;
  text-align: center;
  border-radius: 18px;
  font-weight: 600;
  font-size: 14px;
  line-height: 30px;
`;
