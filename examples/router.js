import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: (resolve) => require(['./components/HelloWorld.vue'], resolve),
  },
  {
    path: '/table',
    name: 'table',
    component: (resolve) => require(['./docs/table.md'], resolve),
  },
  {
    path: '/example',
    name: 'example',
    component: (resolve) => require(['./docs/example.md'], resolve),
  },
  {
    path: '/tableRowCheck',
    name: 'tableRowCheck',
    // component: (resolve) => require(['./components/tableRowCheck.vue'], resolve),
    component: (resolve) => require(['./docs/tableRowCheck.md'], resolve),
    // component: () => import('./components/JSX.vue'),
  },
]

// routes.push({
//   path: '/test',
//   name: 'test',
//   component: (resolve) => require(['./components/test.vue'], resolve),
// })
routes.push()

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes,
})
