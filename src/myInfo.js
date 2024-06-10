import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text, 
    TouchableOpacity,
    useWindowDimensions,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const MyInfo = () => {
    const navigation = useNavigation();

    const handleTeamClick = () => {
        // 응원하는 팀 목록 화면 전환
        navigation.navigate('teamlist');
    };

    const handleAccountClick = () => {
        // 계정 설정 화면 전환
        navigation.navigate('infoSetting');
    };

    const handleSettingClick = () => {
        // 시스템 설정 화면 전환        
    };

    return (
        <View style={styles.infoContainer}>
            <TouchableOpacity style={styles.myInfo} onPress={handleAccountClick}>
                <Text style={styles.infoText}>Master</Text>
                <Text style={styles.infoText}>master@gmail.com</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoItem} onPress={handleTeamClick}>
                <Image source={require('../public/png/free-icon-flag.png')} style={styles.infoImg} />
                <Text style={styles.infoText}>응원하는 팀</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoItem} onPress={handleSettingClick}>
                <Image source={require('../public/png/free-icon-web-settings.png')} style={styles.infoImg} />
                <Text style={styles.infoText}>시스템 설정</Text>
            </TouchableOpacity>
        </View>
      );

};

export default MyInfo;