import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const DesignAttribution = () => {
    const navigation = useNavigation();

    const onPressCancel = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.attrContainer}>
            <View style={styles.attrHeadContainer}>
                <TouchableOpacity onPress={onPressCancel}>
                    <Image source={require('../public/png/free-icon-left-arrow.png')} style={styles.TicketAddBtn} />
                </TouchableOpacity>
            </View>
            <View style={styles.innerContainer}>
                <Text style={styles.pageTitle}>✨ 디자인 출처 ✨</Text>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    
                    {/* 홈화면 */}
                    <Text style={styles.attributionTitle}>🎟️ 홈 화면</Text>
                    <Text style={styles.attributionDetail}>
                        - 티켓 아이콘{'\n'}
                        👉 Designed by Freepik
                    </Text>

                    {/* 하단 메뉴 */}
                    <Text style={styles.attributionTitle}>📜 하단 메뉴 아이콘</Text>
                    <Text style={styles.attributionDetail}>
                        1) 글목록 티켓 아이콘{'\n'}
                        👉 Designed by iconixar / Freepik{'\n'}
                        2) 캘린더 아이콘{'\n'}
                        👉 Designed by Freepik{'\n'}
                        3) 내정보 etc 사람 아이콘{'\n'}
                        👉 (추가 예정)
                    </Text>

                    {/* 스포츠 공 아이콘 */}
                    <Text style={styles.attributionTitle}>⚽ 스포츠 공 아이콘</Text>
                    <Text style={styles.attributionDetail}>
                        - 축구{'\n'}
                        👉 Designed by CapVora / Freepik{'\n'}
                        - 야구{'\n'}
                        👉 Designed by WR Graphic Garage / Freepik{'\n'}
                        - 배구{'\n'}
                        👉 Designed by Ylivdesign / Freepik{'\n'}
                        - 농구{'\n'}
                        👉 Designed by Karacis / Freepik
                    </Text>

                    {/* 글목록, 상세, 수정, 캘린더 */}
                    <Text style={styles.attributionTitle}>📝 글목록, 상세, 수정, 캘린더</Text>
                    <Text style={styles.attributionDetail}>
                        1) 승/무/패 날씨 아이콘{'\n'}
                        👉 Designed by Freepik{'\n'}
                        2) 글추가 아이콘{'\n'}
                        👉 Designed by Icon Desai / Freepik{'\n'}
                        3) 돋보기 아이콘{'\n'}
                        👉 (추가 예정){'\n'}
                        4) 뒤로가기 아이콘{'\n'}
                        👉 (추가 예정){'\n'}
                        5) 글수정 연필 아이콘{'\n'}
                        👉 (추가 예정){'\n'}
                        6) 휴지통 아이콘{'\n'}
                        👉 Designed by Pixel perfect / Freepik{'\n'}
                        7) 날짜(캘린더) 아이콘{'\n'}
                        👉 Designed by deha21 / Freepik{'\n'}
                        8) 위치 아이콘{'\n'}
                        👉 (추가 예정){'\n'}
                        9) 티켓 페이지 기본 이미지 (이미지 미첨부시){'\n'}
                        - 축구, 농구, 야구, 배구{'\n'}
                        👉 Designed by macrovector / Freepik{'\n'}
                        - etc{'\n'}
                        👉 Designed by Freepik{'\n'}
                        10) 글수정 저장 아이콘{'\n'}
                        👉 Designed by Cap Cool / Freepik
                    </Text>

                    {/* 내정보 */}
                    <Text style={styles.attributionTitle}>👤 내정보</Text>
                    <Text style={styles.attributionDetail}>
                        1) 응원하는 팀 아이콘{'\n'}
                        👉 Designed by Freepik{'\n'}
                        2) 설정 톱니바퀴 아이콘{'\n'}
                        👉 Designed by Iconsessions / Freepik{'\n'}
                        3) 휴지통 아이콘 (위와 동일){'\n'}
                        👉 Designed by Pixel perfect / Freepik
                    </Text>

                    <View style={styles.thankYouContainer}>
                        <Text style={styles.thankYouText}>
                            소중한 디자인 리소스를 제공해주신 모든 분들께{'\n'}
                            진심으로 감사드립니다!
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default DesignAttribution;
