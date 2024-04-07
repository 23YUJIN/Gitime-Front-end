import { useState } from "react";

function NotFound(props) {
  const paging = () => {
    window.alert("로그인 후 이용하세요.");
    props.history.push("/");
  };
  return <div>{paging()}</div>;
}

export default NotFound;
