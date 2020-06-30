<template>
  <div id="AddLanguage">
    <div class="header">
      <div class="header-text">Добавление языка</div>
    </div>
    <div class="body" v-if="newLanguage">
      <div class="label">Выберите язык:</div>
      <div class="select">
        <div class="select-box" @click.stop="selectLanguage('selectPopout')">
          <div class="select-box-left">
            <img :src="`https://calls-dev.enlighted.ru${newLanguage.icon}`" alt="">
            <div>{{newLanguage.title}}</div>
          </div>
          <img src="../assets/icons/arrows.png" alt="" class="select-box-right">
        </div>
        <div
                class="select-container"
                :class="{active : $store.state.popup.popupActive === 'selectPopout' }"
                :style="{height: `${calcHeight}`, bottom: `-${calcHeight}`}"
        >
          <div
                  class="select-item"
                  v-for="(item, index) in languages"
                  :key="index"
                  @click="setLang(item)"
          >
            <div class="select-box">
              <div class="select-box-left">
                <img :src="`https://calls-dev.enlighted.ru${item.icon}`" alt="">
                <div>{{item.title}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button" @click="submitButton">Сохранить</div>
  </div>


</template>

<script>
  import apiRequest from "../utils/apiRequest";

  export default {
    name: "AddLanguage",
    data() {
      return {
        languages: null,
        newLanguage: null,
        data: true
      }
    },
    methods: {
      submitButton(){
        console.log(this.newLanguage)
      },
      selectLanguage(type){
        this.$store.dispatch('popup/setPopup', type)
      },
      setLang(lang){
        this.newLanguage = lang
      }
    },
    computed: {
      calcHeight(){
        if (this.$store.state.popup.popupActive === 'selectPopout') {
          return `${this.languages.length * 39}px`
        } else {
          return '0'
        }
      }
    },

    async created() {
      this.languages = (await apiRequest.get( '/api/langs/')).data

      this.newLanguage = this.languages[0]
    },
    components: {},
    props: {}
  }
</script>

<style lang='scss'>
#AddLanguage {
  width: 100%;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  padding: 21px;
  .header{
    display: flex;
    align-items: center;
    &-text{
      color: #685c7b;
      font-size: 17px;
      font-weight: 500;
    }
  }
  .label{
    color: #343a41;
    font-size: 12px;
    font-weight: 500;
  }
  .body{
    margin-top: 30px;
    .select{
      width: 243px;
      height: 39px;
      border-radius: 8px;
      border: 1px solid #dddddd;
      padding: 0 12px;
      display: flex;
      align-items: center;
      margin-top: 10px;
      position: relative;
      cursor: pointer;
      &-box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-left{
          display: flex;
          align-items: center;
          img{
            margin-right: 14px;
          }
        }
        img{
          display: block;
          height: 15px;
        }
      }
      &-container{
        position: absolute;
        width: 100%;
        height: 0;
        bottom: -100px;
        left: 0;
        border: none;
        overflow: hidden;
        transition: all ease 0.2s;
        z-index: 99;
        cursor: pointer;
        background-color: white;
        .select-item{
          width: 243px;
          height: 39px;
          padding: 0 12px;
          display: flex;
          align-items: center;
        }
      }
      .select-container.active{
        border-radius: 8px;
        border: 1px solid #dddddd;
      }
    }
  }
  .button {
    width: 100px;
    margin-top: 30px;
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

    &:hover {
      transform: scale(1.03);
    }
  }
}
</style>
