import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/view/homepage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      redirect:'/home',
      component: homepage,
      children:[
        {
          path:"/home",
          // name:'首页',
          component:() => import('@/view/home')
        },
        {
          path:'/news/list',
          name:'新闻列表页',
          component:() => import('@/view/news_list')
        },
        {
          path:'/news/add',
          name:'新闻添加页',
          component:() => import('@/view/news_add')
        },
        {
          path:'/news/update',
          name:'新闻修改页',
          component:() => import('@/view/news_add')
        },
        {
          path:'/swiper/list',
          name:'轮播图列表页',
          component:() => import('@/view/swiper_list')
        },
        {
          path:'/swiper/update',
          name:'轮播图修改页',
          component:() => import('@/view/swiper_update')
        },
        {
          path:'/imgs/list',
          name:'图片列表页',
          component:() => import('@/view/imgs_list')
        },
        {
          path:'/users/list',
          name:'用户列表页',
          component:() => import('@/view/users_list')
        },
        {
          path:'/users/add',
          name:'用户添加页',
          component:() => import('@/view/users_add')
        },
        {
          path:'/pingyi/add',
          name:'民主评议添加页',
          component:() => import('@/view/pingyi_add')
        },
        {
          path:'/pingyi/list',
          name:'民主评议列表页',
          component:() => import('@/view/pingyi_list')
        },
        {
          path:'/pingyi/update',
          name:'民主评议修改页',
          component:() => import('@/view/pingyi_add')
        },
        {
          path:'/summary',
          name:'个人总结',
          component:() => import('@/view/summary')
        },
        {
          path:'/message',
          name:'留言',
          component:() => import('@/view/message')
        }
      ]
    },{
      path:'/admin',
      name:'后台登录界面',
      component:() => import('@/view/admin')
    }
  ]
})
