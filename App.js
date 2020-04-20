import React from 'react';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

import {
    HomeScreen,
    StudentScreen,
    AddStudentScreen,
    AddLessonScreen,
    StudentsScreen,
    EditLessonScreen,
    EditStudentScreen,
    RegistrationScreen,
    ConfirmationScreen,
    LoginScreen,
    ProgramScreen,
    AddProgramScreen
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
        },
        EditStudent: {
            screen: EditStudentScreen
        },
        Registration: {
            screen: RegistrationScreen
        },
        Confirmation: {
            screen: ConfirmationScreen
        },
        Login: {
            screen: LoginScreen
        },
        Program: {
            screen: ProgramScreen
        },
        AddProgram: {
            screen: AddProgramScreen
        }
    },
    {
        initialRouteName: 'Login'
    }
);

export default createAppContainer(AppNavigator);

