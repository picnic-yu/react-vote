var CreatedOKLodop7766=null;

//====判断是否需要安装CLodop云打印服务器:====
export function needCLodop(){
    try{
	var ua=navigator.userAgent;
	if (ua.match(/Windows\sPhone/i) !=null) return true;
	if (ua.match(/iPhone|iPod/i) != null) return true;
	if (ua.match(/Android/i) != null) return true;
	if (ua.match(/Edge\D?\d+/i) != null) return true;
	
	var verTrident=ua.match(/Trident\D?\d+/i);
	var verIE=ua.match(/MSIE\D?\d+/i);
	var verOPR=ua.match(/OPR\D?\d+/i);
	var verFF=ua.match(/Firefox\D?\d+/i);
	var x64=ua.match(/x64/i);
	if ((verTrident==null)&&(verIE==null)&&(x64!==null)) 
		return true; else
	if ( verFF !== null) {
		verFF = verFF[0].match(/\d+/);
		if ((verFF[0]>= 41)||(x64!==null)) return true;
	} else 
	if ( verOPR !== null) {
		verOPR = verOPR[0].match(/\d+/);
		if ( verOPR[0] >= 32 ) return true;
	} else 
	if ((verTrident==null)&&(verIE==null)) {
		var verChrome=ua.match(/Chrome\D?\d+/i);		
		if ( verChrome !== null ) {
			verChrome = verChrome[0].match(/\d+/);
			if (verChrome[0]>=41) return true;
		};
	};
        return false;
    } catch(err) {return true;};
};

//====页面引用CLodop云打印必须的JS文件：====
if (needCLodop()) {
	var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
	var oscript = document.createElement("script");
	oscript.src ="http://localhost:8000/CLodopfuncs.js?priority=1";
	head.insertBefore( oscript,head.firstChild );

	//引用双端口(8000和18000）避免其中某个被占用：
	oscript = document.createElement("script");
	oscript.src ="http://localhost:18000/CLodopfuncs.js?priority=0";
	head.insertBefore( oscript,head.firstChild );
};

//====获取LODOP对象的主过程：====
export function getLodop( oOBJECT, oEMBED){
    let strHtmInstall= {
        msg: '打印控件未安装！安装后请刷新页面或重新进入。',
        url: 'http://www.lodop.net/download/Lodop6.222_CLodop3.043.zip',
    },
    strHtmUpdate = {
        msg: '打印控件需要升级！升级后请重新进入。',
        url: 'http://www.lodop.net/download/Lodop6.222_CLodop3.043.zip',
    },
    strHtm64_Install = {
        msg: '打印控件未安装！安装后请刷新页面或重新进入。',
        url: 'http://www.lodop.net/download/Lodop6.222_CLodop3.043.zip',
    },
    strHtm64_Update = {
        msg: '打印控件需要升级！升级后请重新进入。',
        url: 'http://www.lodop.net/download/Lodop6.222_CLodop3.043.zip',
    },
    strHtmFireFox = {
        msg: '（注意：如曾安装过Lodop旧版附件npActiveXPLugin，请在【工具】->【附加组件】->【扩展】中先卸它）',
        url: '',
    },
    strHtmChrome = {
        msg: '（如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）',
        url: '',
    },
    strCLodopInstall = {
        msg: 'CLodop云打印服务(localhost本地)未安装启动！安装后请刷新页面。',
        url: 'http://www.lodop.net/download/CLodop_Setup_for_Win32NT_https_3.043Extend.zip',
    },
    strCLodopUpdate = {
        msg: 'CLodop云打印服务需升级！升级后请刷新页面。',
        url: 'http://www.lodop.net/download/CLodop_Setup_for_Win32NT_https_3.043Extend.zip',
    }
    var LODOP;
    try{
        var isIE = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);
        if (needCLodop()) {
            try{ LODOP = getCLodop();} catch(err) {};
	        if (!LODOP && document.readyState!=="complete") {
                alert("C-Lodop没准备好，请稍后再试！");
                return {
                    lodop: null,
                };
            };
            if (!LODOP) {
                return {
                    lodop: null,
                    alert: strCLodopInstall
                };
            } else {

                if (CLODOP.CVERSION < "3.0.2.9") { 
                    return {
                        lodop: LODOP,
                        alert: strCLodopUpdate
                    };
                };
                if (oEMBED && oEMBED.parentNode) 
                    oEMBED.parentNode.removeChild(oEMBED);
                if (oOBJECT && oOBJECT.parentNode)              oOBJECT.parentNode.removeChild(oOBJECT);	
            };
        } else {
            var is64IE = isIE && (navigator.userAgent.indexOf('x64')>=0);
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT!=undefined || oEMBED!=undefined) {
                if (isIE) LODOP=oOBJECT; else  LODOP=oEMBED;
            } else if (CreatedOKLodop7766==null){
                LODOP = document.createElement("object");
                LODOP.setAttribute("width",0);
                LODOP.setAttribute("height",0);
                LODOP.setAttribute("style","position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE) LODOP.setAttribute("classid","clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else LODOP.setAttribute("type","application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766=LODOP;
             } else LODOP=CreatedOKLodop7766;
            //=====Lodop插件未安装时提示下载地址:==========
            if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
                 if (navigator.userAgent.indexOf('Chrome')>=0)
                    return {
                        lodop: LODOP,
                        alert: strHtmChrome
                    }
                 if (navigator.userAgent.indexOf('Firefox')>=0)
                    return {
                        lodop: LODOP,
                        alert: strHtmFireFox
                    }
                 if (is64IE) return {
                        lodop: LODOP,
                        alert: strHtm64_Install
                    }; else
                 if (isIE) return {
                        lodop: LODOP,
                        alert: strHtmInstall
                    }; else
                    return {
                       lodop: LODOP,
                       alert: strHtmInstall
                    };
                // return {
                //      lodop: LODOP
                // };
            };
        };
        if (LODOP.VERSION<"6.2.2.1") {
            if (!needCLodop()){
            	if (is64IE) {
                    return {
                        lodop: LODOP,
                        alert: strHtm64_Update
                    }
                } else if (isIE) {
                    return {
                        lodop: LODOP,
                        alert: strHtmUpdate
                    }
                } else {
                    return {
                        lodop: LODOP,
                        alert: strHtmUpdate
                    }
                }
	        };
            return {
                lodop: LODOP
            };
        };
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
        LODOP.SET_LICENSES("","13528A153BAEE3A0254B9507DCDE2839","","");
        //===========================================================
        return {
            lodop: LODOP
        };
    } catch(err) {alert("getLodop出错:" + err);};
};

