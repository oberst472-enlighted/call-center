<template>
    <div>
        <button @click="onCallBtnClick">call</button>
        <video id="localVideo" ref="localVideo" autoplay playsinline></video>
    </div>
</template>

<script>
  import io from '../assets/js/socket.io';
  import {baseAppUrl} from '../utils/const';
  export default {
    data() {
      return {
        socket: null,
        localStream: null,
        pc: null
      }
    },
    methods: {
      onCallBtnClick() {
        navigator.mediaDevices.getUserMedia({video: true,})
          .then(this.gotStream).then(()=> {
          this.pc.addStream(this.localStream);
          this.socket.emit('entered', 'device_dev', 'client', '5f27c73e7d3d922016819535')

        })

        // this.socket.emit('entered', {
        //   id: 'device_dev',
        //   type: 'client',
        //   callCenterId: '5f119d7ee6b5a61d04e7cba9'
        // })
      },
      gotStream(stream) {
        this.$refs.localVideo.srcObject = stream
        this.localStream = stream;
        this.sendMessage('got user media');
      },
      sendMessage(message) {
        this.socket.emit('message', message);
      },
      handleIceCandidate() {
        console.log('handleIceCandidate')
      },
      handleRemoteStreamAdded() {
        console.log('handleRemoteStreamAdded')
      },
      setRTC() {

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

        this.pc.addEventListener('icecandidate', this.handleConnection);
        this.pc.addEventListener(
          'iceconnectionstatechange', this.handleConnectionChange);

      },
      createdOffer(description) {
        console.log(description);
        this.pc.setLocalDescription(description)
          .then(() => {
            this.socket.emit('message', description)
            // setLocalDescriptionSuccess(localPeerConnection);
          }).catch( e => {
            console.log(e);
        });
      },
      handleConnection(event) {
        console.log(event);
        console.log('handleConnection')
      },
      handleConnectionChange() {
        console.log('handleConnectionChange')
      }
    },
    mounted() {
      this.socket = io.connect(baseAppUrl);
      this.setRTC()



      //
      //
      // this.socket.emit('entered', 'device_dev', 'client', '5f119d7ee6b5a61d04e7cba9')
      //
      // console.log(this.socket)
      //
      this.socket.on('has_operator', (roomId) => {
        console.log(roomId)
        console.log('has_operator')
        this.socket.emit('join', roomId, 'client');


        this.socket.emit('calling')
        this.socket.emit('message', 'test message')
      });
      //
      //
      //
      this.socket.on('boarding_completed', () => {
        this.pc.createOffer({offerToReceiveVideo: 1,})
          .then(this.createdOffer)
      });
      //
      this.socket.on('receiverReadyToCall', data => {
        console.log('receiverReadyToCall');
        console.log(data);
      })
      //
      this.socket.on('message', m => {
        console.log('message from operator: ')
        console.log(m)
      })


    }
  }
</script>