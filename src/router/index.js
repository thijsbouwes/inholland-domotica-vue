import Vue from 'vue'
import Router from 'vue-router'
import Lamps from '@/components/Lamps'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Lamps
    }
  ]
})
