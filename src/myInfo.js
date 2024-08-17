import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import styles from './style';
import { host } from './map';

const MyInfo = () => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState(null);

    const handleTeamClick = () => {
        // 응원하는 팀 목록 화면 전환
        navigation.navigate('teamlist');
    };

    const handleAccountClick = () => {
        // 계정 설정 화면 전환
        navigation.navigate('infoSetting', userInfo);
    };

    const handleSettingClick = () => {
        // 시스템 설정 화면 전환        
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(host + '/user/myInfo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('UserInfo data:', data);
            setUserInfo(data);
            
        } catch (error) {
            Alert.alert('Error fetching data!');
            console.error('Error fetching data:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    return (
        <View style={styles.infoContainer}>
            {userInfo ? (
                <>
                    <TouchableOpacity style={styles.myInfo} onPress={handleAccountClick}>
                        <Text style={styles.infoText}>{userInfo.nickName}</Text>
                        <Text style={styles.infoText}>{userInfo.email}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoItem} onPress={handleTeamClick}>
                        <Image source={require('../public/png/free-icon-flag.png')} style={styles.infoImg} />
                        <Text style={styles.infoText}>응원하는 팀</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoItem} onPress={handleSettingClick}>
                        <Image source={require('../public/png/free-icon-web-settings.png')} style={styles.infoImg} />
                        <Text style={styles.infoText}>시스템 설정</Text>
                    </TouchableOpacity>
                </>
            ) : (<Text style={styles.infoText}>Loading...</Text>
            )}

        </View>
    );

};

export default MyInfo;