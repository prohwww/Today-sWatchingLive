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
import { host, sportsMap, teamMap } from './map';
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
            if (data && data.sportsKind && data.totalRate != null) {
                console.log('myTeam/rate Received data:', data);
                setTeamInfo(data);
                setPiData([
                    {
                        key: 1,
                        value: data.totalRate,
                        svg: { fill: `rgba(255, 0, 0, 0.6)` },
                        name: '승',
                    },
                    {
                        key: 2,
                        value: data.totalRate == 0 ? 0.0 : 1 - data.totalRate,
                        svg: { fill: 'rgba(0, 0, 255, 0.6)' },
                        name: '패',
                    },
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
                    <Text style={styles.infoText}>{teamInfo.regDate}부터 {teamInfo.teamName}와 함께하였습니다.({teamInfo.days}일째)</Text>
                </View>

                <Svg width={windowWidth} height={220}>
                    <G x={windowWidth / 2} y={110}>
                        {arcs.map((arc, index) => (
                            <Path key={index} d={arcGenerator(arc)} fill={arc.data.svg.fill} />
                        ))}
                    </G>
                </Svg>

                <CustomLegend data={pieData} />

                <View style={styles.grid}>
                    <View style={styles.innerHeader}>
                        <Text style={styles.headerText}>전체 승률</Text>
                        <Text style={styles.contextText}>{teamInfo.totalRate * 100}%</Text>
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