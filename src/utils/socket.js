import io from "../assets/js/socket.io";
import apiRequest from "./apiRequest";

export default {
  data(){
    return {
      recorder: null,
      socket: null,
      localStream: null,
      remoteStream: null,
      pc: null,
      queue: 0,// ОЧЕРЕДЬ ЗВОНКОВ
      callObjectId: null,
      messageText: ''
    }
  },
  methods: {
    initSocket(){
      this.socket = io.connect('https://calls-dev.enlighted.ru');

      this.calling.loop = true;

      this.socket.emit("entered", localStorage.getItem('username'), "operator", localStorage.getItem('callCenterId'));


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
        console.log(room);
        this.videoURL = room.videoURL
        this.videoToken = room.videoToken
        this.callObjectId = room.callObjectId

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
        let date = new Date()

        let hours = `${date.getHours()}`.length === 1 ? `0${date.getHours()}` : `${date.getHours()}`
        let minutes = `${date.getMinutes()}`.length === 1 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
        let seconds = `${date.getSeconds()}`.length === 1 ? `0${date.getSeconds()}` : `${date.getSeconds()}`

        this.$store.commit('callLogic/setEndTime', `${hours}:${minutes}:${seconds}`)

        this.$store.commit('callLogic/endCall')

        this.socket.emit('leave', callId, 'operator');
        this.socket.emit('change_status', 'UNAVALIABLE');

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
        this.queue = queue[localStorage.getItem('callCenterId')] ? queue[localStorage.getItem('callCenterId')] : 0;
      });

      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      }).then(this.gotStream).catch((e) => {
        console.log(e);
      });

      if (this.workStatus === 'online') {
        this.socket.emit('change_status', 'WAITING');
      } else {
        this.socket.emit('change_status', 'UNAVALIABLE');
      }

    }
  },

  async mounted() {
    // ЕСЛИ ПОЛЬЗОВАТЕЛЬ ОПЕРАТОР ВКЛЮЧАЕТСЯ ЛОГИКА ЗВОНКА
    if (this.isActiveWorkShift){
      this.initSocket()
    }
  },
  watch: {
    async isActiveWorkShift(val){
      console.log(val)
      if (sessionStorage.getItem('userType') || localStorage.getItem('userType') === 'operator') {
        if (val) {
          this.initSocket()
          this.socket.emit('change_status', 'WAITING');
        } else {
          this.socket.emit('change_status', 'UNAVALIABLE');
          this.socket = null
        }
      }
    }

  }
}
