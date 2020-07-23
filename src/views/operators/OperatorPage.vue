<template>
  <div id="OperatorPage">
    <div class="body" v-if="operator">
      <div class="body-left">
        <div>
          <div class="header">
            <div class="header-text">Оператор # {{operator.number}}</div>
          </div>
          <div class="user">
            <img :src="operator.photo? `https://calls-dev.enlighted.ru${operator.photo}` : require('../../assets/images/user2.png')" alt="" class="user-avatar">
            <div class="user-box">
              <div class="user-box-status" :style="statusStyle">{{statusText}}</div>
              <div class="user-box-name">{{operator.firstName}}</div>
              <div class="user-box-name">{{operator.lastName}}</div>
              <div class="user-box-contacts" style="margin-bottom: 15px">{{langs.join(", ")}}</div>
              <div class="user-box-contacts">{{operator.email}}</div>
              <div class="user-box-contacts">{{operator.phone}}</div>
            </div>
          </div>
<!--          ../../assets/images/user2.png-->
        </div>
        <div class="btn-group">
          <div class="button" @click="$router.push(`/operator-list/${operator._id}/edit`)">Изменить</div>
          <div class="button block" v-if="operator.isActive" @click="blockOperator">Блокировать оператора</div>
          <div class="button block" v-else style="background-color: #4fd161" @click="unblockOperator">Разлокировать оператора</div>
        </div>
      </div>
      <div class="body-right">
        <div class="head">
          <div class="head-headers">
            <div class="head-headers-main">История звонков</div>
            <div class="head-headers-secondary">Оператор # {{operator.number}}</div>
          </div>
        </div>
        <div class="calls-list">
          <callInHistory v-for="(call, index) in calls" :key="index" :data="call"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import callInHistory from "../../components/views/components/callInHistory";
  import apiRequest from "../../utils/apiRequest";
  export default {
    name: "OperatorPage",
    components: {callInHistory},
    data() {
      return {
        operator: null,
        calls: null,
        langs: []
      }
    },

    metaInfo() {
      return {
        title: `Оператор ${this.operatorName} - Колл-центр ${localStorage.getItem('callCenterId') || sessionStorage.getItem('callCenterId')}`
      }
    },
    methods: {
      async blockOperator(){
        await apiRequest.patch(`/api/users/${this.$route.params.id}`, {
          isActive: false
        })
        await this.fetchUser()
      },
      async unblockOperator(){
        await apiRequest.patch(`/api/users/${this.$route.params.id}`, {
          isActive: true
        })
        await this.fetchUser()
      },
      async fetchUser() {
        try {
          this.operator = (await apiRequest.get( `/api/users/${this.$route.params.id}`)).data.user
          let languages = (await apiRequest.get( '/api/langs/')).data
          this.langs =[]
          this.operator.langs.forEach(langOperator => {
            languages.forEach(lang => {
              if (langOperator === lang._id) {
                this.langs.push(lang.title)
              }
            })
          })
          this.calls = (await apiRequest.get( `/api/users/${this.$route.params.id}/calls/`)).data
        } catch (e) {}
      }
    },
    computed: {
      operatorName(){
        return this.operator ? `${this.operator.firstName} ${this.operator.lastName}` : ''
      },
      statusText() {
        if (this.operator.status === 'OFFLINE') {
          return 'Не онлайн'
        } else if (this.operator.status === 'BREAK') {
          return 'Перерыв'
        } else if (this.operator.status === 'IN_CALL') {
          return 'Занят'
        } else {
          return 'Свободен'
        }
      },
      statusStyle() {
        if (this.operator.status === 'OFFLINE') {
          return 'background-color: #fceff2; color: #f04265;'
        } else if (this.operator.status === 'BREAK') {
          return 'background-color: #f2f9fc; color: #3e58ff;'
        } else if (this.operator.status === 'IN_CALL') {
          return 'background-color: #f7f1ff; color: #65528b;'
        } else {
          return ''
        }
      },
    },
    async mounted() {
      await this.fetchUser()
    }
  }
</script>

<style lang='scss'>
#OperatorPage{
  width: 100%;
  height: 573px;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
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
  .body{
    height: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 19px;
    &-left{
      padding: 21px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-right{
      width: 257px;
      overflow: auto;
      padding: 15px 0;
      padding-left: 27px;
      border-left: 1px solid #efeff4;

      .head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        &-headers{
          &-main{
            color: #685c7b;
            font-size: 17px;
            font-weight: 500;
          }
          &-secondary{
            color: #cfcbd5;
            font-size: 14px;
            font-weight: 400;
          }
        }
      }
      .call_in_history{
        margin-right: 13px;
      }
    }
  }
  .user{
    margin-top: 32px;
    display: flex;
    &-avatar{
      border-radius: 50%;
      width: 110px;
      height: 110px;
      margin-right: 20px;
    }
    &-box{
      &-status{
        text-align: center;
        color: #4fd161;
        font-size: 10px;
        font-weight: 700;
        width: 100px;
        height: 17px;
        border-radius: 8px;
        background-color: #f2fcf4;
        margin-bottom: 15px;
      }
      &-name{
        font-size: 19px;
        font-weight: 700;
        line-height: 23px;
      }
      &-contacts{
        color: #4c3b60;
        font-size: 15px;
        font-weight: 400;
      }
    }
  }
  .btn-group{
    display: flex;
    .button{
      height: 33px;
      border-radius: 8px;
      background-color: #66538a;
      color: #ffffff;
      font-size: 12px;
      font-weight: 400;
      padding: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 11px;
      transition: all ease .5s;
      cursor: pointer;
    }
    .button:hover{
      transform: scale(1.05);
    }
    .button.block{
      background-color: #f04265;
    }
  }
}
</style>
