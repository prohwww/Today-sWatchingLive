import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text, 
    TouchableOpacity,
    Modal,
    useWindowDimensions,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const InfoSetting = (userId) => {
    const fontStyle = 'MangoDdobak-';

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (userId != null) {
            setUser(user);
        };
    }, [user]);

    const userinfo = {
        userId: userId,
        nickname: 'Master',
    };

    const onPressConfirm = inputText => {
        // 닉네임 중복확인

    };

    const onPressChange = () => {
        // 비밀번호 변경 모달

    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        content: {
            flexDirection: 'row',
        },
        subject: {
            fontFamily: fontStyle + 'B',
        },
        longText: {
            width: 200,
            height: 30,
            fontFamily: fontStyle + 'R',
        },
        text: {
            fontFamily: fontStyle + 'R',
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.subject}>이메일</Text>
                <TextInput style={styles.longText}>{userInfo.email}</TextInput>
            </View>
            <View style={styles.content}>
                <Text style={styles.subject}>닉네임</Text>
                <TextInput style={styles.text}>{userInfo.nickname}</TextInput>
                <TouchableOpacity onPress={onPressConfirm}>
                    <Text style={styles.text}>중복확인</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text style={styles.subject}>비밀번호</Text>
                <TouchableOpacity onPress={onPressChange}>
                    <Text style={styles.text}>변경</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default InfoSetting;