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
    Text, 
    TouchableOpacity,
    Modal,
    ScrollView,
    SafeAreaView,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar as RNCalendar } from 'react-native-calendars';
// import { Picker } from '@react-native-picker/picker';
import {resultMap} from './map';
import styles from './style';
  
const Calendar = ({ initialDate }) => {
    const navigation = useNavigation();
    const [currentDate, setCurrentDate] = useState(initialDate || new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);
    // const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    // const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
    const [showSmallCalendar, setShowSmallCalendar] = useState(false); 
    const [events, setEvents] = useState([
        { TicketNo: 1, GameDate: new Date(2024, 3, 28), SportKind: 'BS', result: 'W', HomeTeamCd: 'SSG 랜더스', AwayTeamCd: 'KT 위즈', HomeScore: 11, AwayScore: 6 },
        { TicketNo: 2, GameDate: new Date(2024, 3, 21), SportKind: 'BS', result: 'L', HomeTeamCd: 'SSG 랜더스', AwayTeamCd: 'LG 트윈스', HomeScore: 8, AwayScore: 10 },
        { TicketNo: 3, GameDate: new Date(2024, 3, 21), SportKind: 'BS', result: 'T', HomeTeamCd: 'SSG 랜더스', AwayTeamCd: 'LG 트윈스', HomeScore: 5, AwayScore: 5 },
        { TicketNo: 1, GameDate: new Date(2024, 5, 1), SportKind: 'BS', result: 'W', HomeTeamCd: '한화 이글스', AwayTeamCd: 'SSG 랜더스', HomeScore: 6, AwayScore: 8 },
        { TicketNo: 2, GameDate: new Date(2024, 5, 21), SportKind: 'BS', result: 'W', HomeTeamCd: 'SSG 랜더스', AwayTeamCd: 'LG 트윈스', HomeScore: 8, AwayScore: 10 },
        { TicketNo: 3, GameDate: new Date(2024, 5, 21), SportKind: 'BS', result: 'W', HomeTeamCd: 'SSG 랜더스', AwayTeamCd: 'LG 트윈스', HomeScore: 5, AwayScore: 5 },
        { TicketNo: 1, GameDate: new Date(2024, 5, 21), SportKind: 'BS', result: 'W', HomeTeamCd: 'SSG 랜더스', AwayTeamCd: 'LG 트윈스', HomeScore: 5, AwayScore: 5 },
        { TicketNo: 2, GameDate: new Date(2024, 5, 21), SportKind: 'BS', result: 'W', HomeTeamCd: 'SSG 랜더스', AwayTeamCd: 'LG 트윈스', HomeScore: 5, AwayScore: 5 },
        { TicketNo: 3, GameDate: new Date(2024, 5, 21), SportKind: 'BS', result: 'T', HomeTeamCd: 'SSG 랜더스', AwayTeamCd: 'LG 트윈스', HomeScore: 5, AwayScore: 5 },
        { TicketNo: 1, GameDate: new Date(2024, 5, 21), SportKind: 'BS', result: 'T', HomeTeamCd: 'SSG 랜더스', AwayTeamCd: 'LG 트윈스', HomeScore: 5, AwayScore: 5 },
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

    const selectDateFromSmallCalendar = (day) => {
        setCurrentDate(new Date(day.timestamp));
        setShowSmallCalendar(false);
    };

    // const handleYearMonthSelect = () => {
    //     setCurrentDate(new Date(selectedYear, selectedMonth - 1, 1));
    //     setShowYearMonthPicker(false);
    // };

    const handleTicketDetail = (event) => {
        // 티켓 상세 화면 조회
        console.log(event.SportKind);
        navigation.navigate('ticketDetail', { event });
    };

    const handleAddTicket = (date) => {
        // 티켓 추가 화면
        navigation.navigate('addTicket');
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

    const selectedDateEvents = events.filter(event => isSameDay(event.GameDate, selectedDate));

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => changeMonth('prev')} style={styles.monthNavButton}>
                    <Text style={styles.navText}>{"<"}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => setShowYearMonthPicker(true)} style={styles.monthTextButton}> */}
                <TouchableOpacity onPress={() => setShowSmallCalendar(true)} style={styles.monthTextButton}>
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
                            key={day}
                            style={[
                                styles.calDay, 
                                !isSameMonth(day, currentDate) && styles.otherMonth,
                                selectedDate && isSameDay(day, selectedDate) && styles.selectedDay
                            ]}
                            onPress={() => handleDateClick(day)}
                        >
                            <Text style={styles.calendarText}>{format(day, 'd')}</Text>
                            {events.some(event => isSameDay(event.GameDate, day)) && (
                                events
                                    .filter(event => isSameDay(event.GameDate, day))
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
                            contentContainerStyle={{ flexGrow: 1}}
                        >
                            {selectedDateEvents.map((event, index) => (
                                <View key={index} style={styles.eventItem}>
                                    <TouchableOpacity onPress={() => handleTicketDetail(event)}>
                                        <View style={styles.infoView}>
                                            <Image source={resultMap[event.result]} style={styles.icon} />
                                            <View style={styles.calendarScore}>
                                                <Text style={styles.calendarText}>{event.AwayScore}</Text>
                                                <Text style={styles.calendarText}> : </Text>
                                                <Text style={styles.calendarText}>{event.HomeScore}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.infoView}>
                                            <Text style={styles.calendarText}>{event.AwayTeamCd}</Text>
                                            <Text style={styles.calendarText}> vs </Text>
                                            <Text style={styles.calendarText}>{event.HomeTeamCd}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>

                        <TouchableOpacity onPress={(date) => handleAddTicket(date)}>
                            <Image source={require('../public/png/free-icon-add-button.png')} style={styles.calendarAddBtn}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={showSmallCalendar}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setShowSmallCalendar(false)}
            >
                <View style={styles.smallCalendarContainer}>
                    <View style={styles.smallCalendarContent}>
                        <RNCalendar
                            onDayPress={selectDateFromSmallCalendar}
                            markedDates={{
                                [format(currentDate, 'yyyy-MM-dd')]: { selected: true }
                            }}
                        />
                        <TouchableOpacity onPress={() => setShowSmallCalendar(false)} style={styles.calBtnClose}>
                            <Text style={styles.calendarCloseBtn}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* <Modal
                visible={showYearMonthPicker}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowYearMonthPicker(false)}
            >
                <View style={styles.pickerContainer}>
                    <View style={styles.pickerContent}>
                        <Text style={styles.pickerTitle}>Select Year and Month</Text>
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
                            <Text style={styles.confirmText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal> */}
        </SafeAreaView>
    );
};

export default Calendar;
