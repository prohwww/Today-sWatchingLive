import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sportsMap, teamMap } from './map';
import Svg, { G, Path, Rect } from 'react-native-svg';
import * as d3 from 'd3-shape';
import styles from './style';

const TeamAnalysis = ({ selectTeam }) => {
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
        <View style={styles.teamContainer}>
            <View style={styles.item}>
                <View style={styles.teamInnerView}>
                    <Image source={sportsMap[teamInfo.sportsKind]} style={styles.teamImg} />
                    <Text style={styles.innerText}>{teamInfo.teamName} 직관 승률</Text>
                    <TouchableOpacity onPress={closeWindow}>
                        <Text style={styles.backText}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.item}>
                <Text style={styles.infoText}>당신이 {teamInfo.teamName}와 함께한지 {teamInfo.days}일째 입니다.</Text>
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
        </View>
    );
};

const fetchTeamById = (id) => {
    return teamMap[id];
};

export default TeamAnalysis;