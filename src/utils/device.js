
// 获取手机设备号，依赖于 index.html 中引入的 cordova.js 插件
export const getUUID = () => {
  return window.device?.uuid
}

// 判断是否为APP应用，依赖于 index.html 中引入的 cordova.js 插件
export const isAndroidApp = () => {
  return window.resolveLocalFileSystemURL && window.cordova
}

// 获取文件默认储存目录，依赖于 index.html 中引入的 cordova.js 插件
export const getFilesStorePath = () => {
  return cordova.file.externalDataDirectory.replace('file:///storage/emulated/0', '')
}

export function getOsInfo() {
	var userAgent = navigator.userAgent.toLowerCase();
	var name = 'Unknown';
	var version = "";
	if(userAgent.indexOf("win") > -1) {
		name = "Windows";
		if(userAgent.indexOf("windows nt 5.0") > -1) {
			version = "2000";
		} else if(userAgent.indexOf("windows nt 5.1") > -1 || userAgent.indexOf("windows nt 5.2") > -1) {
			version = "XP";
		} else if(userAgent.indexOf("windows nt 6.0") > -1) {
			version = "Vista";
		} else if(userAgent.indexOf("windows nt 6.1") > -1 || userAgent.indexOf("windows 7") > -1) {
			version = "7";
		} else if(userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows 8") > -1) {
			version = "8";
		} else if(userAgent.indexOf("windows nt 6.3") > -1) {
			version = "8.1";
		} else if(userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows nt 10.0") > -1) {
			version = "10";
		}
	} else if(userAgent.indexOf("iphone") > -1) {
		name = "Iphone";
	} else if(userAgent.indexOf("mac") > -1) {
		name = "Mac";
	} else if(userAgent.indexOf("x11") > -1 || userAgent.indexOf("unix") > -1 || userAgent.indexOf("sunname") > -1 || userAgent.indexOf("bsd") > -1) {
		name = "Unix";
	} else if(userAgent.indexOf("linux") > -1) {
		if(userAgent.indexOf("android") > -1) {
			name = "Android"
		} else {
			name = "Linux";
		}
	} else if(userAgent.indexOf("android") > -1) {
    name = "Android"
  }
  version = version || userAgent.match(new RegExp(`${name}[\\s\\/]?([\\d.]+)`, 'i'))?.[1] || ''
	return {name, version}
}
export function getBrowerInfo(){
	var Browser = Browser || (function(window) {
    var document = window.document,
      navigator = window.navigator,
      agent = navigator.userAgent.toLowerCase(),
      //IE8+支持.返回浏览器渲染当前文档所用的模式
      //IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
      //IE10:10(兼容模式7||8||9)
      IEMode = document.documentMode,
      //chorme
      chrome = window.chrome || false,
      System = {
        //user-agent
        agent: agent,
        //是否为IE
        isIE: /trident/.test(agent),
        //Gecko内核
        isGecko: agent.indexOf("gecko") > 0 && agent.indexOf("like gecko") < 0,
        //webkit内核
        isWebkit: agent.indexOf("webkit") > 0,
        //是否为标准模式
        isStrict: document.compatMode === "CSS1Compat",
        //是否支持subtitle
        supportSubTitle: function() {
          return "track" in document.createElement("track");
        },
        //是否支持scoped
        supportScope: function() {
          return "scoped" in document.createElement("style");
        },

        //获取IE的版本号
        ieVersion: function() {
          var rMsie  = /(msie\s|trident.*rv:)([\w.]+)/;
          var ma = window.navigator.userAgent.toLowerCase()
          var  match  = rMsie.exec(ma);  
          try {
            return match[2];
          } catch (e) {
            return IEMode;
          }
        },
        //Opera版本号
        operaVersion: function() {
          try {
            if (window.opera) {
              return agent.match(/opera.([\d.]+)/)[1];
            } else if (agent.indexOf("opr") > 0) {
              return agent.match(/opr\/([\d.]+)/)[1];
            }
          } catch (e) {
            return 0;
          }
        }
      }; 

    try {
      //浏览器类型(IE、Opera、Chrome、Safari、Firefox)
      System.type = System.isIE ? "IE" :
        window.opera || (agent.indexOf("opr") > 0) ? "Opera" :
        (agent.indexOf("chrome") > 0) ? "Chrome" :
        agent.includes('safari') && !agent.includes('chrome') ? "Safari" :
        (agent.indexOf("firefox") > 0) ? "Firefox" :
        'unknow';

      //版本号 
      System.version = (System.type === "IE") ? System.ieVersion() :
        (System.type === "Firefox") ? agent.match(/firefox\/([\d.]+)/)[1] :
        (System.type === "Chrome") ? agent.match(/chrome\/([\d.]+)/)[1] :
        (System.type === "Opera") ? System.operaVersion() :
        (System.type === "Safari") ? agent.match(/version\/([\d.]+)/)[1] :
        "0";

      //浏览器外壳
      System.shell = function() {

        if (agent.indexOf("edge") > 0) {
          System.version = agent.match(/edge\/([\d.]+)/)[1] || System.version;
          return "edge浏览器";
        }
        //遨游浏览器
        if (agent.indexOf("maxthon") > 0) {
          System.version = agent.match(/maxthon\/([\d.]+)/)[1] || System.version;
          return "傲游浏览器";
        }
        //QQ浏览器
        if (agent.indexOf("qqbrowser") > 0) {
          System.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || System.version;
          return "QQ浏览器";
        }

        //搜狗浏览器
        if (agent.indexOf("se 2.x") > 0) {
          return '搜狗浏览器';
        }

        //Electron
        if (agent.indexOf("electron") > 0) {
          return 'Electron';
        }

        //Chrome:也可以使用window.chrome && window.chrome.webstore判断
        if (chrome && System.type !== "Opera") {
          var external = window.external,
            clientInfo = window.clientInformation,
            //客户端语言:zh-cn,zh.360下面会返回undefined
            clientLanguage = clientInfo.languages;

          //猎豹浏览器:或者agent.indexOf("lbbrowser")>0
          if (external && 'LiebaoGetVersion' in external) {
            return '猎豹浏览器';
          }
          //百度浏览器
          if (agent.indexOf("bidubrowser") > 0) {
            System.version = agent.match(/bidubrowser\/([\d.]+)/)[1] ||
              agent.match(/chrome\/([\d.]+)/)[1];
            return "百度浏览器";
          }
          //360极速浏览器和360安全浏览器
          if (System.supportSubTitle() && typeof clientLanguage === "undefined") {
            //object.key()返回一个数组.包含可枚举属性和方法名称
            var storeKeyLen = Object.keys(chrome.webstore).length
            return storeKeyLen > 1 ? '360极速浏览器' : '360安全浏览器';
          }
          return "Chrome";
        }
        return System.type;
      };

      //浏览器名称(如果是壳浏览器,则返回壳名称)
      System.name = System.shell();
    } catch (e) {
      console.error(e)
    }
    return {
      client: System
    };

  })(window);
  if (Browser.client.name == undefined || Browser.client.name=="") {
    Browser.client.name = "Unknown";
    Browser.client.version = "";
  }else if(Browser.client.version == undefined){
    Browser.client.version = "";
  }
  return Browser;
}

export function networkStat(){
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return {
    online: navigator.onLine,
    downlink: connection?`${connection.downlink}Mbps`:'未知', //有效带宽估算
    downlinkMax: !connection || connection.downlinkMax === Infinity ? '未知' : `${connection.downlinkMax}Mbps`, //最大下行速度估算
    type: connection?.effectiveType||'未知', //网络类型，由最大下行速度决定
    rtt: connection?`${connection.rtt}ms`:'未知', //连接预估往返时间
  }
}