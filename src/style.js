import { StyleSheet, Dimensions } from 'react-native';

// 폰트..
const fontStyle = 'MangoDdobak-';

// 화면 크기
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const cellHeight = screenHeight / 7.5;

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
        height: '75%',
        backgroundColor: 'white',
        borderRadius: 50,
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
        fontSize: 18,
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
        height: 300
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
    },
    ticketTitle: {
        alignItems: 'center',
    },
    ticketRoeStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flexCenter: {
        flex: 0, // 가운데 View의 크기를 작게 설정
        paddingHorizontal: 10, // 텍스트가 들어갈 수 있을 정도의 여유 공간 부여
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
    
    // findPw.js
    component: {
        backgroundColor: 'white',
        flex: 1,
    },
    pwContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnContainer: {
        alignItems: 'center',
    },
    pwEmailInput: {
        width: 130,
        height: 40,
        marginLeft: 12,
        marginVertical: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0.5,
        paddingVertical: 5,
        marginRight: 10,
        fontFamily: fontStyle + 'R',
    },
    searchBtn: {
        backgroundColor: '#DDDDDD',
        width: '30%',
        marginTop: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
    },
    pwTitle: {
        fontSize: 15,
        color: 'black',
        fontFamily: fontStyle + 'B',
    },
    pwText: {
        paddingVertical: 7,
        paddingLeft: 10,
        fontSize: 15,
        color: 'black',
        fontFamily: fontStyle + 'R',
    },
    pwContext: {
        fontSize: 15,
        color: 'black',
        fontFamily: fontStyle + 'R',
    },
    pwCombo: {
        width: 160,
        height: 40,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0.5,
        paddingVertical: 5,
        fontFamily: fontStyle + 'R',
    },

    // calendar.js
    safeView: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    monthNavButton: {
        padding: 10,
        fontFamily: fontStyle + 'B',
        color: 'black',
    },
    navText: {
        fontFamily: fontStyle + 'B',
        fontSize: 18,
        color: 'black',
    },
    monthText: {
        fontSize: 18,
        fontFamily: fontStyle + 'B',
        color: 'black',
    },
    monthTextButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendar: {
        flex: 1,
        padding: 5,
    },
    weekdaysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    weekday: {
        flex: 1,
        textAlign: 'center',
        fontFamily: fontStyle + 'B',
        color: 'black',
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 2,
        paddingVertical: 2,
    },
    calDay: {
        width: '14.28%',
        height: cellHeight,
        alignItems: 'center',
        borderWidth: 0,
        borderColor: '#ccc',
        borderRadius: 40,
    },
    calImg: {
        width: 20,
        height: 20,
        justifyContent: 'center',
    },
    otherMonth: {
        opacity: 0.3,
    },
    selectedDay: {
        backgroundColor: '#fef4c2',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 10,
        width: 300,
        height: 300,
        borderRadius: 10,
        elevation: 5,
    },
    horizontalContainer: {
        flexDirection: 'row',
    },
    btnClose: {
        marginLeft: 210,
        paddingHorizontal: 10,
        paddingVertical: 5,        
    },
    modalList: {
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    eventItem: {
        height: 60,
        borderWidth: 0.7,
        borderColor: 'grey',
        marginBottom: 5,
        padding: 2,
        paddingLeft: 5,
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    calendarAddBtn: {
        width: 30,
        height: 30,
        marginLeft: 250,
    },
    infoView: {
        flexDirection: 'row',
    },
    calendarText: {
        fontFamily: fontStyle + 'R',
        color: 'black',
        marginBottom: 10,
    },
    calendarCloseBtn: {
        fontFamily: fontStyle + 'R',
        color: 'black',
    },
    calendarScore: {
        flexDirection: 'row',
        marginTop: 7,
    },

    smallCalendarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    smallCalendarContent: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        fontFamily: fontStyle + 'R',
    },
    calBtnClose: {
        backgroundColor: '#ccc',
        padding: 5,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    calendarCloseBtn: {
        color: 'black',
        fontSize: 15,
        fontFamily: fontStyle + 'R',
    },

    // 년도/월만 선택
    // pickerContainer: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // },
    // pickerContent: {
    //     backgroundColor: '#ffffff',
    //     padding: 20,
    //     borderRadius: 10,
    //     width: '80%',
    // },
    // pickerTitle: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     marginBottom: 10,
    //     textAlign: 'center',
    // },
    // picker: {
    //     width: '100%',
    //     marginVertical: 10,
    // },
    // confirmButton: {
    //     marginTop: 10,
    //     backgroundColor: '#000',
    //     paddingVertical: 10,
    //     borderRadius: 5,
    //     alignItems: 'center',
    // },
    // confirmText: {
    //     color: '#fff',
    //     fontSize: 16,
    // },

    // myInfo.js
    myInfo: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        justifyContent: 'space-between',
        width: screenWidth - 10,
        backgroundColor: '#D8D8D8',
    },

    // teamList.js
    innerView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    teamModalContainer: {
        padding: 20,
        alignItems: 'center',
    },
    modalView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalText: {
        color: 'black',
        fontFamily: fontStyle + 'B',
        fontSize: 15,
        marginBottom: 20,
    },
    picker: {
        width: 250,
    },
    modalBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },

    // teamAnalysis.js
    teamContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        flex: 1,
    },
    innerText: {
        color: 'black',
        fontFamily: fontStyle + 'B',
        fontSize: 20,
        margin: 5,
        padding: 10,
    },
    teamImg: {
        width: 30,
        height: 30,
        marginRight: 5,
    },
    teamInnerView: {
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
        fontFamily: fontStyle + 'R',
    },

    // infoSetting.js
    setContainer: {
        backgroundColor: 'white',
        alignItems: 'left',
        flex: 1,
        margin: 10,
    },
    setContent: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    subject: {
        fontFamily: fontStyle + 'B',
        color: 'black',
        marginRight: 20,
    },
    contentText: {
        fontFamily: fontStyle + 'R',
        color: 'black',
    },
    setText: {
        fontFamily: fontStyle + 'R',
        color: 'black',
    },
    setEmailInput: {
        width: 130,
        height: 30,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0.5,
        paddingVertical: 5,
        marginRight: 10,
        fontFamily: fontStyle + 'R',
    },
    searchBtn: {
        backgroundColor: '#DDDDDD',
        width: '30%',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    setModalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        fontFamily: fontStyle + 'R',
        color: 'black',
    },
    setInput: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 15,
        fontFamily: fontStyle + 'R',
    },
    setBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelBtn: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 15,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    cancelBtnText: {
        color: '#333',
        fontSize: 16,
        fontFamily: fontStyle + 'R',
    },
    submitBtn: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 15,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    submitBtnText: {
        color: 'white',
        fontSize: 16,
        fontFamily: fontStyle + 'R',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        fontFamily: fontStyle + 'R',
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

    // myInfo.js, teamList.js
    infoContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        flex: 1 ,
    },
    infoText: {
        color: 'black',
        fontFamily: fontStyle + 'R',
        fontSize: 15,
        padding: 5,
    },
    infoItem: {
        padding: 5,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        width: screenWidth - 10,
    },
    infoImg: {
        width: 50,
        height: 50,
        marginRight: 5,
    },

    //findPw.js, infoSetting.js
    pwheadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pwHeader: {
        fontSize: 25,
        color: 'black',
        marginRight: 10,
        marginBottom: 10,
        paddingVertical: 10,
        fontFamily: fontStyle + 'B',
        borderBottomWidth: 0.5,
    },

});

export default styles;