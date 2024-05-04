import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, Alert, TouchableOpacity, Image} from 'react-native';

function AddTicket() {
  const [HomeTeamName, setHomeTeamName] = useState('');
  const [AwayTeamName, setAwayTeamName] = useState('');
  const [HomeScore, setHomeScore] = useState('');
  const [AwayScore, setAwayScore] = useState('');
  const [Place, setPlace] = useState('');
  const [Result, setResult] = useState('');
  const [TicketDiary, setTicketDiary] = useState('');

  const onPressConfirm = () => {
    if (!HomeTeamName || !AwayTeamName || !Place ||
      !HomeScore || !AwayScore || !TicketDiary) {
      Alert.alert('누락된 항목이 있는지\n다시 확인해주세요.');
    } else {
      Alert.alert('성공!');
    }
  }

  return (
    <View style={styles.component}>
      <View style={styles.headContainer}>
        <Text style={styles.header}>TICKET</Text>
        <View>
          <TouchableOpacity onPress={onPressConfirm}>
            <Image source={require('../public/png/free-icon-done.png')} style={styles.addBtn}/>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>어떤 팀들의 경기를 보셨나요?</Text>
          <View style={styles.subContainer}>
            <TextInput
              onChangeText={text => {
                setHomeTeamName(text);
              }}
              value={HomeTeamName}
              placeholder="홈팀"
              style={styles.miniTxtInput}
            />
            <Text style={{ paddingHorizontal: 10, padding: 15, }}>VS</Text>
            <TextInput
              onChangeText={text => {
                setAwayTeamName(text);
              }}
              value={AwayTeamName}
              placeholder="어웨이팀"
              style={styles.miniTxtInput}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>스코어는 어떻게 됐나요?</Text>
          <View style={styles.subContainer}>
            <TextInput
              onChangeText={text => {
                setHomeScore(text);
              }}
              value={HomeScore}
              placeholder="홈팀"
              style={styles.miniTxtInput}
            />
            <Text style={{ paddingHorizontal: 10, padding: 15, }}>   :  </Text>
            <TextInput
              onChangeText={text => {
                setAwayScore(text);
              }}
              value={AwayScore}
              placeholder="어웨이팀"
              style={styles.miniTxtInput}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>경기장은 어디인가요?</Text>
          <View style={styles.subContainer}>

            <TextInput
              onChangeText={text => {
                setPlace(text);
              }}
              value={Place}
              placeholder="경기장을 입력하세요."
              style={styles.txtInput}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>직관을 추억할 수 있는 사진을 첨부해주세요.</Text>
          <View style={styles.subContainer}>
            <TextInput
              onChangeText={text => {
                setResult(text);
              }}
              value={Result}
              placeholder="(사진선택)"
              style={styles.txtInput}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>오늘 경기에 대한 관람평을 남겨주세요</Text>
          <View style={styles.subContainer}>
            <TextInput
              onChangeText={text => {
                setTicketDiary(text);
              }}
              value={TicketDiary}
              placeholder="관람평을 남겨주세요."
              style={styles.TicketDiaryTxtInput}
              multiline={true} // 여러 줄 입력 활성화
              numberOfLines={4} // 입력 필드의 초기 높이 설정
              textAlignVertical="top" // 텍스트가 위쪽으로부터 늘어남
            />
          </View>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between', // 텍스트와 버튼을 최대한 멀리 배치합니다.
    alignItems: 'center', // 요소들을 수직으로 가운데에 정렬합니다.
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center', // 텍스트를 가운데로 정렬합니다.
    flex: 1, // 텍스트 컨테이너가 버튼을 제외한 공간을 가득 채우도록 합니다.
    marginLeft: 50, // 버튼을 화면 오른쪽 끝으로 옮깁니다.
  },
  btnContainer: {
    marginLeft: 'auto', // 버튼을 화면 오른쪽 끝으로 옮깁니다.
  },
  textContainer: {
    flex: 1, // 텍스트 컨테이너가 버튼과 같은 너비를 가지도록 합니다.
    alignItems: 'center', // 텍스트를 가운데에 정렬합니다.
  },
  container: {
    paddingHorizontal: 10,
    marginVertical: 5,
    padding: 5
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
    fontFamily: 'NanumGothicBold'
  },
  miniTxtInput: {
    width: 148,
    height: 40,
    marginLeft: 12,
    marginRight: 7,
    marginVertical: 5,
    borderColor: 'black',
    borderWidth: 0.8,
    fontFamily: 'NanumGothicBold'
  },
  txtInput: {
    width: 355,
    height: 40,
    marginLeft: 12,
    marginRight: 7,
    marginVertical: 5,
    borderColor: 'black',
    borderWidth: 0.8,
    fontFamily: 'NanumGothicBold'
  },
  TicketDiaryTxtInput: {
    flex: 1,
    minWidth: 355,
    maxWidth: 355,
    minHeight: 150,
    marginLeft: 12,
    marginRight: 7,
    marginVertical: 5,
    borderColor: 'black',
    borderWidth: 0.8,
    fontFamily: 'NanumGothicBold'
  },
  confirmTxt: {
    width: 200,
    height: 40,
    marginLeft: 67,
    marginVertical: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 0.5,
    fontFamily: 'NanumGothicBold'
  },
  addBtn: {
    width: 40,
    height: 40,
  },
});

export default AddTicket;
