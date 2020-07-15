<template>
  <tr
          class="table-row"
          @click.stop="$router.push(`/call-list/${data.id}`)"
          style="cursor: pointer"
  >
    <td height="55px" width="11%">
      <div class="table_1"># {{data.number}}</div>
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
      <div class="table_6" v-if="data.videoAvailable">Решено</div>
      <div class="table_6" v-else style="background-color: rgb(252, 239, 242); color: rgb(243, 115, 140);">Не принят</div>
    </td>
    <td height="55px" width="14%">
      <div class="table_7">
        <div>{{data.operator.firstName}}</div>
        <div>{{data.operator.lastName}}</div>
      </div>
    </td>
    <td height="55px" width="11%">
      <div class="table_8">
        <img v-if="data.videoAvailable" style="cursor: pointer" src="../../../assets/images/Play.png" alt="" @click.stop="$router.push(`/call-list/${data.id}?open=yes`)">
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
        return this.data.startTime? this.data.startTime.split('T')[1].split('.')[0] : ''
      },
      endTime() {
        return this.data.endTime? this.data.endTime.split('T')[1].split('.')[0] : ''
      }
    }
  }
</script>

<style lang='scss'></style>
