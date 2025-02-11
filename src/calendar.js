import React, { useState, useEffect, useCallback } from 'react';
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
    Text, 
    TouchableOpacity,
    Modal,
    ScrollView,
    SafeAreaView,
    Image,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { host, resultMap } from './map';
import styles from './style';
  
const Calendar = ({ initialDate }) => {
    const navigation = useNavigation();
    const [currentDate, setCurrentDate] = useState(initialDate || new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
    const [events, setEvents] = useState([]);

    const fetchData = useCallback(async (inputDate) => {
        try {
            const response = await fetch(host + '/ticket/postView', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "searchCriteria": "Month",
                    "gameDate" : inputDate
                })
            });

            const data = await response.json();
            console.log('Received data:', data);
            setEvents(data);
        } catch (error) {
            alert('Error fetching data!');
            console.error('Error fetching data:', error);
        }
    }, []);

    // 데이터 초기화 함수
    const resetData = useCallback(() => {
        setCurrentDate(initialDate || new Date());
        setSelectedDate(null);
        setShowModal(false);
        setShowYearMonthPicker(false);
        setSelectedYear(new Date().getFullYear());
        setSelectedMonth(new Date().getMonth() + 1);
        setEvents([]);
    }, [initialDate]);

    // currentDate가 변경될 때마다 실행
    useFocusEffect(
        useCallback(() => {
            // 화면에 진입할 때 상태를 초기화합니다.
            setSelectedDate(null);  // 선택된 날짜를 초기화합니다.
            setShowModal(false);    // 모달을 닫습니다.
    
            const inputDate = currentDate.toISOString().split('T')[0];
            fetchData(inputDate);   // 데이터를 다시 불러옵니다.
    
            return () => {
                // 필요할 경우 정리 작업을 여기에 추가할 수 있습니다.
            };
        }, [currentDate])
    );    

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

    const handleYearMonthSelect = () => {
        setCurrentDate(new Date(Date.UTC(selectedYear, selectedMonth - 1, 1)));
        setShowYearMonthPicker(false);
    };

    const handleTicketDetail = (event) => {
        navigation.navigate('ticketDetail', { "item": event });
    };

    const handleAddTicket = (date) => {
        navigation.navigate('addTicket', { "GameDate": date });
    };

    const changeMonth = (direction) => {
        if (direction === 'next') {
            setCurrentDate(addMonths(currentDate, 1));
        } else if (direction === 'prev') {
            setCurrentDate(subMonths(currentDate, 1));
        }
    };

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdayElements = weekdays.map((day, index) => (
        <Text key={index} style={styles.weekday}>{day}</Text>
    ));

    const selectedDateEvents = selectedDate
        ? events.filter(event => isSameDay(new Date(event.gameDate), selectedDate))
        : [];

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => changeMonth('prev')} style={styles.monthNavButton}>
                    <Text style={styles.navText}>{"<"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowYearMonthPicker(true)} style={styles.monthTextButton}>
                    <Text style={styles.monthText}>{format(currentDate, 'yyyy년 MM월')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeMonth('next')} style={styles.monthNavButton}>
                    <Text style={styles.navText}>{">"}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                style={styles.calendar}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.weekdaysContainer}>
                    {weekdayElements}
                </View>
                <View style={styles.daysContainer}>
                    {days.map((day) => (
                        <TouchableOpacity
                            key={day.toString()}
                            style={[
                                styles.calDay,
                                !isSameMonth(day, currentDate) && styles.otherMonth,
                                selectedDate && isSameDay(day, selectedDate) && styles.selectedDay
                            ]}
                            onPress={() => handleDateClick(day)}
                        >
                            <Text style={styles.calendarText}>{format(day, 'd')}</Text>
                            {events.some(event => isSameDay(new Date(event.gameDate), day)) && (
                                events
                                    .filter(event => isSameDay(new Date(event.gameDate), day))
                                    .slice(0, 3)
                                    .map((event, index) => (
                                        <Image
                                            key={index}
                                            source={resultMap[event.result]}
                                            style={styles.calImg}
                                        />
                                    ))
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.horizontalContainer}>
                            <Text style={styles.calendarText}>{selectedDate ? format(selectedDate, 'MM/dd') : ''}</Text>
                            <TouchableOpacity onPress={closeModal} style={styles.btnClose}>
                                <Text style={styles.calendarCloseBtn}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            style={styles.modalList}
                            contentContainerStyle={{ flexGrow: 1 }}
                        >
                            {selectedDateEvents.map((event, index) => (
                                <View key={index} style={styles.eventItem}>
                                    <TouchableOpacity onPress={() => handleTicketDetail(event)}>
                                        <View style={styles.infoView}>
                                            <Image source={resultMap[event.result]} style={styles.icon} />
                                            <View style={styles.calendarScore}>
                                                <Text style={styles.calendarText}>{event.awayScore}</Text>
                                                <Text style={styles.calendarText}> : </Text>
                                                <Text style={styles.calendarText}>{event.homeScore}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.infoView}>
                                            <Text style={styles.calendarText}>
                                                {(event.ticketName ? event.ticketName.split(' VS ')[1] : '')}
                                            </Text>
                                            <Text style={styles.calendarText}> vs </Text>
                                            <Text style={styles.calendarText}>
                                                {(event.ticketName ? event.ticketName.split(' VS ')[0] : '')}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity onPress={() => handleAddTicket(format(selectedDate, 'yyyy-MM-dd'))}>
                            <Image source={require('../public/png/free-icon-add-button.png')} style={styles.calendarAddBtn} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={showYearMonthPicker}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowYearMonthPicker(false)}
            >
                <View style={styles.pickerContainer}>
                    <View style={styles.pickerContent}>
                        <Text style={styles.pickerTitle}>기록할 날짜를 선택하세요.</Text>
                        {/* 연도 선택 */}
                        <Picker
                            selectedValue={selectedYear}
                            onValueChange={(itemValue) => setSelectedYear(itemValue)}
                            style={styles.picker}
                        >
                            {[...Array(10).keys()].map(offset => {
                                const year = currentDate.getFullYear() - 5 + offset;
                                return <Picker.Item key={year} label={year.toString()} value={year} />;
                            })}
                        </Picker>
                        {/* 월 선택 */}
                        <Picker
                            selectedValue={selectedMonth}
                            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                            style={styles.picker}
                        >
                            {[...Array(12).keys()].map(month => (
                                <Picker.Item key={month} label={(month + 1).toString()} value={month + 1} />
                            ))}
                        </Picker>
                        <TouchableOpacity onPress={handleYearMonthSelect} style={styles.confirmButton}>
                            <Text style={styles.confirmText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Calendar;
