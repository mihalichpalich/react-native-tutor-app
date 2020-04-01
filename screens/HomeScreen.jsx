import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {SectionList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';
import Swipeable from 'react-native-swipeable-row';
import Text from "react-native-web/dist/exports/Text";

import {Lessons, SectionTitle} from '../components';
import {lessonsApi} from "../utils/api";

const HomeScreen = ({navigation}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchLessons = () => {
        setIsLoading(true);

        lessonsApi.get().then(({data}) => {
            setData(data.data);
            setIsLoading(false);
        })
            .catch(e => {
                setIsLoading(false);
            });
    };

    useEffect(fetchLessons, []);

    return (
        <Container>
            {data && (
                <SectionList
                sections={data}
                keyExtractor={(item, index) => index}
                onRefresh={fetchLessons}
                refreshing={isLoading}
                renderItem={({item}) => (
                    <Swipeable rightButtons={[<Text>Left</Text>,<Text>Right</Text>]}>
                        <Lessons navigate={navigation.navigate} item={item}/>
                    </Swipeable>
                )}
                renderSectionHeader={({section: {title}}) => (
                    <SectionTitle>{title}</SectionTitle>
                )}
                />
            )}
            <PlusButton onPress={navigation.navigate.bind(this, 'AddStudent')}>
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

const SwipeView = styled.View`
  background-color: red;
  
`;

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
