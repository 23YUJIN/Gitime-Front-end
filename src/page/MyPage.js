import axios from "axios";
import React, { useState, useEffect } from "react";
import { getCookie, deleteCookie, setCookie } from "../utils/cookie";
import { SERVER_URL } from "../utils/SRC";
import { getMemberInfo } from "../utils/ApiConfig";
const onImgChange = async (event) => {
  const formData = new FormData();
  formData.append("imageFile", event.target.files[0]);
  await axios
    .post(SERVER_URL + "/api/v1/members/profile-img", formData, {
      headers: {
        Authorization: getCookie("token"),
      },
    })
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};

function MyPage() {
  const [memberImg, setMemberImg] = useState(null); //파일

  useEffect(() => {
    getMemberInfo({ setMemberImg });
  });

  return (
    <section class="pt-10 pb-10 bg-white-100  bg-opacity-50">
      <div class="mx-auto container max-w-2xl md:w-3/4 shadow-md">
        <div class="p-4 border-t-2 bg-opacity-5 border-gray-100 rounded-t">
          <div class="max-w-sm mx-auto md:w-full md:mx-0">
            <div class="inline-flex items-center space-x-4">
              <img
                class="w-24 h-24 object-cover rounded-full mr-3"
                alt="User avatar"
                src={SERVER_URL + "/api/v1/files/images/" + memberImg}
              />

              <div class="flex flex-col w-full">
                <input
                  class="mb-3 pb-2 px-2 py-2 font-test text-sm text-gray-500 w-1/2 max-w-sm rounded-md text-center border border-gray-400 "
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  enctype="multipart/form-data"
                  onChange={onImgChange}
                ></input>

                <div class="text-sm text-gray-600 font-ltest">추천 사이즈: 200x200, 파일 최대 크기: 1MB</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white">
          <div class="font-test space-y-2 md:space-y-0 w-full p-2 text-gray-500 items-center">
            <div class="ml-6 mr-6">
              <label class=" text-sm text-gray-400">아이디(이메일)</label>
              <div class="mt-2 w-full inline-flex border">
                <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                  <svg fill="none" class="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="email@example.com"
                  disabled
                />
              </div>
            </div>
          </div>

          <div class="font-test space-y-2 md:space-y-0 p-2 w-full text-gray-500 items-center">
            <div class="ml-6 mr-6">
              <label class=" text-sm text-gray-400">이름(실명)</label>
              <div class="mt-2 w-full inline-flex border">
                <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                  <svg fill="none" class="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="name"
                  class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="이름"
                  disabled
                />
              </div>
            </div>
          </div>

          <div class="font-test space-y-2 md:space-y-0 w-full p-2 text-gray-500 items-center">
            <div class="ml-6 mr-6">
              <label class=" text-sm text-gray-400">닉네임</label>
              <div class="mt-2 w-full inline-flex border">
                <input
                  type="nickname"
                  class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="닉네임"
                />
              </div>
            </div>
          </div>

          <div class="font-test space-y-2 md:space-y-0 w-full p-2 text-gray-500 items-center">
            <div class="ml-6 mr-6">
              <label class=" text-sm text-gray-400">생일</label>
              <div class="mt-2 w-full inline-flex border">
                <input
                  type="birth"
                  class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="xxxx/xx/xx"
                />
              </div>
            </div>
          </div>

          <div class="font-test space-y-2 md:space-y-0 w-full p-2 text-gray-500 items-center">
            <div class="ml-6">
              <label class=" text-sm text-gray-400">핸드폰</label>

              <div class="flex">
                <div class="mt-2 w-full inline-flex border">
                  <input
                    type="phone"
                    class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="010-xxxx-xxxx"
                  />
                </div>
                <button class="mr-6 w-1/2 text-center mt-2 ml-10 font-test text-gray-500 border border-gray-200 mrounded-sm mx-auto max-w-sm text-center bg-gray-100 py-1 px-2 items-center focus:outline-none md:float-right">
                  인증번호 받기
                </button>
              </div>
            </div>
          </div>

          <div class="font-test  md:space-y-0 w-full p-2 text-gray-500 items-center">
            <div class="ml-6">
              <label class=" text-sm text-gray-400"></label>

              <div class="flex">
                <div class="mt-2 w-full inline-flex border">
                  <input
                    type="phone"
                    class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="인증번호 입력"
                  />
                </div>
                <button class="mr-6 w-1/2 text-center mt-2 ml-10 font-test text-gray-500 border border-gray-200 mrounded-sm mx-auto max-w-sm text-center bg-gray-100 py-1 px-2 items-center focus:outline-none">
                  확인
                </button>
              </div>
            </div>
          </div>

          <div class="font-test space-y-2 md:space-y-0 w-full p-2 text-gray-500 items-center">
            <div class="ml-6">
              <label class="text-sm text-gray-400">비밀번호 변경 </label>

              <div class="flex flex-row">
                <div class="mt-2 w-full inline-flex border">
                  <div class="mr-2 pt-2 w-2/12 bg-gray-100 bg-opacity-50">
                    <svg fill="none" class="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="password"
                  />
                </div>
                <button class="w-1/2 mr-6 text-center mt-2 ml-10 font-test text-gray-500 border border-gray-200 mrounded-sm mx-auto max-w-sm text-center bg-gray-100 py-1 px-2 items-center focus:outline-none md:float-right">
                  확인
                </button>
              </div>
            </div>
          </div>
          <div class="mb-3 font-test space-y-2 md:space-y-0 w-full p-2 text-gray-500 items-center">
            <div class="ml-6 mr-6">
              <label class=" text-sm text-gray-400">깃 연동</label>
              <div class="mt-2 w-full inline-flex border">
                <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                  <svg fill="none" class="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="마지막 깃 연동 시간"
                  disabled
                />
              </div>
            </div>
          </div>

          <hr />

          <hr />
          <div class="border-b-2 font-test w-full p-4 text-right text-gray-500">
            <button class="font-test  text-red-500 inline-flex items-center focus:outline-none mr-4">
              <svg fill="none" class="w-4 mr-2" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyPage;
