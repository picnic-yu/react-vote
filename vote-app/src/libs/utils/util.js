/**
 * 全局工具类
 */
import axios from 'axios';
import env from '../../../build/env';
import semver from 'semver';
import packjson from '../../../package.json';

let util = {

};
util.title = function (title) {
    title = title || '物联管家平台';
    window.document.title = title;
};

const ajaxUrl = env === 'development'
    ? 'http://127.0.0.1:8888'
    : env === 'production'
        ? 'https://www.url.com'
        : 'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.handleTitle = function (vm, item) {
    if (typeof item.title === 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    vm.$store.commit('initCachepage');
    // 权限菜单过滤相关
    // vm.$store.commit('updateMenulist');
    // 全屏相关
};

util.checkUpdate = function (vm) {
    axios.get('https://api.github.com/repos/iview/iview-admin/releases/latest').then(res => {
        let version = res.data.tag_name;
        vm.$Notice.config({
            duration: 0
        });
        if (semver.lt(packjson.version, version)) {
            vm.$Notice.info({
                title: 'iview-admin更新啦',
                desc: '<p>iView-admin更新到了' + version + '了，去看看有哪些变化吧</p><a style="font-size:13px;" href="https://github.com/iview/iview-admin/releases" target="_blank">前往github查看</a>'
            });
        }
    });
};

// util.onWheel = function (ele, callback) {
//     ele.addEventListener('mousewheel', function (e) {
//         callback(e, e.wheelDelta);
//     });
//     ele.addEventListener('DOMMouseScroll', function (e) {
//         callback(e, e.detail * 40);
//     });
// };

// util.offWheel = function (ele, callback) {
//     ele.removeEventListener('mousewheel', callback)
// }
/*
 * 方法作用：【计算某个日期几天后或者几天前的日期】  也可以用作时间format，可用用。第二个参数传入为0就是转换
 * 传入格式：yyyy-mm-dd 或者 date
 * 使用方法：dateUtil.addDate(date,days);
 * @date {Date}起始日期
 * @days {number}天数
 * @return yyyy-mm-dd - 
 */
