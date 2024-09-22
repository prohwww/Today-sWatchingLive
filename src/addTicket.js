import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, TextInput, Alert, TouchableOpacity, Image, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { host, categoryMapping, OPTIONS } from './map';
import styles from './style';

function formatDate(dateString) {
  // 날짜 형식이 YYYYMMDD 또는 YYYY-MM-DD인지 확인
  const regex = /^(?:\d{8}|\d{4}-\d{2}-\d{2})$/;
  if (!dateString.match(regex)) return false;

  let year, month, day;

  if (dateString.includes('-')) {
    [year, month, day] = dateString.split('-').map(Number);
  } else {
    year = parseInt(dateString.slice(0, 4), 10);
    month = parseInt(dateString.slice(4, 6), 10);
    day = parseInt(dateString.slice(6, 8), 10);
  }

  // 월과 일이 유효한 범위인지 확인
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;

  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
    return false;
  }

  if (dateString.includes('-')) {
    // YYYY-MM-DD 
    return dateString;
  } else {
    // YYYYMMDD 형식인 경우 YYYY-MM-DD로 변환하여 반환
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }
}

function AddTicket({ route }) {
  
  const navigation = useNavigation();
  const [editFlag, setEditFlag] = useState(false);
  const [subSportsCategory, setSubSportsCategory] = useState([]);
  const [selectedSubHomeTeamNo, setSelectedSubHomeTeamNo] = useState(1);
  const [selectedSubAwayTeamNo, setSelectedSubAwayTeamNo] = useState(1);
  const [HomeScore, setHomeScore] = useState('');
  const [AwayScore, setAwayScore] = useState('');
  const [GameDate, setGameDate] = useState('');
  const [Result, setResult] = useState('');
  const [TicketDiary, setTicketDiary] = useState('');
  const [PhotoName, setPhotoName] = useState('');
  const [selectSportsKind, setSelectSportsKind] = useState("SC");
  const [editData, setEditData] = useState(null); // 상태로 editData 관리
  
  const sportsCategories = Object.keys(categoryMapping);

  // fetchData2를 useCallback을 사용하여 정의
  const fetchData2 = useCallback(() => {
    fetch(host + '/team/allInfo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setSubSportsCategory(data);
    })
    .catch(error => {
      alert('Error fetching data!');
      console.error('Error fetching data:', error);
    });
  }, []); // 의존성 배열을 비워서 fetchData2가 한 번만 생성되도록 함

  // 컴포넌트가 마운트될 때 fetchData2 호출
  useEffect(() => {
    fetchData2();
  }, [fetchData2]); // fetchData2가 변경되지 않으므로 의존성 배열에 추가

  // subSportsCategory가 업데이트된 후에 상태를 설정
  useEffect(() => {
    if (subSportsCategory.length > 0 && !editFlag) {
      const defaultSubCategory = subSportsCategory.find(subcategory => subcategory.sportKind === selectSportsKind);
      if (defaultSubCategory) {
        setSelectedSubHomeTeamNo(defaultSubCategory.teamNo);
        setSelectedSubAwayTeamNo(defaultSubCategory.teamNo);
      }
    }
  }, [subSportsCategory]);

  useEffect(() => {
    if (route.params) {
      // route.params에 GameDate가 있으면 그 값을 설정
      if (route.params.GameDate) {
        setGameDate(route.params.GameDate);
      }
  
      // route.params에 ticketData가 있으면 수정 모드로 설정
      if (route.params.ticketData) {
        const { data } = route.params.ticketData;
        setEditData(data);
        setEditFlag(true);
      }
    }
  }, [route.params]);

  // edit 페이지일 떄 이미 있는 DATA 화면에 가져오기
  useEffect(() => {
    if (editFlag && editData) {
      setHomeScore(editData.homeScore.toString());
      setAwayScore(editData.awayScore.toString());
      setGameDate(editData.gameDate);
      setResult(editData.result);
      setTicketDiary(editData.ticketContent);
      setSelectedSubHomeTeamNo(editData.homeTeamNo);
      setSelectedSubAwayTeamNo(editData.awayTeamNo);
      setSelectSportsKind(editData.sportsKind);
      setPhotoName(editData.photoName);
    }
  }, [editFlag, editData]);

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
    // 필수 항목이 모두 채워졌는지 확인
    if (!selectedSubHomeTeamNo || !selectedSubAwayTeamNo || !GameDate ||
        !HomeScore || !AwayScore || !TicketDiary || !Result) {
      Alert.alert('누락된 항목이 있는지\n다시 확인해주세요.');
      return;
    }
  
    // 동일 팀 선택 시 경고
    if (selectedSubHomeTeamNo === selectedSubAwayTeamNo) {
      Alert.alert('서로 다른 팀으로 선택 가능합니다.');
      return;
    }
  
    // 점수가 숫자인지 확인
    if (!isNumeric(HomeScore) || !isNumeric(AwayScore)) {
      Alert.alert('점수는 숫자로만 입력해주세요.');
      return;
    }
  
    // 날짜 포맷팅 및 검증
    const formattedDate = formatDate(GameDate);
    if (!formattedDate) {
      Alert.alert('입력된 날짜의 형식이 맞지 않습니다.');
      return;
    }
  
    // 사용자에게 확인 메시지 표시
    Alert.alert(
      '', '해당 정보로 저장하시겠습니까?',
      [
        {
          text: '취소',
          onPress: () => setShowAlert(false),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: async () => {
            try {
              // 서버에 데이터 전송
              const response = await fetch(host + '/ticket/newEntry', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "ticketNo": editData ? editData.ticketNo : null,
                  "homeTeamNo": selectedSubHomeTeamNo,
                  "awayTeamNo": selectedSubAwayTeamNo,
                  "gameDate": formattedDate,
                  "homeScore": Number(HomeScore),
                  "awayScore": Number(AwayScore),
                  "result": Result,
                  "ticketContent": TicketDiary
                })
              });
  
              // 응답 처리
              const data = await response.text();
              console.log('Received data:', data);
  
              if (data === "ticket create success") {
                navigation.navigate('main');
              } else {
                Alert.alert('티켓 생성 오류!', '티켓 생성 중 오류가 발생했습니다.');
              }
            } catch (error) {
              Alert.alert('서버 오류', '서버와의 통신 중 오류가 발생했습니다.');
              console.error('Error fetching data:', error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };
  
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
              selectedValue={Object.keys(categoryMapping).find(key => categoryMapping[key] === selectSportsKind)}
              onValueChange={(itemValue) => {
                const newSelectSportsKind = categoryMapping[itemValue];
                setSelectSportsKind(newSelectSportsKind); // 선택된 카테고리에 맞는 스포츠 종류 업데이트
              }}
            >
              {sportsCategories.map((category, index) => (
                <Picker.Item label={category} value={category} key={index} style={styles.TicketAddPikerSt} />
              ))}
            </Picker>
          </View>
          <View style={styles.TicketAddcontainer}>
            <View style={styles.TicketAnswerView}>
              <Text style={styles.TicketAddHome}>홈팀</Text>
              <View style={styles.TicketAddTeamView}>
                <Picker
                  selectedValue={selectedSubHomeTeamNo}
                  onValueChange={(itemValue, itemIndex) => setSelectedSubHomeTeamNo(itemValue)}
                >
                  {subSportsCategory.filter(subcategory => subcategory.sportsKind === selectSportsKind).map((subcategory, index) => (
                    <Picker.Item label={subcategory.teamName} value={subcategory.teamNo} key={index} style={styles.TicketAddPikerSt}/>
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.TicketAddcontainer}>
              <View style={styles.TicketAnswerView}>
                <Text style={styles.TicketAddAway}>어웨이팀</Text>
                <View style={styles.TicketAddTeamView}>
                  <Picker
                    selectedValue={selectedSubAwayTeamNo}
                    onValueChange={(itemValue, itemIndex) => setSelectedSubAwayTeamNo(itemValue)}
                  >
                    {subSportsCategory.filter(subcategory => subcategory.sportsKind === selectSportsKind).map((subcategory, index) => (
                      <Picker.Item label={subcategory.teamName} value={subcategory.teamNo} key={index} style={styles.TicketAddPikerSt}/>
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
          <Text style={styles.TicketQuestion}>경기 결과</Text>
          <View style={styles.rowCenter}>
            <View style={styles.radioButtonContainer}>
              {Object.keys(OPTIONS).map(option => (
                <TouchableOpacity
                  key={OPTIONS[option]} 
                  onPress={() => setResult(OPTIONS[option])}
                  style={[
                    styles.radioButton,
                    Result === OPTIONS[option] ? styles.selectedRadioButton : null
                  ]}
                >
                  <Text style={styles.radioButtonLabel}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
