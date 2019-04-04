<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field v-model="username" label="User Name" required/>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field
            :append-icon="show ? 'visibility' : 'visibility_off'"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            label="Password"
            v-model="password"
            @click:append="show = !show"
          />
        </v-flex>
        <v-flex xs12 sm6 offset-sm3>
          <v-alert
            :value="true"
            type="error"
            outline
            v-if="isCredentialError">
            You should provide correct username ans password. Please try again.
          </v-alert>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3>
          <v-btn color="success" @click="login">Login</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>
import * as jwt_token from 'jwt-decode'
export default {
  data: () => ({
    valid: true,
    show: false,
    username: '',
    password: '',
    isCredentialError: false,
    passwordRules: [v => !!v || 'Password is required']
  }),
  mounted() {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      const userInfo = jwt_token(accessToken)
      if (userInfo && userInfo.role) {
        if (userInfo.role === 'admin') {
          this.$router.push('/admin')
        } else {
          this.$router.push('/dashboard')
        }
      }
    }
  },

  methods: {
    login() {
      this.isCredentialError = false
      this.$store.dispatch('signIn', {
        'username': this.username,
        'password': this.password
      })
      .then((response) => {
        localStorage.setItem('accessToken', response.accessToken)
        const userInfo = jwt_token(response.accessToken)
        if (userInfo && userInfo.role) {
          if (userInfo.role === 'admin') {
            this.$router.push('/admin')
          } else {
            this.$router.push('/dashboard')
          }
        }
      })
      .catch(() => {
        this.isCredentialError = true
      })
    }
  }
};
</script>
