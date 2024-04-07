import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import { format, getDay } from "date-fns";
import { enGB, ko } from "date-fns/locale";
import DatePicker from "react-datepicker";
import { DatePickerCalendar } from "react-nice-dates";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { getCookie, deleteCookie, setCookie } from "../utils/cookie";
import { SERVER_URL } from "../utils/SRC";
import ChangingProgressProvider from "./ChangingProgressProvider";
import "react-circular-progressbar/dist/styles.css";

import "react-nice-dates/build/style.css";
import "../assets/styles/Progressbar.css";
import { GetServerStatus, GetTodoList } from "../utils/api/dashboard/DashboardApi";

export var ProgressBar = ({ width, percent, color }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(percent * width);
  });

  return (
    <div>
      <div className="progress-div" style={{ width: width }}>
        <div style={{ width: `${value}px`, backgroundColor: color }} className="progress" />
      </div>
    </div>
  );
};
export const WeeklyWidget = ({ todoLists, setTodoList, updateView, setUpdateView, props }) => {
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let day = today.getDay(); // 요일
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    deleteWeeklyList();
  }, []);
  useEffect(() => {
    handlerWeekly({
      todoLists,
      setPercentage: setPercentage,
      percentage: percentage,
    });
  }, [percentage]);

  useEffect(() => {
    if (updateView) {
      GetTodoList({
        setTodoList: setTodoList,
        teamName: props.match.params.teamName,
      });
    }
    setUpdateView(false);
  });

  return (
    <div
      className="Weekly"
      class="grid sm:col-span-3 md:col-span-1 row-span-2 font-ttest w-full h-full relative bg-white mx-auto pl-10 md:p-5 my-auto rounded-lg shadow-xl"
    >
      <div class="grid">
        <div class="font-sbtest ">Weekly Progress</div>
        <div class="font-ttest text-sm pt-1">
          Start from Nov {month}-{date}, {year}
        </div>
      </div>
      <div class="mt-7 w-1/2 h-1/2 mx-auto my-auto">
        {
          <CircularProgressbarWithChildren
            value={percentage}
            styles={buildStyles({
              pathColor: "#9d9cf2",
            })}
          >
            <div class="font-extrabold font-ebtest" style={{ fontSize: 32, marginTop: -5, color: "#7a78ed" }}>
              {percentage}%
            </div>
            <div class="font-test text-gray-500">Task completed</div>
          </CircularProgressbarWithChildren>
        }
      </div>
    </div>
  );
};

