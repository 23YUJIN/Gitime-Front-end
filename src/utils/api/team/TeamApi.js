import axios from "axios";
import { getCookie, deleteCookie, setCookie } from "../../cookie";
import { SERVER_URL } from "../../SRC";

export const GetAcceptCode = async ({ acceptCode, setErrorAcceptCode, setCompleteAcceptCode, setUpdate }) => {
  await axios
    .get(SERVER_URL + "/api/v1/members/invite/accept/" + acceptCode, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      setCompleteAcceptCode(true);
      setUpdate(true);
    })
    .catch((err) => {
      setErrorAcceptCode(true);

      if (err.response) {
        console.log(err.response);
      }
    });
};

export const GetTeamList = async ({ setTeamList, page, setTeamAdditionalInfo }) => {
  await axios
    .get(SERVER_URL + "/api/v1/teams?page=" + page, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      setTeamAdditionalInfo(res.data.data[0].maps);
      setTeamList(res.data.data[0].pages);
    })
    .catch((err) => {
      if (err.response) {
      }
    });
};

export const GetGitRepoList = async ({ setGitRepos }) => {
  await axios
    .get(SERVER_URL + "/api/v1/teams/add", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      setGitRepos(res.data.data);
    })
    .catch((err) => {
      if (err.response) {
      }
    });
};

export const PostCreateTeam = async ({ data, setShowCreateTeamForm, setUpdate }) => {
  await axios
    .post(SERVER_URL + "/api/v1/teams/add", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      setUpdate(true);
      setShowCreateTeamForm(false);
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
