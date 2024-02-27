import request from '../utils/request';


/**
 * 获取所有抓拍信息,包括条件查询接口
 * @param query
 * @returns {AxiosPromise}
 */
export const getCommentList = query =>{
    return request({
        url:'/common/comment/getCommentList',
        method:'get',
        params:query
    })
};
export const getCommentInfo2 = query =>{
    return request({
        url:'/common/comment/getCommentInfo2',
        method:'get',
        params:query
    })
};
export const getCommentTreeInfo = query =>{
    return request({
        url:'/common/comment/getCommentTreeInfo',
        method:'get',
        params:query
    })
};

/**
 * 保存抓拍信息接口
 * @param data
 * @returns {AxiosPromise}
 */
export const saveCommentInfo = data =>{
    return request({
        url:'/common/comment/saveCommentInfo',
        method:'post',
        data
    })
};
/**
 * 更新抓拍信息接口
 * @param data
 * @returns {AxiosPromise}
 */
export const updateCommentInfo = data =>{
    return request({
        url:'/common/comment/updateCommentInfo',
        method:'put',
        data
    })
};
/**
 *根据id删除抓拍信息接口
 * @param id
 * @returns {AxiosPromise}
 */
export const delCommentInfo = id =>{
    return request({
        url:'/common/comment/delCommentInfo',
        method:'delete',
        params:{id:id}
    })
};
/**
 * 根据id集合批量删除抓拍信息接口
 * @param id
 * @returns {AxiosPromise}
 */
export const delBatchCommentInfo = id =>{
    return request({
        url:'/common/comment/delBatchCommentInfo',
        method:'delete',
        params:{idList:id}
    })
};


