/**
 * 日期工具
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
const formatObj = {
	y: date.getFullYear(),
	m: date.getMonth() + 1,
	d: date.getDate(),
	h: date.getHours(),
	i: date.getMinutes(),
	s: date.getSeconds(),
	a: date.getDay()
}
const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
		if (result.length > 0 && value < 10) {
		value = '0' + value
		}
		return value || 0
	})
	return time_str
}

export function formatTime(time, option) {
	time = +time * 1000
	const d = new Date(time)
	const now = Date.now()

	const diff = (now - d) / 1000

	if (diff < 30) {
		return '刚刚'
	} else if (diff < 3600) { // less 1 hour
		return Math.ceil(diff / 60) + '分钟前'
	} else if (diff < 3600 * 24) {
		return Math.ceil(diff / 3600) + '小时前'
	} else if (diff < 3600 * 24 * 2) {
		return '1天前'
	}
	if (option) {
		return parseTime(time, option)
	} else {
		return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
	}
}
// 获取下个月月初
export function getNextMonth (time) {
	if(typeof time == 'string'){
		time = new Date(time);
	}
	let y = time.getFullYear();
	let m = time.getMonth() + 1;
	let nextMonth = m == 12 ? (y+1 + '-' + '01' +'-'+ '01') : ( m+1 < 10 ? y + '-' + '0' + (m + 1) + '-' + '01' :  y + '-'  + (m + 1) + '-' + '01' ); 
	return nextMonth;
}
// 获取本月月初
export function getMonth (time) {
	if(typeof time == 'string'){
		time = new Date(time);
	}
	let y = time.getFullYear();
	let m = time.getMonth() + 1;
	let month = ( m < 10 ? y + '-' + '0' + (m ) + '-' + '01' :  y + '-'  + (m ) + '-' + '01' ); 
	return month;
}