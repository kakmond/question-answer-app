<template>
  <div class="bg-white px-4">
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
    <div>
      <div class="text-center">
        <h1 class="display-4">
          Ask Us a Question
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
          class="accordion shadow-sm bg-white rounded border-bottom mt-3"
        >
          <div class="card">
            <div class="card-header">
              <div class="d-flex align-items-center">
                <i class="fab fa-3x text-danger fa-quora"></i>
                <div class="pl-3">
                  <router-link :to="'/questions/'+question.id">
                    <span class="text-danger font-weight-bold">{{question.title}}</span>
                  </router-link>
                  <footer class="blockquote-footer">{{question.name}}</footer>
                </div>
                <span class="ml-auto text-muted">
                  <i class="far fa-calendar-alt"></i>
                  {{question.createdAt | formatDate}}
                </span>
              </div>
            </div>
            <div class="collapse show">
              <div class="card-body d-flex justify-content-between align-items-center">
                <span>{{question.description}}</span>
                <footer class="text-muted">
                  <i class="far fa-comments mr-1"></i>
                  {{question.answerCount}} Comments
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <span class="text-muted">NO QUESTIONS :(</span>
      </div>
      <div v-if="user.isSignedIn" class="pt-4 text-right">
        <router-link class="btn btn-outline-success" :to="'/createQuestion/'">
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
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  created() {
    client.getAllQuestions((errors, questions) => {
      if (errors.length > 0) this.errors = errors;
      else this.questions = questions;
    });
  }
};
</script>