import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import Mainpage from "./page/Mainpage";
import Register from "./page/Register";
import Login from "./page/Login";
import VideoChat from "./page/VideoChat";
import TeamForm from "./page/TeamForm";
import Dashboard from "./page/Dashboard";
import Oauth from "./utils/oauth/Oauth";
import Loading from "./page/Loading";
import Header from "./particals/Header";
import "tailwindcss/tailwind.css";
import KakaoOauth from "./utils/oauth/KakaoOauth";
import OauthRegister from "./page/OauthRegister";
import MyPage from "./page/MyPage";
import GoogleOauth from "./utils/oauth/GoogleOauth";
import Footer from "./particals/Footer";
import ManageTeam from "./page/ManageTeam";
import { getCookie } from "./utils/cookie";
import NotFound from "./particals/NotFound";

function App() {
  const [update, setUpdate] = useState(false);
  const [memberName, setMemberName] = useState(null);

  return (
    <BrowserRouter>
      <Route
        path="*"
        component={(props) => {
          return (
            <Header
              props={props}
              update={update}
              setUpdate={setUpdate}
              setMemberName={setMemberName}
              memberName={memberName}
            />
          );
        }}
      />
      <Switch>
        <Route
          path="/"
          exact={true}
          component={(props) => {
            return <Mainpage {...props}></Mainpage>;
          }}
        />
        <Route
          path="/register"
          exact={true}
          component={(props) => {
            return <Register {...props}></Register>;
          }}
        />
        <Route
          path="/oauth/register"
          exact={true}
          component={(props) => {
            return <OauthRegister {...props}></OauthRegister>;
          }}
        />
        <Route
          path="/login"
          exact={true}
          component={(props) => {
            return (
              <Login
                props={props}
                update={update}
                setUpdate={setUpdate}
              ></Login>
            );
          }}
        />
        <Route
          path="/VideoChat"
          exact={true}
          component={(props) => {
            return <VideoChat {...props}></VideoChat>;
          }}
        />
        <Route
          path="/auth/github"
          exact={true}
          component={(props) => {
            return <Oauth {...props}></Oauth>;
          }}
        />
        <Route
          path="/auth/kakao"
          exact={true}
          component={(props) => {
            return <KakaoOauth {...props}></KakaoOauth>;
          }}
        />
        <Route
          path="/auth/google"
          exact={true}
          component={(props) => {
            return <GoogleOauth {...props}></GoogleOauth>;
          }}
        />
        <Route
          path="/Loading"
          exact={true}
          component={(props) => {
            return <Loading {...props}></Loading>;
          }}
        />
        <Route
          path="/mypage"
          exact={true}
          component={(props) => {
            return <MyPage {...props}></MyPage>;
          }}
        />
        <Route
          path="/team"
          exact={true}
          component={(props) => {
            return <TeamForm {...props}></TeamForm>;
          }}
        />
        <Route
          path="/dashboard/:teamName"
          exact={true}
          component={(props) => {
            return (
              <Dashboard props={props} memberName={memberName}></Dashboard>
            );
          }}
        />
        <Route
          path="/dashboard/:teamName/setting"
          exact={true}
          component={(props) => {
            return <ManageTeam {...props}></ManageTeam>;
          }}
        />{" "}
      </Switch>
      <Route
        path="*"
        component={(props) => {
          return <Footer {...props} />;
        }}
      />
    </BrowserRouter>
  );
}

export default App;
