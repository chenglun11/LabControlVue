import request from '../utils/request';


/**
 * 获取所有报修,包括条件查询接口
 * @param query
 * @returns {AxiosPromise}
 */
export const getRepairList = query =>{
    return request({
        url:'/common/repair/getRepairList',
        method:'get',
        params:query
    })
};

/**
 * 获取单个报修
 * @param query
 * @returns {AxiosPromise}
 */
export const getRepairInfo = query =>{
    return request({
        url:'/common/repair/getRepairInfo',
        method:'get',
        params:query
    })
};

/**
 * 保存报修接口
 * @param data
 * @returns {AxiosPromise}
 */
export const saveRepairInfo = data =>{
    return request({
        url:'/common/repair/saveRepairInfo',
        method:'post',
        data
    })
};
/**
 * 更新报修接口
 * @param data
 * @returns {AxiosPromise}
 */
export const updateRepairInfo = data =>{
    return request({
        url:'/common/repair/updateRepairInfo',
        method:'put',
        data
    })
};
/**
 *根据id删除报修接口
 * @param id
 * @returns {AxiosPromise}
 */
export const delRepairInfo = id =>{
    return request({
        url:'/common/repair/delRepairInfo',
        method:'delete',
        params:{id:id}
    })
};
/**
 * 根据id集合批量删除报修接口
 * @param id
 * @returns {AxiosPromise}
 */
export const delBatchRepairInfo = id =>{
    return request({
        url:'/common/repair/delBatchRepairInfo',
        method:'delete',
        params:{idList:id}
    })
};



