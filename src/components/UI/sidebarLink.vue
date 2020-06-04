<template>
  <div
          class="sidebarLink"
          :class="{active : isRouteActive}"
          @click="$router.push(`/${link}`)"
  >
    <img
            alt="" class="sidebarLink-icon"
            :src="require(`../../assets/icons/${src}`)"
            @click="$router.push(`/${link}`)"
    >
    <div class="sidebarLink-title">{{title}}</div>
  </div>

</template>

<script>
  export default {
    name: "sidebarLink",
    props: {
      src: String,
      title: String,
      link: String,
    },
    computed:{
      isRouteActive() {
        return this.$route.name === this.link
      }
    }
  }
</script>

<style lang='scss'>
  .sidebarLink{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    border-radius: 10px;
    transition: all ease 1s;
    padding: 10px;
    height: 38px;
    cursor: pointer;
    &-icon{
      display: block;
      margin: 0 auto;
    }
    &-title{
      color: #65528b;
      font-size: 15px;
      font-weight: 500;
      width: 0;
      opacity: 0;
      transition: all ease .3s;
      &::selection{
        background-color: inherit;
      }

    }
  }
  .sidebarLink.active{
    background-color: #f1eef5;
  }
</style>
