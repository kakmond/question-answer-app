<template>
  <div id="app">
    <header class="topbar responsive-header font-weight-bold">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div id="band" class="collapse navbar-collapse pl-4">
          <router-link class="navbar-brand" to="/questions">Question & Answer</router-link>
        </div>
        <div id="navbar" class="navbar-nav pr-5">
          <router-link class="nav-item nav-link" to="/">Home</router-link>
          <router-link class="nav-item nav-link" to="/questions">Questions</router-link>
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
module.exports = {
  data() {
    return {
      user: {
        id: "",
        username: "",
        displayName: "",
        isSignedIn: false
      }
    };
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
