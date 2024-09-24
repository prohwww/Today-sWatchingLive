import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    useWindowDimensions,
    Image,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { host, sportsMap, teamMap, sportsImg } from './map';
import Svg, { G, Path, Rect } from 'react-native-svg';
import * as d3 from 'd3-shape';
import styles from './style';

const TeamAnalysis = ({ route }) => {
    const { selectTeamNo } = route.params || {};
    const [loading, setLoading] = useState(true);
    const [teamInfo, setTeamInfo] = useState(null);
    const [pieData, setPiData] = useState([
        {
            key: 1,
            value: 0,
            svg: {fill: `rgba(255, 0, 0, 0.6)`},
            name: '승'
        },
        {
            key: 2,
            value: 0,
            svg: { fill: 'rgba(0, 0, 255, 0.6)' },
            name: '패'
        }
    ]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(host + '/myTeam/rate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "teamNo": selectTeamNo,
                }),
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();
            if (data && data.sportsKind != null) {
                console.log('myTeam/rate Received data:', data);
                setTeamInfo(data);
                setPiData([
                    {
                        key: 1,
                        value: (data.winRate).toFixed(2),
                        svg: { fill: `rgba(255, 0, 0, 0.6)` },
                        name: '승',
                    },
                    {
                        key: 2,
                        value: (data.tieRate).toFixed(2),
                        svg: { fill: 'rgba(154, 245, 7, 0.6)' },
                        name: '무',
                    },
                    {
                        key: 3,
                        value: (data.loseRate).toFixed(2),
                        svg: { fill: 'rgba(0, 0, 255, 0.6)' },
                        name: '패',
                    }
                ]);
            } else {
                console.error('Data is null or invalid:', data);
            }
        
            setLoading(false);
        
        } catch (error) {
            alert('내부 오류가 있습니다. 잠시 후 다시 시도해주세요.');
            console.error('myTeam/list Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const onPressDelete = () => {
        Alert.alert(
          '', 
          '응원하는 팀을 삭제하시겠습니까?',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '확인',
              onPress: () => deleteMyTeam(),
            },
          ],
          { cancelable: false }
        );
      };

    function deleteMyTeam() {
        console.log("teamno: " + selectTeamNo);
        const url = host + '/myTeam/deleteMyTeam';
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                "teamNo" : selectTeamNo
          })
        })
        .then(response => {
            console.log('Response Status:', response.status);
            if (response.status === 201) {
                console.log('Delete Success! teamNo: ' + selectTeamNo);
                navigation.goBack()
            } else {
                throw new Error('failed delete Team Response: ' + response.status);
            }
        })
        .catch(error => {
            alert('내부 오류가 있습니다. 잠시 후 다시 시도해주세요.');
            console.error('myTeam/deleteMyTeam Error fetching data:', error);
        });
    };

    const navigation = useNavigation();
    const closeWindow = (event) => {
        event.persist();
        navigation.goBack();
    };

    const windowWidth = useWindowDimensions().width;

    const CustomLegend = ({ data }) => (
        <View>
            {data.map((item, index) => (
                <View key={index} style={styles.legendContainer}>
                    <Svg height="15" width="15">
                        <Rect width="15" height="15" fill={item.svg.fill} />
                    </Svg>
                    <Text style={styles.legendText}>{item.name} {item.value * 100}%</Text>
                </View>
            ))}
        </View>
    );

    const radius = 100;
    const pieGenerator = d3.pie().value(d => d.value);
    const arcGenerator = d3.arc().outerRadius(radius).innerRadius(0);

    const arcs = pieGenerator(pieData);

    const getProperPostfix = (teamName) => {
        const lastChar = teamName.charAt(teamName.length - 1);
        const lastCharCode = lastChar.charCodeAt(0);

        // 한글의 경우 자음으로 끝나면 "이랑", 나머지는 "랑"
        if (lastCharCode >= 0xAC00 && lastCharCode <= 0xD7A3) {
            if ((lastCharCode - 0xAC00) % 28 !== 0) {
                return "이랑";
            }
        }

        return "랑";
    };

    return (
        <View style={{ flex: 1}} >
        {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>데이터 로딩 중...</Text>
            </View>
        ) : (
            <View style={styles.teamContainer}>
                <View style={styles.item}>
                    <View style={styles.teamInnerView}>
                        <Image source={sportsMap[teamInfo.sportsKind]} style={styles.teamImg} />
                        <Text style={styles.innerText}>{teamInfo.teamName} 직관 승률</Text>
                        <TouchableOpacity style={styles.backBtn} onPress={closeWindow}>
                            <Text style={styles.backText}>X</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.item}>
                    <Text style={styles.Txtcenter}>
                        {teamInfo.teamName}{getProperPostfix(teamInfo.teamName)}{"\n"}
                        {new Date(teamInfo.regDate).getFullYear()}년 {new Date(teamInfo.regDate).getMonth() + 1}월 {new Date(teamInfo.regDate).getDate()}일부터 {teamInfo.days}일째 함께하는 중이에요.{"\n"}
                        {sportsImg[teamInfo.sportsKind]}영원히 함께할 거야{sportsImg[teamInfo.sportsKind]}
                    </Text>
                </View>

                {/* 직관 승률이 없을 때 이미지 표시 */}
                {teamInfo.homeCnt === 0 && teamInfo.awayCnt ? (
                    <View style={{ alignItems: 'center' }}>
                        <Image 
                            source={require('../public/png/free-icon-noticket.png')} 
                            style={{ width: 150, height: 150, marginTop: 20, marginBottom: 20 }} 
                        />
                        <Text style={styles.Txtcenter}>아직 기록된 승률이 없습니다.</Text>
                    </View>
                ) : (
                    <Svg width={windowWidth} height={220}>
                        <G x={windowWidth / 2} y={110}>
                            {arcs.map((arc, index) => (
                                <Path key={index} d={arcGenerator(arc)} fill={arc.data.svg.fill} />
                            ))}
                        </G>
                    </Svg>
                )}

                <CustomLegend data={pieData} />

                <View style={styles.grid}>
                    <View style={styles.innerHeader}>
                        <Text style={styles.headerText}>전체 승률</Text>
                        <Text style={styles.contextText}>{(teamInfo.winRate * 100).toFixed(2)}%</Text>
                    </View>
                    <View style={styles.teamInnerView}>
                        <View style={styles.tab}>
                            <Text style={styles.headerText}>직관(홈)</Text>
                            <Text style={styles.contextText}>{teamInfo.homeCnt}회</Text>
                        </View>
                        <View style={styles.tab}>
                            <Text style={styles.headerText}>승률(홈)</Text>
                            <Text style={styles.contextText}>{teamInfo.homeRate * 100}%</Text>
                        </View>
                        <View style={styles.tab}>
                            <Text style={styles.headerText}>직관(원정)</Text>
                            <Text style={styles.contextText}>{teamInfo.awayCnt}회</Text>
                        </View>
                        <View style={styles.tab}>
                            <Text style={styles.headerText}>승률(원정)</Text>
                            <Text style={styles.contextText}>{teamInfo.awayRate * 100}%</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.teamDeleteBtn} onPress={onPressDelete}>
                    <Image source={require('../public/png/free-icon-delete.png')} style={styles.teamImg} />
                </TouchableOpacity>
            </View> )}
        </View>
    );
};

const fetchTeamById = (id) => {
    return teamMap[id];
};

export default TeamAnalysis;