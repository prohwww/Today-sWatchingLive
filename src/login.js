import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, Image, View } from 'react-native';
import styles from './style';
import { host } from './map';
import { JSEncrypt } from 'jsencrypt'; // RSA 암호화를 위한 라이브러리

function LoginScreen({ navigation, onLoginSuccess }) {

  const [userID, setUserID] = useState('master');
  const [password, setPassword] = useState('0000');

  // 로그인
  const onLogin = () => {

    if (!userID) alert('아이디를 입력해주세요.');
    if (!password) alert('비밀번호를 입력해주세요.');

    fetch(host + '/user/public-key', {
      method: 'GET',
    })
      .then(response => response.text()) 
      .then(publicKey => {
        const encryptor = new JSEncrypt();
        encryptor.setPublicKey(publicKey);

        const encryptedPassword = encryptor.encrypt(password);
        if (!encryptedPassword) {
          alert('비밀번호 암호화에 실패했습니다.');
          throw new Error('비밀번호 암호화에 실패했습니다.');
        }

        return fetch(host + '/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userID,
            password: encryptedPassword,
          }),
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('로그인 요청에 실패했습니다.');
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data);
        if (data === true) {
          onLoginSuccess();
        } else {
          alert('아이디 또는 비밀번호가 잘못되었습니다.');
        }
      })
      .catch(error => {
        alert('로그인 중 오류가 발생했습니다.');
        console.error('Error:', error.message); // 오류 메시지 출력
      });
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
        secureTextEntry={true}
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
