<template>
  <tr class="table-row">
    <td height="55px" width="11%">
      <div class="table_1">#00342</div>
    </td>
    <td height="55px" width="11%">
      <div class="table_2">
        <div>Казанский</div>
        <div>Вокзал</div>
      </div>
    </td>
    <td height="55px" width="14%">
      <div class="table_3">
        <div>#2134</div>
        <div>зал ожидания</div>
      </div>
    </td>
    <td height="55px" width="14%">
      <div class="table_4">
        <div>20.05.2020</div>
        <div>10:32:12 - 10:33:31</div>
      </div>
    </td>
    <td height="55px" width="12.5%">
      <div class="table_5">Русский</div>
    </td>
    <td height="55px" width="12.5%">
      <div class="table_6">Решено</div>
    </td>
    <td height="55px" width="14%">
      <div class="table_7">
        <div>Елена</div>
        <div>Авантюрова</div>
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
    name: "callInTable"
  }
</script>

<style lang='scss'></style>
