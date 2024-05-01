import React, { useState } from 'react';
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

const MyInfo = () => {
    const windowWidth = useWindowDimensions().width;
    const cellWidth = windowWidth - 10;

    const handleTeamClick = () => {
        // 응원하는 팀 목록 화면 전환
        
    };

    const handleSettingClick = () => {
        // 시스템 설정 화면 전환
        
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        myInfo: {
            padding: 10,
            margin: 5,
            borderWidth: 1,
            justifyContent: 'space-between',
            width: cellWidth,
            backgroundColor: '#D8D8D8',
        },
        infoText: {
            color: 'black',
            fontFamily: 'NanumGothicBold',
            fontSize: 18,
            padding: 5,
        },
        item: {
            padding: 5,
            margin: 5,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            width: cellWidth,
        },
        img: {
            width: 50,
            height: 50,
            marginRight: 5,
        },
      });

    return (
        <View style={styles.container}>
            <View style={styles.myInfo}>
                <Text style={styles.infoText}>Master</Text>
                <Text style={styles.infoText}>master@gmail.com</Text>
            </View>
            <TouchableOpacity style={styles.item} onPress={handleTeamClick}>
                <Image source={require('../public/png/free-icon-flag.png')} style={styles.img} />
                <Text style={styles.infoText}>응원하는 팀</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={handleSettingClick}>
                <Image source={require('../public/png/free-icon-web-settings.png')} style={styles.img} />
                <Text style={styles.infoText}>시스템 설정</Text>
            </TouchableOpacity>
        </View>
      );

};

export default MyInfo;