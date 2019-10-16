<template>
  <div class="bg-white px-4">
    <div
      v-if="errors.length > 0"
      class="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong v-for="(error, index) in errors" :key="index">{{error}}</strong>
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
      <hr class="my-3 bg-danger" />
      <div v-if="user.isSignedIn" class="text-right">
        <router-link class="btn btn-outline-success" :to="'/createQuestion/'">
          <span class="lead">
            <i class="fas fa-plus pr-2"></i>
            New Question
          </span>
        </router-link>
      </div>
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
                  <footer class="blockquote-footer">
                    <router-link
                      :to="'/profile/'+question.accountId"
                      class="text-success"
                    >{{question.name}} (@{{question.username}})</router-link>
                  </footer>
                </div>
                <span class="ml-auto text-muted">
                  <button
                    v-if="question.accountId == user.id"
                    v-on:click="deleteQuestion(question.id)"
                    class="btn btn-outline-danger mr-2"
                  >
                    <i class="fas fa-lg fa-trash-alt"></i>
                    <span class="pl-2">Delete</span>
                  </button>
                  <router-link
                    v-if="question.accountId == user.id"
                    class="btn btn-outline-primary mr-3"
                    :to="'/editQuestion/'+question.id"
                  >
                    <i class="fas fa-lg fa-wrench"></i>
                    <span class="pl-2">Edit</span>
                  </router-link>
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
  },
  methods: {
    deleteQuestion(id) {
      const questionId = id;
      client.deleteQuestion(questionId, errors => {
        if (errors.length > 0) this.errors = errors;
        else
          client.getAllQuestions((errors, questions) => {
            if (errors.length > 0) this.errors = errors;
            else this.questions = questions;
          });
      });
    }
  }
};
</script>