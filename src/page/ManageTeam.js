import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GetGitRepoList } from "../utils/api/team/TeamApi";
import {
  DeleteDevelope,
  AddDevelope,
  AddTeamNotice,
  getAllDevelop,
  getTeamNoticeList,
  deleteTeam,
  GetAllTeamMember,
  SetDevelopToMember,
  GetAllInviteTeamMember,
  SearchMember,
  InviteMemberToTeam,
  GetTeamInfo,
} from "../utils/api/teamAdmin/TeamAdminApi";
import SearchUser from "../component/UserSearch";

import { sample_member } from "../component/test/sample_data"; // 나중에 지울 것

const onDevSelHandler = (
  selected,
  memEmail,
  setMemberDevelopPlus,
  SetDevelopToMember,
  teamMemberList,
  setMemberDevelopUpdate,
  memberDevelopPlus,
  props
) => {
  teamMemberList.forEach(function (member) {
    if (member.memberEmail == memEmail) {
      SetDevelopToMember({
        data: {
          isDeleted: false,
          memberEmail: memEmail,
          developField: selected,
        },
        teamName: props.match.params.teamName,
        setMemberDevelopUpdate: setMemberDevelopUpdate,
      });
      setMemberDevelopPlus(!memberDevelopPlus); //없는 애
    }
  });
};

