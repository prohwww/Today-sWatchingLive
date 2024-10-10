import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { host } from './map';

const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date)) {
        return '';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const InfoSetting = ({ route }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [nickName, setNickName] = useState('');
    const [isCheckPw, setIsCheckPw] = useState(false);
    const [isCheckNick, setIsCheckNick] = useState(false);
    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        if (route.params) {
            const data  = route.params;
            setUserInfo(data); // editData를 상태로 설정
            setNickName(data.nickName); // userInfo의 닉네임을 초기 nickname 상태로 설정
        }
    }, [route.params]);

    function fetchCheckNick() {
        const url = host + `/user/checkNickname?nickName=${encodeURIComponent(nickName)}`;
        fetch(url, {
          method: 'GET',
          headers: {
                'Content-Type': 'application/json'
          }})
          .then(response => {
                return response.json();
          })
          .then(data => {
                console.log('Response JSON Data:', data);
        
            if (data === false) {
                console.log('user/checkNickname Success');
                setIsCheckNick(true);
            } else {
                setIsCheckNick(false);
                throw new Error('Failed check nickname');
            }
          })
          .catch(error => {
                alert('중복된 닉네임 입니다. 다른 닉네임을 입력하세요.');
                console.error('user/checkNickname Error fetching data:', error);
                setIsCheckNick(false);
          });
    }

    function changePassword() {
        const url = host + '/user/changePw';
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                "password" : currentPassword,
                "changePassword" : newPassword
          })
        })
          .then(response => {
            console.log('Response Status:', response.status);
            if (response.status === 200) {
                console.log('user/changePw Success');
                setIsCheckPw(true);
            } else {
                setIsCheckPw(false);
                throw new Error('failed change password Response: ' + response.status);
            }
          })
          .catch(error => {
            alert('현재 비밀번호를 다시 확인해주세요.');
            setIsCheckPw(false);
            console.error('user/changePw Error fetching data:', error);
          });
    };

    function changeUserInfo() {
        const url = host + '/user/changeInfo';
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                "nickName" : nickName
          })
        })
          .then(response => {
            console.log('Response Status:', response.status);
            if (response.status === 200) {
                setIsChange(true);
                console.log('Change user info Success!');
            } else {
                setIsChange(false);
                throw new Error('failed change user info Response: ' + response.status);
            }
          })
          .catch(error => {
                setIsChange(false);
                alert('내부 오류가 있습니다. 잠시 후 다시 시도해주세요.');
                console.error('user/changeInfo Error fetching data:', error);
          });
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
        if (nickName == userInfo.nickName) {
            alert("변경된 정보가 없습니다.");
        } else if (!isCheckNick) {
            alert("닉네임 중복확인을 해주세요.");
        } else {
            changeUserInfo();
            if (isChange) {
                alert("변경되었습니다.");
                navigation.goBack();
            }
        }
    };

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
          setErrorMessage('새 비밀번호를 다시 확인해주세요.');
        } else {
          setErrorMessage('');
          changePassword();

          if (isCheckPw) {
            closeModal();
          }
        }
    };

    const onPressConfirm = inputText => {
        fetchCheckNick();
        if(isCheckNick) {
            alert('사용가능한 닉네임 입니다.');
        }
    };

    return (
        <View style={styles.setContainer}>
            {userInfo ? (
                <>
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
                            <TextInput style={styles.setEmailInput} onChangeText={setNickName}>{nickName}</TextInput>
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
                            <Text style={styles.setText}>{formatDate(userInfo.regDate)}</Text>
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
                </>
            ) : (<Text style={styles.infoText}>Loading...</Text>
            )}
        </View>
    );
};

export default InfoSetting;