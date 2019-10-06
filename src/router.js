import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import Questions from './views/Questions.vue'
import Question from './views/Question.vue'
import CreateQuestion from './views/CreateQuestion.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import Profile from './views/Profile.vue'
import EditQuestion from './views/EditQuestion.vue'
import EditAnswer from './views/EditAnswer.vue'
import EditProfile from './views/EditProfile.vue'

Vue.use(Router)

function checkAuth(to, from, next) {
  const token = localStorage.getItem("token");
  if (token)
    next();
  else
    next('/signIn');
}

export default new Router({
  routes: [
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
      path: '/profile/:id',
      name: 'profile',
      component: Profile
    },
    {
      path: '/createQuestion',
      name: 'createQuestion',
      beforeEnter: checkAuth,
      component: CreateQuestion
    },
    {
      path: '/editQuestion/:id',
      name: 'editQuestion',
      beforeEnter: checkAuth,
      component: EditQuestion
    },
    {
      path: '/editAnswer/:id',
      name: 'editAnswer',
      beforeEnter: checkAuth,
      component: EditAnswer
    },
    {
      path: '/editProfile',
      name: 'editProfile',
      beforeEnter: checkAuth,
      component: EditProfile
    }
  ]
})
