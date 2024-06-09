import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Alert, TouchableOpacity, Image, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import styles from './style';

function AddTicket({ route }) {

  var editFlag = false;

  const DATA = [
    { TicketNo: '1', GameDate: '20240421', TicketName: 'NC다이노스 vs SSG랜더스', HomeTeamNo: 31, AwayTeamNo: 32, HomeScore: 1, AwayScore: 5, Result: 'W', Seat: '응원지정석 10열 D', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 15000, UserId: 'Master', TicketDiary: "최정이 467홈런을 친걸 눈으로 봐서 좋았다 500홈런넘자 ㅎ", SportKind: 'BS', place: "창원NC다이노스파크" },
    { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamNo: 9, AwayTeamNo: 10, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'SC', place: "상암월드컵경기장" },
    { TicketNo: '3', GameDate: '20240321', TicketName: 'SSG랜더스 vs 기아타이거즈', HomeTeamNo: 32, AwayTeamNo: 27, HomeScore: 1, AwayScore: 7, Result: 'L', Seat: '그린존 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 18000, UserId: 'Master', TicketDiary: "기분좋게 그린존을 갔는데 야구실력 때문에 갑자기 기분이 나빠졌다", SportKind: 'BS', place: "SSG랜더스파크" },
  ];

  const sportsCategory = ['K리그', 'KBO', 'KBL', 'V리그'];
  const subSportsCategory = [{"TeamNo":1,"TeamName":"울산 HD FC","SportKind":"SC","Place":"울산문수월드컵경기장"},{"TeamNo":2,"TeamName":"김천상무프로축구단","SportKind":"SC","Place":"김천종합운동장"},{"TeamNo":3,"TeamName":"포항스틸러스","SportKind":"SC","Place":"포항스틸야드"},{"TeamNo":4,"TeamName":"강원FC","SportKind":"SC","Place":"강릉종합운동장, 춘천송암스포츠타운"},{"TeamNo":5,"TeamName":"수원FC","SportKind":"SC","Place":"수원종합운동장"},{"TeamNo":6,"TeamName":"제주유나이티드FC","SportKind":"SC","Place":"제주월드컵경기장"},{"TeamNo":7,"TeamName":"광주FC","SportKind":"SC","Place":"광주축구전용구장"},{"TeamNo":8,"TeamName":"인천유나이티드 FC","SportKind":"SC","Place":"인천축구전용경기장"},{"TeamNo":9,"TeamName":"FC서울","SportKind":"SC","Place":"서울월드컵경기장"},{"TeamNo":10,"TeamName":"전북현대모터스","SportKind":"SC","Place":"전주월드컵경기장"},{"TeamNo":11,"TeamName":"대전하나시티즌","SportKind":"SC","Place":"대전월드컵경기장"},{"TeamNo":12,"TeamName":"대구FC","SportKind":"SC","Place":"DGB 대구은행파크"},{"TeamNo":13,"TeamName":"FC안양","SportKind":"SC","Place":"안양종합운동장"},{"TeamNo":14,"TeamName":"전남드래곤즈","SportKind":"SC","Place":"광양축구전용구장"},{"TeamNo":15,"TeamName":"서울이랜드FC","SportKind":"SC","Place":"목동종합운동장 주경기장"},{"TeamNo":16,"TeamName":"김포FC","SportKind":"SC","Place":"솔터체육공원 축구장"},{"TeamNo":17,"TeamName":"부산아이파크","SportKind":"SC","Place":"부산 아시아드 주경기장"},{"TeamNo":18,"TeamName":"수원삼성블루윙즈","SportKind":"SC","Place":"수원월드컵경기장"},{"TeamNo":19,"TeamName":"충남아산프로축구단","SportKind":"SC","Place":"이순신종합운동장"},{"TeamNo":20,"TeamName":"부천FC 1995","SportKind":"SC","Place":"부천종합운동장"},{"TeamNo":21,"TeamName":"충북청주FC","SportKind":"SC","Place":"청주종합경기장"},{"TeamNo":22,"TeamName":"천안시티FC","SportKind":"SC","Place":"천안종합운동장"},{"TeamNo":23,"TeamName":"성남FC","SportKind":"SC","Place":"탄천종합운동장"},{"TeamNo":24,"TeamName":"경남FC","SportKind":"SC","Place":"창원축구센터"},{"TeamNo":25,"TeamName":"안산그리너스FC","SportKind":"SC","Place":"안산 와~스타디움"},{"TeamNo":26,"TeamName":"두산 베어스","SportKind":"BS","Place":"서울 잠실야구장"},{"TeamNo":27,"TeamName":"KIA 타이거즈","SportKind":"BS","Place":"광주 기아 챔피언스 필드"},{"TeamNo":28,"TeamName":"KT 위즈","SportKind":"BS","Place":"수원 케이티 위즈 파크"},{"TeamNo":29,"TeamName":"LG 트윈스","SportKind":"BS","Place":"서울 잠실야구장"},{"TeamNo":30,"TeamName":"롯데 자이언츠","SportKind":"BS","Place":"부산 사직야구장"},{"TeamNo":31,"TeamName":"NC 다이노스","SportKind":"BS","Place":"창원 NC파크"},{"TeamNo":32,"TeamName":"SSG 랜더스","SportKind":"BS","Place":"인천 SSG 랜더스 필드"},{"TeamNo":33,"TeamName":"키움 히어로즈","SportKind":"BS","Place":"서울 고척스카이돔"},{"TeamNo":34,"TeamName":"삼성 라이온즈","SportKind":"BS","Place":"대구 삼성 라이온즈 파크"},{"TeamNo":35,"TeamName":"한화 이글스","SportKind":"BS","Place":"대전 한화생명 이글스 파크"},{"TeamNo":36,"TeamName":"서울 삼성 썬더스","SportKind":"BK","Place":"잠실실내체육관"},{"TeamNo":37,"TeamName":"대구 한국가스공사 페가수스","SportKind":"BK","Place":"대구 체육관"},{"TeamNo":38,"TeamName":"수원 KT 소닉붐","SportKind":"BK","Place":"수원 KT 소닉붐 아레나"},{"TeamNo":39,"TeamName":"원주 DB 프로미","SportKind":"BK","Place":"원주종합체육관"},{"TeamNo":40,"TeamName":"부산 KCC 이지스","SportKind":"BK","Place":"부산사직실내체육관"},{"TeamNo":41,"TeamName":"울산 현대모비스 피버스","SportKind":"BK","Place":"동천체육관"},{"TeamNo":42,"TeamName":"고양 소노 스카이거너스","SportKind":"BK","Place":"고양 소노 아레나"},{"TeamNo":43,"TeamName":"창원 LG 세이커스","SportKind":"BK","Place":"창원 실내체육관"},{"TeamNo":44,"TeamName":"서울 SK 나이츠","SportKind":"BK","Place":"서울특별시 학생체육관"},{"TeamNo":45,"TeamName":"안양 정관장 레드부스터스","SportKind":"BK","Place":"안양실내체육관"},{"TeamNo":46,"TeamName":"인천 대한항공 점보스","SportKind":"VB","Place":"계양체육관"},{"TeamNo":47,"TeamName":"안산 OK 금융그룹 읏맨","SportKind":"VB","Place":"상록수체육관"},{"TeamNo":48,"TeamName":"서울 우리카드 우리WON","SportKind":"VB","Place":"장충체육관"},{"TeamNo":49,"TeamName":"천안 현대캐피탈 스카이워커스","SportKind":"VB","Place":"유관순체육관"},{"TeamNo":50,"TeamName":"수원 한국전력 빅스톰","SportKind":"VB","Place":"수원실내체육관"},{"TeamNo":51,"TeamName":"대전 삼성화재 블루팡스","SportKind":"VB","Place":"충무체육관"},{"TeamNo":52,"TeamName":"의정부 KB손해보험 스타즈","SportKind":"VB","Place":"의정부실내체육관"},{"TeamNo":53,"TeamName":"수원 현대건설 힐스테이트","SportKind":"VB","Place":"수원실내체육관"},{"TeamNo":54,"TeamName":"인천 흥국생명 핑크스파이더스","SportKind":"VB","Place":"인천삼산월드체육관"},{"TeamNo":55,"TeamName":"대전 정관장 레드스파크스","SportKind":"VB","Place":"충무체육관"},{"TeamNo":56,"TeamName":"GS칼텍스 서울 KIXX","SportKind":"VB","Place":"장충체육관"},{"TeamNo":57,"TeamName":"화성 IBK기업은행 알토스","SportKind":"VB","Place":"화성실내체육관"},{"TeamNo":58,"TeamName":"김천 한국도로공사 하이패스","SportKind":"VB","Place":"김천실내체육관"},{"TeamNo":59,"TeamName":"광주 페퍼저축은행 AI 페퍼스","SportKind":"VB","Place":"염주종합체육관"}];

  const navigation = useNavigation();
  const [EditFlag, setEditFlag] = useState(false);
  const [AwayTeamName, setAwayTeamName] = useState('');
  const [HomeScore, setHomeScore] = useState('');
  const [AwayScore, setAwayScore] = useState('');
  const [GameDate, setGameDate] = useState('');
  const [Result, setResult] = useState('');
  const [TicketDiary, setTicketDiary] = useState('');
  const [PhotoName, setPhotoName] = useState('');
  const [selectSportsKind, setSelectSportsKind] = useState("SC");
  const [selectedSubHomeTeamName, setSelectedSubHomeTeamName] = useState(
    subSportsCategory.filter(subcategory => subcategory.SportKind === "SC")[0].TeamName
  );
  const [selectedSubAwayTeamName, setSelectedSubAwayTeamName] = useState(
    subSportsCategory.filter(subcategory => subcategory.SportKind === "SC")[0].TeamName
  );

  // selectBox 최초 선택 시 첫번째 값으로 셋팅
  useEffect(() => {
    if (!editFlag) {
      const defaultSubCategory = subSportsCategory.find(subcategory => subcategory.SportKind === selectSportsKind);
      if (defaultSubCategory) {
        setSelectedSubHomeTeamName(defaultSubCategory.TeamName);
      }
    }
  }, [selectSportsKind]);

  // edit 페이지일 떄 이미 있는 DATA 화면에 가져오기
  useEffect(() => {
    if (editFlag) {
      setHomeScore(editData.HomeScore.toString());
      setAwayScore(editData.AwayScore.toString());
      setGameDate(editData.GameDate);
      setResult(editData.Result);
      setTicketDiary(editData.TicketDiary);
      setSelectedSubHomeTeamName(subSportsCategory[Number(editData.HomeTeamNo) - 1].TeamName);
      setSelectedSubAwayTeamName(subSportsCategory[Number(editData.AwayTeamNo) - 1].TeamName);
      setPhotoName(editData.PhotoName);
      setEditFlag(true);

      // 홈팀 정보 찾기 ...
      var HomeTeamInfo = {};
      for (var i = 0; i < subSportsCategory.length; i++) {
        if (editData.HomeTeamCd == subSportsCategory[i].TeamCd) {
          HomeTeamInfo = subSportsCategory[i];
          break;
        }
      }
      if (!HomeTeamInfo) {// 오류!!
        Alert.alert('이상한팀이 DB에 저장되어있음');
      }
      setSelectSportsKind(HomeTeamInfo.SportKind);
      console.log(HomeTeamInfo.Place);
    }
  }, [editFlag]);

  if (route.params) {
    const TicketNo = route.params.ticketData.TicketNo;
    console.log("TicketNo: " + TicketNo);  // 이걸로 DB에서 데이터 가져오면 될 거같다 ..

    editFlag = true;

    // 이거는 지금 임의로 만든거,, DB연동하면 제거필요해 보임
    var editData = {};
    for (var i = 0; i < DATA.length; i++) {
      if (DATA[i].TicketNo == TicketNo) {
        editData = DATA[i];
        break;
      }
    }
  }

  function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  // 뒤로가기 할 때 alert창뜨도록..
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const backAction = () => {
      if (showAlert) {
        setShowAlert(false);
        return true;
      }
      
      onPressCancel();
      return true;
    };
  
    BackHandler.addEventListener('hardwareBackPress', backAction);
  
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [showAlert]);

  const onPressConfirm = () => {
    if (!HomeTeamName || !AwayTeamName || !GameDate ||
      !HomeScore || !AwayScore || !TicketDiary) {
      Alert.alert('누락된 항목이 있는지\n다시 확인해주세요.');
    }

    if (!isNumeric(HomeScore) || !isNumeric(AwayScore)) {
      Alert.alert('점수는 숫자로만 입력해주세요.');
    }
    Alert.alert('성공!');

    // 목록페이지로 다시 이동
    navigation.navigate('main');
  }
  const onPressCancel = () => {
    Alert.alert(
      '', '정말로 현재까지 작성하신 티켓을 취소하시겠습니까?',
      [
        {
          text: '취소',
          onPress: () => setShowAlert(false),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <TouchableOpacity onPress={onPressCancel}>
          <Image source={require('../public/png/free-icon-left-arrow.png')} style={styles.TicketAddBtn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressConfirm}>
          <Image source={require('../public/png/free-icon-done.png')} style={styles.TicketAddBtn} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.TicketAddcontainer}>
        <View style={styles.TicketAddcontainer}>
          <Text style={styles.TicketQuestion}>어떤 팀들의 경기를 보셨나요?</Text>
          <View style={styles.fiex1}>
            <Picker
              selectedValue={selectSportsKind}
              onValueChange={(itemValue, itemIndex) => setSelectSportsKind(itemValue)}
            >
              {sportsCategory.map((category, index) => (
                <Picker.Item label={category} value={index.toString()} key={index}  style={styles.TicketAddPikerSt}/>
              ))}
            </Picker>
          </View>
          <View style={styles.TicketAddcontainer}>
            <View style={styles.TicketAnswerView}>
              <Text style={styles.TicketAddHome}>홈팀</Text>
              <View style={styles.TicketAddTeamView}>
                <Picker
                  selectedValue={selectedSubHomeTeamName}
                  onValueChange={(itemValue, itemIndex) => setSelectedSubHomeTeamName(itemValue)}
                >
                  {subSportsCategory.filter(subcategory => subcategory.SportKind === selectSportsKind).map((subcategory, index) => (
                    <Picker.Item label={subcategory.TeamName} value={subcategory.TeamName} key={index} style={styles.TicketAddPikerSt}/>
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.TicketAddcontainer}>
              <View style={styles.TicketAnswerView}>
                <Text style={styles.TicketAddAway}>어웨이팀</Text>
                <View style={styles.TicketAddTeamView}>
                  <Picker
                    selectedValue={selectedSubAwayTeamName}
                    onValueChange={(itemValue, itemIndex) => setSelectedSubAwayTeamName(itemValue)}
                  >
                    {subSportsCategory.filter(subcategory => subcategory.SportKind === selectSportsKind).map((subcategory, index) => (
                      <Picker.Item label={subcategory.TeamName} value={subcategory.TeamName} key={index} style={styles.TicketAddPikerSt}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.TicketAddcontainer}>
          <Text style={styles.TicketQuestion}>스코어는 어떻게 됐나요?</Text>
          <View style={styles.rowCenter}>
            <TextInput
              onChangeText={text => {
                setHomeScore(text);
              }}
              value={HomeScore}
              placeholder="홈팀"
              style={styles.TicketAddScoreTxtInput}
            />
            <Text style={{ paddingHorizontal: 10, padding: 15, }}>   :  </Text>
            <TextInput
              onChangeText={text => {
                setAwayScore(text);
              }}
              value={AwayScore}
              placeholder="어웨이팀"
              style={styles.TicketAddScoreTxtInput}
            />
          </View>
        </View>
        <View style={styles.TicketAddcontainer}>
          <Text style={styles.TicketQuestion}>경기장을 관람한 날짜</Text>
          <View style={styles.rowCenter}>

            <TextInput
              onChangeText={text => {
                setGameDate(text);
              }}
              value={GameDate}
              placeholder="YYYYMMDD"
              style={styles.TicketAddDateInput}
            />
          </View>
        </View>
        <View style={styles.TicketAddcontainer}>
          <Text style={styles.TicketQuestion}>직관을 추억할 수 있는 사진을 첨부해주세요.</Text>
          <View style={styles.rowCenter}>
            <TextInput
              onChangeText={text => {
                setPhotoName(text);
              }}
              value={PhotoName}
              placeholder="(사진선택)"
              style={styles.TicketAddDateInput}
            />
          </View>
        </View>
        <View style={styles.TicketAddcontainer}>
          <Text style={styles.TicketQuestion}>오늘 경기에 대한 관람평을 남겨주세요</Text>
          <View style={styles.rowCenter}>
            <TextInput
              onChangeText={text => {
                setTicketDiary(text);
              }}
              value={TicketDiary}
              placeholder="관람평을 남겨주세요."
              style={styles.ticketDiaryTxtInput}
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

export default AddTicket;
