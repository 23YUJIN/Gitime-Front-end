import React, { useEffect, useState, forwardRef, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export let sockJS = new SockJS("http://localhost:8080/api/v1/asdasd/videochat");

// var constraints = { audio: true, video: { width: 1280, height: 720 } };

// navigator.mediaDevices
//   .getUserMedia(constraints)
//   .then(function (stream) {
//     var video = document.querySelector("video");
//     // Older browsers may not have srcObject
//     if ("srcObject" in video) {
//       video.srcObject = stream;
//     } else {
//       // Avoid using this in new browsers, as it is going away.
//       video.src = window.URL.createObjectURL(stream);
//     }
//     video.onloadedmetadata = function (e) {
//       video.play();
//     };
//   })
//   .catch(function (err) {
//     console.log(err.name + ": " + err.message);
//   });

function VideoChat(props) {
  useEffect(() => {
    const constraints = { audio: false, video: true };
    const videoOutput = document.getElementById("video-output");
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        // MediaStream을 HTMLVideoElement의 srouce로 설정
        videoOutput.srcObject = mediaStream;

        // metadata가 로드될 때 실행되는 이벤트
        videoOutput.onloadedmetadata = function () {
          // HTMLVideoElement로 카메라의 화면을 출력하기 시작
          videoOutput.play();
        };
      });
  });

  return (
    <div class="">
      <div>여기부터</div>
      <video id="video-output"></video>
    </div>
  );
}

export default VideoChat;
