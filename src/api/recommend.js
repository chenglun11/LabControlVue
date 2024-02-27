import request from '../utils/request';

export const getRecommendList = query =>{
    return request({
        url:'/common/recommend/getRecommendList',
        method:'get',
        params:query
    })
};
