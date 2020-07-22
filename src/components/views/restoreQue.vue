<template>
  <div id="restoreQue">
    <div class="head">
      <div class="head-headers">
        <div class="head-headers-main">Запросы на смену пароля</div>
      </div>
    </div>
    <div class="calls-list" v-if="requestsList.length > 0">
      <div v-for="(request, index) in requestsList" :key="index">
        <div style="display: flex; justify-content: space-between; height: 25px; align-items: center; width: 90%; margin: 0 auto">
          <div>{{request.user.username}}</div>
          <div>{{getDate(request.createTime)}}</div>
        </div>
        <div class="button" @click.stop="openRequestModal(request)">Добавить</div>

      </div>
<!--      <userInHistory v-for="operator in operators" :key="operator._id" :data="operator"/>-->
    </div>
    <div v-else style="text-align: center">Актуальных запросов нет</div>
    <div class="requestModal" v-if="popupActive === `request`" @click.stop>
      <div class="header">Изменение пароля для {{requestSelected.user.username}}</div>

      <div class="input">
        <div class="input-icon">
          <img src="../../assets/icons/key.png" alt="">
        </div>
        <input class="input-field" type="text" v-model="newPassword"/>
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 20px">
        <button class="button" @click.stop="generatePass" style="width: 45%">Cгенерировать пароль</button>
        <button class="button green" :disabled="!(newPassword.length > 2)" @click.stop="sendRequest" style="width: 45%">Изменить пароль</button>
      </div>
<!--      {{requestSelected}}-->
    </div>
  </div>
</template>

<script>
  import userInHistory from "./components/userInHistory";
  import apiRequest from "../../utils/apiRequest";
  export default {
    name: "restoreQue",
    components: {userInHistory},
    data() {
      return {
        requestsList: [],
        requestSelected: null,
        newPassword: ''
      }
    },
    methods: {
      openRequestModal(request){
        this.requestSelected = request
        this.$store.dispatch('popup/setPopup', `request`)
      },
      generatePass(){
        this.newPassword = Math.random().toString(36).slice(-8)
      },
      async sendRequest(){
        try {
          let resp = await apiRequest.post('/api/users/set-password', {
            login: this.requestSelected.user.username,
            password: this.newPassword
          })
          console.log(resp)
          this.$store.commit('popup/cleanPopup')
          this.requestsList = (await apiRequest.get('/api/users//recovery-requests/')).data

        } catch (e) {

        }



      },
      getDate(val){
        let dateDays = val.split('T')[0].split('-').reverse().join('.');
        let date = new Date(val)
        let hours = `${date.getHours()}`.length === 1 ? `0${date.getHours()}` : `${date.getHours()}`
        let minutes = `${date.getMinutes()}`.length === 1 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
        let seconds = `${date.getSeconds()}`.length === 1 ? `0${date.getSeconds()}` : `${date.getSeconds()}`

        let time = `${hours}:${minutes}:${seconds}`
        console.log(dateDays)
        console.log(time)
        return `${time} ${dateDays}`
      }
    },
    watch:{
      popupActive(val) {
        if (val !== 'request') {
          this.requestSelected = null
          this.newPassword = ''
        }
      }
    },
    computed: {
      popupActive() {
        return this.$store.state.popup.popupActive
      }
    },
    async created(){
      try {
        this.requestsList = (await apiRequest.get('/api/users//recovery-requests/')).data

        console.hideProto(this.requestsList)
      } catch (e) {}
    }
  }
</script>

<style lang='scss'>
  #restoreQue{
    margin-top: 20px;
    width: 100%;
    box-shadow: 0 0 10px rgba(120, 131, 132, 0.12);
    border-radius: 8px;
    background-color: #ffffff;
    padding: 21px;
    max-height: calc(100vh - 15px);
    overflow: auto;
    .button{
      margin: 0 auto;
      width: 90%;
      height: 35px;
      border-radius: 8px;
      background-color: #f4f3f7;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #65528b;
      font-size: 12px;
      font-weight: 400;
      cursor: pointer;
      transition: all ease 0.3s;
      outline: none;
      border: none;
      &:hover{
        transform: scale(1.02);
      }
      &:disabled{
        background-color: #2e2e2e;
        color: white;
      }
    }

    .green{
      background-color: #4fd161;
      color: white;
    }
    .head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      &-headers-main{
        color: #685c7b;
        font-size: 17px;
        font-weight: 500;
      }
      &-headers-secondary{
        color: #cfcbd5;
        font-size: 14px;
        font-weight: 400;
      }
    }

    .requestModal{
      position: fixed;
      top: calc(50% - 100px);
      left: calc(50% - 250px);
      height: 200px;
      width: 500px;
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      background-color: #f9f9f9;
      padding: 30px;
      .header{
        color: #685c7b;
        font-size: 17px;
        font-weight: 500;
      }
      .input{
        margin-top: 20px;
        display: flex;
        margin-bottom: 17px;
        &-icon{
          width: 39px;
          height: 39px;
          border-radius: 8px 0 0 8px;
          background-color: #f4f3f7;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &-field{
          flex: 1 1 auto;
          height: 39px;
          border-radius: 0 8px 8px 0;
          border: 1px solid #dddddd;
          outline: none;
          padding: 0 13px;
        }
      }


    }
  }
</style>
