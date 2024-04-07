import React, { useEffect } from "react";
import queryString from "query-string";
import axios from "axios";
import { SERVER_URL } from "../SRC";
import { getCookie, deleteCookie, setCookie } from "../cookie";
import { getMemberInfoOauth } from "../ApiConfig";

function KakaoOauth(props) {
  const queryObj = queryString.parse(props.location.search);
  const { code } = queryObj;

  useEffect(() => {
    axios
      .get(SERVER_URL + "/api/v1/oauth2/kakao?code=" + code)
      .then((res) => {
        setCookie("token", "Bearer " + res.data.accessToken, {
          path: "/",
          secure: true,
          sameSite: "none",
        });

        getMemberInfoOauth({ props });
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

export default KakaoOauth;
