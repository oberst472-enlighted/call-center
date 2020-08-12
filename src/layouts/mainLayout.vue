<template>
  <div id="mainLayout">
    <CallPage
            v-show="$store.state.callLogic.showCallPage"
            :hangup="hangup"
            :closeModal="closeModal"
            :messageText="messageText"
            :stopAudio="stopAudio"
            :stopVideo="stopVideo"
            :continueAudio="continueAudio"
            :continueVideo="continueVideo"
            :isVideoOn="isVideoOn"
            :isSoundOn="isSoundOn"
            :terminatedBy="terminatedBy"
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
        interval: null,
        isVideoOn: true,
        isSoundOn: true,
        local: null,
        terminatedBy: ''
      }
    },
    methods: {
      stopAudio() {
        this.isSoundOn = false

        let audio = this.localStream.getTracks().forEach(item => {
          if (item.kind === 'audio') {
            item.enabled = !item.enabled;
          }
        })
        console.log(audio)

        // audio.muted = true
        // audio.stop()
      },
      stopVideo() {
        this.isVideoOn = false
        let video = this.localStream.getTracks().forEach(item => {
          if (item.kind === 'video') {
            item.enabled = !item.enabled;
          }
        })
        console.log(video)

        // video.stop()
      },
      continueAudio() {
        this.isSoundOn = true

        let audio = this.localStream.getTracks().forEach(item => {
          if (item.kind === 'audio') {
            item.enabled = !item.enabled;
          }
        })
        console.log(audio)
        // audio.muted = false

        // audio.play()
      },
      continueVideo() {
        this.isVideoOn = true
        let video = this.localStream.getTracks().forEach(item => {
          if (item.kind === 'video') {
            item.enabled = !item.enabled;
          }
        })
        console.log(video)

        // video.play()
      },
      gotStream(stream) {
        this.local = document.getElementById('localVideo')
        this.local.srcObject = stream;
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
        let date = new Date()
        console.log('нажали зеленую кнопку')
        console.log(this.callRoomID)
        this.socket.emit('callPickup', this.callRoomID);

        let day = `${date.getDate()}`.length === 1 ? `0${date.getDate()}` : `${date.getDate()}`
        let month = `${date.getMonth()}`.length === 1 ? `0${date.getMonth()}` : `${date.getMonth()}`
        let year = date.getFullYear()

        this.$store.commit('callLogic/setDate', `${day}:${month}:${year}`)

        let hours = `${date.getHours()}`.length === 1 ? `0${date.getHours()}` : `${date.getHours()}`
        let minutes = `${date.getMinutes()}`.length === 1 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
        let seconds = `${date.getSeconds()}`.length === 1 ? `0${date.getSeconds()}` : `${date.getSeconds()}`

        this.$store.commit('callLogic/setStartTime', `${hours}:${minutes}:${seconds}`)

        this.calling.pause();

        // this.socket.emit('message', 'receiverReadyToCall');
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
      onSocketStopRinging() {
        this.$store.commit('callLogic/cancelIncomingCall')
        this.calling.pause()
      },
      // СБРОСИТЬ ТРУБКУ
      hangup() {
        let date = new Date()
        this.terminatedBy = 'ОПЕРАТОРОМ'

        let hours = `${date.getHours()}`.length === 1 ? `0${date.getHours()}` : `${date.getHours()}`
        let minutes = `${date.getMinutes()}`.length === 1 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
        let seconds = `${date.getSeconds()}`.length === 1 ? `0${date.getSeconds()}` : `${date.getSeconds()}`

        this.$store.commit('callLogic/setEndTime', `${hours}:${minutes}:${seconds}`)

        this.stop();
        this.socket.emit('bye');
        this.socket.emit('change_status', 'UNAVALIABLE');
      },


      // НАЧАТЬ ЗАПИСЬ ЗВОНКА
      startRecord() {
        const self = this;
        this.recorder = RecordRTC([this.localStream, this.remoteStream], {
          type: 'video',
          checkForInactiveTracks: true,
          timeSlice: 1000,
          ondataavailable(blob) {
            // console.log('has data');
          },
          onStateChange(state) {
            console.log(state);
          },
        });
        this.recorder.startRecording();
      },

      async closeModal() {
        console.log('WAITING')
        this.$store.commit('callLogic/cleanCallTime')

        console.log(this.$store.state.callLogic.messageText)
        let resp = await apiRequest.post(`/api/calls/${this.callObjectId}/comment/`, {
          comment: this.$store.state.callLogic.messageText
        })
        console.log(resp)

        this.$store.commit('callLogic/setMessage', '')

        this.socket.emit('change_status', 'WAITING');
        this.$store.commit('callLogic/closeCallPage')
      },

      // ЗАКОНЧИТЬ ЗАПИСЫВАТЬ ЗАПИСЬ И ОТПРАВИТЬ НА СЕРВЕР
      stopRecord() {
        const self = this;

        if (this.recorder) {
                  this.recorder.stopRecording(() => {
          const blob = self.recorder.getBlob();
          console.log(blob)
          const data = new FormData();

          data.append('video_file', blob, 'long.webm');

          console.log(data)
          console.warn(this.videoURL)
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
        } else {
          console.log('recorder not found')
        }


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
        console.log('operator handleRemoteStreamAdded')
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
      },
      getCallStatus() {
        return this.$store.state.callLogic.isCallInProgress
      },
    },
    watch: {
      async workStatus(val){
        try {
          console.log(val)
          if (val === 'online'){
            this.socket.emit('change_status', 'WAITING');
          } else if (val === 'break') {
            this.socket.emit('change_status', 'UNAVALIABLE');
          }
        } catch (e) {
        }
      },
      getCallStatus(val) {
        if (val) {
          this.interval = setInterval(() => {
            this.$store.commit('callLogic/incrementCallTime')
          }, 1000)
        } else {
          clearInterval(this.interval)

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

      // let f = await apiRequest.get( `/api/calls/`)
      // console.hideProto(f.data, 'all calls')
      // //
      // //
      // //
      // f = await apiRequest.get( `/api/calls/5efce7e86aa7f915db9edf87`)
      // console.hideProto(f.data, 'call by id')
      //
      // f = await apiRequest.get( `/api/devices/`)
      // console.hideProto(f.data, 'all terminal')
      //
      // f = await apiRequest.get( `/api/devices/dev`)
      // console.hideProto(f.data, 'terminal by id')

      try {

        await this.$store.dispatch('fetchUserData')
        // let userId = localStorage.getItem('userId') || sessionStorage.getItem('userId')
        // let f = await apiRequest.get( `/api/users/${userId}/calls/`)
        // console.hideProto(f.data, 'user calls')
        // f = await apiRequest.get( `/api/calls/`)
        // console.hideProto(f.data, 'all calls')
        // f = await apiRequest.get( `/api/devices/148_IvanovoSynergo`)
        // console.hideProto(f.data, 'terminal by id')


      } catch (e) {
        await this.$store.dispatch('logOut')
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
    padding-bottom: 15px;
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
