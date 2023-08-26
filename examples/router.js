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
    path: '/render',
    name: 'render',
    component: (resolve) => require(['./docs/render.md'], resolve),
  },
  {
    path: '/scroll',
    name: 'scroll',
    component: (resolve) => require(['./docs/scroll.md'], resolve),
  },
  {
    path: '/example',
    name: 'example',
    component: (resolve) => require(['./docs/example.md'], resolve),
  },
  {
    path: '/rightLeftColumn',
    name: 'rightLeftColumn',
    component: (resolve) => require(['./demo/rightLeftColumn.vue'], resolve),
  },
  {
    path: '/scrollDemo',
    name: 'scrollDemo',
    component: (resolve) => require(['./demo/scrollDemo.vue'], resolve),
  },
  {
    path: '/test',
    name: 'test',
    component: (resolve) => require(['./demo/test.vue'], resolve),
  },
  {
    path: '/formItemTip',
    name: 'formItemTip',
    component: (resolve) => require(['./demo/formItemTip.vue'], resolve),
  },
  {
    path: '/tooltip-popper',
    name: 'tooltip-popper',
    component: (resolve) => require(['./demo/tooltip-popper.vue'], resolve),
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
