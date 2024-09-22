export const host = 'http://14.6.16.195:9004';

export const sportsMap = {
  SC: require('../public/png/free-icon-soccer-ball.png'),
  BS: require('../public/png/free-icon-baseball.png'),
  VB: require('../public/png/free-icon-volleyball-ball.png'),
  BK: require('../public/png/free-icon-basketball-ball.png'),
};

export const sportsOptions = {
  BS: "야구",
  SC: "축구",
  BK: "농구",
  VB: "배구",
};

export const resultMap = {
  w: require('../public/png/free-icon-sun.png'),
  t: require('../public/png/free-icon-cloud.png'),
  l: require('../public/png/free-icon-storm.png'),
};

// 이거 임시로 추가해둔건데 .. DB통신 사용할거라 나중엔 없애는게 나을거같아~..
  export const teamMap = {
    BS: [
      { label: "두산 베어스", value: "26" },
      { label: "KIA 타이거즈", value: "27" },
      { label: "KT 위즈", value: "28" },
      { label: "LG 트윈스", value: "29" },
      { label: "롯데 자이언츠", value: "30" },
      { label: "NC 다이노스", value: "31" },
      { label: "SSG 랜더스", value: "32" },
      { label: "키움 히어로즈", value: "33" },
      { label: "삼성 라이온즈", value: "34" },
      { label: "한화 이글스", value: "35" },
    ],
    SC: [
      { label: "울산 HD FC", value: "1" },
      { label: "김천상무프로축구단", value: "2" },
      { label: "포항스틸러스", value: "3" },
      { label: "강원FC", value: "4" },
      { label: "수원FC", value: "5" },
      { label: "제주유나이티드FC", value: "6" },
      { label: "광주FC", value: "7" },
      { label: "인천유나이티드 FC", value: "8" },
      { label: "FC서울", value: "9" },
      { label: "전북현대모터스", value: "10" },
      { label: "대전하나시티즌", value: "11" },
      { label: "대구FC", value: "12" },
      { label: "FC안양", value: "13" },
      { label: "전남드래곤즈", value: "14" },
      { label: "서울이랜드FC", value: "15" },
      { label: "김포FC", value: "16" },
      { label: "부산아이파크", value: "17" },
      { label: "수원삼성블루윙즈", value: "18" },
      { label: "충남아산프로축구단", value: "19" },
      { label: "부천FC 1995", value: "20" },
      { label: "충북청주FC", value: "21" },
      { label: "천안시티FC", value: "22" },
      { label: "성남FC", value: "23" },
      { label: "경남FC", value: "24" },
      { label: "안산그리너스FC", value: "25" },
    ],
    VB: [
      { label: "인천 대한항공 점보스", value: "46" },
      { label: "안산 OK 금융그룹 읏맨", value: "47" },
      { label: "서울 우리카드 우리WON", value: "48" },
      { label: "천안 현대캐피탈 스카이워커스", value: "49" },
      { label: "수원 한국전력 빅스톰", value: "50" },
      { label: "대전 삼성화재 블루팡스", value: "51" },
      { label: "의정부 KB손해보험 스타즈", value: "52" },
      { label: "수원 현대건설 힐스테이트", value: "53" },
      { label: "인천 흥국생명 핑크스파이더스", value: "54" },
      { label: "대전 정관장 레드스파크스", value: "55" },
      { label: "GS칼텍스 서울 KIXX", value: "56" },
      { label: "화성 IBK기업은행 알토스", value: "57" },
      { label: "김천 한국도로공사 하이패스", value: "58" },
      { label: "광주 페퍼저축은행 AI 페퍼스", value: "59" },
    ],
    BK: [
      { label: "서울 삼성 썬더스", value: "36" },
      { label: "대구 한국가스공사 페가수스", value: "37" },
      { label: "수원 KT 소닉붐", value: "38" },
      { label: "원주 DB 프로미", value: "39" },
      { label: "부산 KCC 이지스", value: "40" },
      { label: "울산 현대모비스 피버스", value: "41" },
      { label: "고양 소노 스카이거너스", value: "42" },
      { label: "창원 LG 세이커스", value: "43" },
      { label: "서울 SK 나이츠", value: "44" },
      { label: "안양 정관장 레드부스터스", value: "45" },
    ],
  };

  export const sportsImg = {
    BS: "⚾",
    SC: "⚽",
    BK: "🏀",
    VB: "🏐"
  };