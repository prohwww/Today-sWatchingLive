import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, TextInput, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';

function SignIn() {
  const [emailTxt, setEmailTxt] = useState('');
  const [nickTxt, setNickTxt] = useState('');
  const [pwTxt, setPwTxt] = useState('');
  const [pwConfirmTxt, setPwConfirmTxt] = useState('');

  const item = useState('');

  const onChangeEmail = inputText => {
    // 이메일 검사 및 저장
    setEmailTxt(inputText);
    console.log(inputText);
  };
  const onChangeNick = inputText => {
    // 닉네임 검사 및 저장
    setNickTxt(inputText);
    console.log(inputText);
  };
  const onChangePw = inputText => {
    // 비밀번호 검사 및 저장
    setPwTxt(inputText);
    console.log(inputText);
  };
  
  const onPwConfirm = inputText => {
    // 비밀번호 확인 검사
    setPwConfirmTxt(inputText);
    console.log(inputText);
  };

  const onClickSave = () => {
    // 회원가입 버튼
    // 이메일 및 닉네임/ 비밀번호 검사하여 alert 팝업
  };

  return (
    <View>
      <Text style={styles.header}>회원가입</Text>
      <View style={styles.container}>
        <Text style={styles.title}>이메일</Text>
        <TextInput
          onChangeText={onChangeEmail}
          value={emailTxt}
          placeholder="이메일을 입력하세요."
          style={styles.emailInput}
        />
        <Text style={styles.context}>      @</Text>
        <Picker
          style={styles.combo}
          selectedValue={this.state}
          onValueChange={(value, index) => {
            this.setState({itemArea: value});
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
          onChangeText={onChangeNick}
          value={nickTxt}
          placeholder="닉네임을 입력하세요."
          style={styles.txtInput}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>비밀번호</Text>
        <TextInput
          onChangeText={onChangePw}
          value={pwTxt}
          placeholder="비밀번호를 입력하세요."
          style={styles.pwInput}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          onChangeText={onPwConfirm}
          value={pwConfirmTxt}
          placeholder="비밀번호를 한번 더 입력하세요."
          style={styles.confirmTxt}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="회원가입"
          color="#A4A4A4"
          onPress={() => Alert.alert('Left button pressed')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
    paddingHorizontal: 150,
    paddingVertical: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
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
