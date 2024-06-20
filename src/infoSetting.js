import React, { useState, useEffect } from 'react';
import {
    View,
    Text, 
    TouchableOpacity,
    TextInput,
    Modal,
} from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const InfoSetting = (userId) => {
    const navigation = useNavigation();

    const [user, setUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (userId != null) {
            setUser(user);
        };
    }, [user]);

    const userInfo = {
        userId: userId,
        nickname: 'Master',
        email: 'master@google.com',
        regDate: '2021/03/23',
    };
      // 모달 열기 함수
    const openModal = () => {
        setModalVisible(true);
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setModalVisible(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorMessage('');
    };

    // 창 닫기
    const closeWindow = () => {
        navigation.goBack();
    };

    const handleChangeSetting = () => {
        // TODO 내 정보 변경

    };

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
          setErrorMessage('비밀번호를 다시 확인해주세요.');
        } else {
          setErrorMessage('');
          // TODO 비밀번호 변경 로직 추가(서버)
          console.log('Password changed');
          closeModal();
        }
    };

    const onPressConfirm = inputText => {
        // TODO 닉네임 중복확인 로직 추가(서버)
        // alert
    };

    return (
        <View style={styles.setContainer}>
            <View style={styles.pwheadContainer}>
                <Text style={styles.pwHeader}>계정 설정</Text>
            </View>
            <View>
                <View style={styles.setContent}>
                    <Text style={styles.subject}>이메일</Text>
                    <Text style={styles.setText}>{userInfo.email}</Text>
                </View>
                <View style={styles.setContent}>
                    <Text style={styles.subject}>닉네임</Text>
                    <TextInput style={styles.setEmailInput}>{userInfo.nickname}</TextInput>
                    <TouchableOpacity onPress={onPressConfirm} style={styles.searchBtn}>
                        <Text style={styles.setText}>중복확인</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.setContent}>
                    <Text style={styles.subject}>비밀번호</Text>
                    <TouchableOpacity onPress={openModal} style={styles.searchBtn}>
                        <Text style={styles.setText}>비밀번호 변경</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.setContent}>
                    <Text style={styles.subject}>가입일</Text>
                    <Text style={styles.setText}>{userInfo.regDate}</Text>
                </View>
            </View>
            <View style={styles.setBtnContainer}>
                <TouchableOpacity style={styles.cancelBtn} onPress={closeWindow}>
                    <Text style={styles.cancelBtnText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitBtn} onPress={handleChangeSetting}>
                    <Text style={styles.submitBtnText}>변경</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.setModalContainer}>
                        <Text style={styles.modalTitle}>비밀번호 변경</Text>

                        <TextInput
                        style={styles.setInput}
                        placeholder="현재 비밀번호"
                        secureTextEntry={true}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        />

                        <TextInput
                        style={styles.setInput}
                        placeholder="새 비밀번호"
                        secureTextEntry={true}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        />

                        <TextInput
                        style={styles.setInput}
                        placeholder="비밀번호 확인"
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        />

                        {errorMessage ? (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                        ) : null}

                        <View style={styles.setBtnContainer}>
                            <TouchableOpacity style={styles.cancelBtn} onPress={closeModal}>
                                <Text style={styles.cancelBtnText}>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.submitBtn} onPress={handleChangePassword}>
                                <Text style={styles.submitBtnText}>변경</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default InfoSetting;