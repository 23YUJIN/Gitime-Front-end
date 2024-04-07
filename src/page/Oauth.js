import React from "react";
import { useEffect } from "react";
import queryString from "query-string";
import axios from "axios";
import { SERVER_URL } from "../SRC";
import { getCookie, deleteCookie, setCookie } from "../cookie";

function Oauth(props) {
  const queryObj = queryString.parse(props.location.search);
  const { code } = queryObj;

  useEffect(() => {
    axios
      .get(SERVER_URL + "/api/v1/sync/github?code=" + code, {
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie("token"),
        },
      })
      .then((res) => {
        props.history.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="loading-container">
      <div className="loading"></div>
      <div id="loading-text">loading</div>
    </div>
  );
}

export default Oauth;
