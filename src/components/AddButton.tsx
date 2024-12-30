import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FloatingAddButtonProps {
    onPress: () => void;
}

const AddButton: React.FC<FloatingAddButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.addButton} onPress={onPress}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#28a745',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    },
    addButtonText: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
    },
});

export default AddButton;
