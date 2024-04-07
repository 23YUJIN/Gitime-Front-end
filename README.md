# Gitime

<div style="text-align:center">
<img src="public/img/readme/mainpage.png" alt="Gitime">
</div>

## 프로젝트 소개

<div style="text-align:center">
<img src="public/img/readme/logo.png" alt="Project Logo">
</div>

- 깃티미(Gitime)는 깃허브와 연동하고, 각 프로젝트에 대해 대시보드를 중심으로 하는 팀 협업 기능을 제공하는 웹 서비스입니다.

## 사용 기술

### Front-end 개발

<div>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=black">
</div>

### 버전 관리

<div>
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</div>

### 개발 환경

<div>
  <img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=black">
</div>

### 디자인

<div>

  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=black">
</div>

## 화면 구성 및 기능

### 메인 페이지, 로그인, 회원가입

| 메인 페이지                                  | 로그인                                 |
| -------------------------------------------- | -------------------------------------- |
| ![mainpage](/public/img/readme/mainpage.png) | ![login](/public/img/readme/login.png) |

- 메인 페이지에선 각 기능에 대해 간단하게 소개하고 있으며, 사용자는 상단의 헤더로 각 기능에 접근하거나 로그인, 회원가입을 할 수 있습니다.

| 회원가입(이메일 및 비밀번호 입력)            | 회원가입(사용자 정보 입력, 인증)               |
| -------------------------------------------- | ---------------------------------------------- |
| ![register](/public/img/readme/register.png) | ![register2](/public/img/readme/register2.png) |

| 최초 서비스 이용시 깃허브 연동       | 연동 후 팀 목록                      | 팀 생성                              |
| ------------------------------------ | ------------------------------------ | ------------------------------------ |
| ![auth](/public/img/readme/auth.png) | ![team](/public/img/readme/team.png) | ![make](/public/img/readme/make.png) |

- 회원가입 후, 사용자는 깃허브 연동을 요청받습니다. Github 계정에 로그인함으로써 연동하면 해당 계정의 레포지토리에 접근이 가능해집니다.
- 팀 목록 페이지에선 팀을 새롭게 생성하거나, 초대 코드 입력을 통해 기존 팀에 참여할 수도 있습니다. 팀 생성은 레포지토리를 기반으로 이루어집니다.

### 대시보드

| 대시보드                                       | 캘린더                                       |
| ---------------------------------------------- | -------------------------------------------- |
| ![dashboard](/public/img/readme/dashboard.png) | ![calendar](/public/img/readme/calendar.png) |

- 팀 목록에서 특정 팀을 선택해 대시보드로 이동할 수 있습니다.
- 대시보드에선 프로젝트의 진행 사항, 일정, 투두 리스트, 자료실, 캘린더 정보를 제공합니다.
- 목표 관리하기 버튼을 통해 투두 리스트를 관리하는 모달창을 띄울 수 있습니다.
- 캘린더에선 특정 날짜를 누르면 해당 날짜에 맞는 투두 리스트를 확인할 수 있습니다.

| 목표 관리하기(투두 리스트)           | 자료실                                 | 자료실 글 상세보기                   |
| ------------------------------------ | -------------------------------------- | ------------------------------------ |
| ![todo](/public/img/readme/todo.png) | ![board](/public/img/readme/board.png) | ![read](/public/img/readme/read.png) |

- 목표 관리하기 모달에선 목표를 새롭게 추가하거나, 체크 표시를 눌러 기존 목표를 '완료' 처리할 수 있습니다.
- 자료실에선 글을 작성해 자료를 업로드할 수 있으며, 글 목록에서 글을 조회할 수 있습니다.

### 팀 관리

| 팀원 초대                                | 팀원 역할 설정                             |
| ---------------------------------------- | ------------------------------------------ |
| ![invite](/public/img/readme/invite.png) | ![manage2](/public/img/readme/manage2.png) |

- 팀 관리 페이지로 이동하면 팀 관리, 팀원 관리를 할 수 있습니다.
- 팀원 관리에선 팀원을 초대하거나 팀원의 역할을 설정할 수 있습니다.

| 개발 분야 관리                             | 공지사항 관리                              |
| ------------------------------------------ | ------------------------------------------ |
| ![manage1](/public/img/readme/manage1.png) | ![manage3](/public/img/readme/manage3.png) |

- 팀 관리에선 개발 분야, 공지사항, 팀 설정, 깃허브 연동을 관리할 수 있습니다.
