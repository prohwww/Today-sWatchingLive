import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text, 
    TouchableOpacity,
    Modal,
    useWindowDimensions,
    Image,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { sportsMap, teamMap } from './map';
import { PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const TeamAnalysis = (selectTeam) => {
    const [team, setTeam] = useState(null);
    useEffect(() => {
        setTeam(selectTeam);
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
            name: '승',
            population: teamInfo.total,
            color: `rgba(255, 0, 0, 0.6)`,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: '패',
            population: 1 - teamInfo.total,
            color: 'rgba(0, 0, 255, 0.6)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];

    const navigation = useNavigation();
    const closeWindow = () => {
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
            fontFamily: 'NanumGothicBold',
            fontSize: 20,
            margin: 5,
        },
        innerText: {
            color: 'black',
            fontFamily: 'NanumGothic',
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
        teamView: {
            flexDirection: 'row'
        },
        innerView: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        picker: {
            width: 250,
        },
        chartTitle: {
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 5,
        },
        grid: {
            // padding: 5,
            margin: 5,
            // flexDirection: 'row',
            alignItems: 'center',
            // width: cellWidth,
            // borderCurve: 'circular',
            borderWidth: 1,
            borderRadius: 15,
        },
        innerHeader: {
            margin: 5,
            alignItems: 'center',
            // backgroundColor: 'grey',
            width: 300,
            borderBottomWidth: 1,
        },
        tab: {
            margin: 5,
            alignItems: 'center',
        },
        headerText: {
            color: 'black',
            fontFamily: 'NanumGothicBold',
            fontSize: 15,
            margin: 5,
        },
        contextText: {
            color: 'black',
            fontFamily: 'NanumGothic',
            fontSize: 15,
            margin: 5,
            marginBottom: 10,
        },
        backText: {
            color: 'black',
            fontFamily: 'NanumGothicBold',
            fontSize: 20,
            margin: 5,
            marginLeft: 100,
        }
    });

    return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <View style={styles.item}>
                        <View style={styles.innerView}>
                            <Image source={sportsMap[teamInfo.sportsKind]} style={styles.img} />
                            <Text style={styles.infoText}>{teamInfo.teamName} 직관 승률</Text>
                            <TouchableOpacity onPress={closeWindow}>
                                <Text style={styles.backText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.item}>
                    <Text style={styles.innerText}>당신이 {teamInfo.teamName}와 함께한지 {teamInfo.days}일째 입니다.</Text>
                </View>

                <PieChart
                    data={pieData}
                    width={windowWidth}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        strokeWidth: 2, // optional, default 3
                        barPercentage: 0.5,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
                
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

export default TeamAnalysis;