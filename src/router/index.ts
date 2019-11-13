import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'

Vue.use(VueRouter)


export const asyncRouterMap = [
    {
        path: '/',
        name: 'dashboard',
        component: Layout,
        hidden: true,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                meta: { title: '首页', icon: 'fa fa-home' },
                component: () => import('@/views/Home.vue')
            }
        ]
    },
    {
        path: '/dataManage',
        name: 'dataManage',
        hidden: true,
        meta: { title: '数据管理', icon: 'fa fa-database' },
        component: Layout,
        redirect: '/tableData',
        children: [
            {
                path: '/tableData',
                name: 'tableData',
                meta: { title: '表格管理', icon: 'fa fa-table' },
                component: () => import('@/views/DataManage/TableData.vue')
            },
            {
                path: '/chartsData',
                name: 'chartsData',
                meta: { title: '图表管理', icon: 'fa fa-bar-chart' },
                component: () => import('@/views/DataManage/ChartsData.vue')
            },
            {
                path: '/formData',
                name: 'formData',
                meta: {
                    title: '表单管理',
                    icon: 'fa fa-file-text-o',
                    roles: ['admin', 'editor']                   //判断权限为admin和editor才可以看到
                },
                component: () => import('@/views/DataManage/FormData.vue')
            }
        ]
    },
    {
        path: '/userManage',
        name: 'userManage',
        component: Layout,
        hidden: true,
        redirect: '/accountData',
        children: [
            {
                path: '/accountData',
                name: 'accountData',
                meta: { title: '账户管理', icon: 'fa fa-user-plus', roles: ['admin'] },     //roles判断权限为admin才可以看到
                component: () => import('@/views/UserManage/AccountData.vue')
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/userInfo',
        hidden: false,
        children: [
            {
                path: '/userInfo',
                name: 'userInfo',
                meta: { title: '个人中心' },
                component: () => import('@/views/UserManage/UserInfo.vue')
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        hidden: false,
        meta: { title: '404' },
        component: () => import('@/views/404.vue')
    },
    {
        path: '*',
        redirect: '/404'
    },
    {
        path: '/login',
        name: 'login',
        hidden: false,
        meta: { title: '系统登录' },
        component: () => import('@/views/Login/Login.vue')
    },
    {
        path: '/password',
        name: 'password',
        hidden: false,
        meta: { title: '找回密码' },
        component: () => import('@/views/Login/Password.vue')
    }
];
//
// const routes: any = [
//     {
//         path: '/',
//         name: 'layout',
//         component: Layout
//     },
//     {
//         path: '/login',
//         name: 'login',
//         component: () => import('@/views/Login/Login.vue')
//     },
//     {
//         path: '/password',
//         name: 'password',
//         component: () => import('@/views/Login/Password.vue')
//     }
// ]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap
})

router.beforeEach((to: any,from: any,next: any)=>{
    const isLogin = localStorage.tsToken ? true : false;
    if(to.path == '/login' || to.path == '/password'){
        next()
    }else {
        isLogin ? next() : next('/login')
    }
})

export default router
