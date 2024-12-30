import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import moment from 'moment'

interface DateProps {
    date: string;
    onSelectDate: (date: string) => void;
    selected: string;
}

const Date: React.FC<DateProps> = ({ date, onSelectDate, selected }) => {
    const isToday = moment(date).isSame(moment(), 'day');
    const day = isToday ? 'Today' : moment(date).format('ddd');
    const dayNumber = moment(date).format('D');
    const fullDate = moment(date).format('YYYY-MM-DD');


    const backgroundColor = selected === fullDate ? "#6146c6" : "#eee";
    const textColor = selected === fullDate ? "#fff" : "#000";
    const fontWeight = selected === fullDate ? 'bold' : 'normal';
    const fontSize = selected === fullDate ? 24 : 16;

    return (
        <TouchableOpacity
            onPress={() => onSelectDate(fullDate)}
            style={[styles.card, { backgroundColor }]}
        >
            <Text style={[styles.big, { color: textColor, fontWeight }]}>
                {day}
            </Text>
            <View style={{ height: 10 }} />
            <Text style={[styles.medium, { color: textColor, fontWeight, fontSize }]}>
                {dayNumber}
            </Text>
        </TouchableOpacity>
    )
}

export default Date

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        borderColor: '#ddd',
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        height: 90,
        width: 80,
        marginHorizontal: 5,
    },
    big: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    medium: {
        fontSize: 16,
    },
})
