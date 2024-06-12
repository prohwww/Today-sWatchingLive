import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, ScrollView, View, StyleSheet, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Calendar from './calendar';
import MyInfo from './myInfo';
import styles from './style';

const Tab = createBottomTabNavigator();
const resultImg = {
  W: require('../public/png/free-icon-sun.png'),
  L: require('../public/png/free-icon-storm.png'),
  T: require('../public/png/free-icon-cloud.png'),
};
const sportsImg = {
  SC: require('../public/png/free-icon-soccer-ball.png'),
  BS: require('../public/png/free-icon-baseball.png'),
  BK: require('../public/png/free-icon-basketball-ball.png'),
  VB: require('../public/png/free-icon-volleyball-ball.png'),
  // 종목 추가 필요...
};
const subSportsCategory = [{"TeamNo":1,"TeamName":"울산 HD FC","SportKind":"SC","Place":"울산문수월드컵경기장"},{"TeamNo":2,"TeamName":"김천상무프로축구단","SportKind":"SC","Place":"김천종합운동장"},{"TeamNo":3,"TeamName":"포항스틸러스","SportKind":"SC","Place":"포항스틸야드"},{"TeamNo":4,"TeamName":"강원FC","SportKind":"SC","Place":"강릉종합운동장, 춘천송암스포츠타운"},{"TeamNo":5,"TeamName":"수원FC","SportKind":"SC","Place":"수원종합운동장"},{"TeamNo":6,"TeamName":"제주유나이티드FC","SportKind":"SC","Place":"제주월드컵경기장"},{"TeamNo":7,"TeamName":"광주FC","SportKind":"SC","Place":"광주축구전용구장"},{"TeamNo":8,"TeamName":"인천유나이티드 FC","SportKind":"SC","Place":"인천축구전용경기장"},{"TeamNo":9,"TeamName":"FC서울","SportKind":"SC","Place":"서울월드컵경기장"},{"TeamNo":10,"TeamName":"전북현대모터스","SportKind":"SC","Place":"전주월드컵경기장"},{"TeamNo":11,"TeamName":"대전하나시티즌","SportKind":"SC","Place":"대전월드컵경기장"},{"TeamNo":12,"TeamName":"대구FC","SportKind":"SC","Place":"DGB 대구은행파크"},{"TeamNo":13,"TeamName":"FC안양","SportKind":"SC","Place":"안양종합운동장"},{"TeamNo":14,"TeamName":"전남드래곤즈","SportKind":"SC","Place":"광양축구전용구장"},{"TeamNo":15,"TeamName":"서울이랜드FC","SportKind":"SC","Place":"목동종합운동장 주경기장"},{"TeamNo":16,"TeamName":"김포FC","SportKind":"SC","Place":"솔터체육공원 축구장"},{"TeamNo":17,"TeamName":"부산아이파크","SportKind":"SC","Place":"부산 아시아드 주경기장"},{"TeamNo":18,"TeamName":"수원삼성블루윙즈","SportKind":"SC","Place":"수원월드컵경기장"},{"TeamNo":19,"TeamName":"충남아산프로축구단","SportKind":"SC","Place":"이순신종합운동장"},{"TeamNo":20,"TeamName":"부천FC 1995","SportKind":"SC","Place":"부천종합운동장"},{"TeamNo":21,"TeamName":"충북청주FC","SportKind":"SC","Place":"청주종합경기장"},{"TeamNo":22,"TeamName":"천안시티FC","SportKind":"SC","Place":"천안종합운동장"},{"TeamNo":23,"TeamName":"성남FC","SportKind":"SC","Place":"탄천종합운동장"},{"TeamNo":24,"TeamName":"경남FC","SportKind":"SC","Place":"창원축구센터"},{"TeamNo":25,"TeamName":"안산그리너스FC","SportKind":"SC","Place":"안산 와~스타디움"},{"TeamNo":26,"TeamName":"두산 베어스","SportKind":"BS","Place":"서울 잠실야구장"},{"TeamNo":27,"TeamName":"KIA 타이거즈","SportKind":"BS","Place":"광주 기아 챔피언스 필드"},{"TeamNo":28,"TeamName":"KT 위즈","SportKind":"BS","Place":"수원 케이티 위즈 파크"},{"TeamNo":29,"TeamName":"LG 트윈스","SportKind":"BS","Place":"서울 잠실야구장"},{"TeamNo":30,"TeamName":"롯데 자이언츠","SportKind":"BS","Place":"부산 사직야구장"},{"TeamNo":31,"TeamName":"NC 다이노스","SportKind":"BS","Place":"창원 NC파크"},{"TeamNo":32,"TeamName":"SSG 랜더스","SportKind":"BS","Place":"인천 SSG 랜더스 필드"},{"TeamNo":33,"TeamName":"키움 히어로즈","SportKind":"BS","Place":"서울 고척스카이돔"},{"TeamNo":34,"TeamName":"삼성 라이온즈","SportKind":"BS","Place":"대구 삼성 라이온즈 파크"},{"TeamNo":35,"TeamName":"한화 이글스","SportKind":"BS","Place":"대전 한화생명 이글스 파크"},{"TeamNo":36,"TeamName":"서울 삼성 썬더스","SportKind":"BK","Place":"잠실실내체육관"},{"TeamNo":37,"TeamName":"대구 한국가스공사 페가수스","SportKind":"BK","Place":"대구 체육관"},{"TeamNo":38,"TeamName":"수원 KT 소닉붐","SportKind":"BK","Place":"수원 KT 소닉붐 아레나"},{"TeamNo":39,"TeamName":"원주 DB 프로미","SportKind":"BK","Place":"원주종합체육관"},{"TeamNo":40,"TeamName":"부산 KCC 이지스","SportKind":"BK","Place":"부산사직실내체육관"},{"TeamNo":41,"TeamName":"울산 현대모비스 피버스","SportKind":"BK","Place":"동천체육관"},{"TeamNo":42,"TeamName":"고양 소노 스카이거너스","SportKind":"BK","Place":"고양 소노 아레나"},{"TeamNo":43,"TeamName":"창원 LG 세이커스","SportKind":"BK","Place":"창원 실내체육관"},{"TeamNo":44,"TeamName":"서울 SK 나이츠","SportKind":"BK","Place":"서울특별시 학생체육관"},{"TeamNo":45,"TeamName":"안양 정관장 레드부스터스","SportKind":"BK","Place":"안양실내체육관"},{"TeamNo":46,"TeamName":"인천 대한항공 점보스","SportKind":"VB","Place":"계양체육관"},{"TeamNo":47,"TeamName":"안산 OK 금융그룹 읏맨","SportKind":"VB","Place":"상록수체육관"},{"TeamNo":48,"TeamName":"서울 우리카드 우리WON","SportKind":"VB","Place":"장충체육관"},{"TeamNo":49,"TeamName":"천안 현대캐피탈 스카이워커스","SportKind":"VB","Place":"유관순체육관"},{"TeamNo":50,"TeamName":"수원 한국전력 빅스톰","SportKind":"VB","Place":"수원실내체육관"},{"TeamNo":51,"TeamName":"대전 삼성화재 블루팡스","SportKind":"VB","Place":"충무체육관"},{"TeamNo":52,"TeamName":"의정부 KB손해보험 스타즈","SportKind":"VB","Place":"의정부실내체육관"},{"TeamNo":53,"TeamName":"수원 현대건설 힐스테이트","SportKind":"VB","Place":"수원실내체육관"},{"TeamNo":54,"TeamName":"인천 흥국생명 핑크스파이더스","SportKind":"VB","Place":"인천삼산월드체육관"},{"TeamNo":55,"TeamName":"대전 정관장 레드스파크스","SportKind":"VB","Place":"충무체육관"},{"TeamNo":56,"TeamName":"GS칼텍스 서울 KIXX","SportKind":"VB","Place":"장충체육관"},{"TeamNo":57,"TeamName":"화성 IBK기업은행 알토스","SportKind":"VB","Place":"화성실내체육관"},{"TeamNo":58,"TeamName":"김천 한국도로공사 하이패스","SportKind":"VB","Place":"김천실내체육관"},{"TeamNo":59,"TeamName":"광주 페퍼저축은행 AI 페퍼스","SportKind":"VB","Place":"염주종합체육관"}];

