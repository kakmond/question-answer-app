<template>
  <div>
    <div v-if="question">
      <div class="accordion shadow">
        <div class="card">
          <div class="card-header text-center">
            <span style="font-size: 24px" class="pl-3 lead text-dark font-weight-bold">
              Edit Question
              <i class="fas text-danger fa-lg fa-question-circle"></i>
            </span>
          </div>
          <div class="card-body px-4">
            <div v-if="errors.length > 0">
              <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <div v-for="(error, index) in errors" :key="index">
                  <strong>{{error}}</strong>
                </div>
              </div>
            </div>
            <form @submit.prevent="editQuestion()">
              <div class="form-group row">
                <label
                  for="inputTitle"
                  class="col-md-2 col-sm-12 col-form-label col-form-label-lg text-danger font-weight-bold"
                >Title</label>
                <div class="col-md-10 col-sm-12">
                  <input
                    type="text"
                    name="title"
                    class="form-control form-control-lg"
                    id="inputTitle"
                    placeholder="Enter the title of the question here..."
                    maxlength="50"
                    v-model="question.title"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="inputDescription" class="text-danger font-weight-bold">
                  Description
                  <br />
                  <small
                    class="text-muted"
                  >A descriptive text which presents information about your question.</small>
                </label>
                <textarea
                  name="description"
                  class="form-control form-control-lg"
                  id="inputDescription"
                  rows="7"
                  placeholder="Write project description here..."
                  maxlength="500"
                  v-model="question.description"
                ></textarea>
              </div>
              <div class="text-right pr-2">
                <button v-on:click="deleteQuestion()" class="btn btn-outline-danger mr-2">
                  <i class="fas fa-lg fa-trash-alt"></i>
                  <span class="lead pl-2">Delete</span>
                </button>
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
    const id = this.$route.params.id;
    client.getQuestionById(id, (errors, question) => {
      if (errors.length > 0) this.questionErrors = errors;
      else this.question = question;
    });
  },
  methods: {
    editQuestion() {
      const questionId = this.$route.params.id;
      const accountId = this.user.id;
      const questionTitle = this.question.title;
      const questionDescription = this.question.description;
      client.editQuestion(
        questionId,
        accountId,
        questionTitle,
        questionDescription,
        errors => {
          if (errors.length > 0) this.errors = errors;
          else this.$router.push("/questions/" + questionId);
        }
      );
    },
    deleteQuestion() {
      const questionId = this.$route.params.id;
      client.deleteQuestion(questionId, errors => {
        if (errors.length > 0) this.errors = errors;
        else this.$router.push("/");
      });
    }
  }
};
</script>