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
  S: require('../public/png/free-icon-soccer-ball.png'),
  B: require('../public/png/free-icon-baseball.png'),
  // 종목 추가 필요...
};
const TeamCdName = [
  "", "SSG랜더스", "NC다이노스", "FC서울", "전북현대", "기아타이거즈"
]

const fontStyle = 'MangoDdobak-';


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
    { TicketNo: '1', GameDate: '20240421', TicketName: 'NC다이노스 vs SSG랜더스', HomeTeamCd: 2, AwayTeamCd: 1, HomeScore: 1, AwayScore: 5, Result: 'W', Seat: '응원지정석 10열 D', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 15000, UserId: 'Master', TicketDiary: "최정이 467홈런을 친걸 눈으로 봐서 좋았다 500홈런넘자 ㅎ", SportKind: 'B', place: "창원NC다이노스파크" },
    { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamCd: 3, AwayTeamCd: 4, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'S', place: "상암월드컵경기장" },
    { TicketNo: '3', GameDate: '20240321', TicketName: 'SSG랜더스 vs 기아타이거즈', HomeTeamCd: 1, AwayTeamCd: 5, HomeScore: 1, AwayScore: 7, Result: 'L', Seat: '그린존 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 18000, UserId: 'Master', TicketDiary: "기분좋게 그린존을 갔는데 야구실력 때문에 갑자기 기분이 나빠졌다", SportKind: 'B', place: "SSG랜더스파크" },
    // 길게 나오는거 테스트용
    // { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamCd: 3, AwayTeamCd: 4, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'S', place: "상암월드컵경기장" },
    // { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamCd: 3, AwayTeamCd: 4, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'S', place: "상암월드컵경기장" },
    // { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamCd: 3, AwayTeamCd: 4, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'S', place: "상암월드컵경기장" },
    // { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamCd: 3, AwayTeamCd: 4, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'S', place: "상암월드컵경기장" },
    // { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamCd: 3, AwayTeamCd: 4, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'S', place: "상암월드컵경기장" },
    // { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', HomeTeamCd: 3, AwayTeamCd: 4, HomeScore: 3, AwayScore: 1, Result: 'W', Seat: 'R구역 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 13000, UserId: 'Master', TicketDiary: "전북은 승점자판기라는 것을 또 한번 깨달았다.", SportKind: 'S', place: "상암월드컵경기장" },
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
              <Text style={styles.mainMiniTxt}>{item.HomeTeamCd}</Text>
              <Text style={styles.mainMiniTxt}>:</Text>
              <Text style={styles.mainMiniTxt}>{item.AwayTeamCd}</Text>
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
                <Text style={styles.ticketDetailText}>{TeamCdName[item.HomeTeamCd]}</Text>
                <Text style={styles.ticketDetailVS}> vs </Text>
                <Text style={styles.ticketDetailText}>{TeamCdName[item.AwayTeamCd]}</Text>
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
      <Text style={styles.calTitle}>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</Text>
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
