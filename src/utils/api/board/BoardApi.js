import axios from "axios";
import { getCookie, deleteCookie, setCookie } from "../../cookie";
import { SERVER_URL } from "../../SRC";

export const GetBoardList = async ({ setBoardList, teamName, page }) => {
  await axios
    .get(
      SERVER_URL +
        "/api/v1/dashboard/board/" +
        teamName +
        "/list?page=" +
        (page - 1),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie("token"),
        },
      }
    )
    .then((res) => {
      setBoardList(res.data.data[0]);
    })
    .catch((err) => {
      if (err.response) {
      }
    });
};

export const GetBoardDetail = async ({
  setBoardDetail,
  teamName,
  boardId,
  setBoardTmp,
}) => {
  await axios
    .get(SERVER_URL + "/api/v1/dashboard/board/" + teamName + "/" + boardId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      setBoardDetail(res.data.data[0]);
      setBoardTmp(true);
    })
    .catch((err) => {
      if (err.response) {
      }
    });
};

export const PostWriteBoard = async ({
  data,
  teamName,
  setWriting,
  setUpdateView,
}) => {
  await axios
    .post(SERVER_URL + "/api/v1/dashboard/board/" + teamName + "/write", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      setWriting(false);
      setUpdateView(true);
      // 성공
    })
    .catch((err) => {
      // 실패
      if (err.response) {
      }
    });
};

export const PostWriteCommentToBoard = async ({
  data,
  teamName,
  boardId,
  setBoardDetail,
  setBoardTmp,
}) => {
  await axios
    .post(
      SERVER_URL +
        "/api/v1/dashboard/board/" +
        teamName +
        "/" +
        boardId +
        "/comment",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie("token"),
        },
      }
    )
    .then((res) => {
      GetBoardDetail({
        teamName: teamName,
        setBoardDetail: setBoardDetail,
        setBoardTmp: setBoardTmp,
        boardId: boardId,
      });
      // 성공
    })
    .catch((err) => {
      // 실패
      if (err.response) {
      }
    });
};

export const GetTeamNotice = async ({ setNotice, teamName }) => {
  await axios
    .get(SERVER_URL + "/api/v1/teams/" + teamName + "/notice", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      setNotice(res.data.data[0].notice);
    })
    .catch((err) => {
      if (err.response) {
      }
    });
};
