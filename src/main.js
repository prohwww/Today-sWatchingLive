import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

function MainScreen() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Ticket"
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
    </Tab.Navigator>
  );
}
function TicketScreen({navigation}) {
  return (
    <View>
      <Text>Ticket</Text>
      {/* <Button
        title="상세보기"
        onPress={() => navigation.push('Detail', {id: 1})}
      /> */}
    </View>
  );
}

function CalScreen() {
  return <Text>Calendar</Text>;
}

function InfoScreen() {
  return <Text>My Info</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
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
});

export default MainScreen;
