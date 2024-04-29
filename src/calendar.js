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
  
const Calendar = ({ currentDate }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([
        { date: new Date(2024, 3, 28), event: 'KT Wiz vs SSG Landers', result: 'W' },
        { date: new Date(2024, 3, 21), event: 'LG Twins vs SSG Landers 더블헤더 1차전', result: 'L' },
        { date: new Date(2024, 3, 21), event: 'LG Twins vs SSG Landers 더블헤더 2차전', result: 'T' },
    ]);

    const resultMap = {
        W: require('../public/png/free-icon-win.png'),
        L: require('../public/png/free-icon-lose.png'),
        T: require('../public/png/free-icon-draw.png'),
    };

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
        },
        icon: {
            width: 30,
            height: 30,
        },
        addBtn: {
            width: 30,
            height: 30,
            marginLeft: 230,
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
                        style={[styles.day, 
                            !isSameMonth(day, currentDate) && styles.otherMonth,
                            selectedDate && isSameDay(day, selectedDate) && styles.selectedDay
                        ]}
                        onPress={() => handleDateClick(day)}
                    >
                        <Text>{format(day, 'd')}</Text>
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
                            <Text>{selectedDate ? format(selectedDate, 'MM/dd') : ''}</Text>
                            <TouchableOpacity onPress={closeModal} style={styles.btnClose}>
                                <Text>X</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView 
                            style={styles.modalList}
                            horizontal={true}
                            contentContainerStyle={{ flexGrow: 1, flexDirection: 'column'}}
                        >
                            {selectedDateEvents.map((event, index) => (
                                <View key={index} style={styles.eventItem}>
                                    {/* TODO onPress로 티켓 조회 화면 연결 필요 */}
                                    <TouchableOpacity>
                                        <Image source={resultMap[event.result]} style={styles.icon} />
                                        <Text>{event.event}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>

                        {/* TODO add 버튼 누르면 티켓 추가 화면 이동 */}
                        <TouchableOpacity>
                            <Image source={require('../public/png/free-icon-add-button.png')} style={styles.addBtn} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default Calendar;
