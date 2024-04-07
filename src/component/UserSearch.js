import React, { Component, useState } from "react";

const sample_user = [
  { id: 1, email: "abcd@apd", name: "user12" },
  { id: 2, email: "badcd@apd", name: "user2" },
  { id: 3, email: "copybcd@apd", name: "user3" },
  { id: 4, email: "drup@apd", name: "user4" },
  { id: 5, email: "eeee@apd", name: "user5" },
  { id: 6, email: "final@apd", name: "user6" },
  { id: 7, email: "gapbcd@apd", name: "user7" },
];

const default_result = [{ email: "", name: "" }];

function SearchBar(props) {
  const [results, setresults] = useState(default_result);
  const [text, setText] = useState(null);
  const onSearchTextHandler = (e) => {
    setText(e.target.value);
    searchResult();
  };

  const searchResult = () => {
    const filter = sample_user.filter((val) => {
      if (text == "" || text == null) {
        return val;
      } else if (val.email.toLowerCase().includes(text.toLowerCase())) {
        return val;
      }
    });
    setresults(filter);
  };
  const onSelectText = (value) => {
    setText(value);
  };
  return (
    <div className="w-full">
      <div className="flex w-full gap-4">
        <input
          placeholder="초대 할 이메일을 입력"
          class="block text-base w-3/4 h-10 lg:h-12  px-1 lg:px-6 rounded-lg outline-none transition border hover:border-primary-500 border-gray-400 focus:border-primary-500"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            searchResult();
          }}
        />
        <button
          type="button"
          onClick={() => {}}
          class="w-1/4 h-12  bg-gray-400 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base rounded-lg "
        >
          초대 보내기
        </button>
      </div>

      <div className=" overflow-auto h-20 w-11/12 ">
        {results.map((user) => {
          if (text == null || text == "") {
            return;
          } else {
            return (
              <button
                className="flex text-gray-600 dark:text-gray-400 w-3/4 gap-10 border-2 border-slate-200 rounded-none bg-white"
                onClick={() => {
                  setText(user.email);
                }}
              >
                <div className=" w=3/7 ml-10">
                  <a>{user.name}</a>
                </div>
                <div className=" w=4/7">
                  <a>{user.email}</a>
                </div>
              </button>
            );
          }
        })}
      </div>
    </div>
  );
}

function SearchUser(props) {
  const [searchText, setSearchText] = useState("");
  const userlist = sample_user;
  const [results, setresults] = useState(default_result);

  const [searchUserResult, setSearchUserResult] = useState(null);

  const onSearchTextHandler = (e) => {
    setSearchText(e.target.value);
    searchResult();
  };

  const OnSendButton = () => {
    setresults(userlist);
  };

  const searchResult = () => {
    const filter = sample_user.filter((val) => {
      if (searchText == "") {
        return val;
      } else if (val.email.toLowerCase().includes(searchText.toLowerCase())) {
        return val;
      }
    });
    setresults(filter);
  };

  const SearchPreview = (user) => {
    return (
      <div>
        <div>
          <p> user : {user.email}</p>
        </div>
        <div>
          <p> name : {user.name}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full gap-4">
      <div className="flex w-full">
        <SearchBar />
      </div>
    </div>
  );
}
export default SearchUser;
