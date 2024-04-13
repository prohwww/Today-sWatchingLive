import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, TextInput, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';

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
    <View style={styles.component}>
      <View style={styles.headContainer}>
        <Text style={styles.header}>회원가입</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>이메일</Text>
        <TextInput
          onChangeText={text => {
            setEmailTxt(text);
          }}
          value={emailTxt}
          placeholder="이메일을 입력하세요."
          style={styles.emailInput}
        />
        <Text style={styles.context}>@</Text>
        <Picker
          style={styles.combo}
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
      <View style={styles.container}>
        <Text style={styles.title}>닉네임</Text>
        <TextInput
          onChangeText={text => {
            setNickTxt(text);
          }}
          value={nickTxt}
          placeholder="닉네임을 입력하세요."
          style={styles.txtInput}
        />
        <Button title="중복확인" color="#FA5858" onPress={onPressCheck} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>비밀번호</Text>
        <TextInput
          onChangeText={text => {
            setPwTxt(text);
            setIsPwOk(false);
          }}
          value={pwTxt}
          placeholder="비밀번호를 입력하세요."
          style={styles.pwInput}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          onChangeText={onChangePwConfirm}
          value={pwConfirmTxt}
          placeholder="비밀번호를 한번 더 입력하세요."
          style={styles.confirmTxt}
          secureTextEntry={true}
        />
      </View>
      <Text style={styles.text}>{errText}</Text>
      <View style={styles.btnContainer}>
        <Button title="회원가입" color="#A4A4A4" onPress={onPressConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: 'white',
    flex: 1,
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1
  },
  btnContainer: {
    paddingHorizontal: 10,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1
  },
  header: {
    fontSize: 25,
    // flex: 5,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  text: {
    paddingVertical: 7,
    paddingLeft: 10,
    // paddingHorizontal: 60,
    fontSize: 15,
    color: 'black',
  },
  context: {
    fontSize: 10,
    color: 'black',
  },
  emailInput: {
    width: 130,
    height: 40,
    marginLeft: 12,
    marginVertical: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 0.5,
    paddingVertical: 5,
    marginRight: 10,
  },
  combo: {
    width: 160,
    height: 40,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 0.5,
    paddingVertical: 5,
  },
  txtInput: {
    width: 200,
    height: 40,
    marginLeft: 12,
    marginRight: 7,
    marginVertical: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 0.5,
  },
  pwInput: {
    width: 200,
    height: 40,
    marginVertical: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 0.5,
  },
  confirmTxt: {
    width: 200,
    height: 40,
    marginLeft: 67,
    marginVertical: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 0.5,
  },
});

export default SignIn;
