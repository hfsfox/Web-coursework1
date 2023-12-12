<template>
    <div class="login-container">
      <LoginWindow/>
    </div>
</template>

<script>
import LoginWindow from '@/components/LoginWindow.vue'

export default {
  name: 'LoginView',
  components: {
    LoginWindow
  }
}
</script>
