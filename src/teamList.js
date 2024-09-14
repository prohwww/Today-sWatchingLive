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

const TeamList = () => {
    const [myTeams, setMyTeams] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    const [selectedValue1, setSelectedValue1] = useState("BS");
    const [selectedValue2, setSelectedValue2] = useState({ label: "SSG 랜더스", value: "32" });

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
    }, [fetchData]);

    function addMyTeam(teamNo) {
        console.log("teamno: " + teamNo);
        const url = host + '/myTeam/newMyTeam';
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                "teamNo" : teamNo
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