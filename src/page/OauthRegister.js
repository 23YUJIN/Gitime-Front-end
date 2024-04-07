import { React, useState } from "react";
import axios from "axios";
import "../assets/styles/Register.css";
import { SERVER_URL } from "../utils/SRC";
import { getCookie, deleteCookie, setCookie } from "../utils/cookie";

function postRegister({ data, props }) {
  axios
    .post(SERVER_URL + "/api/v1/auth/join/oauth", data, {
      headers: {
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {
      props.history.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
}

function OauthRegister(props) {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [birth2, setBirth2] = useState("");
  const [birth3, setBirth3] = useState("");
  const [ranNum, setRanNum] = useState("");
  const [certi, setCerti] = useState("");
  const [smsCheck, setSmsCheck] = useState(false);
  const Swal = require("sweetalert2");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onPhoneHandler = (event) => {
    setPhone(event.currentTarget.value);
  };

  const onBirthHandler = (event) => {
    setBirth(event.currentTarget.value);
  };

  const onBirthHandler2 = (event) => {
    setBirth2(event.currentTarget.value);
  };

  const onBirthHandler3 = (event) => {
    setBirth3(event.currentTarget.value);
  };

  const onCertiHandler = (event) => {
    setCerti(event.currentTarget.value);
  };

  const genRanNum = () => {
    var randNum = Math.floor(Math.random() * 9000) + 1000;
    setRanNum(randNum); // 비동기임
    return randNum;
  };

  const checkCerti = () => {
    if (ranNum !== "" && ranNum === certi) {
      setSmsCheck(true);
      Swal.fire({
        title: "O",
        text: "인증 번호가 맞았어요!",
        confirmButtonText: "👍",
        confirmButtonColor: "#171717",
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    } else {
      Swal.fire({
        title: "X",
        text: "인증 번호가 틀렸어요.",
        confirmButtonText: "🤣",
        confirmButtonColor: "#171717",
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    }
  };

  const sendSmsCheck = (props) => {
    axios
      .post(SERVER_URL + "/api/v1/auth/sms", {
        code: props,
        num: phone,
      })
      .then((res) => {
        Swal.fire({
          title: "!",
          text: "인증 번호를 전송하였습니다.",
          confirmButtonText: "😎",
          confirmButtonColor: "#171717",
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "X",
          text: "인증 번호 전송을 실패하였습니다. 다시 시도해주세요.",
          confirmButtonText: "😑",
          confirmButtonColor: "#171717",
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      });
  };

  return (
    <div class="font-test bg-cover min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
      <div class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <div>
          <h3 class="font-bold text-2xl">반가워요👋 Gitime에 오신 걸 환영해요!</h3>
          <p class="text-gray-600 pt-2">추가 정보를 입력해주세요!</p>
        </div>
        <div class="mt-10">
          <div class="flex flex-col" method="POST" action="#">
            <div class="block text-gray-700 text-sm font-bold mb-2 ml-3">이름</div>
            <div class="mb-6 pt-3 rounded bg-gray-200">
              <input
                type="text"
                id="name"
                value={name}
                onChange={onNameHandler}
                class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-gray-600 transition duration-500 px-3 pb-3"
              />
            </div>

            <div class="block text-gray-700 text-sm font-bold mb-2 ml-3">닉네임</div>
            <div class="mb-6 pt-3 rounded bg-gray-200">
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={onNicknameHandler}
                class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-gray-600 transition duration-500 px-3 pb-3"
              />
            </div>

            <div class="block text-gray-700 text-sm font-bold mb-2 ml-3">핸드폰</div>

            <div class="grid grid-cols-4 gap-2">
              <div class="col-span-3 pt-3 rounded bg-gray-200">
                <input
                  type="number"
                  id="phone"
                  value={phone}
                  onChange={onPhoneHandler}
                  class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-gray-600 transition duration-500 px-3 pb-3"
                />
              </div>

              <button
                class="bg-gray-400 rounded w-full text-xs text-white"
                value={ranNum}
                onClick={() => {
                  var num = genRanNum();
                  sendSmsCheck(num);
                }}
              >
                인증번호 받기
              </button>
            </div>
            <div class="mt-3 grid grid-cols-4 gap-2">
              <div class="col-span-3 pt-3 rounded bg-gray-200">
                <input
                  placeholder="인증번호를 입력해 주세요."
                  type="number"
                  id="verify"
                  class="placeholder-gray-500 placeholder-opacity-50 
                    bg-gray-200 rounded w-full text-gray-700 focus:outline-none 
                    border-b-4 border-gray-300 focus:border-gray-600 transition 
                    duration-500 px-3 pb-3"
                  onChange={onCertiHandler}
                />
              </div>

              <button
                class="bg-gray-400 rounded w-full text-xs text-white"
                onClick={() => {
                  checkCerti();
                }}
              >
                확인
              </button>
            </div>
            <div class="block text-gray-700 text-sm font-bold mt-5 mb-2 ml-3">생일</div>
            <div class="grid grid-cols-3 gap-2">
              <div class="mb-6 pt-3 rounded bg-gray-200">
                <input
                  placeholder="년도"
                  type="number"
                  id="birth1"
                  value={birth}
                  onChange={onBirthHandler}
                  class="placeholder-gray-500 placeholder-opacity-50 
                    bg-gray-200 rounded w-full text-gray-700 focus:outline-none 
                    border-b-4 border-gray-300 focus:border-gray-600 transition 
                    duration-500 px-3 pb-3"
                />
              </div>
              <div class="mb-6 rounded bg-gray-200">
                <select class="pl-2 w-full h-full bg-gray-200" id="birth2" value={birth2} onChange={onBirthHandler2}>
                  <option value="">월</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>

              <div class="mb-6 rounded bg-gray-200">
                <select class="pl-2 w-full h-full bg-gray-200" id="birth3" value={birth3} onChange={onBirthHandler3}>
                  <option value="">일</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
              </div>
            </div>
            <button
              class="mt-3 py-4 bg-black hover:bg-gray-300 text-white font-medium py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              onClick={() => {
                const data = {
                  userName: name,
                  nickName: nickname,
                  phoneNumber: phone,
                  birth: birth + birth2 + birth3,
                };

                if (smsCheck) {
                  postRegister({ data, props });
                } else {
                  Swal.fire({
                    title: "!!!",
                    text: "인증번호를 확인을 완료해주세요.",
                    confirmButtonText: "😉",
                    confirmButtonColor: "#171717",
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener("mouseenter", Swal.stopTimer);
                      toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                  });
                }
              }}
            >
              가입하기
            </button>
          </div>
        </div>
      </div>

      <div class="max-w-lg mx-auto text-center mt-8 mb-3">
        <p class="text-black">
          이미 계정을 가지고 있나요?{" "}
          <button
            onClick={() => {
              props.history.push("/login");
            }}
            class="font-bold hover:underline"
          >
            로그인
          </button>
          하세요.
        </p>
      </div>
      <div class="max-w-lg mx-auto flex justify-center text-black">
        <p class="hover:underline">Contact</p>
        <span class="mx-3">•</span>
        <p class="hover:underline">Privacy</p>
      </div>
    </div>
  );
}

export default OauthRegister;
