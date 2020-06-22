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
                v-if="$store.state.callLogic.isIncomingCall && $route.name !== 'dashboard' && $route.name !== 'call-list'"
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
  import apiRequest from "../utils/apiRequest";
  import socket from "../utils/socket";


  export default {
    name: "mainLayout",
    components: { Sidebar, Header, CallPage, callWindow },
    mixins: [socket],
    data() {
      return {
        isChannelReady: true,
        isStarted: false,
        calling: new Audio(require("../assets/02433.mp3")),//
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
          console.log(blob)
          const data = new FormData();

          data.append('video_file', blob, 'long.webm');

          console.log(data)
          console.error(this.videoURL)
          axios.patch(this.videoURL, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Token ${this.videoToken}`
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
      async workStatus(val){
        try {
          if (val === 'online'){
            this.socket.emit('change_status', 'WAITING');
          } else if (val === 'break') {
            this.socket.emit('change_status', 'UNAVALIABLE');
          }
        } catch (e) {
        }
      }
    },
    async created() {
      // try {
      //   let d = await apiRequest.get( '/api/users/')
      //   console.log(d.data)
      // } catch (e) {}
      //
      // try {
      //   let f = await apiRequest.get( `/api/users/5ee2142cd7fa8f68055a2089/`)
      //   console.log(f.data.user)
      // } catch (e) {}
      //
      // try {
      //   let f = await apiRequest.get( '/api/callcenters/')
      //   console.log(f.data)
      // } catch (e) {}
      //
      // try {
      //   let f = await apiRequest.get( '/api/callcenters/')
      //   console.log(f.data)
      // } catch (e) {}

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
  #Call #call_window{
    position: sticky;
    top: 10px;
  }
}
</style>
