<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<script>

export default{
  data(){
    return {
    }
  },
  components:{
  },
  computed:{
  },
  methods:{
  },
  created(){
    this.$store.dispatch('getDataFromLS');
    if (this.uid && this.isLoggedIn){
      this.$store.dispatch('fetchBoard');
    }
  }
}
</script>

<style lang="less">
  @import './assets/less/index.less';
</style>
