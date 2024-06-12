import React, {useState} from 'react';
import {View, Text, TextInput, Alert, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from './style';

function FindPw() {
  const [pickerValue, setPickerValue] = useState('1');
  const [emailText, setEmailText] = useState('');
  const [isEmailOk, setIsEmailOk] = useState(false);
  const [errText, seterrText] = useState('');
  const infoText = '가입할 때 입력하신 이메일을 입력해주세요.';

  const onChangeEmail = (inputText) => {
    const filteredText = inputText.replace(/[^a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');

    // 이메일 유효한지 체크 및 임시 비밀번호 보내기
    setEmailText(filteredText);
    // 유효한 경우
    setIsEmailOk(true);

    // 유효하지 않은 경우
    setIsEmailOk(false);
    seterrText('가입되지 않은 이메일 입니다. 회원가입을 해주세요.');
    // console.log(filteredText);
  };

  function onPressConfim() {
    if (isEmailOk) {

      Alert.alert('이메일로 임시코드를 보냈습니다.');
    } else {
      Alert.alert('이메일을 다시 확인해주세요.');
    }
  }

  return (
    <View style={styles.component}>
      <View style={styles.pwheadContainer}>
        <Text style={styles.pwHeader}>비밀번호 찾기</Text>
      </View>
      <Text style={styles.pwText}>{infoText}</Text>
      <View style={styles.pwContainer}>
        <Text style={styles.pwTitle}>이메일</Text>
        <TextInput
          onChangeText={onChangeEmail}
          value={emailText}
          style={styles.pwEmailInput}
          placeholder="이메일"
        />
        <Text style={styles.pwContext}>@</Text>
        <Picker
          style={styles.pwCombo}
          selectedValue={pickerValue}
          onValueChange={value => {
            setPickerValue(value);
          }}>
          <Picker.Item label="gmail.com" value="gmail.com" style={styles.pwText}/>
          <Picker.Item label="naver.com" value="naver.com" style={styles.pwText}/>
          <Picker.Item label="daum.net" value="daum.net" style={styles.pwText}/>
          <Picker.Item label="hanmail.net" value="hanmail.net" style={styles.pwText}/>
        </Picker>
      </View>
      <Text style={styles.pwText}>{errText}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.searchBtn} onPress={onPressConfim}>
          <Text style={styles.pwText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FindPw;
