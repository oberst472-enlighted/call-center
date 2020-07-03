<template>
  <div id="CallPage">
<!--    <div style="position: fixed; top: 50%; left: 0; width: 100px; height: 100px; background-color: orange; z-index: 99999" @click="answerCall"></div>-->
    <div class="viewport" :class="{'call-active': $store.state.callLogic.isCallInProgress}">
      <video
              id="remoteVideo"
              ref="remoteVideo"
              autoplay
              v-show="$store.state.callLogic.isCallInProgress"
      />

      <div class="viewport-call" v-show="!$store.state.callLogic.isCallInProgress">
        <div class="viewport-call-status">ЗВОНОК ЗАВЕРШЕН</div>
        <div class="viewport-call-status">ПАССАЖИРОМ</div>
        <div
                class="viewport-call-button"
                @click="closeModal()"
        >ПРОДОЛЖИТЬ РАБОТУ</div>
        <div class="viewport-call-time">00:00:10</div>
      </div>
      <div class="viewport-call" v-show="$store.state.callLogic.isCallInProgress">
        <video
                class="viewport-call-admin"
                id="localVideo"
                autoplay muted
                v-show="$store.state.callLogic.isCallInProgress"
        />
      </div>
    </div>
    <div class="sidebar" :class="{'call-active': $store.state.callLogic.isCallInProgress}">
      <div class="call-window">
        <div class="call-window-head">
          <div class="call-window-head-new">НОВЫЙ ЗВОНОК <span>РУССКИЙ</span></div>
          <div class="call-window-head-name">Казанский Вокзал</div>
          <div class="call-window-head-terminal">терминал #3462</div>
          <div class="call-window-head-terminal">кассы</div>
        </div>
        <div class="call-window-bottom" v-if="$store.state.callLogic.isCallInProgress">
          <div class="call-window-bottom-endcall" @click="hangup">
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
          <img src="../../assets/icons/Telephone.png" style="margin-right: 15px" alt="">
          ЗВОНОК ЗАВЕРШЕН
        </div>
      </div>
      <div class="col">
        <div class="call-timer">
          <div class="call-timer-header">ПРОДОЛЖИТЕЛЬНОСТЬ ЗВОНКА</div>

          <div class="call-timer-wrapper" v-if="$store.state.callLogic.isCallInProgress">
            <div class="call-timer-time">00:01:13</div>
          </div>

          <div class="call-timer-wrapper" v-else>
            <div class="call-timer-date">21.05.2020</div>
            <div class="call-timer-time">10:32:12 - 10:33:31</div>
          </div>
        </div>
<!--        <div class="call-status">-->
<!--          <div class="call-status-header">СТАТУС ЗВОНКА</div>-->
<!--          <div class="call-status-buttons">-->
<!--            <div-->
<!--                    class="call-status-button"-->
<!--                    :class="{active : status==='solved'}"-->
<!--                    @click="toggleStatus('solved')"-->
<!--            >-->
<!--              Решено-->
<!--            </div>-->
<!--            <div-->
<!--                    class="call-status-button red"-->
<!--                    :class="{active : status==='unsolved'}"-->
<!--                    @click="toggleStatus('unsolved')">-->
<!--              Не могу помочь-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="call-chat">
          <div class="call-chat-header">КОММЕНТАРИЙ ОПЕРАТОРА</div>
          <div class="call-chat-box">
            <textarea class="call-chat-box__inner" v-model="message" />

            <div class="call-chat-box-bottom">сохранено</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RecordRTC from 'recordrtc';
  import axios from 'axios';
  import io from '../../assets/js/socket.io'
  export default {
    name: "CallPage",
    props: {
      hangup: Function,
      closeModal: Function,
      messageText: String,
    },

    computed:{
      message: {
        // геттер:
        get: function () {
          return this.$store.state.callLogic.messageText
        },
        // сеттер:
        set: function (newValue) {
          this.$store.commit('callLogic/setMessage', newValue)
        }
      }
    },
    methods: {
      toggleStatus(type) {
        if (type === this.status) return
        if (this.status === 'solved') {
          this.status = 'unsolved'
        } else {
          this.status = 'solved'
        }
      }
    },

    data() {
      return {
        status: null,
      }
    }
  }
</script>

<style lang='scss'>
  #CallPage{
    position: fixed;
    top: 0;
    z-index: 10;
    min-width: 100vw;
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
          z-index: 1000;
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
      position: absolute;
      top: 0;
      width: 100%;
      height: 100vh;
      z-index: 999;
    }
  }
</style>
