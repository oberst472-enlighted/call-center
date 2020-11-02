<template>
  <div id="Header">
    <div class="nav">
      <div v-if="$store.state.userStatus === 'operator'" class="nav-left">
        <forward v-if="$route.meta.gotForward"/>
        <div
            class="btn-toggler"
            v-if="$store.state.isActiveWorkShift"
        >
          <button
              class="btn-toggler-btn nav-btn"
              :class="{active : workStatus==='online'}"
              @click="toggleMode('online')">
            Онлайн
          </button>
          <button
              class="btn-toggler-btn nav-btn"
              :class="{active : workStatus==='break'}"
              @click="toggleMode('break')">
            Перерыв
          </button>
        </div>
        <div
            class="time"
            v-if="$store.state.isActiveWorkShift"
        >
          {{formatTime}}
        </div>
        <button
            class="close-session nav-btn"
            v-if="!$store.state.isActiveWorkShift"
            @click="startSession"
            style="background-color: #4fd161"
        >
          Начать смену
        </button>
        <button
            class="close-session nav-btn"
            v-else
            @click="closeSession"
        >
          Завершить смену
        </button>
      </div>
      <div  v-else-if="$store.state.userStatus === 'admin'">
        <forward v-if="$route.meta.gotForward"/>
        <div v-else class="dash-nav-buttons">
          <div style="cursor: pointer" class="button" @click="$router.push('/create-operator')">Добавить сотрудника</div>
          <!--          <div  style="cursor: pointer" class="button" @click="$router.push('/add-language')">Добавить язык</div>-->
        </div>
      </div>

      <div
          class="nav-right"
          @click.stop="$store.dispatch('popup/setPopup', 'user')"
      >
        <div
            class="user"
            v-if="userData"
        >
          <div class="user-info">
            <div class="user-name">{{ userData.user.firstName }} {{ userData.user.lastName }}</div>
            <div class="user-operator" v-if="$store.state.userStatus === 'admin'">администратор</div>
            <div class="user-operator" v-else>оператор # <span>{{ userData.user.number }}</span></div>
          </div>
          <div class="user-avatar">
            <img
                :src="userData.photo ? `https://calls-dev.enlighted.ru${userData.photo}` : require('@/assets/icons/User.svg')"
                alt=""
            >
          </div>
        </div>
        <div
            class="popup"
            :class="{active : $store.state.popup.popupActive === `user`}"
        >
          <div class="popup-item" @click="logOut">Выйти</div>
          <template v-if="userData">
            <div v-if="userData.user.userType === 'OPERATOR'" class="popup-item" @click="onEditProfileClick">Редактировать</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import forward from "@/components/ui/forward";
import apiRequest from "@/utils/apiRequest";
export default {
  name: "Header",
  data() {
    return {
      activeMod: 'online'
    }
  },
  components: {forward},
  computed: {
    userData() {
      return this.$store.state.userData
    },
    formatTime() {
      let pad = function(num, size) { return ('000' + num).slice(size * -1); }
      let time = parseFloat(this.$store.state.totalTime).toFixed(3)
      let hours = Math.floor(time / 60 / 60)
      let minutes = Math.floor(time / 60) % 60
      let seconds = Math.floor(time - minutes * 60)
      return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2)
    },
    workStatus() {
      return this.$store.state.workStatus
    }

  },
  mounted() {
    setInterval(() => {
      this.timeNow = new Date()
    }, 1000)
  },
  methods: {
    toggleMode(type) {
      this.$store.commit('toggleWorkingStatus', type)
    },
    async startSession(){
      try {
        if (!this.$store.state.isActiveWorkShift) {
          await apiRequest.patch(`/api/users/${localStorage.getItem('userId')}/start-session/`)
          this.$store.dispatch('startWorkShift')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async closeSession(){
      try {
        if (this.$store.state.isActiveWorkShift) {
          await apiRequest.patch(`/api/users/${localStorage.getItem('userId')}/stop-session/`)
        }
      } catch (e) {
      }
      console.log(`Вы закончили работу. Проработано ${this.$store.state.totalTime} секунд. Или ${this.formatTime}`)
      this.$store.dispatch('endWorkShift')
    },
    async logOut(){
      try {
        if (this.$store.state.isActiveWorkShift) {
          await apiRequest.patch(`/api/users/${localStorage.getItem('userId')}/stop-session/`)
        }
      } catch (e) {}

      this.$store.dispatch('endWorkShift')
      this.$store.dispatch('logOut')
      this.$router.push('/login')
    },
    onEditProfileClick() {
      this.$router.push('/profile')
    }
  }
}
</script>

<style lang='scss' scoped>
#Header{
  min-height: 83px;
  width: 100%;
  padding: 25px 0;
  .popup{
    display: block;
    position: absolute;
    left: 50px;
    top: 80%;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    border-radius: 8px;
    background-color: #ffffff;
    z-index: 15;
    overflow: hidden;
    width: 0;
    height: 0;
    transition: height ease 0.5s;
    &-item{
      width: 100%;
      height: 33px;
      color: #4c3b60;
      font-size: 12px;
      font-weight: 400;
      line-height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    &-item:hover{
      background-color: #f4f3f7;
    }
  }
  .popup.active{
    width: 100px;
    transition: height ease 0.5s;
    z-index: 99;
    height: 66px;
  }
  .nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-right{
      position: relative;
      cursor: pointer;
    }
    &-btn{
      height: 33px;
      border-radius: 8px;
      border: none;
      padding: 0 15px;
      outline: none;
      color: #ffffff;
      font-size: 12px;
      font-weight: 400;
      background-color: inherit;
      cursor: pointer;
    }
    &-left{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .user{
    display: flex;
    &-info{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
    }
    &-name{
      line-height: 12px;
      font-size: 12px;
      font-weight: 700;
    }
    &-operator{
      line-height: 12px;
      font-size: 12px;
      font-weight: 400;
    }
    &-avatar{
      margin-left: 5px;
    }
  }
  .btn-toggler{
    &-btn:first-child{
      border: 1px solid #3e58fe;
      border-radius: 8px 0 0 8px;
      color: #3e58fe;
      border-right: none;

    }
    &-btn:first-child.active{
      border: none;
      background-color: #3e58fe;
      color: #ffffff;
    }
    &-btn:last-child{
      border: 1px solid #4fd161;
      border-radius: 0 8px 8px 0;
      color: #4fd161;
      border-left: none;

    }
    &-btn:last-child.active{
      border: none;
      background-color: #4fd161;
      color: #22252a;
    }
  }
  .time{
    width: 115px;
    margin: 0 18px;
    text-align: center;
    color: #4c3b60;
    font-size: 20px;
    font-weight: 400;
  }
  .close-session{
    background-color: #f04265;
  }
  .dash-nav-buttons{
    display: flex;
    align-items: center;
    .button{
      height: 33px;
      border-radius: 8px;
      background-color: #66538a;
      color: #ffffff;
      font-size: 12px;
      font-weight: 400;
      margin-right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      cursor: pointer;
      &:hover{
        transform: scale(1.03);
      }
    }
  }
}
</style>
