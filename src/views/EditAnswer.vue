<template>
  <div>
    <div
      v-if="questionErrors.length > 0"
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <strong v-for="(error, index) in questionErrors" :key="index">{{error}}</strong>
    </div>
    <div v-if="question">
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
                  >{{question.name}} (@{{question.name}})</router-link>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div v-if="answer">
      <div class="accordion shadow">
        <div class="card">
          <div class="card-header justify-content-between d-flex align-items-center">
            <span style="font-size: 24px" class="pl-3 lead text-dark font-weight-bold">
              Your Answer
              <i class="pl-1 fas text-info fa-lg fa-comment-dots"></i>
            </span>
            <span class="text-muted">
              <i class="far fa-calendar-alt"></i>
              {{answer.createdAt | formatDate}}
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
            <form @submit.prevent="editAnswer()">
              <div class="d-flex">
                <i class="fab fa-3x text-info fa-amilia"></i>
                <div class="flex-grow-1 pl-3">
                  <textarea
                    class="form-control form-control-lg"
                    type="text"
                    v-model="answer.description"
                    placeholder="No answer"
                  />
                  <div class="text-right pt-2">
                    <button v-on:click="deleteAnswer()" class="btn btn-outline-danger mr-2">
                      <i class="fas fa-lg fa-trash-alt"></i>
                      <span class="lead pl-2">Delete</span>
                    </button>
                    <button type="submit" class="btn btn-outline-success">
                      <i class="fas fa-lg fa-edit"></i>
                      <span class="lead pl-2">Update</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="jumbotron jumbotron-fluid bg-dark">
      <div class="container text-white">
        <div class="row">
          <h1 class="display-4">Answer not found</h1>
          <i class="pl-4 far fa-4x fa-dizzy"></i>
        </div>
        <p>The answer you are looking for is not available.</p>
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
      answer: null,
      answerErrors: [],
      questionErrors: []
    };
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  created() {
    const answerId = this.$route.params.id;
    client.getAnswerById(answerId, (errors, answer) => {
      if (errors.length > 0) this.answerErrors = errors;
      else {
        this.answer = answer;
        client.getQuestionById(answer.questionId, (errors, question) => {
          if (errors.length > 0) this.questionErrors = errors;
          else this.question = question;
        });
      }
    });
  },
  methods: {
    deleteAnswer() {
      const answerId = this.$route.params.id;
      client.deleteAnswer(answerId, errors => {
        if (errors.length > 0) this.answerErrors = errors;
        else this.$router.go(-1);
      });
    },
    editAnswer() {
      const answerId = this.$route.params.id;
      client.editAnswer(answerId, this.answer.description, errors => {
        if (errors.length > 0) this.answerErrors = errors;
        else this.$router.go(-1);
      });
    }
  }
};
</script>