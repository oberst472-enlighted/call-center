import io from "../assets/js/socket.io";
import apiRequest from "./apiRequest";

export default {
  data(){
    return {
      localStream: null,
      pc: null,
      remoteStream: null,
      callCenterId: 'dev',    }
  },
  methods: {
    initSocket(){
      let userId = 'dev';

      this.socket = io.connect('https://calls-dev.enlighted.ru');
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
        console.log(room);
        this.videoURL = room.videoURL
        this.videoToken = room.videoToken

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
        this.$store.commit('callLogic/endCall')

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
      this.socket.emit('change_status', 'WAITING');

    }
  },

  async mounted() {
    // ЕСЛИ ПОЛЬЗОВАТЕЛЬ ОПЕРАТОР ВКЛЮЧАЕТСЯ ЛОГИКА ЗВОНКА
    try {
      let d = await apiRequest.get( '/api/users/')
      console.log(d.data)
    } catch (e) {}

    try {
      let f = await apiRequest.get( `/api/users/5ee2142cd7fa8f68055a2089`)
      console.log(f.data.user)
    } catch (e) {}

    try {
      let f = await apiRequest.get( '/api/callcenters/')
      console.log(f.data)
    } catch (e) {}

    try {
      let f = await apiRequest.get( '/api/callcenters/')
      console.log(f.data)
    } catch (e) {}


    if (this.isActiveWorkShift && this.workStatus === 'online'){
      this.initSocket()
    }
  },
  watch: {
    async isActiveWorkShift(val){
      console.log(val)
      if (sessionStorage.getItem('userType') || localStorage.getItem('userType') === 'operator') {
        if (val) {
          this.initSocket()
        } else {
          this.socket = null
        }
      }
    }

  }
}
