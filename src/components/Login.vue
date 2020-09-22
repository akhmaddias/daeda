<template>
  <div class="container">
    <form action="#">
      <label>Войти в аккаунт</label>
      <div class="field">
        <p class="control">
          <input v-model="form.email" class="input" type="email" placeholder="Email">
        </p>
      </div>
      <div class="field">
        <p class="control">
          <input v-model="form.password" class="input" type="password" placeholder="Пароль">
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-success" @click="submit()">
            Login
          </button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { userAuth } from '@/firebase.js'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  created () {
    if (this.user.loggedIn) {
      this.$router.replace({ name: "Admin" })
    }
  },
  computed: {
    ...mapGetters('user', [
      'user'
    ])
  },
  methods: {
    submit() {
      userAuth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(this.$router.replace({ name: "Admin" }))
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>

<style scoped>
  .container {
    margin-top: 20px;
    width: 500px;
  }
</style>