import axios from "axios";
import { getCookie, deleteCookie, setCookie } from "../../cookie";
import { SERVER_URL } from "../../SRC";

export const GetUpcoming = async ({ setUpcoming, teamName }) => {
  await axios
    .get(SERVER_URL + "/api/v1/notification/" + teamName + "/list/upcoming", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      setUpcoming(res.data.data);
    })
    .catch((err) => {
      if (err.response) {
      }
    });
};

export const GetServerStatus = async ({ setServerStatus, teamName }) => {
  await axios
    .get(SERVER_URL + "/api/v1/dashboard/" + teamName + "/endpoint", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      setServerStatus(res.data.data[0]);
    })
    .catch((err) => {
      if (err.response) {
      }
    });
};

export const GetRecentActivity = async ({ setRecentActivity, teamName }) => {
  await axios
    .get(SERVER_URL + "/api/v1/notification/" + teamName + "/list/recent", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      setRecentActivity(res.data.data);
    })
    .catch((err) => {
      if (err.response) {
      }
    });
};

export const PostCreateTodo = async ({
  teamName,
  item,
  setUpdateTodo,
  setUpdateView,
}) => {
  await axios
    .post(SERVER_URL + "/api/v1/dashboard/" + teamName + "/todo/add", item, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      setUpdateTodo(true);
      setUpdateView(true);
    })
    .catch((err) => {
      if (err.response) {
      }
    });
};

export const PostFinishTodo = async ({
  teamName,
  item,
  setUpdateTodo,
  setUpdateView,
}) => {
  await axios
    .post(SERVER_URL + "/api/v1/dashboard/" + teamName + "/todo/modify", item, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      setUpdateTodo(true);
      setUpdateView(true);
    })
    .catch((err) => {
      if (err.response) {
      }
    });
};

export const GetDevelopProgressResult = async ({
  teamName,
  setDevelopProgress,
  handlerWee,
}) => {
  await axios
    .get(SERVER_URL + "/api/v1/dashboard/" + teamName + "/progress", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      setDevelopProgress(res.data.data[0]);
    })
    .catch((err) => {
      if (err.response) {
      }
    });
};

export const GetTodoList = async ({ setTodoList, teamName, setUpdateTodo }) => {
  await axios
    .get(SERVER_URL + "/api/v1/dashboard/" + teamName + "/todo", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      setTodoList(res.data.data);
      setUpdateTodo(false);
    })
    .catch((err) => {
      if (err.response) {
      }
    });
};

export const PostCreateTeam = async ({ data, props }) => {
  await axios
    .post(SERVER_URL + "/api/v1/teams/add", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      props.setShowCreateTeamForm(false);
      window.location.href = "http://localhost:3000/team";
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
