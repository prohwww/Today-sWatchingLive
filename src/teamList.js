import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text, 
    TouchableOpacity,
    Modal,
    Image,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { host, sportsMap, teamMap, sportsOptions } from './map';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { format } from 'date-fns';

const TeamList = () => {
    const [myTeams, setMyTeams] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    const [selectedValue1, setSelectedValue1] = useState("BS");
    const [selectedValue2, setSelectedValue2] = useState({ label: "SSG 랜더스", value: "32" });

    const padNumber = (num) => num < 10 ? `0${num}` : num.toString();
    const currentYear =  new Date().getFullYear();

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(host + '/myTeam/list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            console.log('myTeam/list Received data:', data);
            setMyTeams(data);
        } catch (error) {
            Alert.alert('내부 오류가 있습니다. 잠시 후 다시 시도해주세요.');
            console.error('myTeam/list Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(padNumber(today.getMonth() + 1));
        setSelectedDay(padNumber(today.getDate()));
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          fetchData();
        });
        return unsubscribe;
    }, [navigation]);
    
    function addMyTeam(teamNo) {
        const url = host + '/myTeam/newMyTeam';
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                "teamNo" : teamNo,
                "regDate" : `${selectedYear}-${selectedMonth}-${selectedDay}`
          })
        })
          .then(response => {
            console.log('Response Status:', response.status);
            if (response.status === 201) {
                console.log('Create Success! teamNo: ' + teamNo);
                fetchData();
            } else {
                throw new Error('failed add Team Response: ' + response.status);
            }
          })
          .catch(error => {
            alert('내부 오류가 있습니다. 잠시 후 다시 시도해주세요.');
            console.error('myTeam/newMyTeam Error fetching data:', error);
          });
    };
    
    const [modalVisible, setModalVisible] = useState(false);
    const addBtnClick = () => {
        // 응원하는 팀 추가 버튼
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const generateYears = () => {
        const years = [];
        for (let i = currentYear - 50; i <= currentYear; i++) {
            years.push(i);
        }
        return years;
    };

    const generateMonths = () => {
        const months = [];
        for (let i = 1; i <= 12; i++) {
            months.push(i.toString().padStart(2, '0'));
        }
        return months;
    };

    const generateDays = () => {
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i.toString().padStart(2, '0'));
        }
        return days;
    };

    const navigation = useNavigation();
    const viewTeamResult = (team) => {
        // 팀 승률 그래프
        navigation.navigate('teamAnalysis', { selectTeamNo: team.teamNo });
    };

    const handleSaveTeam = () => {
        // 팀 추가 저장 버튼
        const teamExists = myTeams.some(team => team.teamName === selectedValue2.label);
        if (teamExists) {
            alert('이미 추가된 팀입니다.');
            return;
        }
        
        addMyTeam(selectedValue2.value);
        setModalVisible(false);
    };

    const handlePicker1Change = (itemValue, itemIndex) => {
        setSelectedValue1(itemValue);
        // 첫 번째 Picker의 값에 따라 두 번째 Picker의 값을 업데이트
        setSelectedValue2(teamMap[itemValue][0]);
    };

    useEffect(() => {
        setSelectedValue2(teamMap[selectedValue1][0]);
    }, [selectedValue1]);

    return (
        <View style={{ flex: 1}} >
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>데이터 로딩 중...</Text>
                </View>
            ) : ( <View style={styles.infoContainer}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <TouchableOpacity onPress={addBtnClick}>
                            <View style={styles.infoItem}>
                                <Image source={require('../public/png/free-icon-add-button.png')} style={styles.infoImg} />
                                <Text style={styles.infoText}>응원하는 팀을 추가해주세요</Text>
                            </View>
                        </TouchableOpacity>
                    
                        <View>
                            {myTeams.map((team, index) => (
                                <TouchableOpacity key={index} onPress={() => viewTeamResult(team)}>
                                    <View style={styles.infoItem}>
                                        <View style={styles.innerView}>
                                            <Image source={sportsMap[team.sportsKind]} style={styles.infoImg} />
                                            <Text style={styles.infoText}>{team.teamName}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={closeModal}
                    >
                        <View style={styles.teamModalContainer}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>스포츠를 선택하세요.</Text>
                            </View>
                                
                            <View style={styles.modalView}>
                                {/* SportsKind */}
                                <Picker
                                    selectedValue={selectedValue1}
                                    onValueChange={handlePicker1Change}
                                    style={styles.picker}
                                >
                                    {Object.keys(sportsMap).map((key, index) => (
                                            <Picker.Item key={index} label={sportsOptions[key]} value={key} style={styles.modalText}/>
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.modalView}>
                                {/* Team */}
                                <Picker
                                    selectedValue={selectedValue2.value}
                                    onValueChange={(itemValue, itemIndex) => {
                                        const selectedOption = teamMap[selectedValue1].find(option => option.value === itemValue);
                                        setSelectedValue2(selectedOption);
                                    }}
                                    style={styles.picker}
                                >
                                    {teamMap[selectedValue1].map((option, index) => (
                                        <Picker.Item key={index} label={option.label} value={option.value} style={styles.modalText} />
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.containerDate}>
                                <Text style={styles.modalText}>응원 시작한 날짜를 선택하세요.</Text>
                                <Picker
                                    selectedValue={selectedYear}
                                    style={styles.pickerDate}
                                    onValueChange={(itemValue) => setSelectedYear(itemValue)}
                                >
                                    {generateYears().map((year) => (
                                    <Picker.Item key={year} label={year.toString()} value={year} style={styles.modalText} />
                                    ))}
                                </Picker>

                                <Picker
                                    selectedValue={selectedMonth}
                                    style={styles.pickerDate}
                                    onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                                >
                                    {generateMonths().map((month) => (
                                    <Picker.Item key={month} label={month.toString()} value={month} style={styles.modalText} />
                                    ))}
                                </Picker>

                                <Picker
                                    selectedValue={selectedDay}
                                    style={styles.pickerDate}
                                    onValueChange={(itemValue) => setSelectedDay(itemValue)}
                                >
                                    {generateDays().map((day) => (
                                    <Picker.Item key={day} label={day.toString()} value={day} style={styles.modalText} />
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.modalBtn}>
                                <TouchableOpacity onPress={handleSaveTeam}>
                                    <Text style={styles.modalText}>저장  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={closeModal}>
                                    <Text style={styles.modalText}>  닫기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View> )}
            </View>
    );
};

export default TeamList;