import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text, 
    TouchableOpacity,
    Modal,
    useWindowDimensions,
    Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { sportsMap, teamMap } from './map';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const TeamList = () => {
    const [myTeams, setMyTeams] = useState([
        { sports: 'B', team: 'SSG 랜더스'},
        { sports: 'S', team: 'FC서울'},
    ]);
    
    const selectedTeamSports = myTeams.filter(team => sportsMap.hasOwnProperty(team.sports));

    const [selectedValue1, setSelectedValue1] = useState("BS");
    const [selectedValue2, setSelectedValue2] = useState({ label: "SSG 랜더스", value: "32" });
    const sportsOptions = [
        { label: "야구", value: "BS" },
        { label: "축구", value: "SC" },
        { label: "농구", value: "BK" },
        { label: "배구", value: "VB" },
    ];
    
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
        navigation.navigate('teamAnalysis', { selectTeam: team.team });
    };

    const handleSaveTeam = () => {
        // 팀 추가 저장 버튼
        const teamExists = myTeams.some(team => team.team === selectedValue2.label);
        if (teamExists) {
            alert('이미 추가된 팀입니다.');
            return;
        }
        const newTeam = {
            sports: selectedValue1,
            team: selectedValue2.label,
        };
        setMyTeams([...myTeams, newTeam]);
        // console.log(selectedValue1 + " " + selectedValue2.label);
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
        <View style={styles.infoContainer}>
            <TouchableOpacity onPress={addBtnClick}>
                <View style={styles.infoItem}>
                    <Image source={require('../public/png/free-icon-add-button.png')} style={styles.infoImg} />
                    <Text style={styles.infoText}>응원하는 팀을 추가해주세요</Text>
                </View>
            </TouchableOpacity>
           
            <View>
                {selectedTeamSports.map((team, index) => (
                    <TouchableOpacity key={index} onPress={viewTeamResult}>
                        <View style={styles.infoItem}>
                            <View style={styles.innerView}>
                                <Image source={sportsMap[team.sports]} style={styles.infoImg} />
                                <Text style={styles.infoText}>{team.team}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
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
                            {sportsOptions.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} style={styles.modalText}/>
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
        </View>
    );
};

export default TeamList;