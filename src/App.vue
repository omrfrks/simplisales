<template>
  <v-app>
    <v-main>
      <v-app-bar>
        <v-toolbar-title>SimpliSales</v-toolbar-title>
                <v-btn
          v-if="isLoggedIn"
          color="success"
          class="ml-5 white--text"
          @click="currentView=='pastOrders' ? currentView = 'Home' : currentView = 'pastOrders'"
        >
          {{currentView == 'Home' ? 'Past Orders' : 'Products'}}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="isLoggedIn"
          color="error"
          class="ma-2 white--text"
          @click="logout()"
        >
          Logout
          <v-icon right dark>
            mdi-logout
          </v-icon>
        </v-btn>
      </v-app-bar>
      <LoginView v-if="!isLoggedIn" @login="login" :showError="showError" :errorText="errorText"/>
      <HomeView v-if="currentView == 'Home' && isLoggedIn"/>
      <PastOrders v-if="currentView == 'pastOrders' && isLoggedIn"/>
    </v-main>
  </v-app>
</template>

<script>
import HomeView from './components/HomeView.vue'
import gql from 'graphql-tag'
import { onLogin, onLogout } from './vue-apollo'
import LoginView from './components/LoginView.vue'
import PastOrders from './components/PastOrders.vue'

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      showError: false,
      errorText: '',
      currentView: 'Home'
    }
  },
  methods: {
    login(email, password) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation login($email: String!, $password: String!) {
              login(email: $email, password: $password)
            }
          `,
          variables: {
            email: email,
            password: password,
          },
        })
        .then(({ data: { login } }) => {
          this.isLoggedIn = true
          onLogin(login)
        })
        .catch((err) => {
          this.showError = true
          this.errorText = err.message
        })
    },
    logout() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation logout {
              logout
            }
          `,
        })
        .then(() => {
          onLogout()
          this.isLoggedIn = false
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
  },
  beforeMount() {
    localStorage.getItem('apollo-token') && (this.isLoggedIn = true)
  },
  components: {
    HomeView,
    LoginView,
    PastOrders
  },
}
</script>
