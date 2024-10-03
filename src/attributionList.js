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
                    <Text style={styles.attributionTitle}>🎟️ 홈 화면 티켓 아이콘</Text>
                    <Text style={styles.attributionDetail}>
                        👉 Designed by Freepik
                    </Text>

                    <Text style={styles.attributionTitle}>📜 글 목록 티켓 아이콘</Text>
                    <Text style={styles.attributionDetail}>
                        👉 Designed by iconixar / Freepik
                    </Text>

                    <Text style={styles.attributionTitle}>🖼️ 티켓 페이지 기본 이미지</Text>
                    <Text style={styles.attributionDetail}>
                        - 축구, 농구, 야구, 배구{'\n'}
                        👉 Designed by macrovector / Freepik{'\n'}
                        - etc{'\n'}
                        👉 Designed by Freepik
                    </Text>

                    <Text style={styles.attributionTitle}>☁️ 승/무/패 날씨 아이콘</Text>
                    <Text style={styles.attributionDetail}>
                        👉 Designed by Freepik
                    </Text>

                    <Text style={styles.attributionTitle}>⚽ 스포츠 아이콘</Text>
                    <Text style={styles.attributionDetail}>
                        - 축구{'\n'}
                        👉 Designed by CapVora / Freepik
                    </Text>
                    <Text style={styles.attributionDetail}>
                        - 야구, 배구{'\n'}
                        👉 Designed by WR Graphic Garage / Freepik
                    </Text>
                    <Text style={styles.attributionDetail}>
                        - 농구{'\n'}
                        👉 Designed by Karacis / Freepik
                    </Text>

                    <Text style={styles.attributionTitle}>📅 캘린더 아이콘</Text>
                    <Text style={styles.attributionDetail}>
                        👉 Designed by Freepik
                    </Text>

                    <Text style={styles.attributionTitle}>📊 마이팀 승률 그래프 초기 아이콘</Text>
                    <Text style={styles.attributionDetail}>
                        👉 Designed by Georgiana_Lavinia / Freepik
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
