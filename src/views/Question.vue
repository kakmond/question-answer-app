<template>
  <div v-if="question" class="accordion shadow" id="accordionExample">
    <div class="card">
      <div class="card-header">
        <div class="d-flex align-items-center">
          <i class="fab fa-3x text-danger fa-quora"></i>
          <span class="pl-3 text-dark font-weight-bold">{{question.title}}</span>
          <div class="ml-auto">
            <span class="text-muted">
              <i class="far fa-calendar-alt"></i>
              {{question.createdAt | formatDate}}
            </span>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="d-flex text-muted">
          <i class="p-2 fab fa-3x fa-amilia"></i>
          <div class="pt-3 flex-grow-1 pl-3">{{question.description}}</div>
          <div v-if="question.accountId == user.id" class="align-self-center pr-2">
            <router-link class="btn btn-outline-primary" :to="'/questionEdit/'+question.id">
              <i class="fas fa-lg fa-wrench"></i>
              <span class="pl-2">Edit</span>
            </router-link>
          </div>
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
</template>


<script>
const client = require("../client");

export default {
  data() {
    return {
      question: null
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
      if (errors.length > 0) {
        this.errors = errors;
      } else {
        this.question = question;
      }
    });
  }
};
</script>