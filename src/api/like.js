import request from '../utils/request';


/**
 * 获取所有点赞,包括条件查询接口
 * @param query
 * @returns {AxiosPromise}
 */
export const getLikeList = query =>{
    return request({
        url:'/common/like/getLikeList',
        method:'get',
        params:query
    })
};

/**
 * 获取单个点赞
 * @param query
 * @returns {AxiosPromise}
 */
export const getLikeInfo = query =>{
    return request({
        url:'/common/like/getLikeInfo',
        method:'get',
        params:query
    })
};

/**
 * 保存点赞接口
 * @param data
 * @returns {AxiosPromise}
 */
export const saveLikeInfo = data =>{
    return request({
        url:'/common/like/saveLikeInfo',
        method:'post',
        data
    })
};
/**
 * 更新点赞接口
 * @param data
 * @returns {AxiosPromise}
 */
export const updateLikeInfo = data =>{
    return request({
        url:'/common/like/updateLikeInfo',
        method:'put',
        data
    })
};
/**
 *根据id删除点赞接口
 * @param id
 * @returns {AxiosPromise}
 */
export const delLikeInfo = id =>{
    return request({
        url:'/common/like/delLikeInfo',
        method:'delete',
        params:{id:id}
    })
};
/**
 * 根据id集合批量删除点赞接口
 * @param id
 * @returns {AxiosPromise}
 */
export const delBatchLikeInfo = id =>{
    return request({
        url:'/common/like/delBatchLikeInfo',
        method:'delete',
        params:{idList:id}
    })
};



