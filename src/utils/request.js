import axios from 'axios';
import Element from 'element-ui'
// const service = axios.create({
//     baseURL: process.env.VUE_APP_CAS_BASE_URL,
//     timeout: 5000
// });
axios.interceptors.request.use(
    config => {
        if (sessionStorage.getItem('Authorization')) {
            config.headers.Authorization = sessionStorage.getItem('Authorization');
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);
axios.interceptors.response.use(
    response => {
        // console.log('---');
        // console.log(response);
        // console.log('===');
        // if (response.status === 200) {
        //     return response.data;
        // } else {
        //     Promise.reject();
        // }
        if (response.data.code === 1) {
            return response.data;
        } else if (response.data.code === 401) {
            //权限不足
            Element.Message.warning(response.data.msg);
            sessionStorage.removeItem("Authorization");
            router.push('/login')
        }else if (response.data.code === 402){
            return response.data;
        }else if(response.request.responseType === 'blob'){
            return response.data;
        }else if (response.data.code === -1){
            //其余的情况
            Element.Message.warning(response.data.msg);
            return Promise.reject();
        }else {
            return  response.data;
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default axios;