util.addDate = function(date,days){
    var d = new Date(date);
    // setDate() 方法用于设置一个月的某一天。
    d.setDate(d.getDate() + days);
    var m = (d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1 ):d.getMonth() + 1
        , day = (d.getDate() ) < 10 ? '0'+(d.getDate() ):d.getDate() 
        , year = d.getFullYear();
    return year + '-' + m + '-' + day;


}
/**
* 函数功能简述
*@param    {string}  code     色块需要传入的code 
*/
util.getColorAndTextByCode = function (code) {
    let obj = {
        color:'',
        text:''
    };
    switch(code){
        case 1:	
            Object.assign(obj,{
                color:'#336633',
                text:'是'
            });
        break;
        case 0:	
            Object.assign(obj,{
                color:'#ff6600',
                text:'否'
            });
        break;
        case "APPLYING":	
            Object.assign(obj,{
                color:'#660066',
                text:'派工申请中'
            });
        break;
        case "UNEXECUTED":	
            Object.assign(obj,{
                color:'#ff6600',
                text:'待执行'
            });
        break;
        case "UNDISPATCH":	
            Object.assign(obj,{
                color:'#333399',
                text:'待派工'
            });
        break;
        case "UNSHIPPING":	
            Object.assign(obj,{
                color:'#0066ff',
                text:'待出货'
            });
        break;
        case "DISPATCHING":	
            Object.assign(obj,{
                color:'#e4adc8',
                text:'派工中'
            });
        break;
        case "SHIPPING":	
            Object.assign(obj,{
                color:'#97cbe5',
                text:'出货中'
            });
        break;
        case "FINISH":	
            Object.assign(obj,{
                color:'#339933',
                text:'已完成'
            });
        break;
        case "FINISHED":	
        Object.assign(obj,{
            color:'#339933',
            text:'已完成'
        });
        break;
        case "COMPLETED":	
            Object.assign(obj,{
                color:'#339933',
                text:'已完成'
            });
        break;
        case "EFFECTIVE":	
            Object.assign(obj,{
                color:'#339933',
                text:'已生效'
            });
        break;
        case "EXPIRY":	
            Object.assign(obj,{
                color:'#999',
                text:'已失效'
            });
        break;
        case "UNEFFECTIVE":	
            Object.assign(obj,{
                color:'#ff6600',
                text:'待生效'
            });
        break;
        case "STOCK":	
            Object.assign(obj,{
                color:'#339933',
                text:'在库'
            });
        break;
        case "DELIVERY":	
            Object.assign(obj,{
                color:'#999',
                text:'出库'
            });
        break;
        case "LOCK":	
            Object.assign(obj,{
                color:'#ff6600',
                text:'锁定'
            });
        break;
        case "ACCEPTING":	
            Object.assign(obj,{
                color:'#6699ff',
                text:'受理中'
            });
        break;
        
        case "UNCONFIRMED":	
            Object.assign(obj,{
                color:'#ff3333',
                text:'待确认'
            });
        break;
        case "UNCONFIEM":	
            Object.assign(obj,{
                color:'#ff3333',
                text:'待确认'
            });
        break;
        case "UNCONFIRM":	
            Object.assign(obj,{
                color:'#ff3333',
                text:'待确认'
            });
        break;
        case "UNCONFIGURED":	
            Object.assign(obj,{
                color:'#009999',
                text:'待配置'
            });
        break;
        case "CLOSED":	
        Object.assign(obj,{
            color:'#7d7e7e',
            text:'关机'
        });
    break;
    case "FREE":	
        Object.assign(obj,{
            color:'#fdc426',
            text:'空闲'
        });
    break;
    case "DEBUGGING":	
        Object.assign(obj,{
            color:'#00a3b5',
            text:'调试'
        });
    break;
    case "WARNING":	
        Object.assign(obj,{
            color:'#eb5b72',
            text:'故障'
        });
    break;
    case "RUNNING":	
        Object.assign(obj,{
            color:'#78a442',
            text:'运行'
        });
    break;
    case "UNREVIEW":	
        Object.assign(obj,{
            color:'#ff6600',
            text:'待审核'
        });
    break;
    case "UNAUDITED":
        Object.assign(obj,{
            color:'#ff0000',
            text:'待签核'
        });
    break;
    case "AUDITING":
        Object.assign(obj,{
            color:'#ff9933',
            text:'签核中'
        });
    break;
    case "AUDITED":
        Object.assign(obj,{
            color:'#339933',
            text:'已签核'
        });
    break;
    case "ENABLED":
        Object.assign(obj,{
            color:'#3399cc',
            text:'启用'
        });
    break;
    case "UNSUBMITTED":
        Object.assign(obj,{
            color:'#ff6633',
            text:'待提交'
        });
    break;
    case "DIRECTORCHECKING":
        Object.assign(obj,{
            color:'#606',
            text:'主管审核中'
        });
    break;
    case "EXECUTIVECHECKING":
        Object.assign(obj,{
            color:'#039',
            text:'行政审核中'
        });
    break;
    case "NONFEEDBACK":
        Object.assign(obj,{
            color:'#69c',
            text:'待反馈'
        });
    break;
    case "EXECUTIVECONFIRMING":
        Object.assign(obj,{
            color:'#c6c',
            text:'行政确认中'
        });
    break;
    }
    return obj;
}
/**
* 函数功能简述 根据当前路由name 获取当前路由模块下面按钮的权限列表
*@param    {Array}  list     所有按钮集合 
*@param    {string}  name     当前路由的name 
*@return   {Array}  buttonList 当前路由模块下面按钮的权限列表
*/
util.getButtonList = function(list,name){
    let buttonList = [];
    list.forEach((item) => {
        if(item.name == name){
            buttonList = item.buttons;
        }
    });
    return buttonList;
}
export default util;
