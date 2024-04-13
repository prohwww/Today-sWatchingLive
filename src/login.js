import React from 'react';
import { TextInput, StyleSheet, Image, View, Dimensions, Button, Alert} from 'react-native';

const screenWidth = Dimensions.get('window').width;

function LoginScreen() {

  state = {
    ID: '',
    PassWd: ''
  }

  return (
    <View style={styles.container}>
      <View><Image
        style={styles.mainImage}
        source={require('../public/png/free-icon-ticket-389801.png')}
      /></View>
      <TextInput
        style={styles.textInput}
        onChangeText={(ID) => { this.setState({ ID: ID }) }}
        placeholder="아이디"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(PassWd) => { this.setState({ PassWd: PassWd }) }}
        placeholder="비밀번호"
      />
      <View style={styles.button}>
        <Button color='#808080' title="로그인" onPress={() => onLogin()} />
      </View>
      <View style={styles.button}>
        <Button color='#808080' title="회원가입" onPress={() => onJoin()} />
      </View>
    </View>
  );
}

function onLogin(){
  console.log("로그인!");
  return userIsLogin = true;
}

function onJoin(){
  console.log("회원가입!");
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
    borderWidth: 1
  },
  button: {
    backgroundColor: '#DDDDDD',
    width: '30%',
    marginTop: 20,
    borderRadius: 15,
  },
  mainImage: {
    width: screenWidth - 250,
    height: screenWidth - 250,
  },
})

export default LoginScreen;
