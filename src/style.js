import { StyleSheet, Dimensions } from 'react-native';

// 폰트..
const fontStyle = 'MangoDdobak-';
const screenWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    // 로그인
    LoginContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    LoginTextInput: {
        fontFamily: fontStyle + 'R',
        marginTop: 15,
        marginBottom: 10,
        width: '50%',
        height: 40,
        borderRadius: 15,
        borderColor: 'gray',
        borderWidth: 1,
    },
    LoginButton: {
        backgroundColor: '#DDDDDD',
        width: '30%',
        marginTop: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
    },
    LoginButtonText: {
        fontFamily: fontStyle + 'R',
    },
    LoadingImg: {
        width: screenWidth - 250,
        height: screenWidth - 250,
    },

    // 회원가입
    JoinContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    JoinHeadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 50,
    },
    JoinImg:{
        width: screenWidth - 250,
        height: screenWidth - 250,
        alignItems: 'center',
        marginBottom: 50,
    },
    JoinSubContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    JoinBtnContainer: {
        paddingHorizontal: 10,
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    JoinHeader: {
        fontFamily: fontStyle + 'B',
        fontSize: 20,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        paddingVertical: 10,
    },
    JoinHeaderImg: {
        fontFamily: fontStyle + 'B',
        fontSize: 20,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    JoinTitle: {
        fontFamily: fontStyle + 'B',
        fontSize: 14,
        color: 'black',
        marginRight: 11,
    },
    JoinContext: {
        fontSize: 10,
        color: 'black',
    },
    JoinEmailInput: {
        fontFamily: fontStyle + 'R',
        fontSize: 12,
        width: 130,
        height: 40,
        marginLeft: 12,
        marginVertical: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0.5,
        paddingVertical: 5,
        marginRight: 10,
    },
    JoinTxtInput: {
        fontFamily: fontStyle + 'R',
        fontSize: 12,
        width: 200,
        height: 40,
        marginLeft: 11,
        marginRight: 7,
        marginVertical: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0.5,
    },
    JoinPwInput: {
        fontFamily: fontStyle + 'R',
        fontSize: 12,
        width: 200,
        height: 40,
        marginVertical: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0.5,
    },
    JoinConfirmTxt: {
        fontFamily: fontStyle + 'R',
        fontSize: 12,
        width: 200,
        height: 40,
        marginLeft: 69,
        marginVertical: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0.5,
    },
    JoinCombo: {
        width: 160,
        height: 40,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0.5,
        paddingVertical: 5,
    },
    JoinButton: {
        backgroundColor: '#DDDDDD',
        width: '20%',
        marginLeft: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
    },
});

export default styles;