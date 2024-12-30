import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tasks from '../screens/Tasks';

import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';



const Stack = createStackNavigator();




const ScreenStack: React.FC = () => {
    return (

        <Stack.Navigator initialRouteName='Tasks'>

            <Stack.Screen
                name="Tasks"
                component={Tasks}
                options={{ title: 'Tasks' }}
            />

            <Stack.Screen
                name="AddTaskScreen"
                component={AddTaskScreen}
                options={{ title: 'AddTaskScreen' }}
            />

            <Stack.Screen
                name="TaskDetailsScreen"
                component={TaskDetailsScreen}
                options={{ title: 'TaskDetailsScreen' }}
            />




        </Stack.Navigator>

    )

}

export default ScreenStack;


