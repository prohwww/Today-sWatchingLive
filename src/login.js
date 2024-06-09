import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, Image, View, Dimensions } from 'react-native';
import styles from './style';

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
    <View style={styles.LoginContainer}>
      <View>
        <Image
          style={styles.LoadingImg}
          source={require('../public/png/free-icon-ticket.png')}
        />
      </View>
      <TextInput
        onChangeText={text => setUserID(text)}
        placeholder="아이디"
        style={styles.LoginTextInput}
      />
      <TextInput
        style={styles.LoginTextInput}
        onChangeText={text => setPassword(text)}
        placeholder="비밀번호"
      />
      <TouchableOpacity style={styles.LoginButton} onPress={onLogin}>
        <Text style={styles.onlyFontR}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.LoginButton} onPress={onSignin}>
        <Text style={styles.onlyFontR}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.LoginButton} onPress={onFindPw}>
        <Text style={styles.onlyFontR}>비밀번호 찾기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;