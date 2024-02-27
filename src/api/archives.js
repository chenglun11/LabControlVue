import request from '../utils/request';


/**
 * 获取所有攻略,包括条件查询接口
 * @param query
 * @returns {AxiosPromise}
 */
export const getArchivesList = query =>{
    return request({
        url:'/common/archives/getArchivesList',
        method:'get',
        params:query
    })
};

/**
 * 获取单个攻略
 * @param query
 * @returns {AxiosPromise}
 */
export const getArchivesInfo = query =>{
    return request({
        url:'/common/archives/getArchivesInfo',
        method:'get',
        params:query
    })
};

/**
 * 保存攻略接口
 * @param data
 * @returns {AxiosPromise}
 */
export const saveArchivesInfo = data =>{
    return request({
        url:'/common/archives/saveArchivesInfo',
        method:'post',
        data
    })
};
/**
 * 更新攻略接口
 * @param data
 * @returns {AxiosPromise}
 */
export const updateArchivesInfo = data =>{
    return request({
        url:'/common/archives/updateArchivesInfo',
        method:'put',
        data
    })
};

export const updateArchivesReadCount = data =>{
    return request({
        url:'/common/archives/updateArchivesReadCount',
        method:'put',
        data
    })
};
export const updateArchivesScoreInfo = data =>{
    return request({
        url:'/common/archives/updateArchivesScoreInfo',
        method:'put',
        data
    })
};


/**
 *根据id删除攻略接口
 * @param id
 * @returns {AxiosPromise}
 */
export const delArchivesInfo = id =>{
    return request({
        url:'/common/archives/delArchivesInfo',
        method:'delete',
        params:{id:id}
    })
};
/**
 * 根据id集合批量删除攻略接口
 * @param id
 * @returns {AxiosPromise}
 */
export const delBatchArchivesInfo = id =>{
    return request({
        url:'/common/archives/delBatchArchivesInfo',
        method:'delete',
        params:{idList:id}
    })
};



export const createArchivesData = data =>{
    return request({
        url:'/common/archives/createArchivesData',
        method:'post',
    })
};
