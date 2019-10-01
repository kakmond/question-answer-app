<template>
  <div class="px-4 bg-white">
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
    <div class="py-4">
      <div class="text-center">
        <h1 class="display-4">
          Ask Me a Question
          <i class="fas text-danger fa-question-circle"></i>
        </h1>
        <p
          class="text-muted"
        >If you have questions about anything, feel free to come by and ask, any time.</p>
      </div>
      <form>
        <div class="input-group input-group-lg mb-3">
          <input
            type="text"
            value
            name="search"
            class="form-control"
            placeholder="Search..."
            aria-describedby="button-addon"
            maxlength="100"
          />
          <div class="input-group-append">
            <button class="btn btn-danger" type="submit" id="button-addon">
              Search
              <i class="fas fa-search pl-1 fa-lg"></i>
            </button>
          </div>
        </div>
      </form>
      <hr class="my-4 bg-danger" />
      <div v-if="questions.length > 0">
        <div
          v-for="question in questions"
          :key="question.id"
          class="accordion shadow bg-white rounded border-bottom"
        >
          <div class="card">
            <div class="card-header">
              <div class="d-flex align-items-center">
                <i class="fab fa-3x text-danger fa-quora"></i>
                <router-link :to="'/questions/'+question.id">
                  <span class="pl-3 text-dark font-weight-bold">{{question.title}}</span>
                </router-link>
                <div class="ml-auto">
                  <span class="text-muted">
                    <i class="far fa-calendar-alt"></i>
                    {{question.createdAt | formatDate}}
                  </span>
                </div>
              </div>
            </div>
            <div class="collapse show">
              <div class="card-body d-flex align-items-center text-muted">
                <i class="fab fa-3x fa-amilia"></i>
                <span class="pl-4">{{question.description}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <span class="text-muted">NO QUESTIONS :(</span>
      </div>
      <div class="pt-4 text-right">
        <router-link class="btn btn-outline-success" :to="'/questions/create/'">
          <span class="lead">
            <i class="fas fa-plus pr-2"></i>
            New Question
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
const client = require("../client");

export default {
  data() {
    return {
      questions: [],
      errors: []
    };
  },
  created() {
    client.getAllQuestions((errors, questions) => {
      if (errors.length > 0) {
        this.errors = errors;
      } else {
        this.questions = questions;
      }
    });
  }
};
</script>