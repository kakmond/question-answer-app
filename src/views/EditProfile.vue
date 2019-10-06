<template>
  <div>
    <div v-if="errors.length > 0">
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <div v-for="(error, index) in errors" :key="index">
          <strong>{{error}}</strong>
        </div>
      </div>
    </div>
    <div class="accordion shadow">
      <div class="card">
        <div class="card-header text-center">
          <span style="font-size: 24px" class="pl-3 lead text-dark font-weight-bold">
            Edit profile
            <i class="fas text-danger fa-lg fa-question-circle"></i>
          </span>
        </div>
        <div class="card-body px-4">
          <form @submit.prevent="editAccount()">
            <div class="form-group row">
              <label
                for="inputUsername"
                class="col-md-2 col-sm-12 col-form-label col-form-label-lg text-danger font-weight-bold"
              >Username</label>
              <div class="col-md-10 col-sm-12">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  id="inputUsername"
                  placeholder="Something went wrong!"
                  maxlength="50"
                  v-model="account.username"
                  disabled
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="inputName"
                class="col-md-2 col-sm-12 col-form-label col-form-label-lg text-danger font-weight-bold"
              >Display name</label>
              <div class="col-md-10 col-sm-12">
                <input
                  type="text"
                  name="title"
                  class="form-control form-control-lg"
                  id="inputName"
                  placeholder="Enter your display name here..."
                  maxlength="50"
                  v-model="account.name"
                />
              </div>
            </div>
            <div class="text-right pr-2">
              <button type="submit" class="btn btn-outline-primary">
                <i class="fas fa-lg fa-edit"></i>
                <span class="lead pl-2">Update</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const client = require("../client");

export default {
  data() {
    return {
      account: {},
      errors: []
    };
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  created() {
    const accountId = this.user.id;
    client.getAccountById(accountId, (errors, account) => {
      if (errors.length > 0) this.accountErrors = errors;
      else this.account = account;
    });
  },
  methods: {
    editAccount() {
      const accountId = this.user.id;
      const displayName = this.account.name;
      client.editAccount(accountId, displayName, errors => {
        if (errors.length > 0) this.errors = errors;
        else this.$router.push("/profile/" + this.user.id);
      });
    }
  }
};
</script>