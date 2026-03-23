import { createRouter, createWebHashHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import InterviewView from '../views/InterviewView.vue'
import ProjectsView from '../views/ProjectsView.vue'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/about',
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { title: 'About me' },
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView,
      meta: { title: 'Articles' },
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: { title: 'Projects' },
    },
    {
      path: '/interview',
      name: 'interview',
      component: InterviewView,
      meta: { title: 'Interview' },
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})
