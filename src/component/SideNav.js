import React, { useState, useEffect } from "react";

export const Upcoming = (props) => {
  const { dataLists, upcoming } = props;
  return (
    <div className="font-sbtest mx-5">
      <div>
        <p class="text-lg">Upcoming!</p>
        <div className="mt-4 gap-2 ">
          {Object.keys(upcoming).length == 0 ? (
            <div class="text-sm font-test text-gray-500">
              아직 해야 할 일이 없어요.😂
              <div>이곳에는 오늘까지 마감인 할 일과</div>
              <div>정기 회의 시간 등이 보여져요!</div>
              {
                <div className="grid grid-cols-5 my-2 gap-2 2xl:gap-1">
                  <div class="col-span-4 text-base mx-1 font-rtest text-gray-600">
                    <p>{""}</p>
                    <p class="text-xs font-ltest text-gray-400">{""}</p>
                  </div>
                </div>
              }
            </div>
          ) : (
            upcoming.map((item) => {
              return (
                <div className="grid grid-cols-5 my-2 gap-2 2xl:gap-1">
                  <div class="grid rounded-lg xl:rounded-large bg-yellow-300 justify-items-center place-content-center px-2 py-2 2xl:mx-1">
                    <div class="text-red-200">
                      <img src="https://svgsilh.com/svg/558009-ff9800.svg" alt="alert" />
                    </div>
                  </div>
                  <div class="gap-1 font-test col-span-4 text-base mx-1 font-rtest text-gray-600">
                    <p class="text-sm">
                      {item.notificationType == "TODO"
                        ? "TODO 할 일 업데이트"
                        : item.notificationType == "BOARD"
                        ? "BOARD"
                        : item.notificationType == "MEMBER"
                        ? "MEMBER"
                        : item.notificationType == "PROGRESS"
                        ? "PROGRESS"
                        : item.notificationType == "VIDEO"
                        ? "VIDEO"
                        : null}
                    </p>
                    <p class="text-xs font-ltest text-gray-400">
                      {item.date} {item.time}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export const RecentActivity = (props) => {
  const { dataLists, recentActivity } = props;
  const mes1 = "님이 새로운 계획을 등록했습니다.";
  const mes2 = "님이 새로운 글을 등록했습니다.";
  const mes3 = "님이 팀에 들어왔습니다. 환영해요!🥳";
  const mes4 = "님이 코드를 수정했습니다. 디버깅 파이팅!";
  const mes5 = "님이 화상회의를 녹화했습니다.";
  return (
    <div className="absolute 3xl:top-32.5/100 2xl:top-3/10 font-sbtest mx-5">
      <div>
        <p class="text-lg">Recent Activity</p>
        <div className="mt-4">
          {Object.keys(recentActivity).length == 0 ? (
            <div class="text-sm font-light font-test text-gray-500">
              최근 활동이 없네요.😅
              <div>여기에는 새로운 팀원이 초대되거나</div>
              <div>새로운 할 일이 올라왔을 때,</div>
              <div>게시판 및 화상회의 등록 알림,</div>
              <div>코드 수정 알림이 보여져요.</div>
            </div>
          ) : (
            <>
              {" "}
              {recentActivity.map((item) => {
                switch (item.notificationType) {
                  case "TODO":
                    return (
                      <div className="grid grid-cols-5 my-2 gap-3 2xl:gap-2">
                        <div class="grid rounded-lg bg-blue-300 justify-items-center place-content-center px-2 py-2">
                          <div class="text-white">
                            <img
                              src="
                          https://svgsilh.com/svg/1294836-3f51b5.svg
                          "
                              alt="code"
                            />
                          </div>
                        </div>

                        <div class="col-span-4 text-sm mx-1 font-rtest text-gray-600">
                          {(item.memberName + mes1).length > 17 ? (
                            <p>{item.memberName + mes1}</p>
                          ) : (
                            <p>{item.memberName + mes1}</p>
                          )}
                          <p class="text-xs font-ltest text-gray-400">
                            {item.date} {item.time}
                          </p>
                        </div>
                      </div>
                    );
                  case "BOARD":
                    return (
                      <div className="grid grid-cols-5 my-2 gap-3 2xl:gap-2">
                        <div class="grid rounded-lg bg-purple-300 justify-items-center place-content-center px-2 py-2">
                          <div class="text-white">
                            <img
                              src="
                          https://svgsilh.com/svg/310475-9c27b0.svg
                          "
                              alt="code"
                            />
                          </div>
                        </div>
                        <div class="col-span-4 text-sm mx-1 font-rtest text-gray-600">
                          {(item.memberName + mes2).length > 18 ? (
                            <p>{item.memberName + mes2}</p>
                          ) : (
                            <p>{item.memberName + mes2}</p>
                          )}
                          <p class="text-xs font-ltest text-gray-400">
                            {item.date} {item.time}
                          </p>
                        </div>
                      </div>
                    );
                  case "MEMBER":
                    return (
                      <div className="grid grid-cols-5 my-2 gap-3 2xl:gap-2">
                        <div class="grid rounded-lg bg-gray-300 justify-items-center place-content-center px-2 py-2">
                          <div class="text-white">
                            <img src="https://svgsilh.com/svg/42919.svg" alt="code" />
                          </div>
                        </div>
                        <div class="col-span-4 text-sm mx-1 font-rtest text-gray-600">
                          {(item.memberName + mes3).length > 17 ? (
                            <p>{item.memberName + mes3}</p>
                          ) : (
                            <p>{item.memberName + mes3}</p>
                          )}
                          <p class="text-xs font-ltest text-gray-400">
                            {item.date} {item.time}
                          </p>
                        </div>
                      </div>
                    );

                  case "CODE":
                    return (
                      <div className="grid grid-cols-5 my-2 gap-3 2xl:gap-2">
                        <div class="grid rounded-lg bg-green-300   justify-items-center place-content-center px-2 py-2">
                          <div class="text-white">
                            <img src="https://svgsilh.com/svg/1970468-4caf50.svg" alt="code" />
                          </div>
                        </div>
                        <div class="col-span-4 text-sm font-rtest text-gray-600">
                          <p>{item.memberName + mes4}</p>
                          <p class="text-xs font-ltest text-gray-400">
                            {item.date} {item.time}
                          </p>
                        </div>
                      </div>
                    );

                  case "VIDEO":
                    return (
                      <div className="grid grid-cols-5 my-2 gap-3 2xl:gap-2">
                        <div class="grid rounded-lg bg-red-300 justify-items-center place-content-center px-2 py-2">
                          <div class="text-white">
                            <img src="https://svgsilh.com/svg/481821-f44336.svg" alt="code" />
                          </div>
                        </div>
                        <div class="col-span-4 text-xs">
                          <p>{item.memberName + mes5}</p>
                          <p class="text-xs font-ltest text-gray-400">
                            {item.date} {item.time}
                          </p>
                        </div>
                      </div>
                    );

                  default:
                    return null;
                }
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const Members = ({ teamInfo }) => {
  const [tempArray, setTempArray] = useState([]);
  var array = [];
  const temp = () => {
    for (var i = 0; i < teamInfo.totalMembers; i++) {
      array.push(i);
    }
  };

  useEffect(() => {
    temp();
    setTempArray(array);
  }, []);
  return (
    <div className="absolute my-5 w-full 3xl:top-65/100 top-62.5/100 font-sbtest mx-5">
      <div>
        <p class="text-lg">Members</p>
        <div className="grid mt-4 w-5/6">
          <div class="flex gap-4 grid grid-rows-32 grid-cols-3 place-items-center">
            {tempArray.map((item) => {
              return (
                <div class="2xl:w-12 2xl:h-12 w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
                  {}
                  <img
                    class="shadow-md 2xl:w-8 2xl:h-8 w-6 h-6 rounded-full "
                    src="https://svgsilh.com/svg/1299805.svg"
                    alt="collaborator 1"
                  />
                </div>
              );
            })}

            {/* <div class="2xl:w-14 2xl:h-14 w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
              <img
                class="shadow-md 2xl:w-8 2xl:h-8 w-6 h-6 rounded-full "
                src="https://cdn.tuk.dev/assets/templates/olympus/projects(9).png"
                alt="collaborator 2"
              />
            </div>
            <div class="2xl:w-14 2xl:h-14 w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
              <img
                class="shadow-md 2xl:w-8 2xl:h-8 w-6 h-6 rounded-full "
                src="https://cdn.tuk.dev/assets/templates/olympus/projects(10).png"
                alt="collaborator 3"
              />
            </div>
            <div class="2xl:w-14 2xl:h-14 w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
              <img
                class="shadow-md 2xl:w-8 2xl:h-8 w-6 h-6 rounded-full "
                src="https://cdn.tuk.dev/assets/templates/olympus/projects(11).png"
                alt="collaborator 4"
              />
            </div>
            <div class="2xl:w-14 2xl:h-14 w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
              <img
                class="shadow-md 2xl:w-8 2xl:h-8 w-6 h-6 rounded-full "
                src="https://cdn.tuk.dev/assets/templates/olympus/projects(11).png"
                alt="collaborator 4"
              />
            </div> */}

            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
                stroke="#A1A1AA"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
                stroke="#A1A1AA"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
                stroke="#A1A1AA"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NavFooterMenu = (props) => {
  const { setShowModal2, setShowModal3 } = props;
  const [linkSocket, setLinkSocket] = useState(false);

  return (
    <div className="px-8 absolute font-test grid grid-cols-2 gap-10 bottom-0 right-0 w-full">
      <button
        class="text-3xl"
        onClick={() => {
          setShowModal2(true);
          setLinkSocket(true);
        }}
      >
        💬
      </button>
      {linkSocket ? null : null}

      <button class="text-3xl" onClick={() => setShowModal3(true)}>
        🎬
      </button>
    </div>
  );
};
