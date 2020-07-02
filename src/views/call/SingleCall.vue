<template>
  <div id="SingleCall" v-if="call">
    <div class="header">
      <div class="header-text">Звонок #{{call.__v}}</div>
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
        <div class="body-left-status">Решено</div>
        <div class="comment">
          <div class="comment-head" v-if="operator">
            <div class="comment-head-text">КОММЕНТАРИЙ ОПЕРАТОРА</div>
            <div class="comment-head-owner">
              <div>оператор # {{operator.number}}</div>
              <div>{{operator.firstName}} {{operator.lastName}}</div>
            </div>
          </div>
          <div class="comment-body">
            <p>Пассажиру нужна медицинская помощь, вызвала бригаду на вокзал</p>
            <p>Бригада приехала</p>
          </div>
        </div>
      </div>
      <div class="body-right">

        <video v-if="videoStream">
          <source :src="videoStream">
        </video>
        <div class="play_btn" @click="toggleModalStatus">
          <img src="../../assets/icons/PlayWhite.png" alt="">
        </div>
      </div>
    </div>
    <div class="video-modal" v-if="modalStatus">
      <div class="video-modal-close">
        <img src="../../assets/icons/Close.png" alt="" @click="toggleModalStatus">
      </div>
      <div class="video-modal-viewport">
        <img src="../../assets/images/call1.png" alt="">
        <img src="../../assets/images/admin2.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import forward from "../../components/UI/forward";
  import apiRequest from "../../utils/apiRequest";
  export default {
    name: "SingleTerminal",
    data(){
      return{
        call: null,
        operator: null,
        modalStatus: false,
        videoStream: null
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
      toggleModalStatus() {
        this.modalStatus =! this.modalStatus
      },
    },
    components: { forward },
    async mounted() {
      this.call = (await apiRequest.get( `/api/calls/${this.$route.params.id}`)).data
      console.hideProto(this.call, 'call by id')
      this.operator = (await apiRequest.get(`/api/users/${this.call.operator}/`)).data.user

      try {
        let response = await apiRequest.getVideo(`https://188.43.103.251:8001/api/v1/videos/${this.call.videoId}/stream`)
        console.log(response)
        this.videoStream = response
        console.log(this.videoStream)
      } catch (e) {
        console.log(e)
      }


      if (this.$route.query.open === 'yes'){
        this.modalStatus = true
      }
    }
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
