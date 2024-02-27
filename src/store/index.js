import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        userInfo:null,
    },
    mutations:{
        saveUserInfo(state,val){
            state.userInfo = val;
        }
    },
    actions:{

    },
    getters:{

    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage
        })
    ],
})
