import React from 'react';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

import {HomeScreen, StudentScreen} from "./screens";

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Student: {
            screen: StudentScreen
        }
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(AppNavigator);

