import React, { useState } from 'react';
import { TextInput, StyleSheet, Image, View, Dimensions, Button} from 'react-native';

const screenWidth = Dimensions.get('window').width;

function LoginScreen({ navigation, onLoginSuccess }) {

  const [userID, setUserID] = useState('master');
  const [password, setPassword] = useState('0000');

  // 로그인
  const onLogin = () => {
    if (!userID) alert('아이디를 입력해주세요.');
    else if (!password) alert('비밀번호를 입력해주세요.');
    // 임시 마스터 계정
    else if (userID === 'master' && password === '0000') {
      onLoginSuccess();
    } else {
      alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const onSignin = () => {
    navigation.navigate('signin');
  };

  const onFindPw = () => {
    navigation.navigate('findPw');
  };


  return (
    <View style={styles.container}>
      <View><Image
        style={styles.mainImage}
        source={require('../public/png/free-icon-ticket.png')}
      /></View>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setUserID(text)}
        placeholder="아이디"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={text => setPassword(text)}
        placeholder="비밀번호"
      />
      <View style={styles.button}>
        <Button color='#808080' title="로그인" onPress={onLogin}/>
      </View>
      <View style={styles.button}>
        <Button color='#808080' title="회원가입" onPress={onSignin}/>
      </View>
      <View style={styles.button}>
        <Button color='#808080' title="비밀번호 찾기" onPress={onFindPw}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    marginTop: 15,
    marginBottom: 10,
    width: '50%',
    height: 40,
    borderRadius: 15,
    borderColor: 'gray',
    borderWidth: 1,
    fontFamily: 'NanumGothicBold'
  },
  button: {
    backgroundColor: '#DDDDDD',
    width: '30%',
    marginTop: 20,
    borderRadius: 15,
    fontFamily: 'NanumGothicBold'
  },
  mainImage: {
    width: screenWidth - 250,
    height: screenWidth - 250,
  },
})

export default LoginScreen;