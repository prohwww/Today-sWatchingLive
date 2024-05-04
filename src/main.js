import React, { useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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
          tabBarIcon: ({focused}) =>
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
          tabBarIcon: ({focused}) =>
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
          tabBarIcon: ({focused}) =>
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
            title: 'TICKET',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
              alignSelf: 'center',
            },
            headerTitleAlign: 'center',
            tabBarActiveBackgroundColor: 'white',
            tabBarInactiveBackgroundColor: 'white',
            tabBarLabel: 'ticketDatail', 
            tabBarButton: () => null 
          }}
      />
    </Tab.Navigator>
  );
}

function TicketScreen({ navigation }) {

  const [searchKeyword, setSearchKeyword] = useState('');
  const DATA = [
    { TicketNo: '1', GameDate: '20240421', TicketName: 'NC다이노스 vs SSG랜더스', result: 'W', SportKind: 'B', score: '1:5' },
    { TicketNo: '2', GameDate: '20240407', TicketName: 'FC서울 vs 전북현대', result: 'W', SportKind: 'S', score: '3:1' },
    { TicketNo: '3', GameDate: '20240323', TicketName: 'SSG랜더스 vs 기아타이거즈', result: 'L', SportKind: 'B', score: '1:7' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ticketDatail', { item })}>
      <View style={styles.item}>
        <Image source={sportsImg[item.SportKind]} style={{ width: 45, height: 45, }} />
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={{ fontSize: 12, marginBottom: 5, fontFamily: 'NanumGothicBold' }}>{item.GameDate}</Text>
          <Text style={{ fontSize: 16, marginBottom: 5, fontFamily: 'NanumGothic' }}>{item.TicketName}</Text>
          <Text style={{ fontSize: 12, marginBottom: 5, fontFamily: 'NanumGothicBold' }}>{item.score}</Text>
        </View>
        <Image source={resultImg[item.result]} style={{ width: 45, height: 45, }} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchItem}>
        <Image source={require('../public/png/free-icon-magnifier.png')} style={{ width: 30, height: 30, }} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <TextInput
            style={{fontSize: 13}}
            onChangeText={text => setSearchKeyword(text)}
            placeholder="찾으시려는 티켓을 검색하세요."
          />
        </View>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
      />
    </View>
  );
}

// TicketDatail를 TicketScreen에서도 사용하기위해..
export function TicketDatail({ route }) {
  const { item } = route.params;
  return (
    <View style={{ padding: 30, alignItems: 'center' }}>
      <View >
        <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image source={sportsImg[item.SportKind]} style={{ width: 30, height: 30 }} />
            <Text style={{ padding: 10, fontSize: 20, fontFamily: 'NanumGothicBold' }}>{item.TicketName}</Text>
          </View>
          <Text style={{ fontSize: 23, fontFamily: 'NanumGothicBold', textAlign: 'center' }}>{item.score}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ padding: 10, marginHorizontal: 30 }}>
          <View style={{ justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../public/png/free-icon-daily-calendar.png')} style={{ width: 25, height: 25, marginVertical: 5 }} />
              <Text style={{ fontSize: 15, fontFamily: 'NanumGothicBold' }}>{item.TicketName}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../public/png/free-icon-location.png')} style={{ width: 25, height: 25, marginVertical: 5 }} />
              <Text style={{ fontSize: 15, fontFamily: 'NanumGothicBold' }}>SSG랜더스파크</Text>
            </View>
          </View>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <Image source={resultImg[item.result]} style={{ width: 80, height: 80 }} />
        </View>
      </View>
      <View>
        <Image source={require('../public/img/KakaoTalk_20240428_193213436.jpg')} style={{ width: 330, height: 330, marginVertical: 20 }} />
      </View>
      <View>
        <Text style={{ padding: 8, fontSize: 13, fontFamily: 'NanumGothicBold', borderWidth: 1 }}>최정이 홈런을 쳤다. 이제 타이기록인디 ㅠ 매일 쫒아가야하나 ?!</Text>
      </View>
  </View>
  );
}

function CalScreen() {
  const currentDate = new Date(); // 현재 날짜
  
  return (
    <View style={styles.calView}>
        <Text style={styles.semiTitle}>{currentDate.getFullYear()}년 {currentDate.getMonth()+1}월</Text>
        <Calendar currentDate={currentDate} />
    </View>
  );
}

function InfoScreen() {
  return (
    <View style={styles.calView}>
        <MyInfo/>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'NanumGothicBold'
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1
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
    borderWidth: 1, // 테두리 두깨
    justifyContent: 'space-between', // 요소들 사이의 공간을 균등하게 분배
  },
  searchItem:{
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1, // 테두리 두깨
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
});

export default MainScreen;
