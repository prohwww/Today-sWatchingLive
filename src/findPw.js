import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Alert, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';

function FindPw() {
  const [pickerValue, setPickerValue] = useState('1');
  const [emailText, setEmailText] = useState('');
  const [isEmailOk, setIsEmailOk] = useState(false);
  const [errText, seterrText] = useState('');
  const infoText = '가입할 때 입력하신 이메일을 입력해주세요.';

  const onChangeEmail = inputText => {
    // 이메일 유효한지 체크 및 임시 비밀번호 보내기
    setEmailText(inputText);
    // 유효한 경우
    setIsEmailOk(true);

    // 유효하지 않은 경우
    setIsEmailOk(false);
    seterrText('가입되지 않은 이메일 입니다. 회원가입을 해주세요.');
    console.log(inputText);
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
      <View style={styles.headContainer}>
        <Text style={styles.header}>비밀번호 찾기</Text>
      </View>
      <Text style={styles.text}>{infoText}</Text>
      <View style={styles.container}>
        <Text style={styles.title}>이메일</Text>
        <TextInput
          onChangeText={onChangeEmail}
          value={emailText}
          style={styles.emailInput}
        />
        <Text style={styles.context}>@</Text>
        <Picker
          style={styles.combo}
          selectedValue={pickerValue}
          onValueChange={value => {
            setPickerValue(value);
          }}>
          <Picker.Item label="gmail.com" value="gmail.com" style={styles.text}/>
          <Picker.Item label="naver.com" value="naver.com" style={styles.text}/>
          <Picker.Item label="daum.net" value="daum.net" style={styles.text}/>
          <Picker.Item label="hanmail.net" value="hanmail.net" style={styles.text}/>
        </Picker>
      </View>
      <Text style={styles.text}>{errText}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={onPressConfim}>
          <Text style={styles.text}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.btnContainer}>
        <Button title="찾기" color="#A4A4A4" onPress={onPressConfim} />
      </View> */}
    </View>
  );
}

const fontStyle = 'MangoDdobak-';

const styles = StyleSheet.create({
  component: {
    backgroundColor: 'white',
    flex: 1,
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1
  },
  btnContainer: {
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#DDDDDD',
    width: '30%',
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  header: {
    fontSize: 25,
    color: 'black',
    marginRight: 10,
    marginBottom: 10,
    paddingVertical: 10,
    fontFamily: fontStyle + 'B',
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: fontStyle + 'R',
  },
  text: {
    paddingVertical: 7,
    paddingLeft: 10,
    // paddingHorizontal: 60,
    fontSize: 15,
    color: 'black',
    fontFamily: fontStyle + 'R',
  },
  context: {
    fontSize: 10,
    color: 'black',
  },
  img: {
    width: 40,
    height: 40,
    overflow: 'hidden',
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
    fontFamily: fontStyle + 'R',
  },
  combo: {
    width: 160,
    height: 40,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 0.5,
    paddingVertical: 5,
    fontFamily: fontStyle + 'R',
  },
});

export default FindPw;
