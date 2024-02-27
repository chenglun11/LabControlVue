import request from '../utils/request';

/**
 * 获取所有公告,包括条件查询接口
 * @param query
 * @returns {AxiosPromise}
 */
export const getNoticeList = query =>{
    return request({
        url:'/common/notice/getNoticeList',
        method:'get',
        params:query
    })
};

/**
 * 获取单个攻略
 * @param query
 * @returns {AxiosPromise}
 */
export const getNoticeInfo = query =>{
    return request({
        url:'/common/notice/getNoticeInfo',
        method:'get',
        params:query
    })
};

/**
 * 保存攻略接口
 * @param data
 * @returns {AxiosPromise}
 */
export const saveNoticeInfo = data =>{
    return request({
        url:'/common/notice/saveNoticeInfo',
        method:'post',
        data
    })
};
/**
 * 更新攻略接口
 * @param data
 * @returns {AxiosPromise}
 */
export const updateNoticeInfo = data =>{
    return request({
        url:'/common/notice/updateNoticeInfo',
        method:'put',
        data
    })
};

export const updateNoticeReadCount = data =>{
    return request({
        url:'/common/notice/updateNoticeReadCount',
        method:'put',
        data
    })
};
export const updateNoticeScoreInfo = data =>{
    return request({
        url:'/common/notice/updateNoticeScoreInfo',
        method:'put',
        data
    })
};


/**
 *根据id删除攻略接口
 * @param id
 * @returns {AxiosPromise}
 */
export const delNoticeInfo = id =>{
    return request({
        url:'/common/notice/delNoticeInfo',
        method:'delete',
        params:{id:id}
    })
};
/**
 * 根据id集合批量删除攻略接口
 * @param id
 * @returns {AxiosPromise}
 */
export const delBatchNoticeInfo = id =>{
    return request({
        url:'/common/notice/delBatchNoticeInfo',
        method:'delete',
        params:{idList:id}
    })
};



export const createNoticesData = data =>{
    return request({
        url:'/common/notice/createNoticeData',
        method:'post',
    })
};

export class createNoticeData {
}