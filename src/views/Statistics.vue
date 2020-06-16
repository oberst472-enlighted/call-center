<template>
  <div id="Statistics">
    <div class="header">
      <div class="header-text">Выгрузка статистики</div>
    </div>
    <div class="body">
      <div class="col">
        <div class="label">Дата:</div>
        <div class="input" @click="dateClick">
          <input class="input-field" id="selectDate" type="date" v-model="date" :placeholder="date"/>
        </div>
      </div>
      <div class="col">
        <div class="label">Колл-центр:</div>
        <div class="select">
          <div class="select-box" @click.stop="selectCallCenter('CallCenter')">
            <div class="select-box-left">
              <div>{{collCenter}}</div>
            </div>
            <img src="../assets/icons/arrows.png" alt="" class="select-box-right">
          </div>
          <div
                  class="select-container"
                  :class="{active : $store.state.popup.popupActive === 'CallCenter' }"
                  :style="{height: `${calcCenterHeight}`, bottom: `-${calcCenterHeight}`}"
          >
            <div
                    class="select-item"
                    v-for="(item, index) in collCenters"
                    :key="index"
                    @click="setCallCenter(item.title)"
            >
              <div class="select-box">
                <div class="select-box-left">
                  <div>{{item.title}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col">
        <div class="label">Оператор:</div>
        <div class="input">
          <input class="input-field" type="text" v-model="operator"/>
        </div>
      </div>
      <div class="col">
        <div class="label">Статус звонка:</div>
        <div class="select">
          <div class="select-box" @click.stop="selectCallStatus('CallStatus')">
            <div class="select-box-left">
              <div>{{callStatus}}</div>
            </div>
            <img src="../assets/icons/arrows.png" alt="" class="select-box-right">
          </div>
          <div
                  class="select-container"
                  :class="{active : $store.state.popup.popupActive === 'CallStatus' }"
                  :style="{height: `${calcStatusHeight}`, bottom: `-${calcStatusHeight}`}"
          >
            <div
                    class="select-item"
                    v-for="(item, index) in callStatusces"
                    :key="index"
                    @click="setCallStatus(item.title)"
            >
              <div class="select-box">
                <div class="select-box-left">
                  <div>{{item.title}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="button">Выгрузить</div>
  </div>
</template>

<script>
  export default {
    name: "Statistics",
    data(){
      return {
        date: '12.05.2020 - 26.05.2020',
        collCenter: 'Московский',
        operator: 'Все',
        callStatus: 'Решено',
        collCenters: [
          {
            title: 'Русский',
          },
          {
            title: 'Английский',
          }
        ],
        callStatusces: [
          {
            title: 'Решено',
          },
          {
            title: 'Не решено',
          }
        ],
        data: true
      }
    },

    methods: {
      submitButton(){
        console.log(this.newLanguage)
      },
      selectCallCenter(type){
        this.$store.dispatch('popup/setPopup', type)
      },
      selectCallStatus(type){
        this.$store.dispatch('popup/setPopup', type)
      },
      setCallCenter(title){
        this.collCenter = title
      },
      setCallStatus(title){
        this.callStatus = title
      },
      dateClick(){
        document.getElementById('selectDate').click();
      }
    },
    computed: {
      calcStatusHeight(){
        if (this.$store.state.popup.popupActive === 'CallStatus') {
          return `${this.callStatusces.length * 39}px`
        } else {
          return '0'
        }
      },
      calcCenterHeight(){
        if (this.$store.state.popup.popupActive === 'CallCenter') {
          return `${this.callStatusces.length * 39}px`
        } else {
          return '0'
        }
      }
    },
  }
</script>

<style lang='scss'>
#Statistics{
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
  .select{
    width: 100%;
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

  .body{
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    line-height: 19px;
    .col{
      margin-right: 20px;
      width: 25%;
      .label{
        color: #343a41;
        font-size: 12px;
        font-weight: 500;
      }
      .input{
        display: flex;
        margin-top: 10px;
        &-field{
          width: 100%;
          height: 39px;
          border-radius: 8px;
          border: 1px solid #dddddd;
          outline: none;
          padding: 0 13px;
        }
      }
      input[type="date"]::-webkit-inner-spin-button {
        display: none;
        -webkit-appearance: none;
      }
    }
  }
  .button {
    width: 150px;
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
  input[type=date]::-webkit-datetime-edit-text {
    -webkit-appearance: none;
    display: none;
  }
  input[type=date]::-webkit-datetime-edit-month-field{
    -webkit-appearance: none;
    display: none;
  }
  input[type=date]::-webkit-datetime-edit-day-field {
    -webkit-appearance: none;
    display: none;
  }
  input[type=date]::-webkit-datetime-edit-year-field {
    -webkit-appearance: none;
    display: none;
  }
  input[type="date"]:before {
    content: attr(placeholder) !important;
    color: #aaa;
    margin-right: 0.5em;
  }
  input[type="date"]:focus:before,
  input[type="date"]:valid:before {
    content: "";
  }
}
</style>
