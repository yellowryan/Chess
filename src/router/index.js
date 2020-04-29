import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = ()=>import('../views/home/Home')
const Vlog = ()=>import('../views/vlog/Vlog')
const Photo = ()=>import('../views/photo/Photo')
const Community = ()=>import('../views/community/Community')
const About = ()=>import('../views/about/About')
const Category =()=>import('../views/category/Category')
const Error =()=>import('../components/common/Error')


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      redirect:'/home'
    },
    {
      path:'/home',
      name:'home',
      component:Home
    },
    {
      path:'/vlog',
      name:'vlog',
      component:Vlog
    },
    {
      path:'/community',
      name:'community',
      component:Community
    },
    {
      path:'/photo',
      name:'photo',
      component:Photo
    },
    {
      path:'/about',
      name:'about',
      component:About
    },
    {
      path:'/category',
      name:'category',
      component:Category
    },
    {
      path:'*',
      component:Error
    }
  ]
})

export default router
