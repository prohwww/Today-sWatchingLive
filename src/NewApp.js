import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './start';
import LoginScreen from './login';
import MainScreen, { TicketDetail } from './main';
import SigninScreen from './signin';
import FindPassWdScreen from './findPw';
import TeamListScreen from './teamList';
import AddTicketScreen from './addTicket';
import TeamAnalysis from './teamAnalysis';
import InfoSetting from './infoSetting';

const Stack = createNativeStackNavigator();

const App = () => {
  const [ready, setReady] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setReady(false)
    }, 3000)  // 3초정도 start 페이지 실행됐다가 로그인창 가기..
  }, [])

  // 로그인 상태 여부
  const [isLogin, setIsLogin] = useState(false);

  const handleLoginSuccess = () => {
    setIsLogin(true);
  };

  useEffect(() => {
      setIsLogin(isLogin);
  }, [isLogin]);

  return ready ? <StartScreen /> :
    (
      <NavigationContainer>
        {isLogin ? (
          <Stack.Navigator>
            <Stack.Screen
              name="main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{title: '상세보기'}}
          /> */}
            <Stack.Screen name="teamlist" component={TeamListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="addTicket" component={AddTicketScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ticketDetail" component={TicketDetail} options={{ headerShown: false }} />
            <Stack.Screen name="teamAnalysis" component={TeamAnalysis} options={{ headerShown: false }} />
            <Stack.Screen name="infoSetting" component={InfoSetting} options={{ headerShown: false }} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="login" options={{ headerShown: false }}>
              {props => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
            </Stack.Screen>
            <Stack.Screen name="signin" component={SigninScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="findPw" component={FindPassWdScreen} options={{ headerShown: false }}/>
            {/* <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{title: '상세보기'}
          }
          /> */}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
}


export default App;