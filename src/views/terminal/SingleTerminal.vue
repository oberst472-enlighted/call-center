<template>
  <div id="SingleTerminal" v-if="terminal && terminal !== 'not found'">
    <div class="header">
      <div class="header-text">Терминал # {{terminal.term.id}}</div>
    </div>
    <div class="body">
      <div class="body-left">
        <div class="body-left-name">{{terminal.term.title}}</div>
<!--        <div class="body-left-terminal">терминал # {{terminal.term.id}}</div>-->
        <div class="body-left-text">{{terminal.title}}</div>
        <div
                :style="!terminal.online ? 'background-color: #fceff2; color: #f3738c': ''"
                class="body-left-status"
        >
          {{ terminal.online? 'Онлайн': 'Не доступен'}}
        </div>
      </div>
      <div class="body-right" v-if="terminal.picture">
        <img :src="`https://calls-dev.enlighted.ru${terminal.picture}`" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import forward from "../../components/UI/forward";
  import apiRequest from "../../utils/apiRequest";
  export default {
    name: "SingleTerminal",
    components: { forward },
    data() {
      return {
        terminal: null
      }
    },
    metaInfo() {
      return {
        title: `Терминал ${this.terminalName} - Колл-центр ${localStorage.getItem('callCenterId') || sessionStorage.getItem('callCenterId')}`
      }
    },
    computed: {
      terminalName(){
        return (this.terminal && this.terminal !== 'not found') ? this.terminal.term.title : ''
      }
    },
    async created() {
      console.log(this.$route.params.id === 'null')
      try {
        this.terminal = (await apiRequest.get( `/api/devices/${this.$route.params.id}`)).data
      } catch (e) {
        this.$router.back()
      }
      if (this.terminal === 'not found') this.$router.back()
    }
  }
</script>

<style lang='scss'>
#SingleTerminal{
  width: 100%;
  height: 429px;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  padding: 21px;
  .header{
    display: flex;
    align-items: center;
    &-name{

    }
    &-text{
      color: #685c7b;
      font-size: 17px;
      font-weight: 500;
    }
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
      &-text{
        font-weight: 400;
      }
      &-status{
        margin-top: 10px;
        text-align: center;
        width: 100px;
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
      img{
        display: block;
        max-height: 330px;
        object-fit: cover;
      }
    }
  }
}
</style>
