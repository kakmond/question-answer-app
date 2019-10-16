<template>
  <div id="app">
    <header class="topbar responsive-header font-weight-bold">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div id="band" class="collapse navbar-collapse pl-4">
          <router-link class="navbar-brand" to="/">Q&A</router-link>
        </div>
        <div id="navbar" class="navbar-nav pr-5">
          <router-link class="nav-item nav-link" to="/">Questions</router-link>
          <router-link class="nav-item nav-link" to="/about">About</router-link>
          <router-link
            v-if="user.isSignedIn"
            class="nav-item nav-link"
            :to="'/profile/'+user.id"
          >{{user.username}}</router-link>
          <router-link v-else class="nav-item nav-link" to="/signIn">Sign In</router-link>
        </div>
      </nav>
    </header>
    <div class="px-5 py-5">
      <router-view :user="user" />
    </div>
  </div>
</template>

<script>
const client = require("./client");
const jwtDecode = require("jwt-decode");

module.exports = {
  data() {
    return {
      user: {
        id: "",
        username: "",
        isSignedIn: false
      }
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = jwtDecode(token);
      const accountId = payload.accountId;
      client.getAccountById(accountId, (errors, account) => {
        if (errors.length <= 0) {
          this.user.id = account.id;
          this.user.username = account.name;
          this.user.isSignedIn = true;
        }
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  font-size: 19px;
  /* background-color: rgb(227, 227, 227); */
}

#band a {
  font-size: 23px;
}

#navbar a.router-link-exact-active {
  color: #42b983;
}
</style>
