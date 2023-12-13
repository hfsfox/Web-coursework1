<template>
  <div class="login-window">
    <h1 class="title">LogIn</h1>
    <div class="form">
      <div class="email-input cred-input">
        <input type="text" placeholder="Email" v-model="userCred.email">
      </div>
      <div class="password-input cred-input">
        <input type="password" id="password" placeholder="Password" v-model="userCred.password">
      </div>
    </div>
    <div class="login-actions">
      <button @click="signIn()" class="btn">LogIn</button>
      <button @click="signUp()" class="btn">Sign up</button>
    </div>
  </div>
</template>

<script>
import router from '@/router';

export default {
  data(){
    return {
      userCred:{
        email: '',
        password: '',
      }
    }
  },
  name: 'LoginWindow',
  methods:{
    signIn(){
      this.$store.dispatch('signIn', this.userCred)
    },
    signUp(){
      router.push('/signup')
    },
  }
}
</script>

<style scoped lang="less">

</style>
