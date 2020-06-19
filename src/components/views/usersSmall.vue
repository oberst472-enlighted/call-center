<template>
  <div id="usersSmall">
    <div class="head">
      <div class="head-headers">
        <div class="head-headers-main">Сотрудники</div>
        <div class="head-headers-secondary">Онлайн</div>
      </div>
      <div class="button" @click="$router.push('/create-operator')">Добавить</div>
    </div>
    <div class="calls-list">
      <userInHistory />
      <userInHistory />
      <userInHistory />
      <userInHistory />
      <userInHistory />
    </div>
  </div>
</template>

<script>
  import userInHistory from "./components/userInHistory";
  import apiRequest from "../../utils/apiRequest";
  export default {
    name: "usersSmall",
    components: {userInHistory},
    data() {
      return {
        users: null
      }
    },
    async created(){
      try {
        let users = (await apiRequest.get( '/api/users/')).data
        console.log(users)

        let operators = users.filter(user => user.userType === "OPERATOR")
        for (const operator of operators) {
          console.log(operator)
          try {
            let operatorData = await apiRequest.get( `/api/users/${operator._id}`)
            console.log(operatorData.data.user)
          } catch (e) {}
        }
      } catch (e) {}
    }
  }
</script>

<style lang='scss'>
  #usersSmall{
    width: 100%;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    border-radius: 8px;
    background-color: #ffffff;
    padding: 21px;
    margin-top: 27px;
    .head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      &-headers-main{
        color: #685c7b;
        font-size: 17px;
        font-weight: 500;
      }
      &-headers-secondary{
        color: #cfcbd5;
        font-size: 14px;
        font-weight: 400;
      }
      .button{
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
        transition: all ease 0.3s;
        &:hover{
          transform: scale(1.02);
        }
      }
    }
  }
</style>
