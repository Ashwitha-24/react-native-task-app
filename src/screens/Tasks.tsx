import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    SectionList,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Calendar from '../components/Calendar';
import { tasks } from '../utils/Tasks';  // Assuming tasks is your mock data
import AddButton from '../components/AddButton';


interface Task {
    id: string;
    name: string;
    description: string;
    date: string;
    images?: string[];
    videos?: string[];
}

const groupTasksByDate = (tasks: Task[]) => {
    const grouped: { title: string; data: Task[] }[] = [];
    const taskMap: { [key: string]: Task[] } = {};

    tasks.forEach((task) => {
        const date = new Date(task.date).toDateString();
        if (!taskMap[date]) taskMap[date] = [];
        taskMap[date].push(task);
    });

    Object.keys(taskMap).forEach((date) => {
        grouped.push({ title: date, data: taskMap[date] });
    });

    return grouped;
};

const Tasks: React.FC = () => {

    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

    const [selectedDate, setSelectedDate] = useState<string>(currentDate);
    const [taskList, setTaskList] = useState<Task[]>(tasks);
    const sectionListRef = useRef<SectionList>(null);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        const loadSelectedDate = async () => {
            const savedDate = await AsyncStorage.getItem('selectedDate');
            if (savedDate) {
                setSelectedDate(savedDate);
            } else {
                setSelectedDate(currentDate);
            }
        };
        loadSelectedDate();
    }, []);

    useEffect(() => {
        if (isFocused) {
            setTaskList([...tasks]);

            const { scrollTo } = navigation.getState().routes.find(route => route.name === 'Tasks')?.params || {};
            if (scrollTo) {
                setSelectedDate(scrollTo);
            }
        }
    }, [isFocused]);

    const groupedTasks = groupTasksByDate(taskList);

    useEffect(() => {
        const sectionIndex = groupedTasks.findIndex(
            (section) => section.title === new Date(selectedDate).toDateString()
        );
        if (sectionIndex !== -1 && sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                sectionIndex,
                itemIndex: 0, // Scroll to the first item in the section
                animated: true,
            });
        }
    }, [taskList, selectedDate]);

    const handleDatePress = async (date: string) => {
        setSelectedDate(date);
        await AsyncStorage.setItem('selectedDate', date);
        const sectionIndex = groupedTasks.findIndex(
            (section) => section.title === new Date(date).toDateString()
        );
        if (sectionIndex !== -1 && sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                sectionIndex,
                itemIndex: 0, // Scroll to the first task of that section
                animated: true,
            });
        }
    };

    const handleTaskPress = (task: Task) => {
        navigation.navigate('TaskDetailsScreen', task);
    };

    const handleAddTask = () => {

        navigation.navigate('AddTaskScreen', { refresh: true });
    };

    const getItemLayout = (data: any, index: number) => {
        // Calculate height dynamically or use fixed height
        const ITEM_HEIGHT = 70; // Example fixed height for each item
        const sectionIndex = Math.floor(index / 10); // Assuming 10 items per section
        return {
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
        };
    };

    const onScrollToIndexFailed = (error: { index: number }) => {
        const { index } = error;
        console.warn(`Failed to scroll to index: ${index}`);
        sectionListRef.current?.scrollToLocation({
            sectionIndex: 0,
            itemIndex: 0,
            animated: true,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Calendar onSelectDate={handleDatePress} selected={selectedDate} />

            <SectionList
                ref={sectionListRef}
                sections={groupedTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.taskItem}
                        onPress={() => handleTaskPress(item)}
                    >
                        <Text style={styles.taskTitle}>{item.name}</Text>
                        <Text style={styles.taskDescription}>{item.description}</Text>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                getItemLayout={getItemLayout}
                onScrollToIndexFailed={onScrollToIndexFailed}
            />

            <AddButton onPress={handleAddTask} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    sectionHeader: {
        backgroundColor: '#e1e1e1',
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskItem: {
        backgroundColor: '#fff',
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    taskDescription: {
        fontSize: 14,
        color: '#6c757d',
    },
});

export default Tasks;
