<template>
  <div>
    <div v-if="errors.length > 0">
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <div v-for="(error, index) in errors" :key="index">
          <strong>{{error}}</strong>
        </div>
      </div>
    </div>
    <div class="accordion shadow">
      <div class="card">
        <div class="card-header text-center">
          <span style="font-size: 24px" class="pl-3 lead text-dark font-weight-bold">
            New Question
            <i class="fas text-danger fa-lg fa-question-circle"></i>
          </span>
        </div>
        <div class="card-body px-4">
          <form @submit.prevent="createQuestion()">
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
                  v-model="title"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="inputDescription" class="text-danger font-weight-bold">
                Project description
                <br />
                <small
                  class="text-muted"
                >A descriptive text which presents information about project.</small>
              </label>
              <textarea
                name="description"
                class="form-control form-control-lg"
                id="inputDescription"
                rows="7"
                placeholder="Write project description here..."
                maxlength="500"
                v-model="description"
              ></textarea>
            </div>
            <div class="text-right pr-2">
              <button type="submit" class="btn btn-outline-success">
                <i class="fas fa-lg fa-edit"></i>
                <span class="lead pl-2">Ask Now</span>
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
      title: "",
      description: "",
      errors: []
    };
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    createQuestion() {
      client.createQuestion(
        this.user.id,
        this.title,
        this.description,
        (errors, id) => {
          if (errors.length > 0) this.errors = errors;
          else this.$router.push("/questions/" + id);
        }
      );
    }
  }
};
</script>