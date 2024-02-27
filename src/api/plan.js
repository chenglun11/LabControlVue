import request from '../utils/request';


/**
 * 获取所有计划,包括条件查询接口
 * @param query
 * @returns {AxiosPromise}
 */
export const getPlanList = query =>{
    return request({
        url:'/common/plan/getPlanList',
        method:'get',
        params:query
    })
};

/**
 * 获取单个计划
 * @param query
 * @returns {AxiosPromise}
 */
export const getPlanInfo = query =>{
    return request({
        url:'/common/plan/getPlanInfo',
        method:'get',
        params:query
    })
};

/**
 * 保存计划接口
 * @param data
 * @returns {AxiosPromise}
 */
export const savePlanInfo = data =>{
    return request({
        url:'/common/plan/savePlanInfo',
        method:'post',
        data
    })
};
/**
 * 更新计划接口
 * @param data
 * @returns {AxiosPromise}
 */
export const updatePlanInfo = data =>{
    return request({
        url:'/common/plan/updatePlanInfo',
        method:'put',
        data
    })
};
/**
 *根据id删除计划接口
 * @param id
 * @returns {AxiosPromise}
 */
export const delPlanInfo = id =>{
    return request({
        url:'/common/plan/delPlanInfo',
        method:'delete',
        params:{id:id}
    })
};
/**
 * 根据id集合批量删除计划接口
 * @param id
 * @returns {AxiosPromise}
 */
export const delBatchPlanInfo = id =>{
    return request({
        url:'/common/plan/delBatchPlanInfo',
        method:'delete',
        params:{idList:id}
    })
};



