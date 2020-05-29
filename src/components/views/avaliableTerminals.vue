<template>
  <div id="avaliable_terminals">
    <div class="header">Доступность терминалов</div>
    <div class="sub_header">Доступные вам терминалы</div>
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
    </div>
  </div>
</template>

<script>
  import terminal from "./components/terminal";
  export default {
    name: "avaliableTerminals",
    components: { terminal }
  }
</script>

<style scoped lang='scss'>
#avaliable_terminals{
  width: 592px;
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
  .terminals{
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
