// 테스트용 - 최종본에서 삭제

export const sample_upcoming = [
  // 샘플 데이터
  {
    id: 1,
    title: "정규회의 시간",
    date: "2021-10-23",
    time: "15:00",
  },
  {
    id: 2,
    title: "보고서 제출",
    date: "2021-10-24",
    time: "23:30",
  },
];

export const sample_activity = [
  // 샘플 최근 활동
  /*
      1 : 코드 수정
      2 : 계획 업로드
      3 : 화상 회의
      4 : 파일 업로드 
      */
  {
    id: 1,
    type: 1,
    username: "박상호",
    file: "source.js",
    date: "2021-10-11",
    time: "10:00",
  },
  {
    id: 2,
    type: 2,
    username: "최영찬",
    file: "술 마시기",
    date: "2021-10-12",
    time: "22:00",
  },
  {
    id: 3,
    type: 3,
    username: "박상호",
    file: "화상회의01.mp4",
    date: "2021-10-11",
    time: "15:00",
  },
  {
    id: 4,
    type: 4,
    username: "김혁준",
    file: "중간보고서 초안.hwp",
    date: "2021-10-20",
    time: "03:00",
  },
];

export const sample_member = [
  // 샘플 데이터
  {
    id: 1,
    username: "박상호",
    email: "abcd@gmail.com",
    role: "back",
    state: 0,
    state_accept: "waiting",
    is_leader: true,
  },
  {
    id: 2,
    username: "김혁준",
    email: "accd@gmail.com",
    role: "front",
    state: 1,
    state_accept: "accept",
    is_leader: false,
  },
  {
    id: 3,
    username: "최영찬",
    email: "ab23cd@gmail.com",
    role: "back",
    state: 2,
    state_accept: "denied",
    is_leader: false,
  },

  {
    id: 4,
    username: "최영찬",
    email: "ab23cd@gmail.com",
    role: "back",
    state: 2,
    state_accept: "denied",
    is_leader: false,
  },
  {
    id: 5,
    username: "최영찬",
    email: "ab23cd@gmail.com",
    role: "",
    state: 2,
    state_accept: "denied",
    is_leader: false,
  },
  {
    id: 6,
    username: "최영찬",
    email: "ab23cd@gmail.com",
    role: "",
    state: 2,
    state_accept: "denied",
    is_leader: false,
  },
];
