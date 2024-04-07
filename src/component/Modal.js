import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // css import
import { ko } from "date-fns/esm/locale";
import { GetGitRepoList, PostCreateTeam } from "../utils/api/team/TeamApi";
import { GetTodoList, PostCreateTodo, PostFinishTodo } from "../utils/api/dashboard/DashboardApi";
import { GetBoardDetail, GetBoardList, PostWriteBoard, PostWriteCommentToBoard } from "../utils/api/board/BoardApi";
import Dashboard from "../page/Dashboard";
import { getAllDevelop } from "../utils/api/teamAdmin/TeamAdminApi";

export const Board = ({ props, setShowModal4, setUpdateView }) => {
  const [writing, setWriting] = useState(false);
  const [boardList, setBoardList] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [page, setPage] = useState(1);
  const [tmp, setTmp] = useState(false);
  const [nowId, setNowId] = useState(null);
  // 여기 페이지 목록이 만약에 [1,2,3,4] 이렇게 있으면 1번 누르면 setPage(1); 2번 누르면 setPage(2);
  // page가 바뀔때마다 통신해 받아와 리스트를
  // const [pageNum, setPageNum] = useState([]);
  const [boardTmp, setBoardTmp] = useState(false);
  const [boardUpdate, setBoardUpdate] = useState(false);
  const [pageList, setPageList] = useState([]);
  const [boardDetail, setBoardDetail] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [updateComment, setUpdateComment] = useState(false);

  var pageNum = [];
  const paging = () => {
    if (boardList != null) {
      for (let i = 0; i < boardList.totalPages; i++) {
        pageNum.push(i + 1);
      }
      for (let i = 0; i < boardList.totalPages; i++) {}
      setPageList(pageNum);
      setTmp(true);
    }
  };

  useEffect(() => {
    paging();
    setTmp(true);
  }, [boardList]);

  useEffect(() => {
    GetBoardList({
      setBoardList: setBoardList,
      teamName: props.match.params.teamName,
      page: page,
    });
  }, [page, writing]);

  useEffect(() => {
    if (boardUpdate) {
      GetBoardList({
        setBoardList: setBoardList,
        teamName: props.match.params.teamName,
        page: page,
      });
    }
    setBoardUpdate(false);
  });

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // boardList.totalPages ==> 배열을 나누고 8 [1~8]
  // var pageNum = [1,2,3,4,5,6,7,8]

  return (
    <div class="justify-center w-full items-center flex flex-col overflow-x-hidden overflow-y-auto fixed  bg-black bg-opacity-25  inset-0 z-50 outline-none focus:outline-none">
      <div class="relative w-1/2 h-3/4 my-5 mx-auto max-w-3xl">
        <div
          class="border-0 h-full rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none
        "
        >
          <div class="flex items-start justify-between px-6 py-5 border-b border-solid border-blueGray-200 rounded-t">
            <div class="flex">
              {(boardTmp === true || writing == true) && (
                <button //목록으로 돌아가는 버튼
                  class="text-2xl font sbtest py-1 mr-2"
                  onClick={(e) => {
                    setBoardTmp(false);
                    setWriting(false);
                  }}
                >
                  {" "}
                  &lt;{" "}
                </button>
              )}

              <h3 class="text-2xl font-sbtest py-1">자료실</h3>
            </div>
            <button
              className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal4(false)}
            >
              <span className="bg-transparen text-black text-opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                x
              </span>
            </button>
          </div>
          {writing ? (
            <div class="mx-5 mb-5 px-7 py-3">
              <input
                placeholder="제목을 입력하세요"
                class="block font-test text-2xl w-full h-10 lg:h-12 mt-6 pb-4 lg:mt-10 outline-none transition border-b hover:border-primary-500 border-gray-200 bg-white focus:border-primary-500"
                onChange={onChangeTitle}
              ></input>
              <textarea
                placeholder="내용 입력"
                class="resize-none font-rtest block text-base w-full h-full px-1  pt-6 outline-none transition hover:border-primary-500 border-gray-400  focus:border-primary-500"
                onChange={onChangeContent}
              ></textarea>
              <input class="ml-2 mt-3 rounded-lg font-test p-2" type="file" accpet=".*" />
              <button
                class="float-right mt-3 bg-develbg text-date py-2 px-4 rounded-lg"
                onClick={() => {
                  PostWriteBoard({
                    data: {
                      title: title,
                      content: content,
                    },
                    teamName: props.match.params.teamName,
                    setWriting: setWriting,
                    setUpdateView: setUpdateView,
                  });
                }}
              >
                글 작성하기
              </button>
            </div>
          ) : (
            <>
              {boardTmp ? (
                boardDetail == null ? null : (
                  // true면 글 상세보기, false면 글 목록
                  <div class="mx-5 overflow-y-auto">
                    <div class="mx-12 border-b pb-4">
                      <div class="text-3xl font-btest mt-8 ">{boardDetail.title}</div>
                      <div class="flex font-ltest text-tiny mt-4">
                        <div class="col-span-3 p-1 rounded-lg w-6 h-6 bg-develbg font-sbtest mr-1">
                          <div class="m-auto w-3 h-3 text-center text-xs">
                            {boardDetail.writerField == null ? "X" : boardDetail.writerField.substring(0, 1)}
                          </div>
                        </div>
                        <div class="flex-grow text-tiny p-1">{boardDetail.writer}</div>
                        <div class="float-right mr-2 py-1">
                          {boardDetail.writeTime[0] + "." + boardDetail.writeTime[1] + "." + boardDetail.writeTime[2]}
                        </div>
                        <div class="float-right py-1">
                          {boardDetail.writeTime[3] + "." + boardDetail.writeTime[4] + "." + boardDetail.writeTime[5]}
                        </div>
                      </div>
                    </div>
                    <div class="font-rtest mx-12 mt-5 mb-12 text-tiny">{boardDetail.content}</div>
                    <div class="mx-12 mt-12 font-test">
                      <textarea
                        id="comentInput"
                        placeholder="댓글 입력"
                        onChange={(e) => {
                          setCommentText(e.currentTarget.value);
                        }}
                        class="resize-none mt-5 block text-base w-full h-full px-1 lg:px-3 pt-3 outline-none transition border border-gray-300 bg-gray-50 rounded-sm hover:border-primary-500 focus:border-primary-500"
                      ></textarea>
                      <div class="mt-3 flex border-b pb-3 mb-3">
                        <div class="flex-grow p-1 text-lg font-test">댓글 {boardDetail.comments.length}개</div>
                        <button
                          class="bg-develbg text-date py-1 px-4 rounded-lg"
                          onClick={() => {
                            PostWriteCommentToBoard({
                              data: { comment: commentText },
                              teamName: props.match.params.teamName,
                              boardId: nowId,
                              setBoardDetail: setBoardDetail,
                              setBoardTmp: setBoardTmp,
                            });
                            document.getElementById("comentInput").value = "";
                          }}
                        >
                          댓글 등록
                        </button>
                      </div>
                      {boardDetail.comments.map((list) => {
                        return (
                          <div class="mb-2 border-b pb-2 pl-3 pr-2">
                            <div class="font-btest text-base">{list.writer}</div>
                            <div class="font-rtest text-tiny mt-2">{list.comment}</div>
                            <div class="font-ltest text-xs text-gray-500 flex ">
                              <div class="w-full float-right mr-2 text-right">
                                {list.writeTime[0] + "." + list.writeTime[1] + "." + list.writeTime[2]}
                              </div>
                              <div class="float-right text-right">
                                {boardDetail.writeTime[3] +
                                  "." +
                                  boardDetail.writeTime[4] +
                                  "." +
                                  boardDetail.writeTime[5]}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              ) : (
                <div class="overflow-y-scroll">
                  <div class="mx-5 mb-5">
                    <button
                      class="block text-base w-full h-10 lg:h-12 mt-2 lg:mt-4 px-1 lg:px-6 rounded-lg outline-none transition border border-dashed hover:border-primary-500 border-gray-400 bg-gray-50 focus:border-primary-500"
                      onClick={() => setWriting(true)}
                    >
                      글 작성하기
                    </button>
                  </div>
                  <div class="mx-2 overflow-y-auto">
                    {boardList == null
                      ? "불러오는 중입니다..."
                      : boardList.content.map((list) => {
                          return (
                            <button
                              value={list.id}
                              onClick={(e) => {
                                setNowId(e.currentTarget.value);
                                GetBoardDetail({
                                  setBoardDetail: setBoardDetail,
                                  teamName: props.match.params.teamName,
                                  boardId: list.id,
                                  setBoardTmp: setBoardTmp,
                                });
                              }}
                            >
                              <div class="justify-between border-b border-dashed border-blueGray-200 py-4 mx-5 grid grid-cols-8 grid-rows-2 gap-4">
                                <div class="col-start-1 row-start-1 col-span-1 row-span-2 rounded-lg bg-black font-sbtest">
                                  <div class="my-6 font-sbtest text-center text-develbg">{/* {list.file} */}</div>
                                </div>
                                <h3 class="col-span-6 text-left row-start-1 lg:text-lg font-ltest text-fontColor-900 ">
                                  {list.title}
                                </h3>

                                <h3 class="col-span-4 col-start-2 text-left row-start-2 lg:text-sm font-ltest text-gray-500 text-fontColor-900 ">
                                  {list.content}
                                </h3>
                                <div class="place-content-end my-0 float-right justify-self-end col-span-2 col-start-6 row-start-2 row-end-2 flex pl-12 text-right text-sm font-ltest text-date">
                                  <div class="">
                                    {list.writeTime[0] + "." + list.writeTime[1] + "." + list.writeTime[2]}
                                  </div>
                                  <div class="pl-2">
                                    {" "}
                                    {list.writeTime[3] + ":" + list.writeTime[4] + ":" + list.writeTime[5]}
                                  </div>
                                </div>
                                <div class="flex">
                                  <div class="col-span-3 p-1 rounded-lg w-6 h-6 bg-develbg font-sbtest mr-1">
                                    <div class="m-auto w-3 h-3 text-center text-xs">
                                      {list.writerField == null ? "X" : list.writerField.substring(0, 1)}
                                    </div>
                                  </div>
                                  <div class="col-span-1 col-start-8 text-gray-600 row-start-1 row-end-1 text-right font-ltest text-base">
                                    {list.writer.length >= 5 ? list.writer.substring(0, 2) + "..." : list.writer}
                                  </div>
                                </div>
                                <div class="place-content-end my-0 col-span-1 col-start-8 text-gray-500 row-start-2 row-end-2 text-right font-ltest text-sm text-date">
                                  👍 {list.likeCount} 💬 {list.commentCount}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                  </div>
                  <div class="flex justify-center mt-5 mb-6">
                    {boardList != null
                      ? pageList.map((num, idx) => {
                          return (
                            <div key={idx}>
                              {num == page ? ( //강조
                                <button
                                  class="mx-1 font-test text-black border border-gray-400 px-2 py-1 rounded-md"
                                  value={num}
                                  onClick={(e) => {
                                    setPage(e.currentTarget.value);
                                  }}
                                >
                                  {num}
                                </button>
                              ) : (
                                //강조X
                                <button
                                  class="mx-1 font-test text-black px-2 py-1 rounded-md"
                                  value={num}
                                  onClick={(e) => {
                                    setPage(e.currentTarget.value);
                                  }}
                                >
                                  {num}
                                </button>
                              )}
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const AddingToDo = ({
  setShowModal,
  endCheck,
  checkedItemHandler,
  checkedList,
  changeComplete,
  ExampleCustomInput,
  setUpdateView,
  props,
}) => {
  const [developLists, setDevelopLists] = useState(null);
  const [todoDev, setTodoDev] = useState(null);
  const [todoDate, setTodoDate] = useState(new Date());
  const [todoInput, setTodoInput] = useState(null);
  const [updateTodo, setUpdateTodo] = useState(false);
  const [todoList, setTodoList] = useState(null);

  const onTodoInputHandler = (event) => {
    setTodoInput(event.currentTarget.value);
  };

  const onTodoFinishHandler = ({ list }) => {
    PostFinishTodo({
      teamName: props.match.params.teamName,
      setUpdateTodo: setUpdateTodo,
      setUpdateView: setUpdateView,
      item: {
        working: list.todo,
        fieldName: list.developField,
      },
    });
  };

  useEffect(() => {
    getAllDevelop({
      teamName: props.match.params.teamName,
      setDevelopLists: setDevelopLists,
    });
    GetTodoList({
      teamName: props.match.params.teamName,
      setTodoList: setTodoList,
      setUpdateTodo: setUpdateTodo,
    });
  }, []);

  useEffect(() => {
    if (updateTodo) {
      GetTodoList({
        teamName: props.match.params.teamName,
        setTodoList: setTodoList,
        setUpdateTodo: setUpdateTodo,
      });
    }
  });
  return (
    <>
      <div class="justify-center w-full items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div class="relative w-2/5 my-5 mx-auto max-w-3xl">
          {/*content*/}
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div class="flex items-start justify-between px-6 py-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 class="text-2xl font-sbtest py-1">목표 관리하기</h3>
              <button
                className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparen text-black text-opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            {/*body*/}
            <div class="relative w-full mx-auto max-w-3xl">
              <div class="font-test mb-3 flex items-center px-6 space-x-2 lg:space-x-4 py-2 text-blueGray-500 leading-relaxed">
                <div class="w-full">
                  <input
                    placeholder="추가할 목표를 입력해주세요!"
                    class="block flex-grow text-base w-full h-10 lg:h-12 mt-2 lg:mt-4 px-1 lg:px-6 rounded-lg outline-none transition border hover:border-primary-500 border-gray-400 focus:border-primary-500"
                    onChange={onTodoInputHandler}
                  ></input>
                  <div class="flex mt-3 w-full">
                    <DatePicker
                      closeOnScroll={(e) => e.target === document}
                      selected={todoDate}
                      dateFormat="yyyy년 MM월 dd일"
                      minDate={new Date()}
                      popperModifiers={{
                        preventOverflow: { enabled: true },
                      }}
                      onChange={(date) => setTodoDate(date)}
                      customInput={<ExampleCustomInput />}
                    />
                    <select
                      aria-label="select an option"
                      class="border-date border-opacity-50 font-ltest example-custom-input bg-develbg bg-opacity-30 text-date text-opacity-70 rounded-full py-2 px-4 w-full border rounded-lg h-full focus:outline-none text-center"
                      onChange={(e) => setTodoDev(e.currentTarget.value)}
                    >
                      <option selected="" disabled="" value="">
                        개발 분야
                      </option>
                      {developLists == null
                        ? null
                        : developLists.map((item) => {
                            return <option value={item.field}>{item.field}</option>;
                          })}
                    </select>
                  </div>
                </div>

                <button
                  class="relative align-top bottom-7 font-ltest w-1/3 mt-2 lg:mt-4 float-right block text-white text-base bg-gray-400 h-10 lg:h-12 px-4 lg:px-7 rounded-lg outline-none transition border hover:border-primary-500 border-gray-400 focus:border-primary-500"
                  onClick={() => {
                    var untilDate = todoDate.getFullYear() + "/" + (todoDate.getMonth() + 1) + "/" + todoDate.getDate();
                    PostCreateTodo({
                      teamName: props.match.params.teamName,
                      item: {
                        field: todoDev,
                        working: todoInput,
                        untilDate: todoDate.getFullYear() + "/" + (todoDate.getMonth() + 1) + "/" + todoDate.getDate(),
                      },
                      setUpdateTodo: setUpdateTodo,
                      setUpdateView: setUpdateView,
                    });
                    setUpdateTodo(true);
                    //PostCreateTodo();
                  }}
                >
                  추가
                </button>
              </div>
              <div class="overflow-y-auto h-96">
                {todoList == null
                  ? null
                  : todoList.map((list, idx) => {
                      return (
                        <div class="flex items-center justify-between w-full overflow-y-auto h-96 sm:h-16 px-4 lg:px-8 rounded-lg shadow bg-white">
                          <div class="flex items-center space-x-2 lg:space-x-4 w-full h-auto" key={idx}>
                            <input
                              type="checkbox"
                              onChange={(e) => checkedItemHandler(list, e.target.checked)}
                              checked={checkedList.includes(list) ? true : false}
                            ></input>
                            <div class="col-span-3 rounded-lg w-12 h-8 bg-develbg font-sbtest">
                              <div class="pt-2 m-auto w-6 h-6 text-center text-xs">
                                {list.developField.substring(0, 1)}
                              </div>
                            </div>
                            <h3 class="flex-grow lg:text-base font-test text-fontColor-900 ">{list.todo}</h3>
                            <div class="float-right my-auto pl-10 text-right col-span-4 text-sm font-ltest text-date">
                              {list.untilDate[0] + "." + list.untilDate[1] + "." + list.untilDate[2]}
                            </div>
                            <div>
                              {list.isFinish ? (
                                <button
                                  onClick={() => {
                                    onTodoFinishHandler({ list });
                                  }}
                                >
                                  <svg
                                    class="h-8 w-8 text-purple-500 text-opacity-70 font-ltest text-date"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  >
                                    {" "}
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />{" "}
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                  </svg>
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    onTodoFinishHandler({ list });
                                  }}
                                >
                                  <svg
                                    class="h-8 w-8 text-purple-500 text-opacity-20 font-ltest text-date"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  >
                                    {" "}
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />{" "}
                                  </svg>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>

              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-gray-500 background-transparent font-test uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  삭제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export const ChatRoom = (props) => {
  const { setShowModal2, dataLists2, addChat, setCtext } = props;
  const [chat, setChat] = useState(null);

  useEffect(() => {
    setChat(document.getElementById("#chat"));
  }, []);

  <Dashboard chat={chat} />;

  return (
    <>
      <div class="justify-center w-full items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
        <div class="relative w-1/3 bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <div className="grid pb-10 ">
            <div class="font-sbtest text-xl">
              TeamName 채팅방
              <button
                className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal2(false)}
              >
                <span className="bg-transparen text-black text-opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
          </div>
          <div id="chat" className="grid max-h-72 overflow-y-auto">
            {dataLists2.map((list2) => {
              return (
                <div class="pb-3 flex space-x-2 px-3" key={list2.id}>
                  <div class="relative w-12 h-12">
                    <img
                      class="rounded-full border border-gray-100 shadow-sm"
                      src={list2.userprofile}
                      alt="user image"
                    />
                    {list2.online ? (
                      <>
                        <div class="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
                      </>
                    ) : (
                      <>
                        <div class="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-gray-400 z-2"></div>
                      </>
                    )}
                  </div>
                  <div class="font-test flex-grow text-sm text-sscroll pl-2">
                    {list2.username}
                    <div class="font-ltest text-xs mt-1 text-gray-400 pl-2">{list2.data}</div>
                  </div>
                  <div class="font-ltest float-right text-right text-xs mt-1 text-gray-300">{list2.date}</div>
                </div>
              );
            })}
          </div>
          <div className="grid">
            <input
              id="sendMessage"
              type="text"
              placeholder="메세지 입력..."
              class="font-test border rounded border-opacity-50 w-full lg:px-4 py-2 text-gray-700 border-scroll transition duration-500 px-1 mt-6 shadow"
              onChange={(e) => {
                setCtext(e.target.value);
              }}
            />
            <button
              class="font-test bg-scroll mt-3 hover:bg-gray-500 w-full text-white font-medium py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
              onClick={(e) => {
                addChat(null);
                document.getElementById("sendMessage").value = "";
                setChat(!chat);
              }}
            >
              보내기
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export const VideoChatRoom = (props) => {
  const { setShowModal3, setShowVideoList, setMemberList, videoList, videoConference, memberList, memList } = props;
  return (
    <>
      <div class="justify-center w-full items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div class="relative w-1/3 my-5 mx-auto max-w-3xl">
          {/*content*/}
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div class="flex items-start justify-between px-6 py-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 class="text-2xl font-sbtest py-1">화상회의 시작하기</h3>
              <button
                className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal3(false)}
              >
                <span className="bg-transparent text-black text-opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            {/*body*/}
            <div class="relative w-full mx-auto max-w-3xl">
              <div class={"h-10 font-test grid grid-cols-2"}>
                <button
                  onClick={() => {
                    setShowVideoList(true);
                    setMemberList(false);
                  }}
                >
                  <p className={videoList ? "text-date font-bold" : null}>목록</p>
                </button>
                <button
                  onClick={() => {
                    setMemberList(true);
                    setShowVideoList(false);
                  }}
                >
                  <p className={memberList ? "text-date font-bold" : null}>팀원</p>
                </button>
              </div>
              <hr></hr>
              {videoList
                ? videoConference.map((list) => {
                    return (
                      <div>
                        <div class="flex items-center justify-between w-full h-auto sm:h-16 px-4 lg:px-8 rounded-lg shadow bg-white">
                          <div class="items-center space-x-2 lg:space-x-4 w-full h-auto" key={list.id}>
                            <button
                              class="flex-grow lg:text-base font-test text-fontColor-900"
                              onClick={() => {
                                window.location.href = "../VideoChat";
                              }}
                            >
                              💻 {list.name}
                            </button>

                            <div class="float-right my-auto pl-10 text-right col-span-4 text-sm font-ltest text-date">
                              {list.person} 명 진행 중
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}

              {memberList ? (
                <div>
                  <div class="flex items-center px-6 space-x-2 lg:space-x-4 py-2 text-blueGray-500 leading-relaxed">
                    <input
                      placeholder="🔎 팀원 찾기"
                      class="font-test block text-base w-full h-10 lg:h-12 mt-2 lg:mt-4 px-1 lg:px-6 rounded-lg outline-none transition border hover:border-primary-500 border-gray-400 focus:border-primary-500"
                    ></input>
                    <button class="font-test w-1/3 float-right block text-white text-base bg-gray-400 h-10 lg:h-12 mt-2 lg:mt-4 px-4 lg:px-7 rounded-lg outline-none transition border hover:border-primary-500 border-gray-400 focus:border-primary-500">
                      확인
                    </button>
                  </div>

                  {memList.map((list) => {
                    return (
                      <div>
                        <div class="flex items-center justify-between w-full h-auto sm:h-16 px-4 lg:px-8 rounded-lg shadow bg-white">
                          <div class="items-center space-x-2 lg:space-x-4 w-full h-auto" key={list.id}>
                            <div class="pb-2 flex">
                              <div class="relative w-10 h-10">
                                <img
                                  class="rounded-full border border-gray-100 shadow-sm"
                                  src={list.profile}
                                  alt="user image"
                                />
                                {list.online ? (
                                  <>
                                    <div class="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
                                  </>
                                ) : (
                                  <>
                                    <div class="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-gray-400 z-2"></div>
                                  </>
                                )}
                              </div>

                              <div class="text-left font-test flex-grow text-sm text-black mt-3 pl-2">{list.name}</div>

                              {list.online ? (
                                <button
                                  class="float-right font-test text-gray-500 px-5 py-1 rounded-md bg-gray-200 hover:bg-gray-400 hover:text-gray-50"
                                  onClick={() => {}}
                                >
                                  초대
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export const CreateTeam = ({ props, setShowCreateTeamForm, setUpdate }) => {
  const [gitRepos, setGitRepos] = useState([]);
  const [teamName, setTeamName] = useState(null);
  const [teamDevelopType, setTeamDevelopType] = useState(null);
  const [teamGitRepo, setTeamGitRepo] = useState(null);
  const [teamDescription, setTeamDescription] = useState(null);

  useEffect(() => {
    GetGitRepoList({ setGitRepos });
  }, []);

  const onTeamNameHandler = (event) => {
    setTeamName(event.currentTarget.value);
  };

  const onTeamDevelopTypeHandler = (event) => {
    setTeamDevelopType(event.currentTarget.value);
  };

  const onTeamGitRepoHandler = (event) => {
    setTeamGitRepo(event.currentTarget.value);
  };

  const onTeamDescriptionHandler = (event) => {
    setTeamDescription(event.currentTarget.value);
  };
  return (
    <div>
      <div id="popup" class="z-50 fixed w-full flex justify-center inset-0 bg-opacity-20 bg-gray-600">
        <div
          onClick={() => {
            setShowCreateTeamForm(false);
          }}
          class="w-full h-full z-0 absolute inset-0"
        ></div>
        <div class="mx-auto container">
          <div class="flex items-center justify-center h-full w-full">
            <div class="bg-white rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 md:w-8/12 lg:w-1/2 2xl:w-2/5">
              <div class="bg-gray-100 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between">
                <p class="text-base font-semibold">새로운 팀 생성</p>
                <button
                  role="button"
                  aria-label="close label"
                  onClick={() => {
                    setShowCreateTeamForm(false);
                  }}
                  class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:outline-none"
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21 7L7 21"
                      stroke="#A1A1AA"
                      stroke-width="1.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M7 7L21 21"
                      stroke="#A1A1AA"
                      stroke-width="1.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="px-4 md:px-10 pt-6 md:pt-12 md:pb-4 pb-7">
                <form class="mt-11">
                  <div class="flex items-center space-x-9">
                    <input
                      placeholder="팀 이름"
                      class="focus:ring-2 focus:ring-gray-400 w-1/2 focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                      onChange={onTeamNameHandler}
                    />
                    <div
                      tabindex="0"
                      class="focus:outline-none focus:ring-2 focus:ring-gray-400 w-1/2 bg-white border rounded border-gray-200 py-2.5 px-3"
                    >
                      <select
                        aria-label="select an option"
                        class="text-sm text-gray-500 w-full focus:outline-none"
                        onChange={onTeamDevelopTypeHandler}
                      >
                        <option selected="" disabled="" value="">
                          개발 언어 선택
                        </option>
                        <option>JAVA</option>
                        <option>C</option>
                        <option>C++</option>
                        <option>Python</option>
                        <option>Spring</option>
                        <option>React</option>
                      </select>
                    </div>
                  </div>
                  <div class="flex items-center mt-8">
                    <div
                      tabindex="0"
                      class="focus:outline-none focus:ring-2 focus:ring-gray-400 w-full bg-white border rounded border-gray-200 py-2.5 px-3"
                    >
                      <select
                        aria-label="select an option"
                        class="text-sm text-gray-500 w-full focus:outline-none"
                        onChange={onTeamGitRepoHandler}
                      >
                        <option selected="" disabled="" value="">
                          Github Repository 선택
                        </option>
                        {gitRepos.map((item) => {
                          return <option>{item.gitRepoUrl}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div class="mt-8">
                    <textarea
                      placeholder="팀 설명"
                      class="focus:outline-none focus:ring-2 focus:ring-gray-400 py-3 pl-3 overflow-y-auto h-24 border placeholder-gray-500 rounded border-gray-200 w-full resize-none focus:outline-none"
                      onChange={onTeamDescriptionHandler}
                    ></textarea>
                  </div>
                </form>
                <div class="flex items-center justify-between mt-9">
                  <button
                    role="button"
                    aria-label="close button"
                    onClick={() => {
                      setShowCreateTeamForm(false);
                    }}
                    class="focus:ring-2 focus:ring-offset-2 focus:bg-gray-600 focus:ring-gray-600 focus:outline-none px-6 py-3 bg-gray-600 hover:bg-gray-500 shadow rounded text-sm text-white"
                  >
                    취소
                  </button>
                  <button
                    aria-label="add user"
                    role="button"
                    class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 focus:outline-none px-6 py-3 bg-indigo-700 hover:bg-opacity-80 shadow rounded text-sm text-white"
                    onClick={() => {
                      const data = {
                        teamName: teamName,
                        teamDescription: teamDescription,
                        gitRepoUrl: teamGitRepo,
                        developType: teamDevelopType,
                      };
                      PostCreateTeam({
                        data,
                        setShowCreateTeamForm: setShowCreateTeamForm,
                        setUpdate: setUpdate,
                      });
                    }}
                  >
                    팀 생성
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
