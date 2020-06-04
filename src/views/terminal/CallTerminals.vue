<template>
  <div id="TerminalsList">
<!--    <div class="row">-->
<!--      <userStat />-->
<!--      <callWindow />-->
<!--    </div>-->
<!--    <div class="row">-->
<!--      <avaliableTerminals />-->
<!--      <callHistorySmall />-->
<!--    </div>-->

      <div class="head">
        <div class="head-left">
          <div class="header">Доступность терминалов</div>
          <div class="sub_header">Доступные вам терминалы</div>
        </div>
        <div class="head-right">
          <div class="btn-group">
            <div
                    class="button"
                    :class="{active : activeMod==='list'}"
                    @click="toggleMode('list')"
            >
              Список
            </div>
            <div
                    class="button"
                    :class="{active : activeMod==='map'}"
                    @click="toggleMode('map')"
            >
              На карте
            </div>
          </div>

          <img
                  style="cursor: pointer"
                  src="../../assets/icons/Serach.png" alt="" class="head-right-img">
        </div>
      </div>

      <div class="terminals">
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
        <terminal/>
      </div>
    </div>
</template>

<script>
  import avaliableTerminals from "../../components/views/avaliableTerminals";
  import userStat from "../../components/views/userStat";
  import callWindow from "../../components/views/callWindow";
  import callHistorySmall from "../../components/views/callHistorySmall";
  import terminal from "../../components/views/components/terminal";
  export default {
    name: "CallList",
    components: { callWindow , userStat, callHistorySmall, avaliableTerminals, terminal},
    data() {
      return {
        activeMod: 'list'
      }
    },
    methods: {
      toggleMode(type) {
        if (type === this.activeMod) return
        if (this.activeMod === 'list') {
          this.activeMod = 'map'
        } else {
          this.activeMod = 'list'
        }
      }
    }
  }
</script>

<style lang='scss'>
#TerminalsList {
  /*.row{*/
  /*  display: flex;*/
  /*  justify-content: space-between;*/
  /*  padding-bottom: 30px;*/
  /*}*/
  .head{
    display: flex;
    justify-content: space-between;
    &-right{
      width: 200px;
      display: flex;
      justify-content: space-between;
      &-img{
        height: 30px;
      }
      /*&-btn{*/
      /*  color: #65528b;*/
      /*  font-size: 12px;*/
      /*  font-weight: 400;*/
      /*  padding: 0 10px;*/
      /*  display: flex;*/
      /*  justify-content: center;*/
      /*  align-items: center;*/
      /*  height: 27px;*/
      /*  border-radius: 8px;*/
      /*  transition: all ease 0.5s;*/
      /*  cursor: pointer;*/
      /*}*/
      /*&-btn.active{*/
      /*  background-color: #f4f3f7;*/
      /*}*/
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
    .header{
      color: #151567;
      font-size: 17px;
      font-weight: 500;
    }
    .sub_header{
      color: #aeadca;
      font-size: 14px;
      font-weight: 400;
    }
  }

  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  padding: 17px;

  .terminals{
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .terminal-wraper{
      width: 20%;
    }
  }
}
</style>
