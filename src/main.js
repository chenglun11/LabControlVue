import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/utils/flexible.js'
import ElementUI from 'element-ui';
import store from './store'
import axios from 'axios'

import '@/style/common.scss'
import '@/style/var.scss'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './components/common/directives';
import 'babel-polyfill';

import global_ from './utils/global' // 这个路径是相对于main.js的相对路径
Vue.prototype.GLOBAL = global_
axios.defaults.baseURL = "http://123.57.61.73:9001/api";
Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
//icon图标相关
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import 'mavon-editor/dist/css/index.css'
import Prism from 'prismjs';
VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});
Vue.use(VueMarkdownEditor);
VMdPreview.use(vuepressTheme, {
    Prism
});
VMdPreview.use(createCopyCodePlugin());
Vue.use(VMdPreview);
//Markdown代码块高亮
import hljs from 'highlight.js';

import 'highlight.js/styles/atom-one-dark-reasonable.css' //样式
//创建v-highlight全局指令
Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
});
import JwChat from 'jwchat';
Vue.use(JwChat)
import './assets/icons'

