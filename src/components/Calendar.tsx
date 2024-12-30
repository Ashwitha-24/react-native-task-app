import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native'
import moment from 'moment'
import Date from './Date'

interface CalendarProps {
    onSelectDate: (date: string) => void;
    selected: string;
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDate, selected }) => {
    const [dates, setDates] = useState<string[]>([])
    const [scrollPosition, setScrollPosition] = useState<number>(0)
    const [currentMonth, setCurrentMonth] = useState<string | undefined>()
    const scrollViewRef = useRef<ScrollView>(null)

    const SCREEN_WIDTH = Dimensions.get('window').width;

    useEffect(() => {
        const generateDates = () => {
            const today = moment()
            const generatedDates: string[] = []
            for (let i = 0; i < 30; i++) {
                generatedDates.push(today.clone().add(i, 'days').format('YYYY-MM-DD'))
            }
            setDates(generatedDates)
        }
        generateDates()
    }, [])

    const getCurrentMonth = () => {
        if (dates.length > 0) {
            const dayIndex = Math.min(
                Math.floor(scrollPosition / 80),
                dates.length - 1
            )
            const month = moment(dates[dayIndex]).format('MMMM')
            setCurrentMonth(month)
        }
    }

    useEffect(() => {
        getCurrentMonth()
    }, [scrollPosition, dates])

    useEffect(() => {

        const selectedIndex = dates.indexOf(selected)
        if (selectedIndex !== -1 && scrollViewRef.current) {
            const itemWidth = 80;
            const offset = selectedIndex * itemWidth - (SCREEN_WIDTH / 2 - itemWidth / 2)
            scrollViewRef.current.scrollTo({ x: Math.max(offset, 0), animated: true })
        }
    }, [selected])

    return (
        <>

            <View style={styles.dateSection}>
                <View style={styles.scroll}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => setScrollPosition(e.nativeEvent.contentOffset.x)}
                        ref={scrollViewRef}
                    >
                        {dates.map((date, index) => (
                            <Date
                                key={index}
                                date={date}
                                onSelectDate={onSelectDate}
                                selected={selected}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

export default Calendar

const styles = StyleSheet.create({
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dateSection: {
        width: '100%',
        padding: 10,
    },
    scroll: {
        height: 100,
    },
})
