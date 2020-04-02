import React from 'react';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

import {HomeScreen, StudentScreen, AddStudentScreen, AddLessonScreen} from "./screens";

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Student: {
            screen: StudentScreen
        },
        AddStudent: {
            screen: AddStudentScreen
        },
        AddLesson: {
            screen: AddLessonScreen
        }
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(AppNavigator);

