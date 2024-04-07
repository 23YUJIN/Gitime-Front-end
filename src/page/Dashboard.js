import React, { useEffect, useState, forwardRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import DatePicker from "react-datepicker";
import "../assets/styles/Dashboard.css";
import "../assets/styles/alert_banner.css";
import { AlertNotice } from "../component/Alert";
import { Board, AddingToDo, ChatRoom, VideoChatRoom } from "../component/Modal";

import {
  ProgressBar,
  BoardWidget,
  CalendarWidget,
  ConsoleWidget,
  DevelopeWidget,
  TodoWidget,
  WeeklyWidget,
} from "../component/Widget";
import { Members, RecentActivity, Upcoming, NavFooterMenu } from "../component/SideNav";

import { sample_activity, sample_upcoming } from "../component/test/sample_data";
import { GetTeamNotice } from "../utils/api/team/TeamApi";
import { getAllDevelop, GetTeamInfo } from "../utils/api/teamAdmin/TeamAdminApi";
import { GetBoardList } from "../utils/api/board/BoardApi";
import {
  GetDevelopProgressResult,
  GetRecentActivity,
  GetTodoList,
  GetUpcoming,
  PostCreateTodo,
} from "../utils/api/dashboard/DashboardApi";

var videoConference = [
  // 화상회의 목록 리스트
  { id: 1, name: "프론트 회의방", person: "3" },
  { id: 2, name: "백 회의방", person: "2" },
];

var memList = [
  // 화상 회의용 더미 데이터
  // 멤버 리스트
  {
    id: 1,
    name: "박상호",
    profile: "https://randomuser.me/portraits/men/40.jpg",
    online: true,
  },
  {
    id: 2,
    name: "김혁준",
    profile: "https://randomuser.me/portraits/men/40.jpg",
    online: false,
  },
  {
    id: 3,
    name: "최영찬",
    profile: "https://randomuser.me/portraits/men/40.jpg",
    online: false,
  },
  {
    id: 4,
    name: "신유진",
    profile: "https://randomuser.me/portraits/men/40.jpg",
    online: true,
  },
  {
    id: 5,
    name: "이지원",
    profile: "https://randomuser.me/portraits/men/40.jpg",
    online: true,
  },
];

var chat_id = 0;
var dataLists2 = [
  // 채팅 샘플 데이터
];

var msg = {
  id: 0,
  username: "",
  userprofile: "https://randomuser.me/portraits/men/40.jpg",
  data: "",
  date: "",
  online: false,
};

function Dashboard({ memberName, props }) {
  const [tmp, setTmp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  /*Todo 시작*/
  const [todoDate, setTodoDate] = useState(new Date());
  const [todoInput, setTodoInput] = useState("");
  const [todoStruct, setTodoStruct] = useState({
    data: "",
    kinds: "",
    startData: "",
    endDate: "",
    end: false,
  });
  const [todoDev, setTodoDev] = useState("");

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="border border-date border-opacity-50 font-ltest example-custom-input bg-develbg bg-opacity-30 text-date text-opacity-70 rounded-full py-2 px-5"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));
  const onTodoInputHandler = (event) => {
    setTodoInput(event.currentTarget.value);
  };

  const tempfun = () => {
    /*
    
    
    
    */
  };
  const formatDate = (d) => {
    const date = new Date(d);
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}년 ${`0${monthIndex}`.slice(-2)}월`;
  };

  /*Todo 끝*/
  const [ctext, setCtext] = useState("");
  const [inputText, setInputText] = useState("");
  const [checkedList, setCheckedItems] = useState([]);
  const [temp, setTemp] = useState(false);
  const [videoList, setShowVideoList] = useState(true);
  const [memberList, setMemberList] = useState(false);
  const [notice, setNotice] = useState("불러오는중..");
  const [boardList, setBoardList] = useState(null);
  const [todoList, setTodoList] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [developProgress, setDevelopProgress] = useState(null);
  const [recentActivity, setRecentActivity] = useState(null);
  const [developLists, setDevelopLists] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);

  const [updateView, setUpdateView] = useState(false);

  const addMessage = (message) => {
    msg.id = chat_id;
    msg.username = message.userName;
    msg.data = message.content;
    msg.date = message.date;
    msg.userprofile = "https://randomuser.me/portraits/men/40.jpg";
    dataLists2.push(msg);
    chat_id += 1;
  };

  useEffect(() => {
    GetTeamNotice({
      setNotice: setNotice,
      teamName: props.match.params.teamName,
    });
    GetBoardList({
      setBoardList: setBoardList,
      teamName: props.match.params.teamName,
      page: "1",
    });
    GetTodoList({
      setTodoList: setTodoList,
      teamName: props.match.params.teamName,
    });
    GetDevelopProgressResult({
      teamName: props.match.params.teamName,
      setDevelopProgress: setDevelopProgress,
    });

    GetRecentActivity({
      setRecentActivity: setRecentActivity,
      teamName: props.match.params.teamName,
    });

    GetUpcoming({
      setUpcoming: setUpcoming,
      teamName: props.match.params.teamName,
    });

    getAllDevelop({
      setDevelopLists: setDevelopLists,
      teamName: props.match.params.teamName,
    });

    GetTeamInfo({
      teamName: props.match.params.teamName,
      setTeamInfo: setTeamInfo,
    });
    // return function cleanup() {
    //   stompClient.disconnect();
    // };
  }, []);

  useEffect(() => {
    if (updateView) {
      GetTeamNotice({
        setNotice: setNotice,
        teamName: props.match.params.teamName,
      });
      GetBoardList({
        setBoardList: setBoardList,
        teamName: props.match.params.teamName,
        page: "1",
      });
      GetTodoList({
        setTodoList: setTodoList,
        teamName: props.match.params.teamName,
      });
      GetDevelopProgressResult({
        teamName: props.match.params.teamName,
        setDevelopProgress: setDevelopProgress,
      });

      GetRecentActivity({
        setRecentActivity: setRecentActivity,
        teamName: props.match.params.teamName,
      });

      GetUpcoming({
        setUpcoming: setUpcoming,
        teamName: props.match.params.teamName,
      });

      getAllDevelop({
        setDevelopLists: setDevelopLists,
        teamName: props.match.params.teamName,
      });

      GetTeamInfo({
        teamName: props.match.params.teamName,
        setTeamInfo: setTeamInfo,
      });
    }
    setUpdateView(false);
  });

  const onChangeInput = (e) => {
    setInputText(e.target.value);
  };
  const onReset = () => {
    setInputText("");
  };

  const handleEnter = () => {
    setTemp(!temp);
  };
  const checkedItemHandler = (list, isChecked) => {
    if (isChecked) {
      setCheckedItems([...checkedList, list]);
    } else if (!isChecked && checkedList.includes(list)) {
      setCheckedItems(checkedList.filter((el) => el !== list));
    }
  };
  const changeComplete = (list) => {
    list.end = !list.end;
    setTemp(!temp);
  };

  return (
    <div class="font-test" className="header">
      <AlertNotice notice={notice} />
      {showModal ? (
        <AddingToDo
          setShowModal={setShowModal}
          endCheck={todoList}
          checkedItemHandler={checkedItemHandler}
          checkedList={checkedList}
          changeComplete={changeComplete}
          setTodoDate={setTodoDate}
          todoDate={todoDate}
          ExampleCustomInput={ExampleCustomInput}
          onTodoInputHandler={onTodoInputHandler}
          setTodoDev={setTodoDev}
          setTodoStruct={setTodoStruct}
          tempfun={tempfun}
          props={props}
          setUpdateView={setUpdateView}
        />
      ) : null}

      {showModal2 ? (
        <ChatRoom
          setShowModal2={setShowModal2}
          dataLists2={dataLists2}
          addChat={handleEnter}
          setCtext={setCtext}
          onChangeInput={onChangeInput}
          onReset={onReset}
          inputText={inputText}
        />
      ) : null}

      {showModal3 ? (
        <VideoChatRoom
          setShowModal3={setShowModal3}
          setShowVideoList={setShowVideoList}
          setMemberList={setMemberList}
          memberList={memberList}
          videoList={videoList}
          videoConference={videoConference}
          memList={memList}
        />
      ) : null}
      {showModal4 ? <Board props={props} setShowModal4={setShowModal4} setUpdateView={setUpdateView} /> : null}
      <div className="Dashboard" class="grid grid-cols-5">
        <div className="LeftSide" class="col-span-4 ml-10 mb-10">
          <div class="pt-5 pl-5 font-ltest text-gray-400">{memberName}님 반가워요, 다시 돌아오신 걸 환영해요! 👋</div>

          <div class="flex">
            <div class="flex-grow pl-5 text-3xl font-sbtest text-2xl">
              {teamInfo == null ? "Undefined" : teamInfo.teamName + " DashBoard Today"}
            </div>
            {teamInfo == null ? null : teamInfo.teamAuthority == "ROLE_PARENT" ? (
              <button
                class="text-3xl font-sbtest"
                onClick={() => {
                  // window.location.href =
                  props.history.push("/dashboard/" + props.match.params.teamName + "/setting");
                }}
              >
                <img
                  src="https://cdn.discordapp.com/attachments/874658668434583655/913307164058218506/iconmonstr-gear-1-32.png"
                  alt="alert"
                />
              </button>
            ) : null}
          </div>

          <div className="grid grid-cols-3 grid-rows-7 gap-4 ">
            {todoList == null ? (
              "불러오는 중..."
            ) : (
              <WeeklyWidget
                todoLists={todoList}
                updateView={updateView}
                setUpdateView={setUpdateView}
                setTodoList={setTodoList}
                props={props}
              />
            )}

            {developProgress == null ? (
              "불러오는 중..."
            ) : developLists == null ? (
              "불러오는 중..."
            ) : (
              <DevelopeWidget developProgress={developProgress} developLists={developLists} />
            )}

            {todoList == null ? "불러오는 중..." : <CalendarWidget todoLists={todoList} />}

            {boardList == null ? (
              "불러오는 중..."
            ) : (
              <BoardWidget setShowModal4={setShowModal4} dataLists3={boardList} />
            )}

            {todoList == null ? "불러오는 중..." : <TodoWidget setShowModal={setShowModal} dataLists={todoList} />}

            <ConsoleWidget props={props} />
          </div>
        </div>

        <div className="RightSide" class="h-full col-span-1 bg-rightbar ml-10 pt-10">
          <div className="fixed z-10 h-5/6 bg-rightbar px-4">
            <div class="">
              {upcoming == null ? null : <Upcoming dataLists={sample_upcoming} upcoming={upcoming} />}
              {recentActivity == null ? null : (
                <RecentActivity dataLists={sample_activity} recentActivity={recentActivity} />
              )}
              {teamInfo == null ? null : <Members teamInfo={teamInfo} />}
              <NavFooterMenu setShowModal2={setShowModal2} setShowModal3={setShowModal3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
