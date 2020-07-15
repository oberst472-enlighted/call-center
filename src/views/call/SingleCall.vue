<template>
  <div id="SingleCall" v-if="call">
    <div class="header">
      <div class="header-text">Звонок #{{call.number}}</div>
    </div>
    <div class="body">
      <div class="body-left">
        <div class="time">
          <div class="time-date">{{dateCall}} МСК </div>
          <div class="time-call_time">{{startTime}} - {{endTime}}</div>
        </div>
        <div class="body-left-name">{{call.device.term.title}}</div>
        <div class="body-left-terminal">терминал #{{call.device.term.id}}</div>
        <div class="body-left-text">{{call.device.title}}</div>
        <div v-if="call.videoAvailable" class="body-left-status">Решено</div>
        <div v-else style="background-color: rgb(252, 239, 242); color: rgb(243, 115, 140); width: 100px;" class="body-left-status">Не принят</div>
        <div class="comment">
          <div class="comment-head" v-if="operator">
            <div class="comment-head-text">КОММЕНТАРИЙ ОПЕРАТОРА</div>
            <div class="comment-head-owner">
              <div>оператор # {{operator.number}}</div>
              <div>{{operator.firstName}} {{operator.lastName}}</div>
            </div>
          </div>
          <div class="comment-body" v-if="call.comment">
            <p>{{call.comment}}</p>
          </div>
        </div>
      </div>
      <div class="body-right" v-show="url">

        <video
                width="100%"
        />
        <div class="play_btn" @click="openModal">
          <img src="../../assets/icons/PlayWhite.png" alt="">
        </div>
      </div>
    </div>
    <div class="video-modal" v-show="modalStatus && url">
      <div class="video-modal-close">
        <img src="../../assets/icons/Close.png" alt="" @click="closeModal">
      </div>
      <div class="video-modal-viewport" v-show="url">
        <video
                width="100%"
                id="callVideo"
                controls
                :src="url"

        />
      </div>
    </div>
  </div>
</template>

<script>
  import forward from "../../components/UI/forward";
  import apiRequest from "../../utils/apiRequest";
  export default {
    name: "SingleCall",
    data(){
      return{
        call: null,
        operator: null,
        comment: null,
        modalStatus: false,
        videoStream: null,
        showVideo: false,
        player: null,
        url: null
      }
    },
    computed: {
      dateCall() {
        return this.call.startTime.split('T')[0].split('-').reverse().join('.')
      },
      startTime() {
        return this.call.startTime.split('T')[1].split('.')[0]
      },
      endTime() {
        return this.call.endTime.split('T')[1].split('.')[0]
      }
    },
    methods: {
      openModal() {
        this.modalStatus =true
      },
      closeModal() {
        this.modalStatus = false
        this.player.pause()
        this.player.currentTime = 0;
      },
    },
    components: { forward },
    async mounted() {
      this.call = (await apiRequest.get( `/api/calls/${this.$route.params.id}`)).data

      console.log(this.call.videoAvailable)
      this.operator = (await apiRequest.get(`/api/users/${this.call.operator}/`)).data.user


      if (this.call.videoAvailable) {
        try {
          let url = `http://188.43.103.251:8001/api/v1/videos/${this.call.videoId}/stream?token=841604f050f5e9ec8fcab0489358215f571d4965`
          this.player = document.getElementById('callVideo')
          this.url = url
          if (this.$route.query.open === 'yes'){
            this.openModal()
          }
        } catch (e) {}
      }


      // console.log(videojs)
      // let player = videojs('callVideo')
      //
      // player.src({
      //   src: 'http://vjs.zencdn.net/v/oceans.mp4',
      //   type: "video/mp4",
      //
      // });
      // console.dir(this.call.videoId)
      // videojs.xhr({
      //   url: `http://vjs.zencdn.net/v/oceans.mp4`,
      //   // headers: {
      //   //   'Authorization': "Token 841604f050f5e9ec8fcab0489358215f571d4965"
      //   // }
      // }, (err, response, body) => {
      //   if(err) throw err;
      //   if( response.statusCode === 200 ) {
      //     player.src(body)
      //     this.showVideo= true
      //   } else {
      //     console.error('EROOR')
      //     console.error(response)
      //   }
      // })





      // videojs.Hls.xhr.beforeRequest = function(options) {
      //   options.headers = {
      //     'Authorization': "Token 841604f050f5e9ec8fcab0489358215f571d4965"
      //   };
      //   return options;
      // };
      //
      // let player = videojs('callVideo');
      // player.src({
      //   src: `http://188.43.103.251:8001/api/v1/videos/${this.call.videoId}/stream`,
      //   type: 'video/webm'
      // });



    },
  }
</script>

<style lang='scss'>
#SingleCall{
  width: 100%;
  height: 429px;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  padding: 21px;
  .header{
    display: flex;
    align-items: center;
    &-icon-wrapper{
      height: 25px;
      width: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-right: 10px;
      transition: all ease .5s;
      border-radius: 50%;
    }
    &-icon-wrapper:hover{
      background-color: #e8eaf5;
    }
    &-text{
      color: #685c7b;
      font-size: 17px;
      font-weight: 500;
    }
  }
  .time{
    margin-bottom: 18px;
    opacity: 0.7;
    color: #65528b;
    font-size: 14px;
    font-weight: 500;
  }
  .body{
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    line-height: 19px;

    &-left{
      color: #4c3b60;
      font-size: 15px;
      font-weight: 700;
      line-height: 19px;
      padding-right: 19px;
      width: 50%;
      &-text{
        font-weight: 400;
      }
      &-status{
        margin-top: 10px;
        text-align: center;
        width: 70px;
        height: 17px;
        border-radius: 8px;
        background-color: #f2fcf4;
        color: #4fd161;
        font-size: 10px;
        font-weight: 700;
      }
    }
    &-right{
      padding-left: 19px;
      width: 50%;
      display: flex;
      align-items: center;
      position: relative;
      img{
        width: 50%;
        height: 50%;
      }
      .play_btn{
        position: absolute;
        width: 66px;
        height: 66px;
        background-color: #f04265;
        border-radius: 50%;
        cursor: pointer;
        left: calc(50% -  24px);
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 18px;
          height: 24px;
        }
        &:hover{
          transform: scale(1.03);
        }
      }
    }
  }
  .comment{
    .comment-head{
      margin-top: 26px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      &-text{
        opacity: 0.7;
        color: #685c7b;
        font-size: 11px;
        font-weight: 300;
      }
      &-owner{
        color: #4c3b60;
        font-size: 12px;
        font-weight: 700;
      }
    }
    &-body{
      margin-top: 15px;
      padding: 16px;
      border-radius: 8px;
      background-color: #f3f1f6;
      p{
        opacity: 1;
        color: #4c3b60;
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 5px;
      }
    }
  }
  .video-modal{
    top: 0;
    left: 0;
    position: fixed;
    min-height: 100vh;
    min-width: 100vw;
    background-color: rgba(1, 1, 1, 0.73);
    display: flex;
    flex-direction: column;
    justify-content: center;
    &-close{
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 5px;
      cursor: pointer;
    }
    &-viewport{
      width: 80%;
      margin: 0 auto;
      height: 100%;
      img{
        height: 300px;
        width: 50%;
        object-fit: cover;
      }
    }
  }
}
</style>
