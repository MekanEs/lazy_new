import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/currency-typograf',
      name: 'currency-typograf',
      component: () => import('../views/CurrencyTypografView.vue')
    },
    {
      path: '/customer-currency-typograf',
      name: 'customer-currency-typograf',
      component: () => import('../views/CustomerCurrencyTypografView.vue')
    },
    {
      path: '/subjects-editor',
      name: 'subjects-editor',
      component: () => import('../views/SubjectsEditorView.vue')
    },
    {
      path: '/color-picker',
      name: 'color-picker',
      component: () => import('../views/ColorPaletteView.vue')
    },
    {
      path: '/others',
      name: 'others',
      component: () => import('../views/OtherView.vue')
    },
    {
      path: '/html-previewer',
      name: 'html-previewer',
      component: () => import('../views/HtmlPreviewerView.vue')
    },
  ],
})


export default router
