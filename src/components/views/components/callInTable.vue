<template>
  <tr class="table-row">
    <td height="55px" width="11%">
      <div class="table_1"># {{data.__v}}</div>
    </td>
    <td height="55px" width="11%">
      <div class="table_2">
        <div>{{data.device.term.title}}</div>
      </div>
    </td>
    <td height="55px" width="14%">
      <div class="table_3">
        <div>#{{data.device.term.id}}</div>
        <div>{{data.device.title}}</div>
      </div>
    </td>
    <td height="55px" width="14%">
      <div class="table_4">
        <div>{{dateCall}}</div>
        <div>{{startTime}} - {{endTime}}</div>
      </div>
    </td>
    <td height="55px" width="12.5%">
      <div class="table_5">{{data.language}}</div>
    </td>
    <td height="55px" width="12.5%">
      <div class="table_6" v-if="data.status === 'SUCCESS'">Решено</div>
    </td>
    <td height="55px" width="14%">
      <div class="table_7">
        <div>{{data.operator.firstName}}</div>
        <div>{{data.operator.lastName}}</div>
      </div>
    </td>
    <td height="55px" width="11%">
      <div class="table_8">
        <img style="cursor: pointer" src="../../../assets/images/Play.png" alt="" @click="$router.push('/call-list/1?open=yes')">
      </div>
    </td>
  </tr>
</template>

<script>
  export default {
    name: "callInTable",
    props: {
      data: Object
    },
    computed: {
      userIsOperator() {
        return localStorage.getItem('userType') && localStorage.getItem('userType') === 'operator'
      },
      dateCall() {
        return this.data.startTime.split('T')[0].split('-').reverse().join('.')
      },
      startTime() {
        return this.data.startTime.split('T')[1].split('.')[0]
      },
      endTime() {
        return this.data.endTime.split('T')[1].split('.')[0]
      }
    }
  }
</script>

<style lang='scss'></style>