export function printChart(lodop, option) {
    const PageHeight = 1122.24, // 打印页面高度
          PageWidth = 793.92    // 打印页面宽度
    let padding = 40,    // 页边距
        sum = padding + (option.top ? option.top : 0), // 每次打印高度位置
        canvas, 
        img, 
        table, 
        limit,      // 打印限制高度
        pageWidth = PageWidth,
        pageHeight = PageHeight,
        incr = 1,   // 序号
        page = 1;    // 分页

    if (option.direction == 2) {
        pageWidth = PageHeight
        pageHeight = PageWidth
    } 
    limit = pageHeight - 2 * padding

    init(lodop ,option, padding, sum)
    setNewPage(lodop, pageHeight, padding, page);
    sum += 78;

    lodop.SET_PRINT_STYLE("Bold", 1);
    lodop.SET_PRINT_STYLE("Alignment", 1);
    // lodop.ADD_PRINT_LINE(sum, padding, sum, `RightMargin:${padding}px`, 0, 1)
    option.item.forEach((item, index) => {
        sum += item.top
        if (item.type == 'table') {
            table = document.querySelector(item.el)
            item.height = table.querySelectorAll('tr').length * 27 + 1
            if (sum + item.height >= limit) {
                sum = padding
                lodop.NEWPAGE()
                page++
                setNewPage(lodop, pageHeight, padding, page)
            }
            if (item.title) {
                lodop.ADD_PRINT_TEXT(sum, padding, '100%', 14, `${incr}. ${item.title}`)
                lodop.ADD_PRINT_LINE(sum + 25, padding, sum + 25, `RightMargin:${padding}px`, 2, 1)
                incr++
            }
            lodop.ADD_PRINT_HTM(sum + 40, padding, `RightMargin:${padding}px`, item.height, table.innerHTML)
        } 
        if (item.type == 'inline') {
            let width = (pageWidth - 3 * padding) / 2
            item.height = 350 * width / 770
            item.left = padding
            if (sum + item.height >= limit) {
                sum = padding
                lodop.NEWPAGE()
                page++
                setNewPage(lodop, pageHeight, padding, page)
            }
            item.el.forEach((val, index) => {
                canvas = document.querySelector(val).querySelector('canvas');
                img = canvas.toDataURL("image/png");
                lodop.ADD_PRINT_TEXT(sum, item.left, '100%', 14, `${incr}. ${item.title[index]}`)
                lodop.ADD_PRINT_LINE(sum + 25, item.left, sum + 25, item.left + width -padding, 2, 1)
                incr++
                lodop.ADD_PRINT_IMAGE(sum + 40, item.left, width, item.height, img)
                item.left = width + 2 * padding
            })
        }
        if (item.type == 'chart') {
            canvas = document.querySelector(item.el).querySelector('canvas');
            item.height = (pageWidth - 2 * padding) / canvas.clientWidth * canvas.clientHeight
            img = canvas.toDataURL("image/png")
            if (sum + item.height >= limit) {
                sum = padding
                lodop.NEWPAGE()
                page++
                setNewPage(lodop, pageHeight, padding, page)
            }
            lodop.ADD_PRINT_TEXT(sum, padding, '100%', 14, `${incr}. ${item.title}`)
            lodop.ADD_PRINT_LINE(sum + 25, padding, sum + 25, `RightMargin:${padding}px`, 2, 1)
            incr++
            lodop.ADD_PRINT_IMAGE(sum + 40, padding, `RightMargin:${padding}px`, item.height, img)
        }
        sum = sum + 40 + item.height
    })
}

