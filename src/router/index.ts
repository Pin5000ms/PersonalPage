import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import ContactView from '../views/ContactView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'
import ProjectsView from '../views/ProjectsView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/articles/:slug',
      name: 'article-detail',
      component: ArticleDetailView,
      meta: { title: 'Article' },
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: { title: 'Projects' },
    },
    {
      path: '/projects/:slug',
      name: 'project-detail',
      component: ProjectDetailView,
      meta: { title: 'Project details' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: { title: 'Contact me' },
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})
