<template>
  <div class="card shadow rounded mx-auto" style="width: 500px;">
    <h5 class="bg-danger text-white text-center card-header">
      <i class="fas fa-user fa-lg pr-2"></i> SIGN IN
    </h5>
    <div
      v-if="errors.length > 0"
      class="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong v-for="(error, index) in errors" :key="index">{{error}}</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="card-body">
      <form @submit.prevent="signIn()">
        <div class="form-group">
          <label for="inputUsername">Username</label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="usernameIcon">
                <i class="fas fa-user"></i>
              </span>
            </div>
            <input
              type="text"
              v-model="username"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="usernameIcon"
              id="inputUsername"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="passwordIcon">
                <i class="fas fa-lock"></i>
              </span>
            </div>
            <input
              type="password"
              v-model="password"
              class="form-control"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="passwordIcon"
              id="inputPassword"
            />
          </div>
        </div>
        <small class="text-muted">
          No account?
          <router-link class="text-success" to="/signUp">register as a new user.</router-link>
        </small>
        <hr />
        <button type="submit" class="btn btn-block btn-outline-primary">
          <i class="fas fa-sign-in-alt fa-lg"></i>
          <span class="pl-1">Login</span>
        </button>
      </form>
    </div>
  </div>
</template>


<script>
const client = require("../client");

export default {
  data() {
    return {
      username: "",
      password: "",
      errors: []
    };
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    signIn() {
      client.signIn(this.username, this.password, (errors, account) => {
        if (errors.length > 0) this.errors = errors;
        else {
          this.user.username = account.username;
          this.user.id = account.id;
          this.user.isSignedIn = true;
          this.user.displayName = account.displayName;
          this.$router.push("/profile/");
        }
      });
    }
  }
};
</script>