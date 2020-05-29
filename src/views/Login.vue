<template>
  <div id="Login">
    <div class="header">
      <img src="../assets/icons/Chat.svg" alt="" class="header-chat">
      <div class="header-text">
        <div class="header-text__top">Вход в колл-центр</div>
        <div class="header-text__bottom">Введите свои данные</div>
      </div>
    </div>
    <div class="inputs">
      <div class="input">
        <div class="input-icon">
          <img src="../assets/icons/userSmall.png" alt="">
        </div>
        <input class="input-field" type="text" v-model="login"/>
      </div>
      <div class="input">
        <div class="input-icon" @click="togglePassType">
          <img src="../assets/icons/key.png" alt="">
        </div>
        <input class="input-field" :type="passType" v-model="password"/>
      </div>
    </div>
    <div class="checkbox">
      <input type="checkbox" name="option4" value="a4" v-model="rememberMe">Запомнить меня
      <span class="checkmark" @click="rememberMe = !rememberMe" :class="{active: rememberMe}"></span>
    </div>
    <button class="button" @click="submitRegistration" :disabled="!login || !password">Войти</button>
    <div class="bottom">
      <div class="bottom__top" @click="askForAccount">
        Нет аккаунта? Запросить
      </div>
      <div class="bottom__bottom" @click="forgotPassword">
        Забыл пароль?
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return {
        passType: 'password',
        login: "login",
        password: "password",
        rememberMe: false
      }
    },
    methods: {
      togglePassType(){
        if (this.passType === 'password'){
          this.passType = 'text'
        } else {
          this.passType = 'password'
        }
      },
      submitRegistration() {
        console.log(`${this.login}----${this.password}`)
      },
      forgotPassword(){
        alert("FORGOT PASSWORD ??????")
      },
      askForAccount(){
        alert("ASKING FOR PASSWORD ??????")
      }
    }
  }
</script>

<style lang='scss'>
  #Login{
    width: 430px;
    height: 409px;
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
      input{
        position: relative;
        opacity: 0;
        margin-right: 10px;
      }
      .checkmark {
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: #f4f3f7;
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
      width: 100px;
      height: 33px;
      border-radius: 8px;
      background-color: #66538a;
      margin-left: 235px;
      color: #ffffff;
      font-size: 12px;
      font-weight: 400;
      outline: none;
      border: none;
      margin-bottom: 40px;
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
  }
</style>
