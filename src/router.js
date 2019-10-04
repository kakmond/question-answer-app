import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Questions from './views/Questions.vue'
import Question from './views/Question.vue'
import CreateQuestion from './views/CreateQuestion.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import Profile from './views/Profile.vue'
import EditQuestion from './views/EditQuestion.vue'
import EditAnswer from './views/EditAnswer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/questions',
      name: 'questions',
      component: Questions
    },
    {
      path: '/questions/:id',
      name: 'question',
      component: Question
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/createQuestion',
      name: 'createQuestion',
      component: CreateQuestion
    },
    {
      path: '/editQuestion/:id',
      name: 'editQuestion',
      component: EditQuestion
    },
    {
      path: '/editAnswer/:id',
      name: 'editAnswer',
      component: EditAnswer
    }
  ]
})