const SelectedTrueMemberSetDevelopField = ({
  member,
  developLists,
  SetDevelopToMember,
  teamMemberList,
  setMemberDevelopUpdate,
  props,
}) => {
  const [memberDevelopPlus, setMemberDevelopPlus] = useState(false);
  if (memberDevelopPlus) {
    return (
      <div class="h-full mx-auto w-2/3">
        <select
          aria-label="select an option"
          class="text-sm text-gray-500 w-full border rounded-lg h-full focus:outline-none text-center"
          onChange={(e) => {
            onDevSelHandler(
              e.currentTarget.value,
              member.memberEmail,
              setMemberDevelopPlus,
              SetDevelopToMember,
              teamMemberList,
              setMemberDevelopUpdate,
              memberDevelopPlus,
              props
            );
          }}
        >
          <option selected="" disabled="" value="">
            역할 선택
          </option>
          {developLists.map((item) => {
            return <option value={item.field}>{item.field}</option>;
          })}
        </select>
      </div>
    );
  } else {
    return (
      <div class="h-full">
        {" "}
        <div class="grid mx-auto rounded-lg w-2/3 h-full border border-dashed px-5">
          <button
            className="w-full text-xl font-sbtest text-gray-400 text-center"
            value=""
            onClick={() => {
              setMemberDevelopPlus(!memberDevelopPlus);
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  }
};

function ManageTeam(props) {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSubMenu2, setShowSubMenu2] = useState(false);
  const [showNowClick1, setShowNowClick1] = useState(false);
  const [showNowClick2, setShowNowClick2] = useState(false);
  const [showNowClick3, setShowNowClick3] = useState(false);
  const [showNowClick4, setShowNowClick4] = useState(false);
  const [showNowClick5, setShowNowClick5] = useState(false);
  const [showNowClick6, setShowNowClick6] = useState(false);
  const [showNowClick7, setShowNowClick7] = useState(false);
  const [showNowClick8, setShowNowClick8] = useState(false);

  const [showInputDev, setShowInputDev] = useState(false);
  const [noticeLists, setNoticeLists] = useState([]);
  const [noticeText, setNoticeText] = useState(null);
  const [developLists, setDevelopLists] = useState([]);
  const [gitRepos, setGitRepos] = useState([]);
  const [teamGitRepo, setTeamGitRepo] = useState(null);
  const [gitRepoChangeMes, setGitRepoChangeMes] = useState({
    show: false,
    err: false,
    mes: "",
  });
  const [devinput, setDevinput] = useState("");
  const [email, setEmail] = useState("");
  const [update, setUpdate] = useState(false);
  const [selectDev, setSelectDev] = useState(false);
  const [selectDeve, setSelectDeve] = useState([]);
  const [showDeleteMem, setShowDeleteMem] = useState(false);

  const [deleteMemList, setDeleteMemList] = useState([]);
  const [deleteMemIdList, setDeleteMemIdList] = useState([]);
  const [confirmCkMemList, setConfirmCkMemList] = useState([]);

  const [teamMemberList, setTeamMemberList] = useState([]);
  const [memberDevelopUpdate, setMemberDevelopUpdate] = useState(false);

  const [inviteTeamMember, setInviteTeamMember] = useState(null);
  const [inviteTeamMemberUpdate, setInviteTeamMemberUpdate] = useState(true);

  const [searchUserResult, setSearchUserResult] = useState(null);
  const [searchEmail, setSearchEmail] = useState(null);

  const [teamInfo, setTeamInfo] = useState(null);

  const onSearchEmailHandler = (event) => {
    setSearchEmail(event.currentTarget.value);
  };

  const checkDelMemList = [];
  const Swal = require("sweetalert2");

  const tempSel = [true];
  for (var i = 1; i <= teamMemberList.length; i++) {
    tempSel.push(false);
  }
  for (var i = 1; i <= teamMemberList.length; i++) {
    selectDeve.push(false);
  }
  useEffect(() => {
    if (update) {
      getAllDevelop({
        setDevelopLists: setDevelopLists,
        setUpdate: setUpdate,
        teamName: props.match.params.teamName,
      });
    }
    if (memberDevelopUpdate) {
      GetAllTeamMember({
        teamName: props.match.params.teamName,
        setTeamMemberList: setTeamMemberList,
        setMemberDevelopUpdate: setMemberDevelopUpdate,
      });
    }
    if (inviteTeamMemberUpdate) {
      GetAllInviteTeamMember({
        teamName: props.match.params.teamName,
        setInviteTeamMember: setInviteTeamMember,
        setInviteTeamMemberUpdate: setInviteTeamMemberUpdate,
      });
    }
  });

  useEffect(() => {
    GetAllTeamMember({
      teamName: props.match.params.teamName,
      setTeamMemberList: setTeamMemberList,
    });
    GetAllInviteTeamMember({
      teamName: props.match.params.teamName,
      setInviteTeamMember: setInviteTeamMember,
      setInviteTeamMemberUpdate: setInviteTeamMemberUpdate,
    });
    GetGitRepoList({ setGitRepos });
  }, []);

  const onTeamGitRepoHandler = (event) => {
    setTeamGitRepo(event.currentTarget.value);
  };

  const onDevdeleteHandler = (field) => {
    DeleteDevelope({
      input: field,
      setUpdate: setUpdate,
      teamName: props.match.params.teamName,
    });
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      if (event.currentTarget.value.length > 5) {
        Swal.fire({
          title: "X",
          text: "개발 분야는 5글자 이내로 입력해주세요!",
          confirmButtonText: "🤣",
          confirmButtonColor: "#171717",
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      } else {
        onDevinputHandler(event);
      }
    }
  };

  const onDevinputHandler = (event) => {
    //setDevinput(event.currentTarget.value);
    addDevinput();
    setShowInputDev(false);
  };

  const addDevinput = () => {
    AddDevelope({
      input: devinput,
      setUpdate: setUpdate,
      teamName: props.match.params.teamName,
    });
  };

  const onNoticeTextHandler = (event) => {
    setNoticeText(event.currentTarget.value);
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const ondeleteDevHandler = (memEmail) => {
    teamMemberList.forEach(function (member) {
      if (member.memberEmail == memEmail) {
        SetDevelopToMember({
          data: {
            isDeleted: true,
            memberEmail: memEmail,
            developField: null,
          },
          teamName: props.match.params.teamName,
          setMemberDevelopUpdate: setMemberDevelopUpdate,
        });
      }
    });
  };

  const onChangeGitRepoHandler = () => {
    if (teamGitRepo == null) {
      setGitRepoChangeMes({
        show: true,
        err: true,
        mes: "변경할 깃허브 연동 주소를 선택해주세요.",
      });
    } else if (false) {
      //통신 오류 조건 넣기
      setGitRepoChangeMes({
        show: true,
        err: true,
        mes: "서버와 통신에 실패했습니다. 다시 시도해주세요.",
      });
    } else {
      //문제 없이 성공했을 경우
      setGitRepoChangeMes({
        show: true,
        err: false,
        mes: "변경에 성공했습니다!",
      });
    }
  };

  const TeamMemberListFunction = ({ member, idx }) => {
    return (
      <div class="" key={idx}>
        <div class="flex items-center py-2">
          {member.is_leader ? (
            <div class="ml-6"></div>
          ) : (
            <input
              class="ml-3"
              type="checkbox"
              onClick={(event) => checkDelMemHandler(event)}
              value={idx}
              onChange={(e) => selectMember(e.target.checked, member)}
              checked={confirmCkMemList.includes(member) ? true : false}
            ></input>
          )}

          <div class="flex-1 ml-5 my-1 flex">
            <img
              class="w-12 h-12 rounded-full"
              src="https://cdn.tuk.dev/assets/templates/olympus/projects(8).png"
              alt="collaborator 1"
            ></img>
            <div class="ml-2">
              <div class="text-lg font-btest text-black text-gray-600">{member.memberName}</div>
              <div class="font-ttest text-sm text-gray-400">{member.memberEmail}</div>
            </div>
          </div>
          <div class="flex-1 my-1 my-auto">{member.developField == null ? "미정" : member.developField}</div>
          <div class="flex-1 my-1">
            {member.teamAuthority == "ROLE_PARENT" ? (
              <div class="my-auto mx-auto h-3/4 grid rounded-full w-1/4 border border-red-300">
                <div class="my-auto mx-auto">
                  <div class="font-sbtest text-red-400 text-opacity-70 text-center">팀장</div>
                </div>
              </div>
            ) : (
              <div class="my-auto mx-auto grid h-3/4 rounded-full w-1/4 border border-green-300">
                <div class="my-auto mx-auto">
                  <div class="font-sbtest text-green-400 text-opacity-70 text-center">팀원</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <hr></hr>
      </div>
    );
  };

  const checkDelMemHandler = (event) => {
    var checkMem;
    if (event.target.checked) {
      sample_member.map((list) => {
        if (list.id == event.target.value) {
          checkMem = list.username;
          deleteMemIdList.push(event.target.value);
        }
      });
      deleteMemList.push(checkMem);
    } else {
      sample_member.map((list) => {
        if (list.id == event.target.value) {
          checkMem = list.username;
        }
      });
      for (var i = 0; i < deleteMemList.length; i++) {
        if (deleteMemList[i] == checkMem) {
          deleteMemList.splice(i, 1);
          break;
        }
      }

      for (var i = 0; i < deleteMemIdList.length; i++) {
        if (deleteMemIdList[i] == event.target.value) {
          deleteMemIdList.splice(i, 1);
          break;
        }
      }
    }
  };

  const removeMemHandler = () => {
    sample_member.forEach(function (member) {
      checkDelMemList.forEach(function (delMem) {
        if (member.id == delMem.id) {
          sample_member.splice(member.id - 1, 1);

          var idx = 1;
          sample_member.map((list) => {
            list.id = idx;
            idx += 1;
          });
        }
      });
    });

    for (var i = 0; i <= checkDelMemList.length; i++) {
      checkDelMemList.pop();
    }
    for (var i = 0; i <= deleteMemList.length; i++) {
      deleteMemList.pop();
    }
    for (var i = 0; i <= deleteMemIdList.length; i++) {
      deleteMemIdList.pop();
    }

    confirmDelete();
  };

  const confirmDelete = () => {
    Swal.fire({
      title: "O",
      text: "팀원을 삭제하였어요.",
      confirmButtonText: "👍",
      confirmButtonColor: "#171717",
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    setShowDeleteMem(false);
  };

  const selectAllMember = useCallback(
    (checked) => {
      if (checked) {
        // 기존에 체크된 거 비워주는 작업
        teamMemberList.map((list) => {
          for (var i = 0; i < deleteMemList.length; i++) {
            if (deleteMemList[i] == list.memberName) {
              deleteMemList.splice(i, 1);
              break;
            }
          }
          for (var i = 0; i < deleteMemIdList.length; i++) {
            if (deleteMemIdList[i] == list.id) {
              deleteMemIdList.splice(i, 1);
              break;
            }
          }
        });

        const checkMemList = [];
        teamMemberList.forEach((list) => checkMemList.push(list));
        setConfirmCkMemList(checkMemList);
        teamMemberList.map((list) => {
          if (!list.is_leader) {
            deleteMemList.push(list.memberName);
            deleteMemIdList.push(list.id);
          }
        });
      } else {
        setConfirmCkMemList([]);
        teamMemberList.map((list) => {
          if (!list.is_leader) {
            for (var i = 0; i < deleteMemList.length; i++) {
              if (deleteMemList[i] == list.memberName) {
                deleteMemList.splice(i, 1);
                break;
              }
            }
            for (var i = 0; i < deleteMemIdList.length; i++) {
              if (deleteMemIdList[i] == list.id) {
                deleteMemIdList.splice(i, 1);
                break;
              }
            }
          }
        });
      }
    },
    [sample_member]
  );

  const selectMember = useCallback(
    (checked, list) => {
      if (checked) {
        setConfirmCkMemList([...confirmCkMemList, list]);
      } else {
        setConfirmCkMemList(confirmCkMemList.filter((el) => el !== list));
      }
    },
    [confirmCkMemList]
  );

  return (
    <div class="grid grid-cols-5 h-full min-h-screen">
      <div className="col-span-1 w-full h-full">
        <div class="bg-gray-800 dark:bg-gray-50 text-gray-50 dark:text-gray-800 rounded-r-lg w-full h-full ">
          <div class="font-test pt-5 w-full h-full xl:mr-6 2xl:pr-12 2xl:mr-12  pr-6 border-r-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 xl:pl-0 transition-transform duration-150 ease-in-out">
            <div class="mt-4 pl-6 2xl:pl-12">
              <p class="text-2xl font-bold leading-tight tracking-tight text-gray-600 dark:text-gray-400 capitalize">
                Team 델리만쥬
              </p>
              <div
                class="mt-10 cursor-pointer flex w-full justify-between pb-3 border-b-2 border-gray-200 dark:border-gray-800"
                onClick={() => {
                  setShowSubMenu(!showSubMenu);
                }}
              >
                <p class="text-sm xl:text-lg font-bold leading-tight tracking-tight text-gray-600 dark:text-gray-400 capitalize">
                  팀 관리
                </p>
                {showSubMenu ? (
                  <button
                    class="focus:outline-none text-gray-800"
                    onClick={() => {
                      setShowSubMenu(!showSubMenu);
                    }}
                  >
                    ∧
                  </button>
                ) : (
                  <button
                    class="focus:outline-none text-gray-800"
                    onClick={() => {
                      setShowSubMenu(!showSubMenu);
                    }}
                  >
                    ∨
                  </button>
                )}
              </div>
              <div class={showSubMenu ? null : "hidden"}>
                <div class="pl-2 block">
                  <div class="h-6"></div>
                  <button
                    class={
                      showNowClick1
                        ? "text-sm xl:text-lg font-bold leading-tight tracking-tight text-date  capitalize"
                        : "text-sm xl:text-lg font-medium leading-tight tracking-tight  text-gray-600 dark:text-gray-400 capitalize"
                    }
                    onClick={() => {
                      setShowNowClick1(true);
                      setShowNowClick2(false);
                      setShowNowClick3(false);
                      setShowNowClick4(false);
                      setShowNowClick5(false);
                      setShowNowClick6(false);
                      setShowNowClick7(false);
                      setShowNowClick8(false);
                      GetTeamInfo({
                        teamName: props.match.params.teamName,
                        setTeamInfo: setTeamInfo,
                      });
                    }}
                  >
                    팀 설정 관리
                  </button>
                </div>

                <div class="pl-2 block">
                  <div class="h-6"></div>
                  <button
                    class={
                      showNowClick2
                        ? "text-sm xl:text-lg font-bold leading-tight tracking-tight text-date capitalize"
                        : "text-sm xl:text-lg font-medium leading-tight tracking-tight text-gray-600 dark:text-gray-400 capitalize"
                    }
                    onClick={() => {
                      setShowNowClick1(false);
                      setShowNowClick2(true);
                      setShowNowClick3(false);
                      setShowNowClick4(false);
                      setShowNowClick5(false);
                      setShowNowClick6(false);
                      setShowNowClick7(false);
                      setShowNowClick8(false);
                      getTeamNoticeList({
                        teamName: props.match.params.teamName,
                        setNoticeLists: setNoticeLists,
                      });
                    }}
                  >
                    공지사항 관리
                  </button>
                </div>

                <div class="pl-2 block">
                  <div class="h-6"></div>
                  <button
                    class={
                      showNowClick3
                        ? "text-sm xl:text-lg font-bold leading-tight tracking-tight text-date  capitalize"
                        : "text-sm xl:text-lg font-medium leading-tight tracking-tight  text-gray-600  dark:text-gray-400 capitalize"
                    }
                    onClick={() => {
                      setShowNowClick1(false);
                      setShowNowClick2(false);
                      setShowNowClick3(true);
                      setShowNowClick4(false);
                      setShowNowClick5(false);
                      setShowNowClick6(false);
                      setShowNowClick7(false);
                      setShowNowClick8(false);
                    }}
                  >
                    깃허브 연동 관리
                  </button>
                </div>
                <div class="pl-2 block">
                  <div class="h-6"></div>
                  <button
                    class={
                      showNowClick4
                        ? "text-sm xl:text-lg font-bold leading-tight tracking-tight text-date  capitalize"
                        : "text-sm xl:text-lg font-medium leading-tight tracking-tight  text-gray-600 dark:text-gray-400 capitalize"
                    }
                    onClick={() => {
                      setShowNowClick1(false);
                      setShowNowClick2(false);
                      setShowNowClick3(false);
                      setShowNowClick4(true);
                      setShowNowClick5(false);
                      setShowNowClick6(false);
                      setShowNowClick7(false);
                      setShowNowClick8(false);
                      getAllDevelop({
                        setDevelopLists: setDevelopLists,
                        teamName: props.match.params.teamName,
                      });
                    }}
                  >
                    개발 분야 관리
                  </button>
                </div>
                {/* <div class="pl-2 block">
                  <div class="h-6"></div>
                  <button
                    class={
                      showNowClick5
                        ? "text-sm xl:text-lg font-bold leading-tight tracking-tight text-date"
                        : "text-sm xl:text-lg font-medium leading-tight tracking-tight text-gray-600 dark:text-gray-400 "
                    }
                    onClick={() => {
                      setShowNowClick1(false);
                      setShowNowClick2(false);
                      setShowNowClick3(false);
                      setShowNowClick4(false);
                      setShowNowClick5(true);
                      setShowNowClick6(false);
                      setShowNowClick7(false);
                      setShowNowClick8(false);
                    }}
                  >
                    서버 관리
                  </button>
                </div> */}
              </div>

              <div
                class="mt-10 cursor-pointer flex w-full justify-between pb-3 border-b-2 border-gray-200 dark:border-gray-800"
                onClick={() => {
                  setShowSubMenu2(!showSubMenu2);
                }}
              >
                <p class="text-sm xl:text-lg font-bold leading-tight tracking-tight text-gray-600 dark:text-gray-400 capitalize">
                  팀원 관리
                </p>
                {showSubMenu2 ? (
                  <button
                    class="focus:outline-none text-gray-800"
                    onClick={() => {
                      setShowSubMenu2(!showSubMenu2);
                    }}
                  >
                    ∧
                  </button>
                ) : (
                  <button
                    class="focus:outline-none text-gray-800"
                    onClick={() => {
                      setShowSubMenu2(!showSubMenu2);
                    }}
                  >
                    ∨
                  </button>
                )}
              </div>

              <div class={showSubMenu2 ? null : "hidden"}>
                <div class="pl-2 block">
                  <div class="h-6"></div>
                  <button
                    class={
                      showNowClick8
                        ? "text-sm xl:text-lg font-bold leading-tight tracking-tight text-date  capitalize"
                        : "text-sm xl:text-lg font-medium leading-tight tracking-tight  text-gray-600  dark:text-gray-400 capitalize"
                    }
                    onClick={() => {
                      setShowNowClick1(false);
                      setShowNowClick2(false);
                      setShowNowClick3(false);
                      setShowNowClick4(false);
                      setShowNowClick5(false);
                      setShowNowClick6(false);
                      setShowNowClick7(false);
                      setShowNowClick8(true);
                      GetAllTeamMember({
                        teamName: props.match.params.teamName,
                        setTeamMemberList: setTeamMemberList,
                      });
                    }}
                  >
                    팀원 목록
                  </button>
                </div>
                <div class="pl-2 block">
                  <div class="h-6"></div>
                  <button
                    class={
                      showNowClick6
                        ? "text-sm xl:text-lg font-bold leading-tight tracking-tight text-date  capitalize"
                        : "text-sm xl:text-lg font-medium leading-tight tracking-tight  text-gray-600  dark:text-gray-400 capitalize"
                    }
                    onClick={() => {
                      setShowNowClick1(false);
                      setShowNowClick2(false);
                      setShowNowClick3(false);
                      setShowNowClick4(false);
                      setShowNowClick5(false);
                      setShowNowClick6(true);
                      setShowNowClick7(false);
                      setShowNowClick8(false);
                      GetAllInviteTeamMember({
                        teamName: props.match.params.teamName,
                        setInviteTeamMember: setInviteTeamMember,
                      });
                    }}
                  >
                    팀원 초대
                  </button>
                </div>

                <div class="pl-2 block">
                  <div class="h-6"></div>
                  <button
                    class={
                      showNowClick7
                        ? "text-sm xl:text-lg font-bold leading-tight tracking-tight text-date  capitalize"
                        : "text-sm xl:text-lg font-medium leading-tight tracking-tight  text-gray-600  dark:text-gray-400 capitalize"
                    }
                    onClick={() => {
                      setShowNowClick1(false);
                      setShowNowClick2(false);
                      setShowNowClick3(false);
                      setShowNowClick4(false);
                      setShowNowClick5(false);
                      setShowNowClick6(false);
                      setShowNowClick7(true);
                      setShowNowClick8(false);
                      getAllDevelop({
                        setDevelopLists: setDevelopLists,
                        teamName: props.match.params.teamName,
                      });
                      GetAllTeamMember({
                        teamName: props.match.params.teamName,
                        setTeamMemberList: setTeamMemberList,
                      });
                    }}
                  >
                    팀원 역할 설정
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-4 w-full font-test">
        <div class="w-full h-full">
          {showNowClick1 ? (
            teamInfo == null ? null : (
              <div class="w-full h-full flex">
                <div class="w-1/12"></div>
                <div class="w-3/4 pt-5 mt-4 pl-10">
                  <p class="text-2xl font-bold leading-tight tracking-tight text-black dark:text-gray-400 capitalize">
                    팀 설정 관리
                  </p>
                  <div class="text-sm pt-2 pb-5 text-gray-400">팀의 기본 설정을 관리할 수 있어요.</div>
                  <hr></hr>
                  <div class="mt-4 pt-5 w-full">
                    <div class="p-2 bg-opacity-5 border-gray-100 rounded-t">
                      <div class="grid grid-cols-2 gap-6">
                        <div>
                          <label class="ml-6 mr-6 text-sm text-gray-400">대표 이미지</label>
                          <div class="pl-8 mt-4 md:mx-0">
                            <div class="items-center space-x-4 ">
                              <div class="flex w-full items-end ">
                                <div
                                  tabindex="0"
                                  aria-label="img"
                                  role="img"
                                  class="focus:outline-none w-40 h-40 p-16 bg-gray-100 rounded-md flex items-center justify-center"
                                >
                                  <svg
                                    width="36"
                                    height="36"
                                    viewBox="0 0 36 36"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M22.5 12H22.515"
                                      stroke="#94A3B8"
                                      stroke-width="2.25"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>
                                    <path
                                      d="M25.5 6H10.5C8.01472 6 6 8.01472 6 10.5V25.5C6 27.9853 8.01472 30 10.5 30H25.5C27.9853 30 30 27.9853 30 25.5V10.5C30 8.01472 27.9853 6 25.5 6Z"
                                      stroke="#94A3B8"
                                      stroke-width="2.25"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>
                                    <path
                                      d="M6 22.4999L12 16.4999C12.6841 15.8417 13.4601 15.4951 14.25 15.4951C15.0399 15.4951 15.8159 15.8417 16.5 16.4999L24 23.9999"
                                      stroke="#94A3B8"
                                      stroke-width="2.25"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>
                                    <path
                                      d="M21 20.9999L22.5 19.4999C23.1841 18.8417 23.9601 18.4951 24.75 18.4951C25.5399 18.4951 26.3159 18.8417 27 19.4999L30 22.4999"
                                      stroke="#94A3B8"
                                      stroke-width="2.25"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>
                                  </svg>
                                </div>
                                <div class="ml-2 text-sm text-gray-400 font-ltest">
                                  추천 사이즈: 200x200, 파일 최대 크기: 1MB
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="bg-white col-span-1">
                          <div class="font-test space-y-2 md:space-y-0 p-2 w-full text-gray-500 items-center">
                            <div class="ml-6 mr-6 ">
                              <div>
                                <label class="text-sm text-gray-400">팀 이름</label>
                                <div
                                  tabindex="0"
                                  class="col-span-1 block text-base bg-white w-full h-10 lg:h-12 mt-2 lg:mt-4 px-1 lg:px-6 rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white border rounded border-gray-400 py-2.5"
                                >
                                  <label class="text-sm text-gray-400">{teamInfo.teamName}</label>
                                </div>
                              </div>
                              <div class="mt-4">
                                <label class="text-sm text-gray-400">개발 언어</label>
                                <div
                                  tabindex="0"
                                  class="col-span-1 block text-base bg-white w-full h-10 lg:h-12 mt-2 lg:mt-4 px-1 lg:px-6 rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white border rounded border-gray-400 py-2.5"
                                >
                                  <label class="text-sm text-gray-400">{teamInfo.developType}</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="mt-4 font-test space-y-2 md:space-y-0 p-2 w-full text-gray-500 items-center">
                        <div class="ml-6 mr-6">
                          <label class=" text-sm text-gray-400">깃허브 연동 주소</label>
                          <div class="w-full px-4 mt-4 text-gray-400 bg-gray-50 block resize-none overflow-y-auto py-3 rounded-lg outline-none transition border border-gray-400">
                            {teamInfo.gitRepoUrl}
                          </div>
                        </div>
                      </div>
                      <div class="mt-4 font-test space-y-2 md:space-y-0 p-2 w-full text-gray-500 items-center">
                        <div class="ml-6 mr-6">
                          <label class=" text-sm text-gray-400">팀 설명</label>
                          <div class="w-full inline-flex">
                            <div class="w-full px-4 mt-4 text-gray-400 bg-white-50 block resize-none overflow-y-auto py-3 rounded-lg outline-none transition border border-gray-400">
                              <label>{teamInfo.teamDescription}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="font-test w-full p-6 text-right text-gray-500">
                        <button
                          class="text-red-400"
                          onClick={() => {
                            deleteTeam({
                              props,
                              teamName: props.match.params.teamName,
                            });
                          }}
                        >
                          팀 삭제하기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : null}
          {showNowClick2 === true && (
            <div class="w-full h-full flex">
              <div class="w-1/12"></div>
              <div class="w-3/4 pt-5 pl-10 mt-4">
                <p class="text-2xl font-bold leading-tight tracking-tight text-black dark:text-gray-400 capitalize">
                  공지사항 관리
                </p>
                <div class="text-sm pt-2 pb-5 text-gray-400">대시보드 상단에 띄워지는 공지사항을 관리할 수 있어요.</div>
                <hr></hr>
                <div class="font-bold mt-4 pt-5 text-gray-500 text-lg">공지 추가하기</div>
                <div class="font-test flex items-center px-6 space-x-2 lg:space-x-4 py-2 text-blueGray-500 leading-relaxed">
                  <input
                    placeholder="📢추가할 공지사항을 입력해주세요!"
                    class="block text-base w-full h-10 lg:h-12 mt-2 lg:mt-4 px-1 lg:px-6 rounded-lg outline-none transition border hover:border-primary-500 border-gray-400 focus:border-primary-500"
                    onChange={onNoticeTextHandler}
                  ></input>
                  <button
                    class="font-test w-1/3 float-right block text-white text-base bg-gray-400 h-10 lg:h-12 mt-2 lg:mt-4 px-4 lg:px-7 rounded-lg outline-none transition border hover:border-primary-500 border-gray-400 focus:border-primary-500"
                    onClick={() => {
                      AddTeamNotice({
                        noticeText: noticeText,
                        teamName: props.match.params.teamName,
                        props: props,
                      });
                    }}
                  >
                    추가
                  </button>
                </div>
                <div class="font-bold mt-7 mb-5 pt-5 text-gray-500 text-lg">로그 보기 (최대 5개까지 출력됩니다!)</div>
                {noticeLists.map((list) => {
                  return (
                    <div class="border-b border-dashed border-blueGray-200 my-5 grid grid-cols-5 w-full">
                      <div class="flex col-span-4 mx-5 py-3">
                        "{list.notice}"<div class="pt-1 ml-2 text-sm text-gray-500">라고 모두에게 알렸어요!</div>
                      </div>
                      <div class="py-3 col-span-1 float-right text-right pr-10 text-sm text-date text-opacity-70">
                        {list.date}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {showNowClick3 === true && (
            <div class="w-full h-full flex">
              <div class="w-1/12"></div>
              <div class="w-3/4 pt-5 pl-10 mt-4">
                <p class="text-2xl font-bold leading-tight tracking-tight text-black dark:text-gray-400 capitalize">
                  깃허브 연동 관리
                </p>
                <div class="text-sm pt-2 pb-5 text-gray-400">깃허브 연동 주소를 관리하는 페이지입니다.</div>
                <hr></hr>
                <div class="font-bold mt-4 pt-5 text-gray-500 text-lg pb-5 flex-grow">깃허브 연동 주소 변경하기</div>
                <div class="w-3/4">
                  <div class="ml-6 mr-6 my-5">
                    <label class=" text-sm text-gray-400">현재 깃허브 연동 주소</label>
                    <div class="w-full px-4 mt-4 text-gray-400 bg-gray-50 block resize-none overflow-y-auto py-3 rounded-lg outline-none transition border border-gray-400">
                      https://github.com/Hodu-BackSpace/SYNC-Software-Contest
                    </div>
                  </div>
                  <div class="ml-6 mr-6 my-5">
                    <label class=" text-sm text-gray-400">변경할 깃허브 연동 주소</label>
                    <select
                      aria-label="select an option"
                      class="w-full px-4 mt-4 text-gray-400 bg-white block resize-none overflow-y-auto py-3 rounded-lg outline-none transition border border-gray-400"
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
                  <div class="mt-7 mr-6 w-1/3 block mx-auto">
                    <button
                      class="font-test w-full text-white text-base bg-gray-400 h-10 lg:h-12 rounded-lg outline-none transition border hover:border-primary-500 border-gray-400 focus:border-primary-500"
                      onClick={() => {
                        onChangeGitRepoHandler();
                      }}
                    >
                      변경하기
                    </button>
                  </div>
                  {gitRepoChangeMes.show === true && (
                    <div class="mt-2 mr-6">
                      {gitRepoChangeMes.err ? (
                        <div>
                          <div class="text-red-500 font-ltest text-right">{gitRepoChangeMes.mes}</div>
                        </div>
                      ) : (
                        <div>
                          <div class="text-green-500 font-ltest text-right">{gitRepoChangeMes.mes}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {showNowClick4 === true && (
            <div class="w-full h-full flex">
              <div class="w-1/12"></div>
              <div class="w-3/4 pt-5 pl-10 mt-4">
                <p class="text-2xl font-bold leading-tight tracking-tight text-black dark:text-gray-400 capitalize">
                  개발 분야 관리
                </p>
                <div class="text-sm pt-2 pb-5 text-gray-400">
                  팀원의 개발 분야를 설정할 수 있어요. 이는 Progress와 연동됩니다.
                </div>
                <hr></hr>
                <div class="flex">
                  <div class="font-bold mt-4 pt-5 text-gray-500 text-lg pb-5 flex-grow">개발 분야 관리하기</div>
                </div>
                <div class=" grid grid-cols-3 mt-3">
                  {developLists.map((list) => {
                    return (
                      <div class="text-center my-8">
                        <div class="mx-auto my-auto rounded-full h-24 w-24 bg-gray-600 border-2 border-gray-600 border-dashed  px-2 py-2 text-center">
                          <button
                            class="relative bg-gray-200 w-6 h-6 rounded-full text-center ml-14 bottom-3"
                            value={list.field}
                            onClick={(e) => {
                              onDevdeleteHandler(e.currentTarget.value);
                            }}
                          >
                            -
                          </button>
                          <div class="h-auto relative align-middle px-2 font-test text-lg font-bold text-gray-100 text-center">
                            {list.field}
                          </div>
                        </div>
                        <div class="mt-5 text-sm font-test text-gray-500">
                          {/* {.map((person) => {
                            return (
                              <div class="my-2">
                                {person.name} ( {person.email} )
                              </div>
                            );
                          })} */}
                        </div>
                      </div>
                    );
                  })}
                  <div class="my-8">
                    {showInputDev ? (
                      <div class="mx-auto rounded-full h-24 w-24 bg-gray-50 justify-items-center border-2 border-gray-400 border-dashed place-content-center px-2 py-2">
                        <input
                          class="relative rounded-full w-full h-full font-test text-xl bg-gray-50 justify-items-center m-auto text-center 
                          text-base outline-none transition focus:bg-gray-50"
                          placeholder="입력"
                          onKeyPress={(e) => onKeyPress(e)}
                          onChange={(e) => setDevinput(e.currentTarget.value)}
                        ></input>
                      </div>
                    ) : (
                      <div class="mx-auto rounded-full h-24 w-24 bg-gray-50 justify-items-center border-2 border-gray-400 border-dashed place-content-center px-2 py-2">
                        <button
                          class="w-full h-full font-test text-3xl text-gray-500"
                          onClick={() => setShowInputDev(true)}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {showNowClick5 === true && (
            <div class="w-full h-full">
              <div class="pt-5 mt-4 pl-10">
                <p class="text-2xl font-bold leading-tight tracking-tight text-gray-600 dark:text-gray-400 capitalize">
                  서버 관리
                </p>
              </div>
            </div>
          )}
          {showNowClick6 === true && (
            <div class="w-full h-full flex">
              <div class="w-1/12"></div>
              <div class="w-3/4 pt-5 pl-10 mt-4">
                <p class="text-2xl font-bold leading-tight tracking-tight text-black dark:text-gray-400 capitalize">
                  팀원 초대
                </p>
                <div class="text-sm pt-2 pb-5 text-gray-400">
                  <p>새로운 팀원에게 초대 메일을 보냅니다.</p>
                </div>
                <hr />

                <div class="font-bold mt-4 pt-2 text-lg w-full">
                  <div class="">
                    <div class="grid grid-cols-4 gap-4">
                      <input
                        id="findMail"
                        placeholder="찾을 팀원의 이메일을 정확하게 입력해 주세요."
                        class="ml-10 text-sm block text-base col-span-3 h-10 lg:h-12  px-1 lg:px-6 outline-none transition border border-dashed hover:border-primary-500 border-gray-400 bg-white focus:border-primary-500"
                        onChange={onSearchEmailHandler}
                      ></input>
                      <button
                        class="float-right mr-10 font-test bg-gray-200 p-2 border border-dashed hover:border-primary-500 border-gray-400"
                        onClick={() => {
                          SearchMember({
                            email: searchEmail,
                            props: props,
                            setSearchUserResult,
                          });
                          document.getElementById("findMail").value = "";
                        }}
                      >
                        🔎
                      </button>
                    </div>
                    {searchUserResult == null ? null : searchUserResult == "해당 이메일을 가진 유저가 없습니다." ? (
                      <div class="ml-10 mt-5 text-sm font-base font-light">
                        검색 결과가 없습니다😥 검색어를 다시 확인해 주세요!
                      </div>
                    ) : (
                      <div>
                        <div class="grid grid-cols-7 ml-10 mr-10 mt-5 text-base font-base font-light">
                          <img
                            class="w-16 h-16 m-auto"
                            src="https://cdn.tuk.dev/assets/templates/olympus/projects(8).png"
                            alt="collaborator 1"
                          ></img>
                          <div class="col-span-5">
                            {" "}
                            {searchUserResult.memberName} ({searchUserResult.memberNickName})
                            <div> {searchUserResult.memberEmail}</div>
                            <div class="text-sm text-gray-500">
                              🎂{"  "}
                              {searchUserResult.memberBirth[0] +
                                "." +
                                searchUserResult.memberBirth[1] +
                                "." +
                                searchUserResult.memberBirth[2]}
                            </div>
                          </div>

                          <button
                            class="rounded-md text-sm border-2 border-gray-400 border-opacity-50"
                            onClick={() => {
                              InviteMemberToTeam({
                                teamName: props.match.params.teamName,
                                data: {
                                  memberEmail: searchUserResult.memberEmail,
                                },
                              });
                            }}
                          >
                            초대하기
                          </button>
                        </div>
                      </div>
                    )}
                    {
                      <div class="">
                        <div class="mt-8 mx-10 text-base font-normal font-test flex items-center bg-gray-50">
                          <div class="py-2 flex items-center font-test text-base w-full text-center">
                            <div class="flex-1 my-1">초대 목록 ({Object.keys(inviteTeamMember.content).length})</div>
                            <div class="flex-1 my-1">상태</div>
                          </div>
                        </div>

                        <div class="mt-2 mx-10">
                          {inviteTeamMember == null
                            ? null
                            : inviteTeamMember.content.map((member) => {
                                return (
                                  <div class="grid grid-cols-2">
                                    <div class="pb-2 text-center text-lg font-btest text-black text-gray-600">
                                      {member.memberName}
                                      <a class="text-sm font-ttest"> ({member.memberEmail})</a>
                                    </div>

                                    <div
                                      class={
                                        member.inviteStatus == "ACCEPT"
                                          ? "text-center font-light font-test text-lg text-green-600"
                                          : member.inviteStatus == "DENIED"
                                          ? "text-center font-light font-test text-lg text-red-600"
                                          : member.inviteStatus == "WAIT"
                                          ? "text-center font-light font-test text-lg text-yellow-600"
                                          : "text-center font-light font-test text-lg text-gray-600"
                                      }
                                    >
                                      {member.inviteStatus == "ACCEPT"
                                        ? "승인"
                                        : member.inviteStatus == "DENIED"
                                        ? "거절"
                                        : member.inviteStatus == "WAIT"
                                        ? "대기"
                                        : "불러오는 중..."}
                                    </div>
                                  </div>
                                );
                              })}
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
          {showNowClick7 === true && (
            <div class="w-full h-full flex">
              <div class="w-1/12"></div>
              <div class="w-3/4 pt-5 pl-10 mt-4">
                <p class="text-2xl font-bold leading-tight tracking-tight text-black dark:text-gray-400 capitalize">
                  팀원 역할 설정
                </p>
                <div class="text-sm pt-2 pb-5 text-gray-400">팀원들의 역할을 관리할 수 있어요.</div>
                <hr></hr>
                <div class="mt-4 pt-5">
                  <div class="font-bold text-gray-500 text-lg pb-5 flex-grow">팀원 역할 관리하기</div>

                  {teamMemberList.map((member) => {
                    return (
                      <div class="w-5/6 items-center my-10 ml-8">
                        <div class="grid grid-cols-3 w-full">
                          <div class="flex">
                            <img
                              class="w-12 h-12 rounded-full"
                              src="https://cdn.tuk.dev/assets/templates/olympus/projects(8).png"
                              alt="collaborator 1"
                            ></img>
                            <div class="ml-3">
                              <div class="text-lg font-btest text-black text-gray-500">{member.memberName}</div>
                              <div class="font-ttest text-sm text-gray-400">{member.memberEmail}</div>
                            </div>
                          </div>

                          {member.developField == null ? (
                            <div class="h-full">
                              <SelectedTrueMemberSetDevelopField
                                member={member}
                                developLists={developLists}
                                SetDevelopToMember={SetDevelopToMember}
                                teamMemberList={teamMemberList}
                                setMemberDevelopUpdate={setMemberDevelopUpdate}
                                props={props}
                              />
                            </div>
                          ) : (
                            <div>
                              <div class="grid mx-auto rounded-lg w-2/3 h-full border px-5">
                                <div class="flex ">
                                  <div class="absoulte my-auto ml-3 font-ltest text-opacity-70 text-center"></div>
                                  <div className="mx-auto my-auto font-sbtest text-date text-opacity-70 text-center">
                                    {member.developField}
                                  </div>
                                  <button
                                    class="absoulte text-date my-auto font-ltest text-opacity-70 text-center "
                                    onClick={() => {
                                      ondeleteDevHandler(member.memberEmail);
                                    }}
                                  >
                                    x
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {member.teamAuthority == "ROLE_PARENT" ? (
                            <div class="my-auto mx-auto h-3/4 grid rounded-full w-1/4 border border-red-300">
                              <div class="my-auto mx-auto">
                                <div class="font-sbtest text-red-400 text-opacity-70 text-center">팀장</div>
                              </div>
                            </div>
                          ) : (
                            <div class="my-auto mx-auto grid h-3/4 rounded-full w-1/4 border border-green-300">
                              <div class="my-auto mx-auto">
                                <div class="font-sbtest text-green-400 text-opacity-70 text-center">팀원</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {showNowClick8 === true && (
            <div class="w-full h-full flex">
              <div class="w-1/12"></div>
              <div class="w-3/4 pt-5 pl-10 mt-4">
                <p class="text-2xl font-bold leading-tight tracking-tight text-black dark:text-gray-400 capitalize">
                  팀원 관리
                </p>
                <div class="text-sm pt-2 pb-5 text-gray-400">팀원을 추방할 수 있는 페이지입니다.</div>
                <hr></hr>

                <div class="flex items-center">
                  <div class="flex-1 text-sm font-test my-5">참여 중인 멤버 ({teamMemberList.length})</div>
                  <div class="flex-1 text-right">
                    <button
                      class="rounded-md text-sm border-2 border-gray-400 border-opacity-50 px-4 py-1"
                      onClick={() => {
                        setShowDeleteMem(true);
                      }}
                    >
                      팀원 추방
                    </button>
                  </div>
                </div>
                <div class="flex items-center bg-gray-50">
                  <div class="flex items-center font-test text-base w-full text-gray-500">
                    <input
                      class="ml-3 my-1"
                      type="checkbox"
                      onChange={(e) => selectAllMember(e.target.checked)}
                      checked={
                        confirmCkMemList.length === 0
                          ? false
                          : confirmCkMemList.length === teamMemberList.length
                          ? true
                          : false
                      }
                    ></input>
                    <div class="flex-1 ml-5 my-1 py-2">멤버</div>
                    <div class="flex-1 my-1">역할</div>
                    <div class="text-center flex-1 my-1 my-auto mx-auto h-3/4 w-1/4 pl-2">권한</div>
                  </div>
                </div>

                <div class="items-center">
                  <div class="font-test text-base w-full text-gray-500">
                    {teamMemberList.map((member, idx) => {
                      return <TeamMemberListFunction member={member} idx={idx} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {showDeleteMem ? (
            <div class="bg-black bg-opacity-25 justify-center w-full items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div class="relative w-1/3 my-5 mx-auto max-w-3xl">
                {/*content*/}
                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div class="flex items-start justify-between px-6 py-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 class="text-xl font-sbtest text-center py-1">팀원 추방하기</h3>
                    <button
                      className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowDeleteMem(false)}
                    >
                      <span className="bg-transparent text-black text-opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        x
                      </span>
                    </button>
                  </div>

                  <div class="relative w-full mx-auto max-w-3xl">
                    <div class="pt-4 ml-4 font-test">✔총 {deleteMemList.length}명을 선택하였습니다.</div>
                    <div class="ml-4 font-test">
                      선택한 멤버는
                      {deleteMemList.map((member) => {
                        return <a> {member} 님</a>;
                      })}
                      입니다.
                    </div>
                    <div class="pt-2 ml-4 font-test">
                      {sample_member.forEach(function (member) {
                        deleteMemIdList.forEach(function (memId) {
                          if (member.id == memId) {
                            checkDelMemList.push(member);
                          }
                        });
                      })}
                      {checkDelMemList.map((member) => {
                        return (
                          <div class="flex-1 ml-5 my-1 flex pt-3">
                            <img
                              class="w-10 h-10 rounded-full"
                              src="https://cdn.tuk.dev/assets/templates/olympus/projects(8).png"
                              alt="collaborator 1"
                            ></img>
                            <div class="ml-2">
                              <div class="text-base font-btest text-black text-gray-600">
                                {member.username} ({member.email})
                              </div>
                              <div class="font-ltest text-sm text-gray-500">역할: {member.role}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div class="ml-4 pt-6 font-test">정말로 삭제하시겠습니까?</div>
                    <div class="px-4 py-4 grid grid-cols-2 gap-4">
                      <button class="grow py-4 bg-red-200 rounded-lg " onClick={() => removeMemHandler()}>
                        네, 삭제할게요!
                      </button>

                      <button class="px-4 grow py-4 bg-gray-200 rounded-lg " onClick={() => setShowDeleteMem(false)}>
                        아뇨, 다시 생각해볼게요😥
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ManageTeam;
