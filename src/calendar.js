import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import {
    View,
    StyleSheet,
    Text, 
    TouchableOpacity,
    Modal,
    ScrollView,
    useWindowDimensions,
    Image
} from 'react-native';
import {resultMap} from './map';
  
const Calendar = ({ currentDate }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([
        { date: new Date(2024, 3, 28), event: 'KT Wiz vs SSG Landers', result: 'W', score: '6:11' },
        { date: new Date(2024, 3, 21), event: 'LG Twins vs SSG Landers 더블헤더 1차전', result: 'L', score: '10:8' },
        { date: new Date(2024, 3, 21), event: 'LG Twins vs SSG Landers 더블헤더 2차전', result: 'T', score: '5:5' },
        { date: new Date(2024, 4, 1), event: 'SSG Landers vs 한화 이글스', result: 'W', score: '8:6' },
        { date: new Date(2024, 4, 21), event: 'LG 트윈스 vs SSG 랜더스 더블헤더 1차전', result: 'L', score: '10:8' },
        { date: new Date(2024, 4, 21), event: 'LG Twins vs SSG Landers 더블헤더 2차전', result: 'T', score: '5:5' },
    ]);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleTicketDetail = (event) => {
        // 티켓 상세 화면 조회
    };

    const handleAddTicket = (date) => {
        // 티켓 추가 화면
    };

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY < -50) {
            setCurrentDate(subMonths(currentDate, 1)); 
        } else if (offsetY > 50) {
            setCurrentDate(addMonths(currentDate, 1));
        }
    };

    const windowWidth = useWindowDimensions().width;
    const cellWidth = windowWidth / 7 - 2;

    const windowHeight = useWindowDimensions().height;
    const cellHeight = windowHeight / 7;

    const styles = StyleSheet.create({
        calendar: {
            padding: 5,
        },
        weekdaysContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
        },
        weekday: {
            flex: 1,
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'NanumGothicBold',
            color: 'black',
        },
        daysContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        day: {
            width: cellWidth,
            height: cellHeight,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#ccc',
        },
        otherMonth: {
            opacity: 0.3,
        },
        selectedDay: {
            backgroundColor: 'yellow',
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            backgroundColor: 'white',
            padding: 20,
            width: 300,
            height: 300,
            borderRadius: 10,
            elevation: 5,
        },
        horizontalContainer: {
            flexDirection: 'row',
        },
        btnClose: {
            marginLeft: 200,
        },
        modalList: {
            padding: 10,
        },
        eventItem: {
            height: 50,
            borderWidth: 0.7,
            borderColor: 'black',
        },
        icon: {
            width: 30,
            height: 30,
            marginRight: 10,
        },
        addBtn: {
            width: 30,
            height: 30,
            marginLeft: 230,
        },
        infoView: {
            flexDirection: 'row',
        },
        text: {
            fontFamily: 'NanumGothicBold',
            color: 'black',
        },
    });

    const weekStart = startOfWeek(currentDate);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdayElements = weekdays.map((day, index) => (
        <Text key={index} style={styles.weekday}>{day}</Text>
    ));

    const selectedDateEvents = events.filter(event => isSameDay(event.date, selectedDate));

    return (
        <ScrollView
            style={styles.calendar}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ flexGrow: 1, flex:1 }}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.weekdaysContainer}>
                {weekdayElements}
            </View>
            <View style={styles.daysContainer}>
                {days.map((day) => (
                    <TouchableOpacity
                        key={day}
                        style={[
                            styles.day, 
                            !isSameMonth(day, currentDate) && styles.otherMonth,
                            selectedDate && isSameDay(day, selectedDate) && styles.selectedDay
                        ]}
                        onPress={() => handleDateClick(day)}
                    >
                        <Text style={styles.text}>{format(day, 'd')}</Text>
                        {events.some(event => isSameDay(event.date, day)) && (
                            events
                                .filter(event => isSameDay(event.date, day))
                                .map((event, index) => (
                                    <Image 
                                        key={index}
                                        source={resultMap[event.result]}
                                        style={{ width: 20, height: 20, position: 'absolute', top: 5, right: 5 }} 
                                    />
                                ))
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <View style={styles.horizontalContainer}>
                            <Text style={styles.text}>{selectedDate ? format(selectedDate, 'MM/dd') : ''}</Text>
                            <TouchableOpacity onPress={closeModal} style={styles.btnClose}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView 
                            style={styles.modalList}
                            horizontal={true}
                            contentContainerStyle={{ flexGrow: 1, flexDirection: 'column'}}
                        >
                            {selectedDateEvents.map((event, index) => (
                                <View key={index} style={styles.eventItem}>
                                    <TouchableOpacity onPress={(event) => handleTicketDetail(event)}>
                                        <View style={styles.infoView}>
                                            <Image source={resultMap[event.result]} style={styles.icon} />
                                            <Text style={styles.text}>{event.score}</Text>
                                        </View>
                                        <Text style={styles.text}>{event.event}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>

                        <TouchableOpacity onPress={(date) => handleAddTicket(date)}>
                            <Image source={require('../public/png/free-icon-add-button.png')} style={styles.addBtn}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default Calendar;
