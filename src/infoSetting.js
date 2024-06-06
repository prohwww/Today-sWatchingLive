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
import { useNavigation } from '@react-navigation/native';

const InfoSetting = () => {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    });

    return (
        <View style={styles.container}>
       
        </View>
    );
};

export default InfoSetting;