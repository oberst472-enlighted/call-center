<template>
  <div id="avaliable_terminals">
    <div class="head">
      <div class="head-headers">
        <div class="header">Доступность терминалов</div>
        <div class="sub_header">Доступные вам терминалы</div>
      </div>
    </div>
    <div class="terminals" v-if="terminals">
      <terminal v-for="(terminal, index) in terminals" :key="index" :data="terminal"/>

    </div>
  </div>
</template>

<script>
  import terminal from "./components/terminal";
  import apiRequest from "../../utils/apiRequest";
  export default {
    name: "avaliableTerminals",
    components: { terminal },
    data(){
      return {
        terminals: null,
        showButtons: true,
        activeToggle: 'list'
      }
    },
    async created() {
      this.terminals = (await apiRequest.get( '/api/devices/')).data
      console.log(this.terminals)
    }
  }
</script>

<style lang='scss'>
#avaliable_terminals{
  width: 100%;
  min-height: 366px;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  padding: 17px;
  .head {
    display: flex;
    justify-content: space-between;
    padding: 10px;

    &-dots{
      cursor: pointer;
      height: 27px;
      width: 26px;
    }
    &-headers {
      .header {
        color: #685c7b;
        font-size: 17px;
        font-weight: 500;
      }

      .sub_header {
        color: #cfcbd5;
        font-size: 14px;
        font-weight: 400;
      }
    }

    &-right {
      display: flex;
      justify-content: flex-end;
      .btn-group {
        display: flex;
        align-items: center;
        border-radius: 8px;
        overflow: hidden;
        margin-right: 11px;
        .button {
          height: 33px;
          color: #949eb9;
          font-size: 14px;
          font-weight: 400;
          padding: 0 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all ease .5s;
          cursor: pointer;
        }

        .button:hover {
          transform: scale(1.05);
        }

        .button.active {
          background-color: #f8f8fa;
        }
      }
    }
  }

  .terminals{
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
  }
}
</style>