function setNewPage(lodop, pageHeight, padding, page) {
    lodop.SET_PRINT_STYLE("FontSize", 9);
    lodop.SET_PRINT_STYLE("Alignment", 2);
    lodop.ADD_PRINT_LINE((pageHeight - 2 * padding + 15), padding, (pageHeight - 2 * padding + 15), `RightMargin:${padding}px`, 0, 1);
    lodop.ADD_PRINT_TEXT((pageHeight - 2 * padding + 25), 0, '100%', 11, page);
    lodop.SET_PRINT_STYLE("Alignment", 1);
    lodop.SET_PRINT_STYLE("FontSize", 12);
}

function init(lodop, option, padding, sum) {
    let img;
    lodop.PRINT_INIT(option.title)
    lodop.SET_PRINT_PAGESIZE(option.direction ? option.direction : 0, 0, 0, 'A4')
    lodop.SET_PRINT_STYLE("FontSize", 18);
    lodop.SET_PRINT_STYLE("Bold", 1);
    lodop.SET_PRINT_STYLE("Stretch", 2);
    img = document.querySelector('.logo-con').querySelector('img')
    lodop.ADD_PRINT_IMAGE(padding, padding, 100, 100, `<img src='${img.src}'/>`);
    lodop.SET_PRINT_STYLE("Alignment", 2);
    lodop.ADD_PRINT_TEXT(sum, 0, '100%', 20, option.title);
    lodop.SET_PRINT_STYLE("FontSize", 12);
    lodop.SET_PRINT_STYLE("Bold", 0);
    sum += 50
    if (option.hasOwnProperty('date')) {
        lodop.SET_PRINT_STYLE("Alignment", 1);
        lodop.ADD_PRINT_TEXT(sum, padding, "RightMargin:0px", 14, option.date)
    }
    if (option.hasOwnProperty('organization')) {
        lodop.SET_PRINT_STYLE("Alignment", 2);
        lodop.ADD_PRINT_TEXT(sum, 0, "RightMargin:0px", 14, option.organization ? `所属组织：${option.organization}` : '');
    }
    if (option.hasOwnProperty('province')) {
        lodop.SET_PRINT_STYLE("Alignment", 3);
        lodop.ADD_PRINT_TEXT(sum, 0, `RightMargin:${padding}px`, 14, option.province ? `地区：${option.province}` : '地区：全国');
    }
}

export function printPaper(lodop, el, direction = 0) {
    const PageHeight = 1122.24 // 打印页面高度
    if (typeof el != 'string') {
        el.forEach(item => {
            let  page = 1 
            setNewPage(lodop, PageHeight - 60, 10, page)
            let table = document.querySelector(item);
            lodop.SET_PRINT_PAGESIZE(direction, 0, 0, 'A4');
            lodop.SET_PRINT_STYLE("Alignment", 1);
            lodop.SET_PRINT_STYLE("Stretch", 2);
            if (table.children[0].clientHeight > PageHeight - 70) {
                lodop.ADD_PRINT_HTM(0, 0, "100%", PageHeight - 70, table.innerHTML)
                lodop.NEWPAGE()
                page++
                setNewPage(lodop, PageHeight - 60, 10, page)
            } else {
                lodop.ADD_PRINT_HTM(0, 0, "100%", table.children[0].clientHeight, table.innerHTML)
            }
            lodop.NEWPAGE()
        })
    } else {
        let table = document.querySelector(el);
        lodop.SET_PRINT_PAGESIZE(direction, 0, 0, 'A4');
        lodop.SET_PRINT_STYLE("Alignment", 1);
        lodop.SET_PRINT_STYLE("Stretch", 2);
        lodop.ADD_PRINT_HTM(0, 0, "100%", table.children[0].clientHeight, table.innerHTML)
    }
}