function MainScreen() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70 + insets.bottom,
          shadowOpacity: 0,
          elevation: 4,
        },
      }}>
      <Tab.Screen
        name="ticket"
        component={TicketScreen}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarActiveBackgroundColor: 'white',
          tabBarInactiveBackgroundColor: 'white',
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                style={styles.mainImg}
                source={require('../public/png/free-icon-tickets-normal.png')}
              />
            ) : (
              <Image
                style={styles.mainImg}
                source={require('../public/png/free-icon-tickets-select.png')}
              />
            ),
        }}
      />
      <Tab.Screen
        name="calendar"
        component={CalScreen}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarActiveBackgroundColor: 'white',
          tabBarInactiveBackgroundColor: 'white',
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                style={styles.mainImg}
                source={require('../public/png/free-icon-calendar-normal.png')}
              />
            ) : (
              <Image
                style={styles.mainImg}
                source={require('../public/png/free-icon-calendar-select.png')}
              />
            ),
        }}
      />
      <Tab.Screen
        name="info"
        component={InfoScreen}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarActiveBackgroundColor: 'white',
          tabBarInactiveBackgroundColor: 'white',
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                style={styles.mainImg}
                source={require('../public/png/free-icon-user-normal.png')}
              />
            ) : (
              <Image
                style={styles.mainImg}
                source={require('../public/png/free-icon-user-select.png')}
              />
            ),
        }}
      />
      <Tab.Screen
        name="ticketDetail"
        component={TicketDetail}
        options={{
          headerShown: false,
          tabBarActiveBackgroundColor: 'white',
          tabBarInactiveBackgroundColor: 'white',
          tabBarButton: () => null
        }
        }
      />
    </Tab.Navigator>
  );
}

