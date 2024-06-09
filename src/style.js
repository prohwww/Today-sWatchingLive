import { StyleSheet, Dimensions } from 'react-native';

// 폰트..
const fontStyle = 'MangoDdobak-';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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
        marginTop: screenHeight * 0.02,
        width: '50%',
        height: 40,
        borderRadius: 15,
        borderColor: 'gray',
        borderWidth: 1,
    },
    LoginButton: {
        backgroundColor: '#DDDDDD',
        width: '30%',
        height: '4%',
        marginTop: screenHeight * 0.03,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    LoadingImg: {
        width: screenWidth * 0.4,
        height: screenWidth * 0.4,
    },


    // 회원가입
    JoinHeadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: screenHeight * 0.01,
        marginBottom: screenHeight * 0.04,
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
        marginRight: screenWidth * 0.035,
        marginLeft: screenWidth * 0.03,
    },
    JoinContext: {
        fontSize: 10,
        color: 'black',
    },
    JoinEmailInput: {
        fontFamily: fontStyle + 'R',
        fontSize: 12,
        width: '35%',
        height: '65%',
        marginLeft: screenWidth * 0.03,
        marginRight: screenWidth * 0.03,
        marginVertical: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0.8,
        paddingVertical: 5,
    },
    JoinTxtInput: {
        fontFamily: fontStyle + 'R',
        fontSize: 12,
        width: '50%',
        height: '55%',
        marginLeft: screenWidth * 0.03,
        marginRight: screenWidth * 0.04,
        marginVertical: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0.8,
    },
    JoinPwInput: {
        fontFamily: fontStyle + 'R',
        fontSize: 12,
        width: '50%',
        height: '65%',
        marginVertical: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0.8,
    },
    JoinConfirmTxt: {
        fontFamily: fontStyle + 'R',
        fontSize: 12,
        width: '50%',
        height: '65%',
        marginLeft: screenWidth * 0.2,
        marginVertical: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0.8,
    },
    JoinCombo: {
        width: '40%',
        height: '4%',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0.5,
        paddingVertical: 5,
    },
    overlapButton: {
        backgroundColor: '#DDDDDD',
        width: '22%',
        height: '40%',
        marginLeft: screenWidth * 0.002,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    JoinButton: {
        backgroundColor: '#DDDDDD',
        width: '22%',
        height: '30%',
        marginLeft: screenWidth * 0.002,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    joinButtonView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    // 티켓목록
    mainListContainer: {
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        justifyContent: 'space-between',
    },
    mainListImg: {
        width: '13%',
        aspectRatio: 1
    },
    mainTicketList: {
        flex: 1,
        marginLeft: screenWidth * 0.03,
    },
    mainTicketName: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: fontStyle + 'B'
    },
    TicketContainer: {
        position: 'relative',
        flex: 1,
        backgroundColor: 'white',
        marginTop: screenHeight * 0.01,
    },
    mainSearchItem: {
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
    },
    mainSearchImg: {
        width: '10%',
        aspectRatio: 1
    },
    mainSearchSubItem: {
        flex: 1,
        marginLeft: screenWidth * 0.002,
    },
    mainSearchAddBtn: {
        height: '6%',
        aspectRatio: 1,
        marginTop: screenHeight * 0.8,
        marginLeft: screenWidth * 0.88,
    },
    mainImg: {
        width: 40,
        height: 40,
        overflow: 'hidden',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: screenHeight * 0.005,
        right: screenWidth * 0.03,
        width: '10%',
        height: '10%',
    },
    buttonSubContainer: {
        width: '100%',
        height: '100%',
    },

    // 티켓내용
    ticketDetailBtn: {
        width: 30,
        height: 30,
        marginHorizontal: 3
    },
    ticketDetailTitleContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    ticketDetailSubView: {
        padding: 15,
        alignItems: 'center'
    },
    ticketDetailSportsView: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    ticketDetailSportsImg: {
        width: 30,
        height: 30,
        marginBottom: 5
    },
    ticketDetailText: {
        fontSize: 20,
        fontFamily: fontStyle + 'B'
    },
    ticketDetailVS: {
        padding: 10,
        fontSize: 20,
        fontFamily: fontStyle + 'B'
    },
    ticketDetailDiaryView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 5
    },
    ticketDetailImg: {
        width: 20,
        height: 20,
        marginLeft: -5
    },
    ticketDetailLocaView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    ticketDetailCNLTxt: {
        fontSize: 12,
        fontFamily: fontStyle + 'R',
        marginLeft: 10
    },
    ticketDetailResultImg: {
        width: 80,
        height: 80
    },
    ticketUserImg: {
        width: screenWidth * 0.85,
        height: 330
    },
    ticketUserDiaryTxt: {
        padding: 8,
        fontSize: 12,
        fontFamily: fontStyle + 'R',
        borderWidth: 0.8,
        width: screenWidth * 0.85,
        height: 100,
        maxHeight: 100,
        marginVertical: 10
    },
    calTitle: {
        fontSize: 18,
        margin: 5,
        marginVertical: 15,
        color: 'black',
        fontFamily: fontStyle + 'B'
    },
    calView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 10,
    },

    // 티켓 추가 & 수정
    TicketAddBtn: {
        width: 30,
        height: 30,
    },
    TicketAddcontainer: {
        paddingHorizontal: 10,
        marginVertical: 5,
        padding: 5
    },
    TicketQuestion: {
        fontFamily: fontStyle + 'B',
        fontSize: 15,
        color: 'black',
        marginRight: 10,
        marginBottom: screenHeight * 0.025,

    },
    TicketAnswerView: {
        flexDirection: 'row',
        flex: 1
    },
    TicketAddHome: {
        fontFamily: fontStyle + 'R',
        fontSize: 13,
        marginTop: screenHeight * 0.025,
        marginLeft: screenWidth * 0.025,
        marginRight: screenWidth * 0.055
    },
    TicketAddAway: {
        fontFamily: fontStyle + 'R',
        fontSize: 13,
        marginTop: screenHeight * 0.025,
    },
    TicketAddTeamView: {
        width: screenWidth * 0.73,
    },
    TicketAddPikerSt: {
        fontFamily: fontStyle + 'R',
        fontSize: 15,
    },
    TicketAddScoreTxtInput: {
        width: screenWidth * 0.35,
        height: 40,
        marginLeft: screenWidth * 0.01,
        marginRight: screenWidth * 0.02,
        marginVertical: 5,
        borderColor: 'black',
        borderWidth: 0.8,
        fontFamily: fontStyle + 'R',
    },
    TicketAddDateInput: {
        width: screenWidth * 0.84,
        height: 40,
        marginRight: screenWidth * 0.02,
        marginVertical: 5,
        borderColor: 'black',
        borderWidth: 0.8,
        fontFamily: fontStyle + 'R',
    },
    ticketDiaryTxtInput: {
        flex: 1,
        width: screenWidth * 0.84,
        minHeight: screenWidth * 0.4,
        marginRight: screenWidth * 0.02,
        borderColor: 'black',
        borderWidth: 0.8,
        fontFamily: fontStyle + 'R',
    },

    alignCenter: {
        alignItems: 'center'
    },
    fiex1: {
        flex: 1
    },
    RowStyle: {
        flexDirection: 'row'
    },

    /// 공통으로 사용하는 스타일..
    // 로그인, 회원가입, 티켓 추가&수정
    onlyFontR: {
        fontFamily: fontStyle + 'R',
    },
    // 회원가입,티켓내용, 티켓추가&수정
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    // 티켓내용, 티켓추가&수정
    headContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    // 티켓검색, 티켓목록
    mainMiniTxt: {
        fontFamily: fontStyle + 'R',
        fontSize: 13
    },

});

export default styles;