import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
const Home = () =>
    import('../views/home/Home')
const Vlog = () =>
    import('../views/vlog/Vlog')
const Photo = () =>
    import('../views/photo/Photo')
const Community = () =>
    import('../views/community/Community')
const About = () =>
    import('../views/about/About')
const Error = () =>
    import('../components/common/Error')
const Personal = () =>
    import('../views/personal/Personal')
const Information = () =>
    import('../views/personal/childComps/Information')
const Exhibits = () =>
    import('../views/personal/childComps/Exhibits')
const Setting = () =>
    import('../views/personal/childComps/Setting')
const Search = () =>
    import('../views/search/Search')
const Edition = () =>
    import('../views/edit/Edition')
const Article = () =>
    import('../views/community/childComps/Article')
const VlogUpload = () =>
    import('../views/vlog/childComps/VlogUpload')
const PhotoUpload = () =>
    import('../views/photo/childComps/PhotoUpload')

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            title: 'Cheese-摄影爱好者的殿堂'
        }
    },
    {
        path: '/vlog',
        name: 'vlog',
        component: Vlog,
        meta: {
            title: 'vlog'
        }
    },
    {
        path: '/community',
        name: 'community',
        component: Community,
        meta: {
            title: 'community'
        }
    },
    {
        path: '/arts/:articleId',
        name: 'arts',
        component: Article
    },
    {
        path: '/photo',
        name: 'photo',
        component: Photo
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        meta: {
            title: '关于Cheese'
        }
    },
    {
        path: '/personal',
        name: 'personal',
        redirect: '/personal/information',
        component: Personal,
        meta: {
            title: '个人信息界面',
            Auth: true
        },
        children: [{
            path: 'information',
            name: 'information',
            component: Information,
            meta: {
                Auth: true
            }
        },
        {
            path: 'exhibits',
            name: 'exhibits',
            component: Exhibits,
            meta: {
                Auth: true
            }
        },
        {
            path: 'setting',
            name: 'setting',
            component: Setting,
            meta: {
                Auth: true
            }
        }
        ]
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/edition',
        name: 'edition',
        component: Edition,
        meta: {
            Auth: true
        }
    },
    {
        path: '/vlogupload',
        name: 'vlogupload',
        component: VlogUpload,
        meta: {
            Auth: true
        }
    },
    {
        path: '/photoupload',
        name: 'photoupload',
        component: PhotoUpload
    },
    {
        path: '*',
        component: Error
    }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.Auth) {
        if (!Cookies.get('userId')) {
            next(from.path)
            Vue.prototype.$message({
                type: 'warning',
                message: '请先登录'
            })
        } else {
            next()
        }
    } else {
        if (to.meta.title) {
            document.title = to.meta.title
        }
        next()
    }

})

export default router