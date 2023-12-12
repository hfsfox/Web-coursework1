<template>
  <div class="login-window">
    <h1 class="title">Sign up</h1>
    <div class="form">
      <div class="email-input cred-input">
        <input type="text" placeholder="Email" v-model="userCred.email">
      </div>
      <div class="password-input cred-input">
        <input type="password" placeholder="Password" v-model="userCred.firstPassword">
      </div>
      <div class="password-input cred-input">
        <input type="password" placeholder="Confirm password" v-model="userCred.secondPassword">
      </div>      
    </div>
    <div class="login-actions">
      <button @click="signIn()" class="btn">Sign in</button>
      <button @click="signUp()" class="btn">Sign up</button>
    </div>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: 'SignupWindow',
  data(){
    return {
      userCred:{
        email: '',
        firstPassword: '',
        secondPassword: '',
      }
    }
  },
  methods:{
    signIn(){
      router.push('/')
    },
    signUp(){
      this.$store.dispatch('signUp', this.userCred)
    },
  }
}
</script>

<style scoped lang="less">

</style>
