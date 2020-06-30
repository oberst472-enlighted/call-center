<template>
  <div id="languagesBox">
    <div class="box-header">
      Языки
      <div style="cursor: pointer" class="box-header-btn" @click="$router.push('/add-language')">Добавить
      </div>
    </div>
    <div class="box-body" v-if="languages">
      <template v-for="(item, index) in languages">
        <div class="lang" :key="index">
          <div class="lang-left">
            <div class="lang-left-icon">
              <img :src="`https://calls-dev.enlighted.ru${item.icon}`" alt="" />

            </div>
            <div class="lang-left-text">{{item.title}}</div>
          </div>
          <div class="lang-right">
            <img
                    src="../../assets/icons/ThreeDots.svg"
                    style="cursor: pointer"
                    alt=""
                    @click.stop="setPopup(`popup-language-${index}`)"
                    :class="{active : $store.state.popup.popupActive === `popup-language-${index}`}"
            >
            <div
                    class="lang-right-popup"
                    :class="{active : $store.state.popup.popupActive === `popup-language-${index}`}"
            >
              <div class="lang-right-popup-item">Изменить</div>
              <div class="lang-right-popup-item">Удалить</div>
            </div>
          </div>
        </div>
        <hr v-if="index < languages.length -1">
      </template>
    </div>
  </div>
</template>

<script>
  import apiRequest from "../../utils/apiRequest";

  export default {
    name: "languagesBox",
    data(){
      return {
        languages: null,
      }
    },
    methods:{
      setPopup(type){
        this.$store.dispatch('popup/setPopup', type)
      }
    },
    async created() {
      this.languages = (await apiRequest.get( '/api/langs/')).data
    }
  }
</script>

<style lang='scss'>
  #languagesBox{
    width: 100%;
    height: 134px;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    border-radius: 8px;
    background-color: #ffffff;
    padding: 20px 23px;
    .box-header{
      color: #685c7b;
      font-size: 17px;
      font-weight: 500;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-btn{
        width: 92px;
        height: 27px;
        border-radius: 8px;
        background-color: #f4f3f7;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #65528b;
        font-size: 12px;
        font-weight: 400;
        cursor: pointer;
        transition: all ease .3s;
        &:hover{
          transform: scale(1.02);
        }
      }
    }
    .box-body{
      margin-top: 10px;
      height: calc(100% - 20px);
      width: 100%;
      display: flex;
      flex-direction: column;
      .lang{
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-left{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          &-icon{
            display: block;
            margin-right: 7px;
            height: 21px;
            img{
              height: 21px;
              display: block
            }
          }
        }
        &-right{
          position: relative;
          img{
            display: block;
            box-sizing: border-box;
            border: 2px solid #ffffff;
            cursor: pointer;
          }
          img.active {
            border-radius: 5px;
            border: 2px solid #c8bfd4;
          }
          &-popup{
            display: block;
            position: absolute;
            left: - 75px;
            top: 50%;
            box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
            border-radius: 8px;
            background-color: #ffffff;
            z-index: 5;
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
          &-popup.active{
            width: 100px;
            height: 66px;
            transition: height ease 0.5s;
          }
        }
      }
    }
  }
</style>
