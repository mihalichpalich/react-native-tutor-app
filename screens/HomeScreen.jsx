import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {SectionList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';

import {Lessons, SectionTitle} from '../components';

const HomeScreen = ({navigation}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('https://api.myjson.com/bins/sy5t8.json').then(({data}) => {
            setData(data);
        });
    }, []);

    return (
        <Container>
            {data && (
                <SectionList
                sections={data}
                keyExtractor={(item, index) => index}
                renderItem={({item}) => <Lessons navigate={navigation.navigate} item={item}/>}
                renderSectionHeader={({section: {title}}) => (
                    <SectionTitle>{title}</SectionTitle>
                )}
                />
            )}
            <PlusButton>
                <Ionicons name="ios-add" size={36} color="white"/>
            </PlusButton>
        </Container>
    )
};

HomeScreen.navigationOptions = {
    title: "Студенты",
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
};

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
  shadow-opacity: 0.4;
  shadow-radius: 3.5;
  elevation: 4;
`;

const Container = styled.View`
  flex: 1;
`;

export default HomeScreen;
