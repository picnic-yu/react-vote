/* 获取URL参数 */
export const  getUrlParams = (name)=> {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/* 获取openid */
export const getOpenId = (url) => {
    var openid = getCookie("usropenid");
    if (openid == null) {
        openid = getUrlParams('openid');
        alert("openid="+openid);
        if (openid == null) {
            window.location.href = "wxcode?url=" + url;
        } else {
            setCookie("usropenid", openid);
        }
    }
}

/* 写cookie */
export const setCookie = (name, value)=> {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
/* 读cookie */
export const getCookie =(name)=> {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2]);
    }
    return null;
}
