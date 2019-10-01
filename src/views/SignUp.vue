<template>
  <div class="card shadow rounded mx-auto" style="width: 500px;">
    <h5 class="bg-primary text-white text-center card-header">
      <i class="fas fa-user fa-lg pr-2"></i> SIGN UP
    </h5>
    <div
      v-if="errors.length > 0"
      class="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong v-for="(error, index) in errors" :key="index">{{error}}&nbsp;</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="card-body">
      <form @submit.prevent="signUp()">
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
          <label for="inputDisplayName">Display name</label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="displayNameIcon">
                <i class="fas fa-user"></i>
              </span>
            </div>
            <input
              type="text"
              v-model="displayName"
              class="form-control"
              placeholder="Display name"
              aria-label="DisplayName"
              aria-describedby="displayNameIcon"
              id="inputDisplayName"
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
          Already have an account?
          <router-link class="text-success" to="/signIn">Sign in</router-link>
        </small>
        <hr />
        <button type="submit" class="btn btn-block btn-outline-primary">
          <i class="fas fa-sign-in-alt fa-lg"></i> Sign Up
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
      displayName: "",
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
    signUp() {
      client.signUp(
        this.username,
        this.displayName,
        this.password,
        (errors, id) => {
          if (errors.length > 0) this.errors = errors;
          else {
            console.log(id);
          }
        }
      );
    }
  }
};
</script>