<template>
  <div>
    <div class="text-center">
      <h1 class="text-success font-weight-bold display-4">{{account.name}}</h1>
      <h4 class="font-weight-light text-muted">@{{account.username}}</h4>
      <router-link
        v-if="account.id == user.id"
        class="btn btn-outline-primary"
        :to="'/editProfile/'"
      >
        <i class="fas fa-lg fa-user-cog"></i>
        <span class="pl-2">Edit Profile</span>
      </router-link>
    </div>
    <br />
    <ul class="nav-fill nav nav-tabs" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active lead border"
          id="question-tab"
          data-toggle="tab"
          href="#question"
          role="tab"
          aria-controls="question"
          aria-selected="true"
        >Questions ({{questions.length}})</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link lead border"
          id="answer-tab"
          data-toggle="tab"
          href="#answer"
          role="tab"
          aria-controls="answer"
          aria-selected="false"
        >Answers ({{answers.length}})</a>
      </li>
    </ul>
    <div class="tab-content">
      <div
        class="tab-pane fade show active"
        id="question"
        role="tabpanel"
        aria-labelledby="question-tab"
      >
        <div
          v-if="questionErrors.length > 0"
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong v-for="(error, index) in questionErrors" :key="index">{{error}}</strong>
        </div>
        <div v-if="questions.length > 0">
          <div v-for="question in questions" :key="question.id" class="accordion shadow">
            <div class="card">
              <div class="card-body">
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
                      >{{question.name}} (@{{question.name}})</router-link>
                    </footer>
                  </div>
                  <div class="ml-auto">
                    <div class="align-self-center pr-2">
                      <button
                        v-if="question.accountId == user.id"
                        v-on:click="deleteQuestion()"
                        class="btn btn-outline-danger mr-2"
                      >
                        <i class="fas fa-lg fa-trash-alt"></i>
                        <span class="pl-2">Delete</span>
                      </button>
                      <router-link
                        v-if="question.accountId == user.id"
                        class="mr-3 btn btn-outline-primary"
                        :to="'/editQuestion/'+question.id"
                      >
                        <i class="fas fa-lg fa-wrench"></i>
                        <span class="pl-2">Edit</span>
                      </router-link>
                      <span class="text-muted">
                        <i class="far fa-calendar-alt"></i>
                        {{question.createdAt | formatDate}}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="answer" role="tabpanel" aria-labelledby="answer-tab">
        <div
          v-if="answerErrors.length > 0"
          class="alert alert-info alert-dismissible fade show"
          role="alert"
        >
          <strong v-for="(error, index) in answerErrors" :key="index">{{error}}</strong>
        </div>
        <div class="accordion shadow">
          <div class="card">
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li v-for="answer in answers" :key="answer.id" class="list-group-item">
                  <div class="d-flex align-items-center">
                    <i class="fab fa-3x text-info fa-amilia"></i>
                    <div class="pl-3">
                      <router-link :to="'/questions/'+answer.questionId">
                        <span class="text-info font-weight-bold">{{answer.description}}</span>
                      </router-link>
                      <footer class="blockquote-footer">
                        <router-link
                          :to="'/profile/'+answer.accountId"
                          class="text-success"
                        >{{answer.name}} (@{{answer.name}})</router-link>
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
    </div>
  </div>
</template>

<script>
const client = require("../client");

export default {
  data() {
    return {
      account: {},
      accountErrors: [],
      questions: [],
      questionErrors: [],
      answers: [],
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
    const accountId = this.$route.params.id;
    client.getAccountById(accountId, (errors, account) => {
      if (errors.length > 0) this.accountErrors = errors;
      else this.account = account;
    });
    client.getQuestionsByAccountId(accountId, (errors, questions) => {
      if (errors.length > 0) this.questionErrors = errors;
      else this.questions = questions;
    });
    client.getAnswersByAccountId(accountId, (errors, answers) => {
      if (errors.length > 0) this.answerErrors = errors;
      else this.answers = answers;
    });
  },
  methods: {
    deleteQuestion(id) {
      const accountId = this.$route.params.id;
      const questionId = id;
      client.deleteQuestion(questionId, errors => {
        if (errors.length > 0) this.questionErrors = errors;
        else
          client.getQuestionsByAccountId(accountId, (errors, questions) => {
            if (errors.length > 0) this.questionErrors = errors;
            else this.questions = questions;
          });
      });
    },
    deleteAnswer(id) {
      const answerId = id;
      const accountId = this.$route.params.id;
      client.deleteAnswer(answerId, errors => {
        if (errors.length > 0) this.errors = errors;
        else
          client.getAnswersByAccountId(accountId, (errors, answers) => {
            if (errors.length > 0) this.answerErrors = errors;
            else this.answers = answers;
          });
      });
    }
  }
};
</script>

<style scoped>
.nav-tabs .nav-item.show .nav-link,
.nav-tabs #question-tab.nav-link.active {
  color: #ffffff;
  background-color: #dc3545;
  font-weight: bold;
  border-color: #dc3545;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs #question-tab.nav-link {
  color: #dc3545;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs #answer-tab.nav-link.active {
  color: #ffffff;
  background-color: #007bff;
  font-weight: bold;
  border-color: #007bff;
}
</style>