import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import { saveTask } from '../utils/Tasks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface AddTaskFormData {
    name: string;
    description: string;
}

const AddTaskScreen: React.FC = () => {
    const { control, handleSubmit, reset } = useForm<AddTaskFormData>();
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const navigation = useNavigation();

    useEffect(() => {
        const loadSelectedDate = async () => {
            const savedDate = await AsyncStorage.getItem('selectedDate');
            if (savedDate) {
                setSelectedDate(savedDate);
            } else {
                setSelectedDate(new Date().toISOString());
            }
        };
        loadSelectedDate();
    }, []);

    const onSubmit = (data: AddTaskFormData) => {
        const newTask = {
            id: `evt_${new Date().getTime()}`,
            name: data.name,
            description: data.description,
            date: selectedDate,
            images: selectedImages,
            videos: selectedVideos,
        };

        saveTask(newTask);

        reset();
        setSelectedImages([]);
        setSelectedVideos([]);

        Alert.alert(
            'Task Added',
            'Your task has been added successfully!',
            [
                {
                    text: 'OK',
                    onPress: () =>
                        navigation.navigate('Tasks', { scrollTo: selectedDate }),
                },
            ],
            { cancelable: false }
        );
    };

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
            if (response.assets) {
                setSelectedImages((prev) => [...prev, response.assets[0].uri]);
            }
        });
    };

    const pickVideo = () => {
        launchImageLibrary({ mediaType: 'video', quality: 1 }, (response) => {
            if (response.assets) {
                setSelectedVideos((prev) => [...prev, response.assets[0].uri]);
            }
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Add New Task</Text>

            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Task Name"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
                name="name"
                rules={{ required: 'Task name is required' }}
            />

            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Task Description"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
                name="description"
                rules={{ required: 'Task description is required' }}
            />

            <TouchableOpacity onPress={pickImage} style={styles.button}>
                <Text style={styles.buttonText}>Pick an Image</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={pickVideo} style={styles.button}>
                <Text style={styles.buttonText}>Pick a Video</Text>
            </TouchableOpacity>

            <View style={styles.mediaContainer}>
                {selectedImages.map((image, index) => (
                    <Image key={index} source={{ uri: image }} style={styles.media} />
                ))}
            </View>

            <View style={styles.mediaContainer}>
                {selectedVideos.map((video, index) => (
                    <View key={index} style={styles.videoContainer}>
                        <Video
                            source={{ uri: video }}
                            style={styles.media}
                            controls
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </View>

            <Button title="Add Task" onPress={handleSubmit(onSubmit)} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    mediaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    media: {
        width: 100,
        height: 100,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    videoContainer: {
        width: 100,
        height: 100,
        marginRight: 10,
        marginBottom: 10,
    },
});

export default AddTaskScreen;
