import { React, useState } from "react";
import "../assets/styles/Login.css";
import axios from "axios";
import { SERVER_URL } from "../utils/SRC";
import { getCookie, deleteCookie, setCookie } from "../utils/cookie";
import "animate.css";

const postLogin = async ({ props, data, setSync, setLoginError, setUpdate }) => {
  await axios
    .post(SERVER_URL + "/api/v1/auth/login", data)
    .then((res) => {
      setCookie("token", "Bearer " + res.data.accessToken, {
        path: "/",
        expires: 0,
      });
      setLoginError(false);
      getMembers({ props, setSync, setUpdate }); // 깃과 연동 됐는지 확인
    })
    .catch((err) => {
      setLoginError(true);
      if (err.response) {
        console.log(err.response.data); // => the response payload 오 굿굿
      }
    });
};

const getMembers = async ({ props, setSync, setUpdate }) => {
  await axios
    .get(SERVER_URL + "/api/v1/members", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      if (res.data.data[0].sync) {
        props.history.push("/team");
      } else {
        setSync(true);
        // 연동이 안되어있따면
        // 알러트 발생 후
        // 깃허브 연동페이지로 이동
      }
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data); // => the response payload 오 굿굿
      }
    });
};

function Login({ props, update, setUpdate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sync, setSync] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <div class="font-test bg-white bg-cover min-h-screen pt-12 md:pt-10 pb-6 px-2 md:px-0">
      {sync ? (
        <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div class="animate__animated animate__slideInUp inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {" "}
                    <svg
                      class="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      깃허브 연동이 필요합니다!
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">Gitime를 이용하시려면 '연동' 버튼을 눌러 주세요.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() =>
                    (window.location.href =
                      "https://github.com/login/oauth/authorize?client_id=a76250c81934f034f0d9&redirect_uri=http://localhost:3000/auth/github&scope=user&scope=repo")
                  }
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-bg1 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  연동
                </button>
                <button
                  type="button"
                  onClick={() => setSync(false)}
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div class="bg-white max-w-lg mx-auto p-8 md:p-8 my-10 rounded-lg shadow-2xl">
        <div>
          <h3 class="font-bold text-2xl">다시 만나서 반가워요👋</h3>
          <p class="text-gray-600 pt-2">로그인으로 Gitime와 함께하세요!</p>
        </div>

        <div class="mt-10">
          <div class="flex flex-col" method="POST" action="#">
            <div class="pt-3 rounded bg-gray-200">
              <div class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">
                이메일
              </div>
              <input
                type="text"
                id="email"
                value={email}
                onChange={onEmailHandler}
                class="bg-gray-200 rounded w-full text-gray-700 
                            focus:outline-none border-b-4 border-gray-300 focus:border-gray-600 
                            transition duration-500 px-3 pb-3"
              />
            </div>
            {emailError ? (
              <div class="font-bold text-red-500 text-sm font-ltest mt-1 mb-2 ml-1">이메일을 입력해 주세요.</div>
            ) : (
              <div class="mt-6"></div>
            )}
            <div class="pt-3 rounded bg-gray-200">
              <div class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">
                비밀번호
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={onPasswordHandler}
                class="bg-gray-200 rounded w-full text-gray-700
                            focus:outline-none border-b-4 border-gray-300 focus:border-gray-600
                            transition duration-500 px-3 pb-3"
              />
            </div>
            {pwdError ? (
              <div class="font-bold text-red-500 text-sm font-ltest mt-1 mb-2 ml-1">패스워드를 입력해 주세요.</div>
            ) : null}
            {emailError ? null : pwdError ? null : loginError ? (
              <div class="font-bold text-red-500 text-sm font-ltest mt-1 mb-3 ml-1">
                로그인에 실패하였습니다. 이메일이나 패스워드를 다시 확인해 주세요.
              </div>
            ) : (
              <div class="mt-6"></div>
            )}

            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css"></link>
            <div class="mx-auto w-1/2 pt-1 grid grid-cols-3">
              <button
                onClick={() => {
                  const data = {
                    email: email,
                    password: password,
                  };
                  if (email.length === 0) {
                    setEmailError(true);
                  } else {
                    setEmailError(false);
                  }
                  if (password.length === 0) {
                    setPwdError(true);
                  } else {
                    setPwdError(false);
                  }

                  postLogin({ props, data, setSync, setLoginError, setUpdate });
                }}
                class="mb-5 col-span-3 bg-black hover:bg-gray-400 text-white font-medium py-3 rounded shadow-lg hover:shadow-xl transition duration-200"
              >
                로그인
              </button>

              <button
                class="bg-google btn-social-login"
                onClick={() => {
                  window.location.href =
                    "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=http://localhost:3000/auth/google&client_id=24431269995-frdl56nvoapdtd0o6g9e8cpej6ha91jq.apps.googleusercontent.com";
                }}
              >
                <i class="xi-2x xi-google"></i>
              </button>
              <button class="bg-naver btn-social-login">
                <i class="xi-2x xi-naver"></i>
              </button>
              <button
                class="bg-kakao btn-social-login"
                onClick={() => {
                  window.location.href =
                    "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=d99c7a950fbb6caceb7739f996f3ca02&redirect_uri=http://localhost:3000/auth/kakao";
                }}
              >
                <i class="xi-2x xi-kakaotalk text-dark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-lg mx-auto text-center mt-8 mb-3">
        <p class="text-black">
          계정이 없다면?{" "}
          <button
            onClick={() => {
              props.history.push("/register");
            }}
            class="font-bold hover:underline"
          >
            회원가입
          </button>
          .
        </p>
      </div>
      <div class="max-w-lg mx-auto flex justify-center text-black">
        <a href="#" class="hover:underline">
          Contact
        </a>
        <span class="mx-3">•</span>
        <a href="#" class="hover:underline">
          Privacy
        </a>
      </div>
    </div>
  );
}

export default Login;
