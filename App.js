import React from 'react';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

import {
    HomeScreen,
    StudentScreen,
    AddStudentScreen,
    AddLessonScreen,
    StudentsScreen,
    EditLessonScreen
} from "./screens";

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
        },
        Students: {
            screen: StudentsScreen
        },
        EditLesson: {
            screen: EditLessonScreen
        }
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(AppNavigator);

