import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sportsMap, teamMap } from './map';
import Svg, { G, Path, Rect } from 'react-native-svg';
import * as d3 from 'd3-shape';

const TeamAnalysis = ({ selectTeam }) => {
    const fontStyle = 'MangoDdobak-';
    const [team, setTeam] = useState(null);

    useEffect(() => {
        const teamData = fetchTeamById(selectTeam);
        setTeam(teamData);
    }, [selectTeam]);

    const teamInfo = { 
        sportsKind: "B", 
        teamName: "SSG 랜더스", 
        days: 720, 
        total: 0.75, 
        homeCnt: 4, 
        homeRate: 0.75,
        awayCnt: 0, 
        awayRate: 0
    };

    const pieData = [
        {
            key: 1,
            value: teamInfo.total,
            svg: { fill: `rgba(255, 0, 0, 0.6)` },
            name: '승'
        },
        {
            key: 2,
            value: 1 - teamInfo.total,
            svg: { fill: 'rgba(0, 0, 255, 0.6)' },
            name: '패'
        },
    ];

    const navigation = useNavigation();
    const closeWindow = (event) => {
        event.persist();
        navigation.goBack();
    };

    const windowWidth = useWindowDimensions().width;
    const cellWidth = windowWidth - 10;

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        infoText: {
            color: 'black',
            fontFamily: fontStyle + 'B',
            fontSize: 20,
            margin: 5,
        },
        innerText: {
            color: 'black',
            fontFamily: fontStyle + 'R',
            fontSize: 15,
            margin: 5,
        },
        item: {
            padding: 5,
            margin: 5,
            flexDirection: 'row',
            alignItems: 'center',
            width: cellWidth,
        },
        img: {
            width: 30,
            height: 30,
            marginRight: 5,
        },
        innerView: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        chartTitle: {
            textAlign: 'center',
            fontSize: 16,
            fontFamily: fontStyle + 'R',
            marginTop: 10,
            marginBottom: 5,
        },
        grid: {
            margin: 5,
            marginTop: 20,
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 15,
        },
        innerHeader: {
            margin: 5,
            alignItems: 'center',
            width: 300,
            borderBottomWidth: 1,
        },
        tab: {
            margin: 5,
            alignItems: 'center',
        },
        headerText: {
            color: 'black',
            fontFamily: fontStyle + 'B',
            fontSize: 15,
            margin: 5,
        },
        contextText: {
            color: 'black',
            fontFamily: fontStyle + 'R',
            fontSize: 15,
            margin: 5,
            marginBottom: 10,
        },
        backText: {
            color: 'black',
            fontFamily: fontStyle + 'B',
            fontSize: 20,
            margin: 5,
            marginLeft: 100,
        },
        legendContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
        },
        legendText: {
            fontSize: 15,
            marginLeft: 5,
            fontFamily: fontStyle + 'R', // 사용하고자 하는 폰트 이름으로 변경
        },
    });

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
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={styles.innerView}>
                    <Image source={sportsMap[teamInfo.sportsKind]} style={styles.img} />
                    <Text style={styles.infoText}>{teamInfo.teamName} 직관 승률</Text>
                    <TouchableOpacity onPress={closeWindow}>
                        <Text style={styles.backText}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.item}>
                <Text style={styles.innerText}>당신이 {teamInfo.teamName}와 함께한지 {teamInfo.days}일째 입니다.</Text>
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
                    <Text style={styles.contextText}>{teamInfo.total * 100}%</Text>
                </View>
                <View style={styles.innerView}>
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
        </View>
    );
};

const fetchTeamById = (id) => {
    return teamMap[id];
};

export default TeamAnalysis;