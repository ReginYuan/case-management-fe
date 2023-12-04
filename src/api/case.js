/**
 * 案件api管理
 */

import request from "./../utils/request.js";

/**
 * 获取案件列表接口
 * @param {Object} params
 * @return
 */
export const getCasesList = (params) => {
  return request({
    url: "/cases/list",
    method: "get",
    data: params,
    mock: false
  });
};

/**
 * 案件创建、编辑、删除接口
 * @param {Object} params
 * @return
 */
export const casesOperate = (params) => {
  return request({
    url: "/cases/operate",
    method: "post",
    data: params,
    mock: false
  });
};
