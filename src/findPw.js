import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, TextInput, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';

function FindPw() {
  const [emailTxt, setEmailTxt] = useState('');
  const infoText = '가입할 때 입력하신 이메일을 입력해주세요.';
  const errText = '가입되지 않은 이메일 입니다. 회원가입을 해주세요.';

  const item = useState('');

  const onChangeEmail = inputText => {
    // 이메일 유효한지 체크 및 임시 비밀번호 보내기
    setEmailTxt(inputText);
    console.log(inputText);
  };

  return (
    <View>
      <Text style={styles.header}>비밀번호 찾기</Text>
      <Text style={styles.text}>{infoText}</Text>
      <View style={styles.container}>
        <Text style={styles.title}>이메일</Text>
        <TextInput
          onChangeText={onChangeEmail}
          value={emailTxt}
          style={styles.emailInput}
        />
        <Text style={styles.context}>    @</Text>
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
      <Text style={styles.text} id="errText" />
      <View style={styles.btnContainer}>
        <Button
          title="찾기"
          color="#A4A4A4"
          onPress={() =>
            Alert.alert(
              '이메일로 임시 비밀번호를 보냈습니다.\n로그인 후 설정에서 비밀번호를 변경해주세요.',
            )
          }
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
    paddingHorizontal: 115,
    paddingVertical: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
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
});

export default FindPw;