export const DevelopeWidget = ({ developProgress, developLists }) => {
  //{백엔드 : 0, UI : 0, 프론트 : 25}
  return (
    <div
      className="Develope"
      class="grid sm:col-span-3 md:col-span-1 row-span-2 font-ttest w-full h-full relative bg-white mx-auto pl-10 md:p-5 rounded-lg shadow-xl"
    >
      <div class="font-sbtest">Develop Progress</div>
      {Object.keys(developLists).length == 0 ? (
        <div class="font-test">
          계산된 개발 진행도가 없어요😂
          <div>팀원들과 개발을 해 보세요!</div>
          <div>
            <a class="text-red-600">To-Do List</a>에서 투두를 등록하세요!
          </div>
        </div>
      ) : null}

      <div class="self-start">
        {developLists.map((devel) => {
          var progPercent = developProgress[devel.field] / 10 + 1;
          if (progPercent == 1 || isNaN(progPercent) || progPercent == 0) {
            progPercent = 0;
          }
          var lastUpdateY = 0;
          var lastUpdateM = 0;
          var lastUpdateD = 0;

          return (
            <div class="grid grid-cols-9 gap-2 items-center">
              <div class="mr-2 my-2 grid col-span-2 rounded-lg bg-develbg">
                <div className="my-auto  font-sbtest text-center py-3">{devel.field}</div>
              </div>

              <div class="col-span-4 text-sm font-test my-auto">
                <div class="col-span-1"></div>
                <div class="font-test">👤 1명</div>
                <div class="text-sm font-ltest">
                  <a class="font-semibold">
                    {devel.isFinish
                      ? "Last Update: " + lastUpdateY + "." + lastUpdateM + "." + lastUpdateD
                      : "아직 시작하지 않았어요."}
                  </a>
                </div>
              </div>

              <div class="relative pt-1 col-span-3 pt-4">
                <div class="flex items-center justify-between">
                  <div></div>
                  <div class="text-right">
                    <span class="text-xs font-semibold inline-block text-purple-600">
                      {isNaN(developProgress[devel.field]) ? 0 : developProgress[devel.field]}%
                    </span>
                  </div>
                </div>
                <div class="overflow-hidden h-3 mb-4 text-xs flex rounded bg-purple-200 transition">
                  <ProgressBar
                    width={10}
                    percent={isNaN(progPercent) ? 0 : progPercent}
                    color={
                      progPercent > 9
                        ? "red"
                        : progPercent > 7.5
                        ? "yellow"
                        : progPercent > 5.0
                        ? "green"
                        : progPercent > 2.5
                        ? "blue"
                        : progPercent > 0
                        ? "purple"
                        : null
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div class="grid col-span-2 rounded-lg bg-develbg">
          <div className="my-auto  font-sbtest text-center">UI</div>
        </div>
        <div className="col-span-1"></div>
        <div class="my-auto col-span-4 text-sm font-test">
          =<div class="text-sm font-ltest">Last Update : 2021.09.27</div>
        </div>

        <div class="relative pt-1 col-span-3 pt-4">
          <div class="flex items-center justify-between">
            <div></div>
            <div class="text-right">
              <span class="text-xs font-semibold inline-block text-red-600">
                50%
              </span>
            </div>
          </div>
          <div class="overflow-hidden h-3 mb-4 text-xs flex rounded bg-red-200">
            <ProgressBar width={10} percent={6} color={"red"} />
          </div>
        </div>

        <div class="grid col-span-2 rounded-lg bg-develbg">
          <div className="my-auto  font-sbtest text-center">UI</div>
        </div>
        <div className="col-span-1"></div>
        <div class="my-auto col-span-4 text-sm font-test">
          Genius
          <div class="text-sm font-ltest">Last Update : 2021.09.27</div>
        </div>

        <div class="relative pt-1 col-span-3 pt-4">
          <div></div>
          <div class="flex items-center justify-between">
            <div></div>

            <div class="text-right">
              <span class="text-xs font-semibold inline-block text-green-600">
                70%
              </span>
            </div>
          </div>
          <div class="overflow-hidden h-3 mb-4 text-xs flex rounded bg-green-200">
            <ProgressBar width={10} percent={8} color={"green"} />
          </div>
        </div> */}
    </div>
  );
};

var todayY;
var todayM;
var todayD;
var todayW;

var selectedList = [];
var weeklyList = [];

function deleteSelectedList() {
  selectedList = [];
}

function deleteWeeklyList() {
  weeklyList = [];
}

const handlerWeekly = ({ todoLists, setPercentage, percentage }) => {
  var nowdayY = new Date().getFullYear();
  var nowdayM = new Date().getMonth() + 1;
  var nowdayD = new Date().getDate();
  var nowdayW = new Date().getDay();
  // todayW == 일요일 == 0
  // todayW == 월요일 == 1
  // todayW == 화요일 == 2

  // startDate[0] == Start Year
  // startDate[1] == Start Month
  // startDate[2] == Start Days

  // untilDate[0] == Finish Year
  // untilDate[1] == Finish Month
  // untilDate[2] == Finish Days

  // isFinish
  // 이번주차에 해당하는 투두 리스트 담아두기
  todoLists.map((item) => {
    //
    if (item.untilDate[0] * 1 == nowdayY) {
      if (item.untilDate[1] * 1 == nowdayM) {
        if (nowdayW == 0) {
          // 일요일
          if (nowdayD <= item.untilDate[2] <= nowdayD + 6) {
            weeklyList.push(item);
          }
        } else if (nowdayW == 1) {
          if (nowdayD - 1 <= item.untilDate[2] <= nowdayD + 5) {
            weeklyList.push(item);
          }
        } else if (nowdayW == 2) {
          if (nowdayD - 2 <= item.untilDate[2] <= nowdayD + 4) {
            weeklyList.push(item);
          }
        } else if (nowdayW == 3) {
          if (nowdayD - 3 <= item.untilDate[2] <= nowdayD + 3) {
            weeklyList.push(item);
          }
        } else if (nowdayW == 4) {
          if (nowdayD - 4 <= item.untilDate[2] <= nowdayD + 2) {
            weeklyList.push(item);
          }
        } else if (nowdayW == 5) {
          if (nowdayD - 5 <= item.untilDate[2] <= nowdayD + 1) {
            weeklyList.push(item);
          }
        } else if (nowdayW == 6) {
          if (nowdayD - 6 <= item.untilDate[2] <= nowdayD) {
            weeklyList.push(item);
          }
        }
      }
    }
  });

  /* weekly 계산 */
  var check = 0;
  var allTodo = Object.keys(weeklyList).length;
  weeklyList.map((item) => {
    if (item.isFinish) {
      check = check + 1;
    }
  });
  if (allTodo == 0) {
    return;
  }
  setPercentage(Math.floor((check / allTodo) * 100));
};

const handlerDate = ({ todoLists, date }) => {
  // 클릭 시 리스트 초기화
  deleteSelectedList();
  todayY = new Date(date).getFullYear();
  todayM = new Date(date).getMonth() + 1;
  todayD = new Date(date).getDate();

  todoLists.map((item) => {
    // if (todayY == item.untilDate[0] * 1) {
    //   if (todayM >= item.startDate[1] * 1) {
    //     if (
    //       todayD >= item.startDate[2] * 1 &&
    //       todayD <= item.untilDate[2] * 1
    //     ) {
    //       selectedList.push(item);
    //     }
    //   }
    // }

    if (todayY <= item.untilDate[0] * 1) {
      if (todayM >= item.startDate[1] * 1 || todayY <= item.untilDate[0] * 1) {
        if (todayD >= item.startDate[2] * 1 && todayD <= item.untilDate[2] * 1) {
          selectedList.push(item);
        } else if (todayY < item.untilDate[0] * 1 && todayD >= item.startDate[2] * 1) {
          selectedList.push(item);
        } else if (
          todayY > item.startDate[0] * 1 &&
          todayY <= item.untilDate[0] * 1 &&
          todayD <= item.untilDate[2] * 1
        ) {
          selectedList.push(item);
        }
      }
    }
  });

  selectedList.sort(function (a, b) {
    var dod = todayY.toString() + todayM.toString() + todayD.toString();
    var add = a.endDateY + a.endDateM + a.endDateD;
    var bdd = b.endDateY + b.endDateM + b.endDateD;

    var gapA = add * 1 - dod * 1;
    var gapB = bdd * 1 - dod * 1;

    if (gapA < gapB) {
      return -1;
    }
    if (gapA > gapB) {
      return 1;
    }

    // 이름이 같을 경우
    return 0;
  });
};

export const CalendarWidget = (props) => {
  const [date, setDate] = useState();
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const { todoLists } = props;
  const [showOneDay, setShowOneDay] = useState(false);
  const [showMultiDay, setShowMultiDay] = useState(false);
  const [onedayDate, setonedayDate] = useState(new Date());
  const [multidayStartDate, setMultidayStartDate] = useState(new Date());
  const [multidayEndDate, setMultidayEndDate] = useState(new Date());
  const [showTodoDate, setShowTodoDate] = useState(false);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="border border-date border-opacity-50 font-ltest example-custom-input bg-develbg bg-opacity-30 text-date text-opacity-70 rounded-full py-2 px-5"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  const modifiers = {
    // disabled: (date) => getDay(date) === -1, // Disables Saturdays
    highlight: (date) => getDay(date) === 2, // 이거를 토대로 디비에서 일정 목록을 받아와 하이라이트 표시 한다
  };
  const modifiersClassNames = {
    highlight: "-highlight",
  };
  useEffect(() => {
    handlerDate({ todoLists, date });
    //handlerWeekly(todoLists);
  }, []);
  return (
    <div
      className="Calendar"
      class="row-span-4 sm:col-span-3 md:col-span-1 font-ttest w-full h-full relative bg-white mx-auto pl-10 md:p-5 my-auto rounded-lg shadow-xl"
    >
      <div className="">
        <DatePickerCalendar
          date={date}
          onDateChange={setDate}
          locale={enGB}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
        />
      </div>
      <div className={date ? null : "hidden"}>
        <div className={date ? "font-bold mt-4 flex items-center justify-between h-8" : "hidden"}>
          {date ? format(date, "yyyy년 MMM dd일", { locale: ko }) : "none"}.
          {/* <button
            type="button"
            class="h-full w-1/3 text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm text-center"
            onClick={() => {
              setShowAddSchedule(true);
            }}
          >
            일정 추가
          </button> */}
        </div>
        <div class="">
          {
            <div class="mt-2 font-sbtest overflow-y-auto h-48 w-full">
              {handlerDate({ todoLists, date })}

              {selectedList.map((todo) => {
                return (
                  <div class="">
                    <div class="mb-3 mt-3 grid grid-cols-12 w-full">
                      <div class="col-span-3 rounded-lg w-12 h-8 bg-develbg font-sbtest">
                        <div class="pt-2 m-auto w-6 h-6 text-center text-xs">{todo.developField.substring(0, 1)}</div>
                      </div>
                      <div class="my-auto col-span-5 text-sm font-ltest">{todo.todo}</div>
                      <div class="my-auto pr-5 text-right col-span-4 text-xs font-ltest text-date">
                        ~{todo.untilDate[0] + "." + todo.untilDate[1] + "." + todo.untilDate[2]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          }
        </div>
      </div>

      {showAddSchedule ? (
        <div class="bg-black bg-opacity-25 justify-center w-full items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div class="relative w-1/3 my-5 mx-auto max-w-3xl">
            {/*content*/}
            <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div class="flex items-start justify-between px-6 py-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 class="text-xl font-sbtest text-center py-1">일정 추가하기</h3>
                <button
                  className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => {
                    setShowAddSchedule(false);
                    setShowOneDay(false);
                    setShowMultiDay(false);
                  }}
                >
                  <span className="bg-transparent text-black text-opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    x
                  </span>
                </button>
              </div>
              <div class="relative w-full mx-auto max-w-3xl">
                <div class="pt-4 ml-4 font-test"> ✔ 날짜를 선택해 주세요.</div>

                <div class="grid grid-cols-2">
                  <div class="font-test ml-4 mr-4 px-4 py-4 grid grid-rows-2 gap-2">
                    <button
                      className={showOneDay ? "py-2 border rounded-lg bg-gray-200" : "py-2 border rounded-lg"}
                      onClick={() => {
                        setShowOneDay(true);
                        setShowMultiDay(false);
                        setShowTodoDate(false);
                      }}
                    >
                      하루
                    </button>

                    <button
                      className={showMultiDay ? "py-2 border rounded-lg bg-gray-200" : "py-2 border rounded-lg"}
                      onClick={() => {
                        setShowOneDay(false);
                        setShowMultiDay(true);
                        setShowTodoDate(false);
                      }}
                    >
                      연속
                    </button>
                  </div>
                  <div class="font-test px-4 py-4 gap-1">
                    {showOneDay ? (
                      <div class="">
                        <DatePicker
                          closeOnScroll={(e) => e.target === document}
                          selected={onedayDate}
                          locale="ko"
                          dateFormat="yyyy년 MM월 dd일"
                          minDate={new Date()}
                          popperModifiers={{
                            preventOverflow: { enabled: true },
                          }}
                          onChange={(date) => {
                            setonedayDate(date);
                            setShowTodoDate(true);
                          }}
                          customInput={<ExampleCustomInput />}
                        />
                      </div>
                    ) : null}

                    {showMultiDay ? (
                      <div class="">
                        <DatePicker
                          closeOnScroll={(e) => e.target === document}
                          selected={multidayStartDate}
                          locale="ko"
                          dateFormat="yyyy년 MM월 dd일"
                          minDate={new Date()}
                          popperModifiers={{
                            preventOverflow: { enabled: true },
                          }}
                          onChange={(date) => {
                            setMultidayStartDate(date);
                            setShowTodoDate(true);
                          }}
                          customInput={<ExampleCustomInput />}
                        />
                        <div class="my-2"></div>
                        <DatePicker
                          closeOnScroll={(e) => e.target === document}
                          selected={multidayEndDate}
                          locale="ko"
                          dateFormat="yyyy년 MM월 dd일"
                          minDate={new Date()}
                          popperModifiers={{
                            preventOverflow: { enabled: true },
                          }}
                          onChange={(date) => setMultidayEndDate(date)}
                          customInput={<ExampleCustomInput />}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>

                {}

                {/*
                showTodoDate ? (
                  onedayDate ? (
                    multidayStartDate ? (
                      multidayEndDate ? (
                        <div class="pt-2 ml-4 font-test">
                          ✔ 선택한 날짜: {multidayStartDate.getFullYear()}년
                          {multidayStartDate.getMonth() + 1}월{" "}
                          {multidayStartDate.getDate()}일 ~{" "}
                          {multidayEndDate.getFullYear()}년{" "}
                          {multidayEndDate.getMonth() + 1}월{" "}
                          {multidayEndDate.getDate()}일
                        </div>
                      ) : (
                        <div class="pt-2 ml-4 font-test">
                          {" "}
                          ✔ 선택한 날짜: {multidayStartDate.getFullYear()}년
                          {multidayStartDate.getMonth() + 1}월{" "}
                          {multidayStartDate.getDate()}일
                        </div>
                      )
                    ) : (
                      <div class="pt-2 ml-4 font-test">
                        ✔ 선택한 날짜: {onedayDate.getFullYear()}년
                        {onedayDate.getMonth() + 1}월 {onedayDate.getDate()}일
                      </div>
                    )
                  ) : null
                ) : null
                    */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export const BoardWidget = (props) => {
  const { setShowModal4, dataLists3 } = props;
  return (
    <div
      className="Board"
      class="grid sm:col-span-3 md:col-span-1 row-span-2 font-ttest w-full h-full relative bg-white mx-auto pl-10 md:p-5 my-auto rounded-lg shadow-xl"
    >
      <div class="grid grid-cols-2">
        {/* <div class="font-sbtest text-left">자료실</div> */}
        <button class="font-sbtest text-left">자료실</button>
        <button
          class="font-test text-right text-xs"
          onClick={() => {
            setShowModal4(true);
          }}
        >
          더보기 {">"}
        </button>
      </div>
      <div className="py-2 px-1">
        {Object.keys(dataLists3.content).length == 0 ? (
          <div class="font-test">
            자료실에 글이 없어요😂
            <div>팀원들과 정보를 공유해 보세요.</div>
            <div>
              <a class="text-red-600">더보기</a>를 누르면 글을 쓸 수 있어요!
            </div>
          </div>
        ) : (
          dataLists3.content.map((list) => {
            return (
              <div class="grid grid-cols-2 grid-rows-2 mt-5 font-sbtest">
                <div class="col-span-2 my-auto text-sm font-ltest">{list.title}</div>
                <div class="text-gray-500 my-auto text-xs font-ltest">
                  {list.writeTime[0] + "." + list.writeTime[1] + "." + list.writeTime[2]}{" "}
                  {list.writeTime[3] + ":" + list.writeTime[4] + ":" + list.writeTime[5]}
                </div>
                <div class="my-auto text-sm font-ltest text-right">{list.writer}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
var limit = 0;
var todoLists = [];
const printTodo = (dataLists) => {
  dataLists.map((item) => {
    if (limit < 5) {
      todoLists.push(item);
      limit = limit + 1;
    }
  });
  limit = 0;
};
const deleteTodo = () => {
  todoLists = [];
};

export const TodoWidget = (props) => {
  const { setShowModal, dataLists } = props;
  deleteTodo();
  // useEffect(() => {
  printTodo(dataLists);
  // });
  return (
    <div
      className="Todo"
      class="grid sm:col-span-3 md:col-span-1 row-span-2 font-ttest w-full h-full relative bg-white mx-auto pl-10 md:p-5 my-auto rounded-lg shadow-xl"
    >
      <div class="font-sbtest">To-Do List</div>
      <div
        class={
          Object.keys(dataLists).length == 0 ? null : "py-2 px-1"
          // : "font-sbtest overflow-y-auto h-4/5 w-full"
        }
      >
        {Object.keys(dataLists).length == 0 ? (
          <div class="font-test my-3">
            아직은 할 일이 없어요😅
            <div class="mb-4">
              <a class="text-red-600">목표 관리하기</a> 버튼으로 할 일을 추가해 보세요!
            </div>
          </div>
        ) : (
          todoLists.map((list) => {
            return (
              <div class="">
                <div class="mb-3 mt-3 grid grid-cols-12 w-full">
                  <div class="col-span-3 rounded-lg w-12 h-8 bg-develbg font-sbtest">
                    <div class="pt-2 m-auto w-6 h-6 text-center text-xs">{list.developField.substring(0, 1)}</div>
                  </div>
                  <div class="my-auto col-span-5 text-sm font-ltest">{list.todo}</div>
                  <div class="my-auto pr-5 text-right col-span-4 text-sm font-ltest text-date">
                    {list.untilDate[0] + "." + list.untilDate[1] + "." + list.untilDate[2]}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <button class="font-test" type="button" onClick={() => setShowModal(true)}>
        목표 관리하기
      </button>
    </div>
  );
};

export const ConsoleWidget = ({ props }) => {
  // 임시 변수
  const [showBuildAddr, setShowBuildAddr] = useState(false);
  const [showServerAddr, setShowServerAddr] = useState(false);
  const [controlSerButt, setControlSerButt] = useState(true);
  const [createServer, setCreateServer] = useState(false);
  const [serverStatus2, setServerStatus2] = useState(null);
  const [formDataTmp, setFormDataTmp] = useState(null);

  const [pending, setPending] = useState(false);
  const [onPending, setOnPening] = useState(false);
  const [offPending, setOffPening] = useState(false);

  const [update, setUpdate] = useState(false);

  var todayDate = new Date().toString();
  todayDate = todayDate.slice(0, -18);

  //console.log(todayDate.toString());

  useEffect(() => {
    GetServerStatus({
      setServerStatus: setServerStatus2,
      teamName: props.match.params.teamName,
    });
  }, []);

  useEffect(() => {
    if (update) {
      GetServerStatus({
        setServerStatus: setServerStatus2,
        teamName: props.match.params.teamName,
      });
      setUpdate(false);
    }
  });
  //
  //

  // 'on' 'off' 'null'

  const onImgChange = (event) => {
    setFormDataTmp(event.target.files[0]);
  };

  const onSubmitDockerFile = async () => {
    const formData = new FormData();

    formData.append("dockerFile", formDataTmp);

    await axios
      .post(SERVER_URL + "/api/v1/dashboard/" + props.match.params.teamName + "/endpoint/create", formData, {
        headers: {
          Authorization: getCookie("token"),
        },
      })
      .then((res) => {
        setPending(false);
        setCreateServer(false);
        setUpdate(true);
      })
      .catch((err) => {
        setPending(false);
        setCreateServer(false);
        setUpdate(true);
      });
  };
  {
    // serverStatus2.serverStatus = "OFF";
  }

  return (
    <div
      id="console"
      class="font-test border-2 border-black text-white grid grid-rows-5 row-span-2 col-span-3 gap-y-5 font-ttest w-full h-80 relative bg-black mx-auto my-auto rounded-lg shadow-xl min-h-100"
    >
      <div class="bg-gray-100 text-black rounded-t-md pl-5 pb-1 grid grid-cols-2 row-span-1 border-b border-white border-opacity-30 mb-1">
        <div class="text-left font-sbtest text-lg self-center">Console</div>
        <div class="flex">
          <div class="bg-red-400 rounded-full w-4 h-4 mr-2 self-center"></div>
          <div class="bg-yellow-400 rounded-full w-4 h-4 mr-2 self-center"></div>
          <div class="bg-green-400 rounded-full w-4 h-4 mr-2 self-center"></div>
        </div>
        <div class="flex absolute right-0 mr-5 top-3 row-span-4">
          {serverStatus2 == null ? null : serverStatus2.serverCreated ? null : (
            <div>
              <button
                class="text-sm text-right float-right font-test"
                onClick={() => {
                  if (!serverStatus2.serverCreated) setCreateServer(true);
                }}
              >
                서버 생성
              </button>
            </div>
          )}

          {serverStatus2 == null ? null : serverStatus2.serverCreated ? (
            <button class="text-sm text-right float-right font-test">서버 업데이트</button>
          ) : null}
        </div>
      </div>
      {serverStatus2 == null ? ( // 이게 null로 떠...  << ㅇㅇ..그랬는데도 절케 뜸 ㅇㅇㅇ 응 상호만 떠 상 ㅋㅋ ??
        <div>
          {" "}
          <div class="pl-5 font-test text-white">&nbsp;</div>
          <div class="pl-5 font-test text-white">&nbsp;</div>
          <div class="pl-5 font-test text-white">&nbsp;</div>
          <div class="pl-5 mb-2 font-test text-white">&nbsp;</div>
          <div class="pl-5 pb-5 font-test text-white">&nbsp;</div>
        </div>
      ) : (
        <div>
          <div class="pl-5 font-test text-white">Last Login : {todayDate} on sangho123</div>
          <div class="mb-2 pl-5 font-test text-white">delimanju-MacbookPro: ~sangho$ ls</div>

          <div class="pl-5 font-test text-white">
            코드 업데이트 시기: {serverStatus2.codeUpdateAt[0]}.{serverStatus2.codeUpdateAt[1]}.
            {serverStatus2.codeUpdateAt[2]} {serverStatus2.codeUpdateAt[3]}:{serverStatus2.codeUpdateAt[4]}:
            {serverStatus2.codeUpdateAt[5]}
          </div>
          <div class="pl-5 font-test text-white">
            코드 빌드 시기:{" "}
            {serverStatus2.buildUpdateAt == null ? (
              "서버 생성을 완료해주세요."
            ) : (
              <>
                {serverStatus2.buildUpdateAt[0]}.{serverStatus2.buildUpdateAt[1]}.{serverStatus2.buildUpdateAt[2]}{" "}
                {serverStatus2.buildUpdateAt[3]}:{serverStatus2.buildUpdateAt[4]}:{serverStatus2.buildUpdateAt[5]}
              </>
            )}
          </div>
          <div class="pl-5 font-test text-white">
            코드 빌드 상태<a class="text-sm"> (S/F)</a>:{" "}
            {serverStatus2.buildStatus == "SUCCESS" ? (
              <a class="text-blue-600">성공</a>
            ) : (
              <a class="text-red-600">실패</a>
            )}
          </div>
          <div class="pl-5 flex ">
            <button class="font-test text-white">
              서버 상태:{" "}
              {serverStatus2.serverStatus == "ON" ? (
                <a class="text-green-600">실행중</a>
              ) : (
                <a class="text-red-600">중지됨</a>
              )}
            </button>

            {serverStatus2.serverStatus == "ON" ? (
              <button
                class="text-sm font-test ml-1"
                onClick={async () => {
                  setOffPening(true);
                  await axios
                    .get(SERVER_URL + "/api/v1/dashboard/" + props.match.params.teamName + "/endpoint/stop", {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: getCookie("token"),
                      },
                    })
                    .then((res) => {
                      setUpdate(true);
                      setOffPening(false);
                    })
                    .catch((err) => {
                      if (err.response) {
                      }
                      setOffPening(false);
                    });
                }}
              >
                {" "}
                서버 끄기
              </button>
            ) : (
              <button
                class="text-sm font-test ml-1"
                onClick={async () => {
                  setOnPening(true);
                  await axios
                    .get(SERVER_URL + "/api/v1/dashboard/" + props.match.params.teamName + "/endpoint/run", {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: getCookie("token"),
                      },
                    })
                    .then((res) => {
                      setUpdate(true);
                      setOnPening(false);
                    })
                    .catch((err) => {
                      if (err.response) {
                      }
                      setOnPening(false);
                    });
                }}
              >
                서버 켜기
              </button>
            )}
          </div>
          {!offPending ? null : (
            <div class="bg-black bg-opacity-25 justify-center w-full items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div class="relative w-1/3 my-5 mx-auto max-w-3xl">
                {/*content*/}
                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <br></br>
                  <h1 class="text-gray-600 font-bold text-lg" style={{ textAlign: "center" }}>
                    서버 종료중...
                  </h1>
                  <br />
                  <p class="text-gray-600" style={{ textAlign: "center" }}>
                    서버 종료가 완료되면 자동으로 화면이 닫힙니다.
                  </p>
                  <br />
                </div>
              </div>
            </div>
          )}

          {!onPending ? null : (
            <div class="bg-black bg-opacity-25 justify-center w-full items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div class="relative w-1/3 my-5 mx-auto max-w-3xl">
                {/*content*/}
                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <br></br>
                  <h1 class="text-gray-600 font-bold text-lg" style={{ textAlign: "center" }}>
                    서버 시작중...
                  </h1>
                  <br />
                  <p class="text-gray-600" style={{ textAlign: "center" }}>
                    서버 시작이 완료되면 자동으로 화면이 닫힙니다.
                  </p>
                  <br />
                </div>
              </div>
            </div>
          )}

          {serverStatus2.serverStatus == "ON" ? (
            <div class="pl-5 pb-5 font-test text-white">
              서버 주소: <a>{serverStatus2.serverUrl}</a>
            </div>
          ) : (
            <div class="pl-5 pb-5 font-test text-white">&nbsp;</div>
          )}

          {createServer ? (
            !pending ? (
              <div class="bg-black bg-opacity-25 justify-center w-full items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div class="relative w-1/3 my-5 mx-auto max-w-3xl">
                  {/*content*/}
                  <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div class="flex items-start justify-between px-6 py-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 class="text-black text-xl font-sbtest text-center py-1">서버 생성하기</h3>
                      <button
                        className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setCreateServer(false)}
                      >
                        <span className="bg-transparent text-black text-opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          x
                        </span>
                      </button>
                    </div>

                    <div class="relative w-full mx-auto max-w-3xl">
                      <div class=" text-black pt-4 ml-4 font-test">💾 DockerFile 업로드</div>
                      <div class="flex">
                        <input
                          class="w-3/4 mx-4 my-4 pb-2 px-2 py-2 font-test text-sm text-gray-500 rounded-md text-center border border-gray-400 "
                          type="file"
                          name="dockerFile"
                          accept="*"
                          enctype="multipart/form-data"
                          onChange={onImgChange}
                        ></input>

                        <button
                          class="text-lg flex-1 mr-5 right-0 text-center float-right font-test text-black"
                          onClick={() => {
                            setPending(true);
                            onSubmitDockerFile({ setUpdate: setUpdate });
                          }}
                        >
                          [ 제출 ]
                        </button>
                      </div>
                      {/* <div class=" text-black pt-2 ml-4 font-test">
                        🔌 Port 입력
                      </div>

                      <div class="relative flex mt-2 w-full mb-5">
                        <input
                          class="font-test rounded-lg border border-gray-400 relative w-3/4 mx-4 focus:outline-none focus:text-gray-600 p-2"
                          placeholder="Port 번호 입력"
                        />
                        <button class="text-lg flex-1 float-right mr-5 text-black font-test">
                          [ 검사 ]
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div class="bg-black bg-opacity-25 justify-center w-full items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div class="relative w-1/3 my-5 mx-auto max-w-3xl">
                  {/*content*/}
                  <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <br></br>
                    <h1 class="text-gray-600 font-bold text-lg" style={{ textAlign: "center" }}>
                      서버 생성중...
                    </h1>
                    <br />
                    <p class="text-gray-600" style={{ textAlign: "center" }}>
                      서버 생성이 완료되면 자동으로 화면이 닫힙니다.
                    </p>
                    <br />
                  </div>
                </div>
              </div>
            )
          ) : null}
        </div>
      )}
    </div>
  );
};
