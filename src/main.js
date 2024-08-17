import React, { useState, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, ScrollView, View, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Calendar from './calendar';
import MyInfo from './myInfo';
import styles from './style';
import { host, resultMap, sportsMap } from './map';

const Tab = createBottomTabNavigator();

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
          tabBarButton: () => null,
          unmountOnBlur: true // 화면이 포커스를 잃으면 언마운트
        }
        }
      />
    </Tab.Navigator>
  );
}

function TicketScreen({ navigation }) {
  const [data, setData] = useState([]); // 데이터 상태 추가

  const fetchData = useCallback(() => {
    fetch(host + '/ticket/postView', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "searchCriteria": "All",
        "Page": 10,
        "size": 10
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Received data:', data);
      setData(data); // 데이터를 상태에 저장
    })
    .catch(error => {
      alert('Error fetching data!');
      console.error('Error fetching data:', error);
    });
  }, []); // 빈 배열을 두 번째 인자로 전달하여 `fetchData`는 한 번만 생성됨

  // 화면이 포커스될 때마다 데이터 요청
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const renderItem = ({ item }) => (
    <ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('ticketDetail', { item })}>
        <View style={styles.mainListContainer}>
          <Image source={sportsMap[item.sportsKind]} style={styles.mainListImg} />
          <View style={styles.mainTicketList}>
            <Text style={styles.mainMiniTxt}>{item.gameDate}</Text>
            <Text style={styles.mainTicketName}>{item.ticketName}</Text>
            <View style={styles.RowStyle}>
              <Text style={styles.mainMiniTxt}>{item.homeScore}</Text>
              <Text style={styles.mainMiniTxt}>:</Text>
              <Text style={styles.mainMiniTxt}>{item.awayScore}</Text>
            </View>
          </View>
          <Image source={resultMap[item.result]} style={styles.mainListImg} />
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
        data={data} // 상태에서 데이터를 가져옴
        renderItem={renderItem}
        keyExtractor={item => item.ticketNo} // 각 항목에 고유 키를 설정 (id를 고유 식별자로 가정)
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonSubContainer} onPress={() => navigation.navigate('addTicket')}>
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
  const [item, setItem] = useState(route.params?.item); // 초기 item 상태 설정
  const [data, setData] = useState({}); // 데이터 상태 추가
  
  const fetchDataDetail = useCallback(() => {
    fetch(host + '/ticket/postView', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "searchCriteria": "Detail",
        "ticketNo": item.ticketNo
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Received data:', data[0]);
      setData(data[0]); // 데이터를 상태에 저장
    })
    .catch(error => {
      alert('error!');
      console.error('Error fetching data:', error);
    });
  }, []); // 빈 배열을 두 번째 인자로 전달하여 `fetchData`는 한 번만 생성됨

  useFocusEffect(
    useCallback(() => {
      // 포커스될 때 route.params에서 item을 가져와 상태 업데이트
      if (route.params?.item) {
        setItem(route.params.item);
        fetchDataDetail();
      }
    }, [route.params?.item, fetchDataDetail])
  );

  // 수정 js로 이동하기 위한 함수
  const handleNavigateToEditTicket = () => {
    const ticketData = { data: data };
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
              <Image source={sportsMap[data.sportsKind] ? sportsMap[data.sportsKind] : sportsMap["SC"]} style={styles.ticketDetailSportsImg} />
              <Text style={{ fontSize: 10 }}></Text>
              <View style={styles.RowStyle}>
                <View style={[styles.ticketTitle, styles.fiex1]}>
                  <Text style={styles.ticketDetailText}>
                    {(data.ticketName ? data.ticketName.split(' VS ')[0] : '')}
                  </Text>
                  <Text style={{fontSize: 10}}></Text>
                  <Text style={styles.ticketDetailText}>{data.homeScore}</Text>
                </View>
                <View style={[styles.ticketTitle, styles.flexCenter]}>
                  <Text style={styles.ticketDetailVS}> vs </Text>
                </View>
                <View style={[styles.ticketTitle, styles.fiex1]}>
                  <Text style={styles.ticketDetailText}>
                    {(data.ticketName ? data.ticketName.split(' VS ')[1] : '')}
                  </Text>
                  <Text style={{fontSize: 10}}></Text>
                  <Text style={styles.ticketDetailText}>{data.awayScore}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.ticketDetailDiaryView}>
            <View style={styles.fiex1}>
              <View style={styles.rowCenter}>
                <Image source={require('../public/png/free-icon-daily-calendar.png')} style={styles.ticketDetailImg} />
                <Text style={styles.ticketDetailCNLTxt}>{data.gameDate}</Text>
              </View>
              <View style={styles.ticketDetailLocaView}>
                <Image source={require('../public/png/free-icon-location.png')} style={styles.ticketDetailImg} />
                <Text style={styles.ticketDetailCNLTxt}>{data.place}</Text>
              </View>
            </View>
            <View style={{ marginLeft: 30 }}>
              <Image source={(resultMap[data.result] ? resultMap[data.result] : resultMap["w"])} style={styles.ticketDetailResultImg} />
            </View>
          </View>
          <View>
            <Image source={require('../public/img/KakaoTalk_20240428_193213436.jpg')} style={styles.ticketUserImg} />
          </View>
          <View>
            <Text style={styles.ticketUserDiaryTxt}>{data.ticketContent}</Text>
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
        onPress: () => {
          fetch('http://14.6.16.195:9004/ticket/deleteEntry', {
            method: 'POST', // 메서드를 POST로 설정
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "ticketNo": data.params.item.ticketNo
            })
          })
            .then(response => response.text())
            .then(data => {
              console.log('Received data:', data);
              if (data == "ticket delete success") {
                navigation.navigate('ticket');
              }else{
                alert('티켓삭제 error!');
              }
            })
            .catch(error => {
              alert('error!');
              console.error('Error fetching data:', error);
              // 에러 처리를 수행할 수 있습니다.
            });    
        },
      },
    ],
    { cancelable: false }
  );
}

export default MainScreen;
