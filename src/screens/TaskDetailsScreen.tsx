import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,

} from 'react-native';
import Video, { VideoRef } from 'react-native-video';

interface TaskDetailsProps {
    route: {
        params: {
            id: string;
            name: string;
            description: string;
            date: string;
            images?: string[];
            videos?: string[];
        };
    };
}

const TaskDetailsScreen: React.FC<TaskDetailsProps> = ({ route }) => {
    const { name, description, date, images, videos } = route.params;

    return (
        <ScrollView style={styles.container}>
            {/* Task Name */}
            <Text style={styles.title}>{name}</Text>

            {/* Task Date */}
            <Text style={styles.date}>
                {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </Text>

            {/* Task Description */}
            <Text style={styles.description}>{description}</Text>

            {/* Task Images */}
            {images && images.length > 0 && (
                <View>
                    <Text style={styles.sectionHeader}>Images</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {images.map((imageUrl, index) => (
                            <Image
                                key={index}
                                source={{ uri: imageUrl }}
                                style={styles.image}
                            />
                        ))}
                    </ScrollView>
                </View>
            )}

            {/* Task Videos */}
            {videos && videos.length > 0 && (
                <View>
                    <Text style={styles.sectionHeader}>Videos</Text>
                    {videos.map((videoUrl, index) => (
                        <View key={index} style={styles.videoContainer}>
                            <Video
                                source={{ uri: videoUrl }}
                                style={styles.video}
                                controls
                                resizeMode="cover"
                            />
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    date: {
        fontSize: 16,
        color: '#6c757d',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
    },
    image: {
        width: Dimensions.get('window').width * 0.8,
        height: 200,
        borderRadius: 10,
        marginRight: 10,
    },
    videoContainer: {
        marginBottom: 20,
    },
    video: {
        width: Dimensions.get('window').width * 0.9,
        height: 200,
        borderRadius: 10,
    },
});

export default TaskDetailsScreen;
