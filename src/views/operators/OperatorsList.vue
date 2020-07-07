<template>
  <div id="OperatorsList">
    <div class="head">
      <div class="head-left">
        <div class="header">Сотрудники</div>
        <div class="sub_header">Онлайн</div>
      </div>
      <div class="head-right">
        <img src="../../assets/icons/ThreeDots.svg" alt="" style="cursor: pointer" class="head-right-img">
        <div class="vr" />
        <img style="cursor: pointer" src="../../assets/icons/Serach.png" alt="" class="head-right-img">
        <div class="head-right-btn"  style="cursor: pointer " @click="$router.push('/create-operator')">Добавить</div>
      </div>
    </div>
    <div class="operators">
      <opreator v-for="operator in operators" :key="operator._id" :data="operator"/>
    </div>
  </div>
</template>

<script>
  import opreator from "../../components/views/components/opreator";
  import apiRequest from "../../utils/apiRequest";

  export default {
    name: "OperatorsList",
    components: { opreator },
    data() {
      return {
        operators: null
      }
    },

    metaInfo() {
      return {
        title: `Список операторов`
      }
    },
    async created(){
      try {
        let users = (await apiRequest.get( '/api/users/')).data
        // console.log(users)

        this.operators = users.filter(user => user.userType === "OPERATOR")
        // console.log(this.operators)
        // console.log(this.operators[0])
      } catch (e) {}
    }
  }
</script>

<style lang='scss'>
  #OperatorsList{
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
        &-btn{
          color: #65528b;
          font-size: 12px;
          font-weight: 400;
          padding: 0 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 27px;
          border-radius: 8px;
          background-color: #f4f3f7;
        }
        .vr{
          width: 3px;
          height: 30px;
          background-color: #f5f3f7;
        }
      }
    }
    width: 100%;
    height: 366px;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    border-radius: 8px;
    background-color: #ffffff;
    padding: 17px;
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
    .operators{
      margin-top: 15px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
