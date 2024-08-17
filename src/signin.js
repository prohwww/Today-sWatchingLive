import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import styles from './style';
import { host } from './map';

function SignIn() {
  const navigation = useNavigation();

  const [pickerValue, setPickerValue] = useState('gmail.com');
  const [idTxt, setIdTxt] = useState('');
  const [emailTxt, setEmailTxt] = useState('');
  const [nickTxt, setNickTxt] = useState('');
  const [pwTxt, setPwTxt] = useState('');
  const [pwConfirmTxt, setPwConfirmTxt] = useState('');
  const [errText, setErrText] = useState('');
  const [isIdOk, setIsIdOk] = useState(false);
  const [isPwOk, setIsPwOk] = useState(false);
  const [fullEmail, setFullEmail] = useState('');

  const onChangePwConfirm = inputText => {

    // 비밀번호 확인 검사
    setPwConfirmTxt(inputText);
    if (pwTxt === inputText) {
      setErrText('비밀번호가 일치합니다.');
      setIsPwOk(true);
    } else {
      setErrText('비밀번호를 다시 확인해주세요.');
      setIsPwOk(false);
    }
  };

  function checkId() {
    if (!idTxt) {
      Alert.alert('아이디를 입력해주세요.');
      return;
    }

    const url = host + `/user/checkId?userId=${encodeURIComponent(idTxt)}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('signin/checkId/Received data:', data);
        if (data === true) { // 기존Id에 존재하면 True
          setIsIdOk(false);
          Alert.alert('중복된 아이디 입니다.');
        } else {
          setIsIdOk(true);
          Alert.alert('사용가능한 아이디 입니다.');
        }
      })
      .catch(error => {
        Alert.alert('내부 오류가 있습니다. 잠시 후 다시 시도해주세요.');
        console.error('signin/checkId/Error fetching data:', error);
      });
  }

  const fetchEmailFromServer = async () => {
    const response = await fetch(host + `/user/checkEmail?email=${encodeURIComponent(fullEmail)}`);
    const data = await response.json();
    return data;
  };
  const fetchNickFromServer = async () => {
    const response = await fetch(host + `/user/checkNickname?nickName=${encodeURIComponent(nickTxt)}`);
    const data = await response.json();
    return data;
  };
  const fetchJoinFromServer = async () => {
    const response = await fetch(host + '/user/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: idTxt,
        password: pwTxt,
        nickName: nickTxt,
        email: fullEmail
      })
    });
    const data = await response.text();
    return data;
  };

  const [loading, setLoading] = React.useState(false);
  const handleFetchData = async () => {
    setLoading(true);
    try {
      // checkEmail
      const result1 = await fetchEmailFromServer();
      console.log("checkEmail.data : " + result1);
      if (result1 === true) {
        Alert.alert('중복된 이메일 입니다.');
        return;
      }

      // checkNickname
      const result2 = await fetchNickFromServer();
      console.log("checkNickname.data : " + result2);
      if (result2 === true) {
        Alert.alert('중복된 닉네임 입니다.');
        return;
      }

      // 회원가입
      const result3 = await fetchJoinFromServer();
      console.log("join.data : " + result3);
      if (result3 === "join Success") {
        Alert.alert('회원가입이 완료되었습니다.')
        navigation.goBack();
      } else {
        Alert.alert('회원가입 오류입니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('signin/Error fetching data:', error);
      Alert.alert('내부 오류가 있습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  function onPressCheck() {
    // ID 중복확인 버튼
    checkId();
  }

  function onPressConfirm() {
    // 회원가입 버튼
    if (!isIdOk) {
      Alert.alert('아이디 중복확인을 해주세요.');
      return;
    }
    if (!isPwOk) {
      Alert.alert('비밀번호를 확인하세요.');
      return;
    }
    if (!emailTxt) {
      Alert.alert('이메일을 입력해주세요.');
      return;
    }
    if (!nickTxt) {
      Alert.alert('닉네임을 입력해주세요.');
      return;
    }
    // 순차적으로 이메일-닉네임 중복검사 후 회원가입
    handleFetchData();
  }

  return (
    <View style={styles.container}>
      <View style={styles.JoinHeadContainer}>
        <Text style={styles.JoinHeader}>회원가입</Text>
      </View>
      <View>
        <View style={styles.rowCenter}>
          <Text style={styles.JoinTitle}>아이디 </Text>
          <TextInput
            onChangeText={text => {
              setIdTxt(text);
            }}
            value={idTxt}
            placeholder="아이디"
            style={styles.JoinTxtInput}
          />
          <TouchableOpacity style={styles.overlapButton} onPress={onPressCheck}>
            <Text style={styles.onlyFontR}>중복확인</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowCenter}>
          <Text style={styles.JoinTitle}>이메일 </Text>
          <TextInput
            onChangeText={text => {
              setEmailTxt(text);
              setFullEmail(text+"@"+pickerValue);
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
              setFullEmail(emailTxt+"@"+value);
            }}>
            <Picker.Item label="gmail.com" value="gmail.com" style={styles.onlyFontR} />
            <Picker.Item label="naver.com" value="naver.com" style={styles.onlyFontR} />
            <Picker.Item label="daum.net" value="daum.net" style={styles.onlyFontR} />
            <Picker.Item label="hanmail.net" value="hanmail.net" style={styles.onlyFontR} />
          </Picker>
        </View>
        <View style={styles.rowCenter}>
          <Text style={styles.JoinTitle}>닉네임 </Text>
          <TextInput
            onChangeText={text => {
              setNickTxt(text);
            }}
            value={nickTxt}
            placeholder="닉네임"
            style={styles.JoinPwInput}
          />
        </View>
        <View style={styles.rowCenter}>
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
        <View style={styles.rowCenter}>
          <TextInput
            onChangeText={onChangePwConfirm}
            value={pwConfirmTxt}
            placeholder="비밀번호(확인)"
            style={styles.JoinConfirmTxt}
            secureTextEntry={true}
          />
        </View>
        {isPwOk === true ? (
        <Text style={styles.joinPwOkTxt}>{errText}</Text>
        ) : <Text style={styles.joinPwErrTxt}>{errText}</Text>}
      </View>
      <View style={styles.joinButtonView}>
        <TouchableOpacity style={styles.JoinButton} onPress={onPressConfirm}>
          <Text style={styles.onlyFontR}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignIn;
