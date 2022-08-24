<template>
  <v-container>
    <v-alert type="error" v-if="showError">
      {{ errorText }}
    </v-alert>
    <v-text-field
      v-model="email"
      type="email"
      label="Email"
      prepend-inner-icon="mdi-email"
      :rules="[rules.required, rules.email]"
      @update:error="(err) => (isEmailValid = !err)"
    ></v-text-field>
    <v-text-field
      v-model="password"
      type="password"
      label="Password"
      prepend-inner-icon="mdi-lock"
      :rules="[rules.required]"
      @update:error="(err) => (isPasswordValid = !err)"
    ></v-text-field>
    <v-btn :disabled="!isLoginValid" color="primary" class="ma-2 white--text" @click="$emit('login', email, password)">
      Login
      <v-icon right dark> mdi-login </v-icon>
    </v-btn>
  </v-container>
</template>
<script>
export default {
  name: 'LoginView',
  emits: ['login'],
  props: {
    errorText: {
      type: String,
    },
    showError: {
      type: Boolean,
    },
  },
  data() {
    return {
      email: '',
      password: '',
      isPasswordValid: false,
      isEmailValid: false,
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  computed: {
    isLoginValid() {
      return this.isEmailValid && this.isPasswordValid
    },
  },
}
</script>
