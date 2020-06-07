<template>
  <div id="CallPage">
    <div style="position: fixed; top: 50%; left: 0; width: 100px; height: 100px; background-color: orange; z-index: 99999" @click="answerCall"></div>
    <div class="viewport" :class="{'call-active': isCallActive}">
      <video id="remoteVideo" ref="remoteVideo" autoplay></video>

      <div class="viewport-call" v-if="!isCallActive">
        <div class="viewport-call-status">ЗВОНОК ЗАВЕРШЕН</div>
        <div class="viewport-call-status">ПАССАЖИРОМ</div>
        <div class="viewport-call-button" @click="$router.back()">ПРОДОЛЖИТЬ РАБОТУ</div>
        <div class="viewport-call-time">00:00:10</div>
      </div>
      <div class="viewport-call" v-else>
        <video class="viewport-call-admin" ref="localVideo" autoplay muted></video>
      </div>
    </div>
    <div class="sidebar" :class="{'call-active': isCallActive}">
      <div class="call-window">
        <div class="call-window-head">
          <div class="call-window-head-new">НОВЫЙ ЗВОНОК <span>РУССКИЙ</span></div>
          <div class="call-window-head-name">Казанский Вокзал</div>
          <div class="call-window-head-terminal">терминал #3462</div>
          <div class="call-window-head-terminal">кассы</div>
        </div>
        <div class="call-window-bottom" v-if="isCallActive">
          <div class="call-window-bottom-endcall" @click="isCallActive = false">
            <img src="../../assets/icons/Phone.svg" alt=''/>
          </div>
          <div class="call-window-bottom-microphone">
            <img src="../../assets/icons/microphome.svg" alt=''/>
          </div>
          <div class="call-window-bottom-video">
            <img src="../../assets/icons/video.svg" alt=''/>
          </div>
        </div>
        <div class="call-window-end" v-else>
          <img src="../../assets/icons/Telephone.png" style="margin-right: 15px" alt="">ЗВОНОК ЗАВЕРШЕН
        </div>
      </div>
      <div class="col">
        <div class="call-timer">
          <div class="call-timer-header">ПРОДОЛЖИТЕЛЬНОСТЬ ЗВОНКА</div>

          <div class="call-timer-wrapper" v-if="isCallActive">
            <div class="call-timer-time">00:01:13</div>
          </div>

          <div class="call-timer-wrapper" v-else>
            <div class="call-timer-date">21.05.2020</div>
            <div class="call-timer-time">10:32:12 - 10:33:31</div>
          </div>
        </div>
        <div class="call-status">
          <div class="call-status-header">СТАТУС ЗВОНКА</div>
          <div class="call-status-buttons">
            <div
                    class="call-status-button"
                    :class="{active : status==='solved'}"
                    @click="toggleStatus('solved')"
            >
              Решено
            </div>
            <div
                    class="call-status-button red"
                    :class="{active : status==='unsolved'}"
                    @click="toggleStatus('unsolved')">
              Не могу помочь
            </div>
          </div>
        </div>
        <div class="call-chat">
          <div class="call-chat-header">КОММЕНТАРИЙ ОПЕРАТОРА</div>
          <div class="call-chat-box">
            <textarea class="call-chat-box__inner" v-model="comment" />

            <div class="call-chat-box-bottom">сохранено</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $script from 'scriptjs';
  import RecordRTC from 'recordrtc';
  import axios from 'axios';
  import io from '../../assets/js/socket.io'
  export default {
    name: "CallPage",
    mounted() {
      // let auth = localStorage.getItem('authData');
      let userId = '1';
      //
      // if (auth) {
      //   auth = JSON.parse(auth);
      //   this.callCenterId = auth.callCenterId;
      //   userId = auth.username;
      // }


      this.socket = io.connect('https://call.enlighted.ru');
      // брать из бд или локал_сторадж
      this.uuid = 'operator_' + Math.ceil(Math.random() * 1000);

      // настройка звука звонилки
      this.calling.loop = true;


      this.socket.emit("entered", userId, "operator", this.callCenterId);

      this.socket.on('has_client', (roomId) => {
        console.log(`has new call ${roomId}`);
        this.socket.emit('join', roomId, 'operator');
      });

      this.socket.on('boarding_completed', () => {
        this.isChannelReady = true;
      });

      this.socket.on('calling', (room) => {
        console.log('calling: ' + room);

        // document.getElementById('answer-button-holder').style.display = 'block';
        // document.getElementById('waiting').style.display = 'none';

        this.state = 'RINGING';
        const playPromise = this.calling.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            // Automatic playback started!
          }).catch((error) => {
            console.log(error);
            // Automatic playback failed.
            // Show a UI element to let the user manually start playback.
          });
        }

        if (!("Notification" in window)) {
          //
        } else if (Notification.permission === "granted") {
          // Если разрешено, то создаем уведомление
          const notification = new Notification("Новый звонок");
        } else if (Notification.permission !== 'denied') { // В противном случае, запрашиваем разрешение
          Notification.requestPermission((permission) => {});
        }
      });


      this.socket.on('message', (message) => {
        console.log('Client received message:', message);
        if (message.type === 'offer') {
          this.pc.setRemoteDescription(new RTCSessionDescription(message)).then(() => {
            console.log('remote desc set');
          }, (err) => {
            console.log(err);
          });
          this.doAnswer();
        } else if (message.type === 'candidate' && this.isStarted) {
          const candidate = new RTCIceCandidate({
            sdpMLineIndex: message.label,
            candidate: message.candidate,
          });
          // console.log('add ice candidate');
          this.pc.addIceCandidate(candidate).then(() => {
            // console.log('ice candidate added')
          }, (err) => {
            // console.log('ice candidate err');
            console.log(err);
          });
        }
      });

      this.socket.on('stat', (stat) => {
        // console.log(JSON.parse(stat));

        const queue = JSON.parse(stat);
        this.queue = queue[this.callCenterId] ? queue[this.callCenterId] : 0;
      });

      // клиент повесил трубку
      this.socket.on('bye', (callId) => {
        console.log('bye received in operator');
        this.socket.emit('leave', callId, 'operator');

        if (this.isStarted) {
          this.stop();
        } else {
          this.state = 'IDLE';
          this.calling.pause();
        }
      });

      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      })
          .then(this.gotStream)
          .catch((e) => {
            console.log(e);
            // alert('getUserMedia() error: ' + e.name);
          });

    },

    methods: {
      toggleStatus(type) {
        if (type === this.status) return
        if (this.status === 'solved') {
          this.status = 'unsolved'
        } else {
          this.status = 'solved'
        }
      },
      gotStream(stream) {
        this.$refs.localVideo.srcObject = stream; // TODO
        this.localStream = stream;
        this.sendMessage('got user media');
      },
      sendMessage(message) {
        this.socket.emit('message', message);
      },
      maybeStart() {
        if (!this.isStarted && typeof this.localStream !== 'undefined' && this.isChannelReady) {
          console.log('>>>>>> creating peer connection');
          this.createPeerConnection();
          this.pc.addStream(this.localStream);
          this.isStarted = true;
        } else {
          console.log(!this.isStarted)
          console.log(typeof this.localStream !== 'undefined')
          console.log(this.isChannelReady)
          console.log('>>>>>> maybe start failed');
        }
      },
      answerCall() {
        // document.getElementById('answer-button-holder').style.display = 'none';
        // document.getElementById('close').style.display = 'block';

        console.log(3321)
        this.state = 'PROGRESS';
        this.calling.pause();
        this.socket.emit('message', 'receiverReadyToCall');
        this.maybeStart();
      },

      createPeerConnection() {
        try {
          this.pc = new RTCPeerConnection(this.pcConfig);
          this.pc.onicecandidate = this.handleIceCandidate;
          this.pc.onaddstream = this.handleRemoteStreamAdded;
          this.pc.onremovestream = this.handleRemoteStreamRemoved;
          console.log('Created RTCPeerConnnection');
        } catch (e) {
          console.log('Failed to create PeerConnection, exception: ' + e.message);
          alert('Cannot create RTCPeerConnection object.');
        }
      },
      handleIceCandidate(event) {
        console.log('icecandidate event: ', event);
        if (event.candidate) {
          this.sendMessage({
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          });
        } else {
          console.log('End of candidates.');
        }
      },
      doAnswer() {
        // console.log('Sending answer to peer.');
        this.pc.createAnswer().then(
            this.setLocalAndSendMessage,
            this.onCreateSessionDescriptionError,
        );
      },
      setLocalAndSendMessage(sessionDescription) {
        this.pc.setLocalDescription(sessionDescription);
        console.log('setLocalAndSendMessage sending message', sessionDescription);
        this.sendMessage(sessionDescription);
      },
      onCreateSessionDescriptionError(error) {
        console.log('Failed to create session description: ' + error.toString());
      },
      handleRemoteStreamAdded(event) {
        console.log(event)
        this.remoteStream = event.stream;
        this.$refs.remoteVideo.srcObject = event.stream;
        // document.querySelector('#remoteVideo').srcObject = event.stream;
        // console.log('handleRemoteStreamAdded');

        this.startRecord();
      },
      hangup() {
        this.stop();
        this.sayBye();
      },
      sayBye() {
        this.socket.emit('bye');
      },
      stop() {
        this.stopRecord();


        this.isStarted = false;
        if (this.pc !== null) {
          this.pc.close();
          this.pc = null;
        }


        this.remoteStream = null;
        this.$refs.remoteVideo.srcObject = null;

        this.state = 'IDLE';


        // document.getElementById('waiting').style.display = 'block';
        // document.getElementById('close').style.display = 'none';
      },
      startRecord() {
        const self = this;
        this.recorder = RecordRTC([this.localStream, this.remoteStream], {
          type: 'video',
          checkForInactiveTracks: true,
          timeSlice: 1000,
          ondataavailable(blob) {
            console.log('has data');
          },
          onStateChange(state) {
            console.log(state);
          },
        });
        this.recorder.startRecording();
      },
      stopRecord() {
        const self = this;
        this.recorder.stopRecording(() => {
          // self.$refs.resultVideo.src = self.$refs.resultVideo.srcObject = null;
          const blob = self.recorder.getBlob();
          // self.$refs.resultVideo.src = URL.createObjectURL(blob);
          // RecordRTC.invokeSaveAsDialog(blob, 'video.webm');

          const data = new FormData();

          data.append('call', 'test');
          data.append('video', blob, 'long.webm');


          axios.post("/api/videos/", data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }).then((result) => {
            console.log(result);
          })
              .catch((e) => {
                console.log(e);
              });

          self.recorder.destroy();
          self.recorder = null;
        });
      },
    },
    watch: {
      status(val) {
        console.log('status changed');
        this.socket.emit('change_status', val);
      },
    },
    data() {
      return {
        isCallActive: true,
        status: null,
        comment: 'Пассажиру нужна медицинская помощь, вызвала бригадуна вокзал. Бригада приехала',

        recorder: null,
        socket: null,
        uuid: "",
        isChannelReady: true,
        isStarted: false,
        localStream: null,
        pc: null,
        remoteStream: null,
        callCenterId: '',
        pcConfig: {
          'iceServers': [
            { 'url':'stun:stun1.l.google.com:19302' },
            { 'url':'stun:stun2.l.google.com:19302' },
            { 'url':'stun:stun3.l.google.com:19302' },
            {
              'url': 'turn:coturn.sverstal.ru:3478',
              'username': 'tab1',
              'credential': '123456',
            },
          ],
        },
        calling: new Audio("/static/files/02433.mp3"),
        state: 'IDLE',
        status: 'UNAVAILABLE',
        statuses: [
          {
            value: 'WAITING', text: 'Готов к работе',
          },
          {
            value: 'UNAVAILABLE', text: 'Недоступен',
          },
        ],
        queue: 0,
      }
    }
  }
