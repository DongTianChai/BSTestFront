//初始化一个router数组，数组中添加路由对象，每一个对象都有一个path属性和一个component属性，path属性表示路由的路径，component属性表示路由对应的组件
import Vue from 'vue'
import Router from 'vue-router'


import index from '@/components/index/Index'

import permList from "@/components/user/PermList.vue";
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Index',
      component: index,

      redirect: '/permList', // 设置默认路由
      children:[
        //子路径的path路径不能加“/”


        {path:'permList',name:'PermList',component:permList}
      ]
    },

  ]
})
