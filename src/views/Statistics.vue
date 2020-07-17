<template>
  <div id="Statistics">
    <div class="header">
      <div class="header-text">Выгрузка статистики</div>
    </div>
    <div class="body">
      <div class="col">
        <div class="label">Дата:</div>
        <div class="input">
          <date-range-picker
                  ref="picker"
                  minDate="2020-01-01"
                  :maxDate="new Date()"
                  v-model="dateRange"
                  closeOnEsc
          >
            <template v-slot:input="picker">
              {{ picker.startDate | date}} - {{ picker.endDate | date}}
            </template>
          </date-range-picker>
<!--          <input class="input-field" id="datepicker" type="text" :placeholder="`${dateStart} - ${dateEnd}`"/>-->
        </div>
      </div>
      <div class="col">
        <div class="label">Оператор:</div>
        <div class="select">
          <div class="select-box" @click.stop="$store.dispatch('popup/setPopup', 'OperatorsSelect')" style="overflow: hidden; height: 37px; line-height: 11px">
            <div class="select-box-left">
              <div>{{getInputName}}</div>
            </div>
            <img src="../assets/icons/arrows.png" alt="" class="select-box-right">
          </div>
          <div
                  v-if="operators"
                  class="select-container"
                  :class="{active : $store.state.popup.popupActive === 'OperatorsSelect' }"
                  :style="{height: `${calcOperatorHeight}`, bottom: `-${calcOperatorHeight}`}"
          >
            <div
                    class="select-item"
                    :class="JSON.stringify(operatorsSelected) === JSON.stringify(operators)? 'active' : ''"
                    @click.stop="setAllOperator"
            >
              <div class="select-box">
                <div class="select-box-left">
                  <div>{{ !(JSON.stringify(operatorsSelected) === JSON.stringify(operators))? 'Выбрать всех' : 'Отменить выбор' }}</div>
                </div>
              </div>
            </div>
            <div
                    class="select-item"
                    :class="operatorsSelected.includes(item) ? 'active' : ''"
                    v-for="(item, index) in operators"
                    :key="index"
                    @click.stop="setOperator(item)"
            >
              <div class="select-box">
                <div class="select-box-left">
                  <div>{{item.firstName}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col">
        <div class="label">Статус звонка:</div>
        <div class="select">
          <div class="select-box" @click.stop="$store.dispatch('popup/setPopup', 'CallStatus')">
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
    <div class="button" @click="download">Выгрузить</div>
  </div>
</template>

<script>
  import DateRangePicker from 'vue2-daterange-picker'
  import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
  import apiRequest from "../utils/apiRequest";


  export default {
    name: "Statistics",
    data(){
      return {
        operators: null,
        operatorsSelected: [],
        dateRange: {
          startDate: `${new Date()}`,
          endDate: `${new Date()}`,
        },
        collCenter: 'Московский',
        operator: 'Все',
        callStatus: 'Решено',
        callStatusces: [
          {
            title: 'Не принят',
          },
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

    components: {
      DateRangePicker
    },
    watch: {
      dateStart(val) {
        if (val) {
          console.dir(document.getElementById('selectEndDate'))
          document.getElementById('selectEndDate').click();
        }
      }
    },
    metaInfo() {
      return {
        title: 'Выгрузка статистики'
      }
    },
    filters:{
      date(value){
        if (!value) return ''
        let dd = value.getDate();
        let mm = value.getMonth() + 1;

        let yyyy = value.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        return `${dd}.${mm}.${yyyy}`
      }
    },

    async created(){
      if ((sessionStorage.getItem('userType') || localStorage.getItem('userType')) === 'operator') {
        if (!this.$store.state.userData) {
          await this.$store.dispatch('fetchUserData')
        }
        this.operatorsSelected = [
            {
              _id: (sessionStorage.getItem('userId') || localStorage.getItem('userId')),
              firstName: `${this.$store.state.userData.user.firstName} ${this.$store.state.userData.user.lastName}`
            }
        ]
      } else {
        let users = (await apiRequest.get( '/api/users/')).data
        this.operators = users.filter(user => (user.userType === "OPERATOR" || user.userType === "operator"))
        console.log((sessionStorage.getItem('userType') || localStorage.getItem('userType')))
      }
    },
    methods: {
      updateValues(val){
        console.log(val)
      },
      checkOpen(){},
      setCallStatus(title){
        this.callStatus = title
      },
      setOperator(title){
        console.log(title)
        console.log(this.operatorsSelected)

        if (this.operatorsSelected.includes(title)) {
          let id = this.operatorsSelected.findIndex(item => item.firtName === title.firtName)
          this.operatorsSelected.splice(id, 1)
        } else {
          this.operatorsSelected.push(title)
        }
      },
      setAllOperator(){
        if (!(JSON.stringify(this.operatorsSelected.sort()) === JSON.stringify(this.operators.sort()))) {
          this.operatorsSelected = this.operators.slice()
        } else {
          this.operatorsSelected = []
        }
      },

      async download() {
        try {
          let auth = await apiRequest.post('/api/report/', {
            startDate: this.dateRange.startDate,
            endDate: this.dateRange.endDate,
            operators: this.operatorsSelected.map(user => user._id),
            callStatus: this.callStatusces
          })
          console.log(auth.data)
        } catch (e) {
          return true
        }
      }
    },
    computed: {
      getInputName(){
        let name = []
        if (this.operatorsSelected.length) {
          this.operatorsSelected.map(item => name.push(item.firstName))
          let isAllSelected = JSON.stringify(this.operatorsSelected) === JSON.stringify(this.operators)
          if (isAllSelected) {
            return 'Все'
          } else if (name.length === 0) {
            return "Никто не выбран"
          } else {
            return name.join(', ')
          }
        } else {
          return "Никто не выбран"
        }

      },
      calcStatusHeight(){
        if (this.$store.state.popup.popupActive === 'CallStatus') {
          return `${this.callStatusces.length * 39}px`
        } else {
          return '0'
        }
      },
      calcOperatorHeight(){
        if (this.$store.state.popup.popupActive === 'OperatorsSelect') {
          return `${this.operators.length * 39 + 39}px`
        } else {
          return '0'
        }
      },
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
        width: 100%;
        height: 39px;
        padding: 0 12px;
        display: flex;
        align-items: center;
      }
      .select-item.active{
        width: calc(100% - 2px);
        height: 39px;
        border: 2px solid white;
        border-radius: 8px;
        background-color: #786d89;
        .select-box .select-box-left div {
          color: white;
        }
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
      width: 33%;
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
  .reportrange-text, vue-daterange-picker{
    min-width: 271px;
    height: 39px;
    border-radius: 8px;
    border: 1px solid #dddddd;
    outline: none;
    padding: 0 13px;
    display: flex;
    align-items: center;
  }
  .daterangepicker{
    width: 502px !important;
    min-width: 501px;
    .calendars{
      width: 502px !important;
      .ranges{
        display: none;
      }
      .calendars-container{
        width: 502px !important;
      }
      .drp-calendar{
        width: 50%;
      }
    }
  }

}
</style>
