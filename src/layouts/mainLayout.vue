<template>
  <div id="mainLayout">
    <CallPage
            v-show="$store.state.callLogic.showCallPage"
            :hangup="hangup"
    />
    <Sidebar />
    <div class="wrapper-scroll">
      <div class="wrapper">
        <Header />
        <callWindow
                v-if="$store.state.callLogic.isIncomingCall && $route.name !== 'dashboard'"
                :answer="answerCall"
        />
        <router-view :answer="answerCall" />
      </div>
    </div>
  </div>
</template>

<script>
  import RecordRTC from 'recordrtc';
  import axios from 'axios';
  import io from '../assets/js/socket.io'

  import Sidebar from "../components/layout/Sidebar";
  import Header from "../components/layout/Header";
  import CallPage from "../components/layout/CallPage";
  import callWindow from "../components/layout/callWindow";
  export default {
    name: "mainLayout",
    components: { Sidebar, Header, CallPage, callWindow },
    data() {
      return {
        recorder: null,
        socket: null,
        uuid: "",
        isChannelReady: true,
        isStarted: false,
        localStream: null,
        pc: null,
        remoteStream: null,
        callCenterId: 'dev',
        calling: new Audio(require("../assets/02433.mp3")),//
        queue: 0,// ОЧЕРЕДЬ ЗВОНКОВ
      }
    },
    methods: {

      gotStream(stream) {
        document.getElementById('localVideo').srcObject = stream;
        this.localStream = stream;
        this.sendMessage('got user media');
      },

      // ЗАПУСК ПОДЙОМА ТЕЛЕФОНА
      maybeStart() {

        if (!this.$store.state.isCallInProgress && typeof this.localStream !== 'undefined' && this.isChannelReady) {
          console.log('>>>>>> creating peer connection');

          try {
            this.pc = new RTCPeerConnection({
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
            });
            this.pc.onicecandidate = this.handleIceCandidate;
            this.pc.onaddstream = this.handleRemoteStreamAdded;
            this.pc.onremovestream = this.handleRemoteStreamRemoved;
            console.log('Created RTCPeerConnnection');
          } catch (e) {
            console.log('Failed to create PeerConnection, exception: ' + e.message);
            alert('Cannot create RTCPeerConnection object.');
          }

          this.pc.addStream(this.localStream);
          this.isStarted = true;
        } else {
          console.log(!this.isStarted)
          console.log(typeof this.localStream !== 'undefined')
          console.log(this.isChannelReady)
          console.log('>>>>>> maybe start failed');
        }
      },

      // ПОДНЯТЬ ТЕЛЕФОН
      answerCall() {
        this.calling.pause();
        this.socket.emit('message', 'receiverReadyToCall');
        this.maybeStart();
        this.$store.dispatch('callLogic/startSpeech')
      },

      // ЗАКРЫТИЕ СЕССИ РАЗГОВОРА
      stop() {
        this.stopRecord();

        this.$store.commit('callLogic/endCall')

        if (this.pc !== null) {
          this.pc.close();
          this.pc = null;
        }

        this.remoteStream = null;
        document.getElementById('remoteVideo').srcObject = null;
      },

      // СБРОСИТЬ ТРУБКУ
      hangup() {
        this.stop();
        this.socket.emit('bye');
      },


      // НАЧАТЬ ЗАПИСЬ ЗВОНКА
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

      // ЗАКОНЧИТЬ ЗАПИСЫВАТЬ ЗАПИСЬ И ОТПРАВИТЬ НА СЕРВЕР
      stopRecord() {
        const self = this;
        this.recorder.stopRecording(() => {
          const blob = self.recorder.getBlob();
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

      // ВТОРИЧНАЯ ЛОГИКА
      sendMessage(message) {
        this.socket.emit('message', message);
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
        this.remoteStream = event.stream;
        document.getElementById('remoteVideo').srcObject = event.stream;
        this.startRecord();
      },

    },
    mounted() {
      // ЕСЛИ ПОЛЬЗОВАТЕЛЬ ОПЕРАТОР ВКЛЮЧАЕТСЯ ЛОГИКА ЗВОНКА
    },
    computed: {
      workStatus() {
        return this.$store.state.workStatus
      },
      isActiveWorkShift() {
        return this.$store.state.isActiveWorkShift
      },
      isCallInProgress() {
        return this.$store.state.isCallInProgress
      }
    },
    watch: {
      workStatus(val){
        if (val === 'online'){
          this.socket.emit('change_status', 'WAITING');
        } else if (val === 'break') {
          this.socket.emit('change_status', 'UNAVALIABLE');
        }
      }
      ,
      isActiveWorkShift(val){
        if (this.$store.state.userStatus === 'operator') {
          if (val && this.workStatus === 'online') {
            let userId = 'dev';

            this.socket = io.connect('https://call.enlighted.ru');
            this.uuid = 'operator_' + Math.ceil(Math.random() * 1000);

            this.calling.loop = true;

            this.socket.emit("entered", userId, "operator", this.callCenterId);


            this.socket.emit('change_status', 'WAITING');
            this.socket.on('has_client', (roomId) => {
              console.log(`has new call ${roomId}`);
              this.socket.emit('join', roomId, 'operator');
            });

            this.socket.on('boarding_completed', () => {
              console.log('boarding_completed')
              this.isChannelReady = true;
            });

            // ВХОДЯШИЙ ЗВОНОК
            this.socket.on('calling', (room) => {
              console.log('incoming call')
              console.log('calling: ' + room);

              this.$store.commit('callLogic/comeIncomingCall')

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
            });

            // КЛИЕНТ ПОВЕСИЛ ТРУБКУ
            this.socket.on('bye', (callId) => {
              console.log('bye received in operator');
              this.socket.emit('leave', callId, 'operator');

              if (this.$store.state.isCallInProgress) {
                this.stop();
              } else {
                this.$store.commit('callLogic/cancelIncomingCall')
                this.calling.pause();
              }
            });

            // ОТПРАВКА СООБЩЕНИЯ
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

            // КАЛЬКУЛЯЦИЯ ОЧЕРЕДИ ЗВОНКОВ
            this.socket.on('stat', (stat) => {
              // Выводит очередь
              const queue = JSON.parse(stat);
              this.queue = queue[this.callCenterId] ? queue[this.callCenterId] : 0;
            });

            navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true,
            }).then(this.gotStream).catch((e) => {
              console.log(e);
            });
          } else {
            this.socket = null
          }
        }
      }
    }


  }
</script>

<style lang='scss'>
#mainLayout{
  min-height: 100vh;
  display: flex;
  position: relative;
  .wrapper-scroll{
    width: 100%;
    height: 100vh;
    overflow: auto;
    padding-bottom: 30px;
  }

  .wrapper{
    width: 916px;
    margin: 0 auto;
    position: relative;

  }
  #call_window{
    position: fixed;
    top: 83px;
    right: 120px;
  }
  #DashBoard #call_window{
    position: sticky;
    top: 10px;
  }
}
</style>
