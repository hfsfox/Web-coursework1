<template>
    <div class="login-container">
      <SignupWindow/>
    </div>
</template>

<script>
import SignupWindow from '@/components/SignupWindow.vue'

export default {
  name: 'SignupView',
  components: {
    SignupWindow
  }
}
</script>
