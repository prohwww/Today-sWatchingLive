import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, ScrollView, View, StyleSheet, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Calendar from './calendar';
import MyInfo from './myInfo';

const Tab = createBottomTabNavigator();
const resultImg = {
  W: require('../public/png/free-icon-victory.png'),
  L: require('../public/png/free-icon-rubber-stamp.png'),
  T: require('../public/png/free-icon-rubber-stamp.png'),
};
const sportsImg = {
  S: require('../public/png/free-icon-soccer-ball.png'),
  B: require('../public/png/free-icon-baseball.png'),
  // 종목 추가 필요...
};
const TeamCdName = [
  "", "SSG랜더스", "NC다이노스", "FC서울", "전북현대", "기아타이거즈"
]

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
          title: 'TICKET',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            alignSelf: 'center',
          },
          headerTitleAlign: 'center',
          tabBarActiveBackgroundColor: 'white',
          tabBarInactiveBackgroundColor: 'white',
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                style={styles.img}
                source={require('../public/png/free-icon-tickets-normal.png')}
              />
            ) : (
              <Image
                style={styles.img}
                source={require('../public/png/free-icon-tickets-select.png')}
              />
            ),
        }}
      />
      <Tab.Screen
        name="calendar"
        component={CalScreen}
        options={{
          title: 'CALENDAR',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            alignSelf: 'center',
          },
          headerTitleAlign: 'center',
          tabBarActiveBackgroundColor: 'white',
          tabBarInactiveBackgroundColor: 'white',
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                style={styles.img}
                source={require('../public/png/free-icon-calendar-normal.png')}
              />
            ) : (
              <Image
                style={styles.img}
                source={require('../public/png/free-icon-calendar-select.png')}
              />
            ),
        }}
      />
      <Tab.Screen
        name="info"
        component={InfoScreen}
        options={{
          title: 'MY INFO',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            alignSelf: 'center',
          },
          headerTitleAlign: 'center',
          tabBarActiveBackgroundColor: 'white',
          tabBarInactiveBackgroundColor: 'white',
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                style={styles.img}
                source={require('../public/png/free-icon-user-normal.png')}
              />
            ) : (
              <Image
                style={styles.img}
                source={require('../public/png/free-icon-user-select.png')}
              />
            ),
        }}
      />
      <Tab.Screen
        name="ticketDatail"
        component={TicketDatail}
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
    { TicketNo: '3', GameDate: '20240321', TicketName: 'SSG랜더스 vs 기아타이거즈', HomeTeamCd: 1, AwayTeamCd: 5, HomeScore: 1, AwayScore: 7, Result: 'L', Seat: '그린존 자유석', PhotoName: "KakaoTalk_20240428_193213436.jpg", Price: 18000, UserId: 'Master', TicketDiary: "기분좋게 그린존을 갔는데 야구실력 때문에 갑자기 기분이 나빠졌다", SportKind: 'B', place: "SSG랜더스파크" }
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ticketDatail', { item })}>
      <View style={styles.item}>
        <Image source={sportsImg[item.SportKind]} style={{ width: 45, height: 45, }} />
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={styles.TicketScreenText}>{item.GameDate}</Text>
          <Text style={{ fontSize: 16, marginBottom: 5, fontFamily: 'NanumGothic' }}>{item.TicketName}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.TicketScreenText}>{item.HomeTeamCd}</Text>
            <Text style={styles.TicketScreenText}>:</Text>
            <Text style={styles.TicketScreenText}>{item.AwayTeamCd}</Text>
          </View>
        </View>
        <Image source={resultImg[item.Result]} style={{ width: 45, height: 45, }} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchItem}>
        <Image source={require('../public/png/free-icon-magnifier.png')} style={{ width: 30, height: 30, }} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <TextInput
            style={{ fontSize: 13 }}
            onChangeText={text => setSearchKeyword(text)}
            placeholder="찾으시려는 티켓을 검색하세요."
          />
        </View>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={() => navigation.navigate('addTicket')}>
        <Image source={require('../public/png/free-icon-add-button.png')} style={styles.addBtn} />
      </TouchableOpacity>
    </View>
  );
}

// TicketDatail를 TicketScreen에서도 사용하기위해..
export function TicketDatail({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;
  
  // 수정 js로 이동하기 위한 함수
  const handleNavigateToEditTicket = () => {
    const ticketData = { TicketNo: item.TicketNo };
    navigation.navigate('editTicket', { ticketData });
  };

  return (
    <View style={styles.component}>
      <View style={styles.headContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../public/png/free-icon-left-arrow.png')} style={styles.addBtn2} />
        </TouchableOpacity>
        <View style={{ justifyContent: 'flex-end', flexDirection: 'row'}}>
          <TouchableOpacity onPress={handleNavigateToEditTicket}>
            <Image source={require('../public/png/free-icon-pencil.png')} style={styles.addBtn2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { TicketDelete(navigation, route) }}>
            <Image source={require('../public/png/free-icon-recycle-bin.png')} style={styles.addBtn2} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <View style={{ padding: 15, alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image source={sportsImg[item.SportKind]} style={{ width: 30, height: 30, marginBottom: 5 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.TicketDatailText}>{TeamCdName[item.HomeTeamCd]}</Text>
                <Text style={{ padding: 10, fontSize: 20, fontFamily: 'NanumGothicBold' }}> vs </Text>
                <Text style={styles.TicketDatailText}>{TeamCdName[item.AwayTeamCd]}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.TicketDatailText}>{item.HomeScore}</Text>
                <Text style={styles.TicketDatailText}>:</Text>
                <Text style={styles.TicketDatailText}>{item.AwayScore}</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginVertical: 5 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../public/png/free-icon-daily-calendar.png')} style={{ width: 20, height: 20, marginLeft: -5 }} />
                <Text style={{ fontSize: 12, fontFamily: 'NanumGothicBold', marginLeft: 10 }}>{item.GameDate}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Image source={require('../public/png/free-icon-location.png')} style={{ width: 20, height: 20, marginLeft: -5 }} />
                <Text style={{ fontSize: 12, fontFamily: 'NanumGothicBold', marginLeft: 10 }}>{item.place}</Text>
              </View>
            </View>
            <View style={{ marginLeft: 30 }}>
              <Image source={resultImg[item.Result]} style={{ width: 80, height: 80 }} />
            </View>
          </View>
          <View>
            <Image source={require('../public/img/KakaoTalk_20240428_193213436.jpg')} style={{ width: 330, height: 330 }} />
          </View>
          <View>
            <Text style={{ padding: 8, fontSize: 12, fontFamily: 'NanumGothicBold', borderWidth: 1, width: 330, height: 100, maxHeight: 100, marginVertical: 10 }}>{item.TicketDiary}</Text>
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
      <Text style={styles.semiTitle}>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</Text>
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
    '','정말로 현재까지 작성하신 티켓을 삭제하시겠습니까?',
    [
      {
        text: '취소',
        onPress: () => {},
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'NanumGothicBold'
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 40,
    height: 40,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'space-between', // 요소들 사이의 공간을 균등하게 분배
  },
  searchItem: {
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  calView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  semiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5,
    color: 'black',
    fontFamily: 'NanumGothicBold'
  },
  TicketDatailText: {
    fontSize: 20,
    fontFamily: 'NanumGothicBold'
  },
  TicketScreenText: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'NanumGothicBold'
  },
  addBtn: {
    width: 40,
    height: 40,
    marginLeft: 340,
    marginBottom: 10,
  },
  addBtn2: {
    width: 30,
    height: 30,
    marginHorizontal: 3
  },
});

export default MainScreen;
