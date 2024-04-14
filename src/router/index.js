import Vue from 'vue';
import Router from 'vue-router';
//import routerJs from '@vue/cli-service/generator/routerJs/template/src/routerJs';

Vue.use(Router);


const router = new Router({
    routes: [
        {
            path: '/Home',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
        meta: { title: '自述文件' },
        children: [
            {
                path: '/echart',
                component: () => import(/* webpackChunkName: "icon" */ '../components/page/Echart'),
                meta: { title: '系统总览' }
            },
            {
                path: '/person',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Person'),
                meta: { title: '个人信息' }
            },
            {
                path: '/user',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/User'),
                meta: { title: '用户信息' }
            },
            {
                path: '/sort',
                component: () => import(/* webpackChunkName: "icon" */ '../components/page/Sort.vue'),
                meta: { title: '分类信息' }
            },
            {
                path: '/plan',
                component: () => import(/* webpackChunkName: "icon" */ '../components/page/Plan.vue'),
                meta: { title: '禁用信息' }
            },
            {
                path: '/lab',
                component: () => import(/* webpackChunkName: "icon" */ '../components/page/Lab.vue'),
                meta: { title: '实验室信息' }
            },
            {
                path: '/repair',
                component: () => import(/* webpackChunkName: "icon" */ '../components/page/Repair.vue'),
                meta: { title: '报修信息' }
            },
            {
                path: '/appoint',
                component: () => import(/* webpackChunkName: "icon" */ '../components/page/Appoint.vue'),
                meta: { title: '预约信息' }
            },
            {
                path: '/notice',
                component: () => import(/* webpackChunkName: "icon" */ '../components/page/Notice.vue'),
                meta: { title: '公告信息' }
            },
            {
                path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: { title: '404' }
            },
            {
                path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                meta: { title: '403' }
            }
        ]
        },

        {
            path:'/',
            redirect:'/index'
        },

        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../views/Layout/Content.vue'),
            meta: { title: '自述文件' },
            children: [

                {
                    path: '/index',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Index.vue'),
                    meta: { title: '首页管理' }
                },
                {
                    path: '/detail',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../views/IndexDetail.vue'),
                    meta: { title: '详情管理' }
                },
                {
                    path: '/member',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Member/index.vue'),
                    meta: {title: '个人中心'},
                    children: [
                        {
                            path: '',
                            component: () => import(/* webpackChunkName: "dashboard" */ '../views/Member/components/Person.vue'),
                            meta: {title: '个人信息'}
                        },
                        {
                            path: 'appoint',
                            component: () => import(/* webpackChunkName: "dashboard" */ '../views/Member/components/Appoint.vue'),
                            meta: {title: '我的预约'}
                        },
                        {
                            path: 'repair',
                            component: () => import(/* webpackChunkName: "dashboard" */ '../views/Member/components/Repair.vue'),
                            meta: {title: '我的报修'}
                        },                    ]
                },
            ]
        },

        {
            path: '/login',
                component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/register',
                component: () => import(/* webpackChunkName: "login" */ '../components/page/Register.vue'),
            meta: { title: '注册' }
        },
        //如果这里后面路由有问题，把这个404注释掉
        {
            path: '*',
                redirect: '/404'
        }
        ],
        });
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});
router.beforeEach((to,from,next) =>{
    if (to.path === '/login' || to.path === '/register' || to.path === '/index' || to.path === '/detail') {
    next()
}else{
    const token = sessionStorage.getItem('userStatus');
    if (!token){
        next('/index')
    }else{
        next();
    }
}
});


export default router
