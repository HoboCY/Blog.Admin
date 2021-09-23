import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Category from '../views/Category/Category.vue'
import Post from '../views/Post/Post.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
