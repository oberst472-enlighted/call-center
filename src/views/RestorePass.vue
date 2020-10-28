<template>
  <div id="RestorePass">
<!--    <div class="log adm" @click="loginAdmin">login AS ADMIN</div>-->
<!--    <div class="log operator" @click="loginOperator">login AS OPERATOR</div>-->
    <div class="header">
      <img src="../assets/icons/Chat.svg" alt="" class="header-chat">
      <div class="header-text">
        <div class="header-text__top">Востановление пароля</div>
        <div class="header-text__bottom">Введите свой email</div>
      </div>
    </div>
    <div class="error-text" :style="messageType ? 'opacity: 1' : 'opacity: 0'">
      <div style="color: green; min-height: 26px" v-if="messageType === 'success'">Запрос на восстановление пароля успешно создан. Ответ поступит Вам на почту.</div>
      <div style="color: red; min-height: 26px" v-else-if="messageType === 'userNotFound'">Пользователя с таким логином не найдено.</div>
      <div style="color: red; min-height: 26px" v-else-if="messageType === 'hasBeenSend'">Запрос уже был отправлен, ожидайте ответа.</div>
      <div style="color: red; min-height: 26px" v-else />
    </div>
    <div class="inputs">
      <div class="input">
        <div class="input-icon">
          <img src="../assets/icons/userSmall.png" alt="">
        </div>
        <input class="input-field" type="text" v-model="login"/>
      </div>
    </div>
    <button
            class="button"
            :disabled="!login"
            @click="submitRestore"
    >
      Запросить новый пароль
    </button>
    <div class="bottom">
      <div class="bottom__bottom" @click="$router.push('login')">
        Назад
      </div>
    </div>
  </div>
</template>

<script>
  import apiRequest from "../utils/apiRequest";

  export default {
    name: "RestorePass",
    data(){
      return {
        login: "",
        messageType: '',
      }
    },

    metaInfo() {
      return {
        title: `Запрос на востановление пароля`
      }
    },
    methods: {
      async submitRestore() {
        try {
          let resp = await apiRequest.post('/api/users/reset-password/', {
            login: this.login
          })

          console.log(resp)
          this.messageType = 'success'

        } catch (e) {
          if (e.response.status === 404) {
            this.messageType = 'userNotFound'
          } else if (e.response.status === 400) {
            this.messageType = 'hasBeenSend'
          }
        }

      },
    }
  }
</script>

<style lang='scss'>
  #RestorePass{
    .log{
      width: 250px;
      height: 50px;
      position: fixed;
      color: white;
      font-weight: 700;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      left: 10px;
      cursor: pointer;
    }
    .operator{
      background-color: #3e58fe;
      top: 40%;
    }
    .adm{
      background-color: #4a4355;
      top: 50%;

    }
    width: 430px;
    height: 340px;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    border-radius: 8px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 35px 48px;
    .header{
      display: flex;
      &-chat{
        margin-right: 18px;
      }
      &-text{
        &__top{
          color: #362b4f;
          font-size: 17px;
          font-weight: 400;
        }
        &__bottom{
          color: #cfcbd5;
          font-size: 15px;
          font-weight: 400;
        }
      }
    }
    .inputs{
      margin-top: 30px;
      .input{
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
    .checkbox{
      display: flex;
      align-items: center;
      color: #4e545b;
      font-size: 12px;
      font-weight: 400;
      cursor: pointer;
      .checkmark {
        width: 18px;
        height: 18px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: #f4f3f7;
        cursor: pointer;
      }
      .checkmark:hover {
        background-color: #ccc;
      }
      .checkmark.active{
        background-color: #4caf50;
      }
    }
    .button{
      display: block;
      align-self: end;
      width: 180px;
      height: 33px;
      border-radius: 8px;
      background-color: #66538a;
      margin-left: 155px;
      color: #ffffff;
      font-size: 12px;
      font-weight: 400;
      outline: none;
      border: none;
      margin-bottom: 40px;
      cursor: pointer;
      &:disabled{
        background-color: #2e2e2e;
      }
      &:hover{
        transform: scale(1.03);
      }
      &:disabled:hover{
        transform: scale(1);
      }
    }
    .bottom{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      .bottom__top, .bottom__bottom{
        color: #4e545b;
        font-size: 12px;
        font-weight: 400;
        cursor: pointer;
      }
    }
    .error-text{
      margin-top: 15px;
      color: red;
      text-align: center;
      font-size: 13px;
    }
  }
</style>
