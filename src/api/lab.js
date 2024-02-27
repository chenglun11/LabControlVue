import request from '../utils/request';


/**
 * 获取所有实验室,包括条件查询接口
 * @param query
 * @returns {AxiosPromise}
 */
export const getLabList = query =>{
    return request({
        url:'/common/lab/getLabList',
        method:'get',
        params:query
    })
};

/**
 * 获取单个实验室
 * @param query
 * @returns {AxiosPromise}
 */
export const getLabInfo = query =>{
    return request({
        url:'/common/lab/getLabInfo',
        method:'get',
        params:query
    })
};

/**
 * 保存实验室接口
 * @param data
 * @returns {AxiosPromise}
 */
export const saveLabInfo = data =>{
    return request({
        url:'/common/lab/saveLabInfo',
        method:'post',
        data
    })
};
/**
 * 更新实验室接口
 * @param data
 * @returns {AxiosPromise}
 */
export const updateLabInfo = data =>{
    return request({
        url:'/common/lab/updateLabInfo',
        method:'put',
        data
    })
};
/**
 *根据id删除实验室接口
 * @param id
 * @returns {AxiosPromise}
 */
export const delLabInfo = id =>{
    return request({
        url:'/common/lab/delLabInfo',
        method:'delete',
        params:{id:id}
    })
};
/**
 * 根据id集合批量删除实验室接口
 * @param id
 * @returns {AxiosPromise}
 */
export const delBatchLabInfo = id =>{
    return request({
        url:'/common/lab/delBatchLabInfo',
        method:'delete',
        params:{idList:id}
    })
};



export const createLabData = data =>{
    return request({
        url:'/common/lab/createLabData',
        method:'post',
    })
};
