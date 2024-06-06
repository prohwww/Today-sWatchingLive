import React, { useState } from 'react';
import { Image, View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './style';

function SignIn() {
  const [pickerValue, setPickerValue] = useState('1');
  const [emailTxt, setEmailTxt] = useState('');
  const [nickTxt, setNickTxt] = useState('');
  const [pwTxt, setPwTxt] = useState('');
  const [pwConfirmTxt, setPwConfirmTxt] = useState('');
  const [errText, setErrText] = useState('');
  const [isEmailOk, setIsEmailOk] = useState(false);
  const [isNickOk, setIsNickOk] = useState(false);
  const [isPwOk, setIsPwOk] = useState(false);

  const onChangePwConfirm = inputText => {
    // 비밀번호 확인 검사
    setPwConfirmTxt(inputText);
    if (pwTxt.matchAll(inputText) && !pwTxt.matchAll('')) {
      setErrText('비밀번호가 일치합니다.');
      setIsPwOk(true);
    } else {
      setErrText('비밀번호를 다시 확인해주세요.');
      setIsPwOk(false);
    }
  };

  function onPressCheck() {
    // 중복확인 버튼
    // 이메일 및 닉네임 중복 검사
    // 이메일 검사
    setIsEmailOk(true);
    // 이메일 중복
    setIsEmailOk(false);
    // 닉네임 검사
    setIsNickOk(true);
    // 닉네임 중복
    setIsNickOk(false);

  }

  function onPressConfirm() {
    // 회원가입 버튼
    // 이메일/닉네임/비밀번호 입력 검사하여 alert 팝업
    if (isEmailOk && isNickOk && isPwOk) {
      console.log(isEmailOk + ' / ' + isNickOk + ' / ' + isPwOk);
      Alert.alert('회원가입이 완료되었습니다.');
    } else if (!isEmailOk) {
      Alert.alert('이메일을 확인해주세요.');
    } else if (!isNickOk) {
      Alert.alert('닉네임을 확인해주세요.');
    } else if (!isPwOk) {
      Alert.alert('비밀번호를 확인해주세요.');
    }
  }

  return (
    <View style={styles.JoinContainer}>
      <View style={styles.JoinHeadContainer}>
        <Text style={styles.JoinHeader}>회원가입</Text>
      </View>
      <View style={styles.JoinHeaderImg}><Image
        style={styles.JoinImg}
        source={require('../public/png/free-icon-ticket.png')}
      /></View>
      <View style={styles.JoinSubContainer}>
        <Text style={styles.JoinTitle}>이메일 </Text>
        <TextInput
          onChangeText={text => {
            setEmailTxt(text);
          }}
          value={emailTxt}
          placeholder="이메일 주소"
          style={styles.JoinEmailInput}
        />
        <Text style={styles.JoinContext}>@</Text>
        <Picker
          style={styles.JoinCombo}
          selectedValue={pickerValue}
          onValueChange={value => {
            setPickerValue(value);
          }}>
          <Picker.Item label="gmail.com" value="gmail.com" />
          <Picker.Item label="naver.com" value="naver.com" />
          <Picker.Item label="daum.net" value="daum.net" />
          <Picker.Item label="hanmail.net" value="hanmail.net" />
        </Picker>
      </View>
      <View style={styles.JoinSubContainer}>
        <Text style={styles.JoinTitle}>닉네임 </Text>
        <TextInput
          onChangeText={text => {
            setNickTxt(text);
          }}
          value={nickTxt}
          placeholder="닉네임"
          style={styles.JoinTxtInput}
        />
        <TouchableOpacity style={styles.JoinButton} onPress={onPressCheck}>
          <Text style={styles.LoginButtonText}>중복확인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.JoinSubContainer}>
        <Text style={styles.JoinTitle}>비밀번호</Text>
        <TextInput
          onChangeText={text => {
            setPwTxt(text);
            setIsPwOk(false);
          }}
          value={pwTxt}
          placeholder="비밀번호"
          style={styles.JoinPwInput}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.JoinSubContainer}>
        <TextInput
          onChangeText={onChangePwConfirm}
          value={pwConfirmTxt}
          placeholder="비밀번호(확인)"
          style={styles.JoinConfirmTxt}
          secureTextEntry={true}
        />
      </View>
      <Text style={styles.LoginButtonText}>{errText}</Text>
      <View style={styles.JoinBtnContainer}>
        <TouchableOpacity style={styles.JoinButton} onPress={onPressConfirm}>
          <Text style={styles.LoginButtonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignIn;