function TicketScreen({ navigation }) {

  const [searchKeyword, setSearchKeyword] = useState('');
  const DATA = [
    { TicketNo: '1', GameDate: '20240421', TicketName: 'NC다이노스 vs SSG랜더스', HomeTeamNo: 31, AwayTeamNo: 32, HomeScore: 1, AwayScore: 5, Result: 'W', Seat: '응원지정석 10열 D', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 15000, UserId: 'Master', TicketDiary: "최정이 467홈런을 친걸 눈으로 봐서 좋았다 500홈런넘자 ㅎ", SportKind: 'BS', place: "창원NC다이노스파크" },
    { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamNo: 9, AwayTeamNo: 10, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'SC', place: "상암월드컵경기장" },
    { TicketNo: '3', GameDate: '20240321', TicketName: 'SSG랜더스 vs 기아타이거즈', HomeTeamNo: 32, AwayTeamNo: 27, HomeScore: 1, AwayScore: 7, Result: 'L', Seat: '그린존 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 18000, UserId: 'Master', TicketDiary: "기분좋게 그린존을 갔는데 야구실력 때문에 갑자기 기분이 나빠졌다", SportKind: 'BS', place: "SSG랜더스파크" },
    // 길게 나오는거 테스트용
    { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamNo: 9, AwayTeamNo: 10, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'SC', place: "상암월드컵경기장" },
    { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamNo: 9, AwayTeamNo: 10, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'SC', place: "상암월드컵경기장" },
    { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamNo: 9, AwayTeamNo: 10, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'SC', place: "상암월드컵경기장" },
    { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamNo: 9, AwayTeamNo: 10, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'SC', place: "상암월드컵경기장" },
    { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamNo: 9, AwayTeamNo: 10, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'SC', place: "상암월드컵경기장" },
    { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamNo: 9, AwayTeamNo: 10, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'SC', place: "상암월드컵경기장" },
    { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamNo: 9, AwayTeamNo: 10, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'SC', place: "상암월드컵경기장" },
    { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamNo: 9, AwayTeamNo: 10, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'SC', place: "상암월드컵경기장" },
    { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamNo: 9, AwayTeamNo: 10, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'SC', place: "상암월드컵경기장" },
  ];

  const renderItem = ({ item }) => (
    <ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('ticketDetail', { item })}>
        <View style={styles.mainListContainer}>
          <Image source={sportsImg[item.SportKind]} style={styles.mainListImg} />
          <View style={styles.mainTicketList}>
            <Text style={styles.mainMiniTxt}>{item.GameDate}</Text>
            <Text style={styles.mainTicketName}>{item.TicketName}</Text>
            <View style={styles.RowStyle}>
              <Text style={styles.mainMiniTxt}>{item.HomeScore}</Text>
              <Text style={styles.mainMiniTxt}>:</Text>
              <Text style={styles.mainMiniTxt}>{item.AwayScore}</Text>
            </View>
          </View>
          <Image source={resultImg[item.Result]} style={styles.mainListImg} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.TicketContainer}>
      <View style={styles.mainSearchItem}>
        <Image source={require('../public/png/free-icon-magnifier.png')} style={styles.mainSearchImg} />
        <View style={styles.mainSearchSubItem}>
          <TextInput
            style={styles.mainMiniTxt}
            onChangeText={text => setSearchKeyword(text)}
            placeholder="찾으시려는 티켓을 검색하세요."
          />
        </View>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity styles={styles.buttonSubContainer} onPress={() => navigation.navigate('addTicket')}>
          <Image
            source={require('../public/png/free-icon-add-button.png')}
            style={styles.buttonSubContainer}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// TicketDetail를 TicketScreen에서도 사용하기위해..
export function TicketDetail({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;

  // 수정 js로 이동하기 위한 함수
  const handleNavigateToEditTicket = () => {
    const ticketData = { TicketNo: item.TicketNo };
    navigation.navigate('addTicket', { ticketData });
  };
  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../public/png/free-icon-left-arrow.png')} style={styles.ticketDetailBtn} />
        </TouchableOpacity>
        <View style={styles.ticketDetailTitleContainer}>
          <TouchableOpacity onPress={handleNavigateToEditTicket}>
            <Image source={require('../public/png/free-icon-pencil.png')} style={styles.ticketDetailBtn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { TicketDelete(navigation, route) }}>
            <Image source={require('../public/png/free-icon-recycle-bin.png')} style={styles.ticketDetailBtn} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.TicketContainer}>
        <View style={styles.ticketDetailSubView}>
          <View style={styles.alignCenter}>
            <View style={styles.ticketDetailSportsView}>
              <Image source={sportsImg[item.SportKind]} style={styles.ticketDetailSportsImg} />
              <View style={styles.rowCenter}>
                <Text style={styles.ticketDetailText}>{subSportsCategory[item.HomeTeamNo - 1].TeamName}</Text>
                <Text style={styles.ticketDetailVS}> vs </Text>
                <Text style={styles.ticketDetailText}>{subSportsCategory[item.AwayTeamNo - 1].TeamName}</Text>
              </View>
              <View style={styles.rowCenter}>
                <Text style={styles.ticketDetailText}>{item.HomeScore}</Text>
                <Text style={styles.ticketDetailText}>:</Text>
                <Text style={styles.ticketDetailText}>{item.AwayScore}</Text>
              </View>
            </View>
          </View>
          <View style={styles.ticketDetailDiaryView}>
            <View style={styles.fiex1}>
              <View style={styles.rowCenter}>
                <Image source={require('../public/png/free-icon-daily-calendar.png')} style={styles.ticketDetailImg} />
                <Text style={styles.ticketDetailCNLTxt}>{item.GameDate}</Text>
              </View>
              <View style={styles.ticketDetailLocaView}>
                <Image source={require('../public/png/free-icon-location.png')} style={styles.ticketDetailImg} />
                <Text style={styles.ticketDetailCNLTxt}>{item.place}</Text>
              </View>
            </View>
            <View style={{ marginLeft: 30 }}>
              <Image source={resultImg[item.Result]} style={styles.ticketDetailResultImg} />
            </View>
          </View>
          <View>
            <Image source={require('../public/img/KakaoTalk_20240428_193213436.jpg')} style={styles.ticketUserImg} />
          </View>
          <View>
            <Text style={styles.ticketUserDiaryTxt}>{item.TicketDiary}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function CalScreen() {
  const currentDate = new Date(); // 현재 날짜
  return (
    <View style={styles.calView}>
      <Calendar currentDate={currentDate} />
    </View>
  );
}

function InfoScreen() {
  return (
    <View style={styles.calView}>
      <MyInfo />
    </View>
  );
}

export function TicketDelete(navigation, data) {
  // 티켓 삭제
  Alert.alert(
    '', '정말로 현재까지 작성하신 티켓을 삭제하시겠습니까?',
    [
      {
        text: '취소',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => { navigation.navigate('ticket') },
      },
    ],
    { cancelable: false }
  );
}

export default MainScreen;
