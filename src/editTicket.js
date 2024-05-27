import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function EditTicket({ route }) {
  const DATA = [
    { TicketNo: '1', GameDate: '20240421', TicketName: 'NC다이노스 vs SSG랜더스', HomeTeamCd: 2, AwayTeamCd: 1, HomeScore: 1, AwayScore: 5, Result: 'W', Seat: '응원지정석 10열 D', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 15000, UserId: 'Master', TicketDiary: "최정이 467홈런을 친걸 눈으로 봐서 좋았다 500홈런넘자 ㅎ", SportKind: 'B', place: "창원NC다이노스파크" },
    { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamCd: 3, AwayTeamCd: 4, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'S', place: "상암월드컵경기장" },
    { TicketNo: '3', GameDate: '20240321', TicketName: 'SSG랜더스 vs 기아타이거즈', HomeTeamCd: 1, AwayTeamCd: 5, HomeScore: 1, AwayScore: 7, Result: 'L', Seat: '그린존 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 18000, UserId: 'Master', TicketDiary: "기분좋게 그린존을 갔는데 야구실력 때문에 갑자기 기분이 나빠졌다", SportKind: 'B', place: "SSG랜더스파크" }
  ];

  const TeamDATA = {
    '1': 'SSG랜더스',
    '2': 'NC다이노스',
    '3': 'FC서울',
    '4': '전북현대',
    '5': '기아타이거즈'
  }

  const TicketNo = route.params.ticketData.TicketNo;
  console.log("TicketNo: " + TicketNo);  // 이걸로 DB에서 데이터 가져오면 될 거같다 ..

  // 이거는 지금 임의로 만든거,, DB연동하면 제거필요해 보임
  var editData = {};
  for (var i = 0; i < DATA.length; i++) {
    if (DATA[i].TicketNo == TicketNo) { editData = DATA[i]; }
  }

  const [HomeTeamName, setHomeTeamName] = useState(TeamDATA[editData.HomeTeamCd]);
  const [AwayTeamName, setAwayTeamName] = useState(TeamDATA[editData.AwayTeamCd]);
  const [HomeScore, setHomeScore] = useState(editData.HomeScore.toString());
  const [AwayScore, setAwayScore] = useState(editData.AwayScore.toString());
  const [Place, setPlace] = useState(editData.place);
  const [Result, setResult] = useState(editData.Result);
  const [TicketDiary, setTicketDiary] = useState(editData.TicketDiary);
  const [PhotoName, setPhotoName] = useState(editData.PhotoName);
  const navigation = useNavigation();

  function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  const onPressConfirm = () => {
    if (!HomeTeamName || !AwayTeamName || !Place ||
      !HomeScore || !AwayScore || !TicketDiary) {
      Alert.alert('누락된 항목이 있는지\n다시 확인해주세요.');
    }

    if (!isNumeric(HomeScore) || !isNumeric(AwayScore)) {
      Alert.alert('점수는 숫자로만 입력해주세요.');
    }
    Alert.alert('성공!');

    // 디테일 페이지로 다시 이동
    navigation.navigate('main');
  }
  const onPressCancel = () => {
    Alert.alert(
      '', '현재까지 수정하신 내용을 취소할까요?',
      [
        {
          text: '취소',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => { navigation.goBack() },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.component}>
      <View style={styles.headContainer}>
        <TouchableOpacity onPress={onPressCancel}>
          <Image source={require('../public/png/free-icon-left-arrow.png')} style={styles.addBtn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressConfirm}>
          <Image source={require('../public/png/free-icon-done.png')} style={styles.addBtn} />
        </TouchableOpacity>
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
                setPhotoName(text);
              }}
              value={PhotoName}
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
    width: 30,
    height: 30,
  },
});

export default EditTicket;