</script>

<style lang='scss'>
  #CallPage{
    min-height: 100vh;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    .col{
      margin: 15px 20px;
    }

    /*---------------------------------------------------------------For pink window background*/
    .pink{
      background-color: #f04265 !important;
    }
    /*---------------------------------------------------------------For pink window background*/

    .viewport{
      width: 100%;
      background: #2e2e2e url("../../assets/images/backgroung.png") ;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &-call{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &-status{
          color: #ffffff;
          font-size: 18px;
          font-weight: 400;
        }
        &-button{
          width: 290px;
          height: 67px;
          border-radius: 34px;
          background-color: #f04265;color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          line-height: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 45px;
          margin-bottom: 35px;
          cursor: pointer;
        }
        &-time{
          color: #ffffff;
          font-size: 20px;
          font-weight: 300;
        }
        &-admin{
          position: absolute;
          width: 238px;
          height: 148px;
          background-color: white;
          top: 28px;
          right: 28px;
          border-radius: 10px;
        }
      }
    }
    .viewport.call-active{
      /*background: url("../../assets/images/call1.png") no-repeat;*/
      /*background-size: cover;*/
    }
    .sidebar{
      width: 281px;
      border-radius: 8px;
      background-color: #ffffff;
    }
    .call-window{
      width: 281px;
      height: 175px;
      box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
      border-radius: 0 0 8px 8px;
      background-color: #4c3b60;
      &-head{
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &-new{
          opacity: 0.7;
          color: #ffffff;
          font-size: 11px;
          font-weight: 300;
          margin-bottom: 7px;
          span{
            color: #ffffff;
            font-weight: 500;
          }
        }
        &-name{
          color: #ffffff;
          font-size: 14px;
          line-height: 15px;
          font-weight: 700;
        }
        &-terminal{
          color: #ffffff;
          font-size: 14px;
          font-weight: 400;
        }
      }
      &-bottom{
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px;
        cursor: pointer;
        .call-window-bottom-endcall, .call-window-bottom-microphone, .call-window-bottom-video{
          border-radius: 50%;
          width: 52px;
          height: 52px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .call-window-bottom-endcall{
          background-color: #f04265;
        }
        .call-window-bottom-microphone, .call-window-bottom-video{
          background-color: #ffffff;
        }

      }
      &-end{
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 40px;
        color: #ffffff;
        font-size: 11px;
        font-weight: 700;
      }
    }
    .call-timer{
      min-height: 85px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 6px;
      &-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      &-header{
        opacity: 0.7;
        color: #685c7b;
        font-size: 11px;
        font-weight: 300;
        margin-bottom: 9px;
      }
      &-date{
        font-size: 13px;
        font-weight: 400;
        color: #685c7b;
        margin-bottom: 10px;
      }
      &-time{
        font-weight: 400;
        color: #685c7b;
        font-size: 20px;
      }
    }
    .call-status{
      min-height: 85px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 6px;
      &-header{
        opacity: 0.7;
        color: #685c7b;
        font-size: 11px;
        font-weight: 300;
        margin-bottom: 9px;
      }
      &-buttons{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
      &-button{
        cursor: pointer;
        height: 20px;
        line-height: 20px;
        color: #4fd161;
        font-size: 12px;
        font-weight: 700;
        border-radius: 10px;
        border: 1px solid #4fd161;
        text-align: center;
        padding: 0 7px;
      }
      &-button.red{
        color: #f04265;
        border: 1px solid #f04265;
      }
      &-button.active{
        color: #ffffff;
        background-color: #4fd161;
      }
      &-button.red.active{
        background-color: #f04265;
      }
    }
    .call-chat{
      &-header{
        opacity: 0.7;
        color: #685c7b;
        font-size: 11px;
        font-weight: 300;
        margin-bottom: 9px;
        text-align: center;
      }
      &-box{
        width: 100%;
        min-height: 296px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        textarea{
          width: 100%;
          padding: 13px;
          padding-bottom: 30px;
          min-height: 296px;
          border-radius: 8px;
          border: 1px solid #dee2e6;
          resize: none;
          outline: none;
        }
        &-bottom{
          position: absolute;
          bottom: 10px;
          left:10px;
          color: #c8bfd4;
          font-size: 10px;
          font-weight: 500;
        }
      }
    }
    #remoteVideo {
      width: 100%;
      height: 100vh;
      z-index: 999;
    }
  }
</style>
