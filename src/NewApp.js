import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './start';
import LoginScreen from './login';
import MainScreen from './main';

const Stack = createNativeStackNavigator();
export const userIsLogin = false;

const App = () => {

  const [ready, setReady] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setReady(false)
    }, 3000)  // 3초정도 start 페이지 실행됐다가 로그인창 가기..
  }, [])

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (isLogin) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userIsLogin]);

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
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{title: '상세보기'}}
          /> */}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
}

export default App;