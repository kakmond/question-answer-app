<template>
  <div>
    <div v-if="question">
      <div
        v-if="questionErrors.length > 0"
        class="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <strong v-for="(error, index) in questionErrors" :key="index">{{error}}</strong>
      </div>
      <div class="accordion shadow">
        <div class="card">
          <div class="card-header justify-content-between d-flex align-items-center">
            <span style="font-size: 24px" class="pl-3 lead text-dark font-weight-bold">
              {{question.title}}
              <i class="fas text-danger fa-lg fa-question-circle"></i>
            </span>
            <span class="text-muted">
              <i class="far fa-calendar-alt"></i>
              {{question.createdAt | formatDate}}
            </span>
          </div>
          <div class="card-body">
            <div class="d-flex align-items-center">
              <i class="fab fa-3x text-danger fa-quora"></i>
              <div class="pl-3">
                <span class="font-weight-bold text-dark">{{question.description}}</span>
                <footer class="blockquote-footer">
                  <router-link
                    :to="'/profile/'+question.accountId"
                    class="text-success"
                  >{{question.name}} (@{{question.username}})</router-link>
                </footer>
              </div>
              <div class="ml-auto">
                <div v-if="question.accountId == user.id" class="align-self-center pr-2">
                  <button v-on:click="deleteQuestion()" class="btn btn-outline-danger mr-2">
                    <i class="fas fa-lg fa-trash-alt"></i>
                    <span class="pl-2">Delete</span>
                  </button>
                  <router-link class="btn btn-outline-primary" :to="'/editQuestion/'+question.id">
                    <i class="fas fa-lg fa-wrench"></i>
                    <span class="pl-2">Edit</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="accordion shadow">
        <div class="card">
          <div class="card-header justify-content-between d-flex align-items-center">
            <span style="font-size: 24px" class="pl-3 lead text-dark font-weight-bold">
              Answer
              <i class="fas text-info fa-lg fa-comment-dots"></i>
            </span>
            <span class="text-muted">
              <i class="far fa-comments mr-1"></i>
              {{answers.length}} Comments
            </span>
          </div>
          <div class="card-body">
            <div
              v-if="answerErrors.length > 0"
              class="alert alert-info alert-dismissible fade show"
              role="alert"
            >
              <strong v-for="(error, index) in answerErrors" :key="index">{{error}}</strong>
            </div>
            <form @submit.prevent="answer()">
              <div class="input-group input-group-lg mb-3">
                <input
                  type="text"
                  v-model="comment"
                  name="search"
                  class="form-control"
                  placeholder="Your answer..."
                  aria-describedby="button-addon"
                  maxlength="100"
                />
                <div class="input-group-append">
                  <button class="btn btn-info" type="submit" id="button-addon">
                    Answer
                    <i class="fas fa-paper-plane pl-1 fa-lg"></i>
                  </button>
                </div>
              </div>
            </form>
            <ul class="list-group list-group-flush">
              <li v-for="answer in answers" :key="answer.id" class="list-group-item">
                <div class="d-flex align-items-center">
                  <i class="fab fa-3x text-info fa-amilia"></i>
                  <div class="pl-3">
                    <span class="font-weight-bold text-dark">{{answer.description}}</span>
                    <footer class="blockquote-footer">
                      <router-link
                        :to="'/profile/'+answer.accountId"
                        class="text-success"
                      >{{answer.name}} (@{{answer.username}})</router-link>
                    </footer>
                  </div>
                  <div class="ml-auto pr-2">
                    <button
                      v-on:click="deleteAnswer(answer.id)"
                      class="btn btn-outline-danger mr-2"
                      v-if="answer.accountId == user.id"
                    >
                      <i class="fas fa-lg fa-trash-alt"></i>
                      <span class="pl-2">Delete</span>
                    </button>
                    <router-link
                      v-if="answer.accountId == user.id"
                      class="mr-3 btn btn-outline-primary"
                      :to="'/editAnswer/'+answer.id"
                    >
                      <i class="fas fa-lg fa-wrench"></i>
                      <span class="pl-2">Edit</span>
                    </router-link>
                    <span class="text-muted">
                      <i class="far fa-calendar-alt"></i>
                      {{answer.createdAt | formatDate}}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="jumbotron jumbotron-fluid bg-dark">
      <div class="container text-white">
        <div class="row">
          <h1 class="display-4">Question not found</h1>
          <i class="pl-4 far fa-4x fa-dizzy"></i>
        </div>
        <p>The question you are looking for is not available.</p>
      </div>
    </div>
  </div>
</template>

<script>
const client = require("../client");

export default {
  data() {
    return {
      question: null,
      answers: [],
      comment: "",
      questionErrors: [],
      answerErrors: []
    };
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  created() {
    const id = this.$route.params.id;
    client.getQuestionById(id, (errors, question) => {
      if (errors.length > 0) this.questionErrors = errors;
      else this.question = question;
    });
    client.getAnswersByQuestionId(id, (errors, answers) => {
      if (errors.length > 0) this.answerErrors = errors;
      else this.answers = answers;
    });
  },
  methods: {
    answer() {
      this.answerErrors = [];
      const questionId = this.$route.params.id;
      client.createAnswer(questionId, this.comment, (errors, id) => {
        if (errors.length > 0) this.answerErrors = errors;
        else {
          this.comment = "";
          client.getAnswersByQuestionId(questionId, (errors, answers) => {
            if (errors.length > 0) this.answerErrors = errors;
            else this.answers = answers;
          });
        }
      });
    },
    deleteQuestion() {
      const questionId = this.$route.params.id;
      client.deleteQuestion(questionId, errors => {
        if (errors.length > 0) this.errors = errors;
        else this.$router.push("/");
      });
    },
    deleteAnswer(id) {
      const answerId = id;
      const questionId = this.$route.params.id;
      client.deleteAnswer(answerId, errors => {
        if (errors.length > 0) this.errors = errors;
        else
          client.getAnswersByQuestionId(questionId, (errors, answers) => {
            if (errors.length > 0) this.answerErrors = errors;
            else this.answers = answers;
          });
      });
    }
  }
};
</script>