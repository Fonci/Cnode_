import Vue from 'vue'
import Router from 'vue-router'
import index from '../view/index'
import detail from '../view/detail'
import content from '../components/content'



Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: index
    }, {
        path: '/topic/:id',
        name: 'detail',
        component: detail
    }, ]
})