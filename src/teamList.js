import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text, 
    TouchableOpacity,
    Modal,
    ScrollView,
    useWindowDimensions,
    Image
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {sportsMap} from './map';

const TeamList = () => {
    const Stack = createStackNavigator();
    
    const windowWidth = useWindowDimensions().width;
    const cellWidth = windowWidth - 10;

    const [teams, setTeams] = useState([
        { sports: 'B', team: 'SSG Landers'},
        { sports: 'S', team: 'FC SEOUL'},
    ]);

    const selectedTeamSports = teams.filter(team => sportsMap.hasOwnProperty(team.sports));

    const addBtnClick = () => {
        // 응원하는 팀 추가 버튼
        
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        infoText: {
            color: 'black',
            fontFamily: 'NanumGothicBold',
            fontSize: 15,
            padding: 5,
        },
        item: {
            padding: 5,
            margin: 5,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            width: cellWidth,
        },
        img: {
            width: 50,
            height: 50,
            marginRight: 5,
        },
        teamView: {
            flexDirection: 'row'
        },
        innerView: {
            flexDirection: 'row',
            alignItems: 'center',
        },
      });

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.item} onPress={addBtnClick}>
                    <Image source={require('../public/png/free-icon-add-button.png')} style={styles.img} />
                    <Text style={styles.infoText}>응원하는 팀을 추가해주세요</Text>
                </View>
            </TouchableOpacity>
           
            <View>
                {selectedTeamSports.map((teams, index) => (
                     <View key={index} style={styles.item}>
                        <TouchableOpacity>
                            <View style={styles.innerView}>
                                <Image source={sportsMap[teams.sports]} style={styles.img} />
                                <Text style={styles.infoText}>{teams.team}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            
        </View>
      );

};

export default TeamList;