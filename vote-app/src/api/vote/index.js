import request from '../request';
import BASE_URL from '../config.js';
// 获取用户信息
export function getUserInfo(code) {
	return request({
		url: `${BASE_URL}/get_wx_access_token?code=${code}`,
		method: 'get'
	})
}

// 事件回访
export function supportVisit(id,obj) {
	return request({
		url: `${BASE_URL}/support/visit/${id}`,
		method: 'put',
		data: obj
	})
}