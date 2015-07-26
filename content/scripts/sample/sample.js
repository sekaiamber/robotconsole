$(document).ready(function(){
    metroBtInit();
    clockInit({
        full : false,
        tagFront : false,
        am : "AM",
        pm : "PM",
    });

    // controll initialize.
    var controllerMap = {
        float : $(".metro-bt.bt-float").first(),
        ahead : $(".metro-bt.bt-ahead").first(),
        dive : $(".metro-bt.bt-dive").first(),
        left : $(".metro-bt.bt-left").first(),
        back : $(".metro-bt.bt-back").first(),
        right : $(".metro-bt.bt-right").first(),
        shift : $(".metro-block.csl-shift").first(),
        stopAll : $(".metro-bt.bt-stopall").first(),
        sbR1 : $(".metro-block.sb-right-1").first(),
        sbR2 : $(".metro-block.sb-right-2").first(),
        sbR3 : $(".metro-block.sb-right-3").first(),
        sbR4 : $(".metro-block.sb-right-4").first(),
        menu1 : $(".menu-item:eq(0)").first(),
        menu2 : $(".menu-item:eq(1)").first(),
        menu3 : $(".menu-item:eq(2)").first(),
        menu4 : $(".menu-item:eq(3)").first(),
        light : $(".cnsl-block .light").first(),
    }
    var $controller = controllerInit(controllerMap);
    menuInit($controller);
    sbRightInit($controller);
    shiftInit($controller, {
        total : 10,
        current : 1,
        itemWidth : 19.2,
    });
    lightInit($controller, {
        current : 0.5
    });
});

/*******************
* Script Initialize
********************/

function metroBtInit () {
    $(".metro-bt").hover(function(){
        $(this).addClass("hover");
    }, function(){
        $(this).removeClass("hover");
    });
    $(".metro-bt").mousedown(function(){
        $(this).addClass("press");
    });
    $(".metro-bt").mouseup(function(){
       $(this).removeClass("press");
    });
    $(".metro-bt").mouseleave(function(){
       $(this).removeClass("press"); 
    });
};

var __CLOCK__;
var __CLOCK_DATA__;
function getTimeString() {
    var now= new Date();
    var hour= now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    var time = "";
    if (__CLOCK_DATA__.full) {
        time = hour + " : " + minute + " : " + second;
    } else {
        var tag = __CLOCK_DATA__.am;
        if (hour > 12) {
            hour -= 12;
            tag = __CLOCK_DATA__.pm;
        };
        time = hour + " : " + minute + " : " + second;
        if (__CLOCK_DATA__.tagFront) {
            time = tag + " " + time;
        } else {
            time = time + " " + tag;
        };
    };
    __CLOCK__.html(time);
}

function clockInit(data) {
    __CLOCK__  = $(".content .clock:eq(0)");
    __CLOCK_DATA__ = data;
    getTimeString();
    var myTime = setInterval("getTimeString()",1000); 
}

function controllerInit(map) {
    var $controller = new controller(map);
    return $controller;
};

function menuInit($controller) {
    "menu1,menu2,menu3,menu4".replace($controller.reach, function(key){
        $controller.bind(key, "mouseenter", function(){
            $(this).addClass("hover");
            $(this).velocity('stop').velocity({
                  width: 125,
                  left: -75
            }, 300);
        });
        $controller.bind(key, "mouseleave", function(){
            $(this).velocity('stop').velocity({
                  width: 50,
                  left: 0
            }, 300, function(){
                $(this).removeClass("hover");
            });
        });
    });
};

function sbRightInit($controller) {
    "sbR1,sbR2,sbR3,sbR4".replace($controller.reach, function(key){
        $controller.bind(key, "mouseenter", function(){
            $(this).velocity('stop').velocity({
                  width: 320,
                  left: -161
            }, 300);
        });
        $controller.bind(key, "mouseleave", function(){
            $(this).velocity('stop').velocity({
                  width: 160,
                  left: -1
            }, 300);
        });
    });
};

function shiftInit($controller, data) {
    $.extend(data, {
        setLevel : function(level, data) {
            $(".shift-item:lt(" + level + ")", this).addClass("active");
            level -= 1;
            $(".shift-item:gt(" + level + ")", this).removeClass("active");
            data['current'] = level + 1;
        },
        hoverLevel : function(level, data) {
            $(".shift-item:lt(" + level + ")", this).addClass("hover");
            level -= 1;
            $(".shift-item:gt(" + level + ")", this).removeClass("hover");
        },
        removeClass : function(name) {
            $(".shift-item", this).removeClass(name);
        }
    });
    $controller.set("shift", data);
    $controller.do("shift", function($obj, data) {
        var $shift = $('<div class="shift"></div>');
        for (var i = 0; i < data['total']; i++) {
            $shift.append('<div class="shift-item"></div>');
        };
        $(".shift-item:last", $shift).addClass("last");
        $obj.append($shift);
        $(".shift-item").each(function(i){
            $(this).css("width", data['itemWidth']);
            $(this).hover(function(){
                data.hoverLevel.call($shift, i + 1, data);
            }, function(){
                data.removeClass.call($shift, "hover");
            });
            $(this).click(function(){
                data.setLevel.call($shift, i + 1, data);
            });
        });
        data.setLevel.call($shift, data['current'], data);
    });
};

function lightInit($controller, data) {
    $.extend(data, {
        setValue : function(value, data) {
            $(".current", this).css('width', (value * 100) + "%");
            data['current'] = value;
        },
        hoverValue : function(value, data) {
            $(".mask", this).css('width', (value * 100) + "%");
        }
    });
    $controller.set("light", data);
    $controller.do("light", function($obj, data){
        $obj.append('<div class="current"></div>');
        $obj.append('<div class="mask"></div>');
        data.setValue.call($obj, data['current'], data);
        $obj.click(function(e){
            var clickX = e.offsetX;
            data.setValue.call($(this), clickX / $(this).width(), data);
        });
        $obj.hover(function(){
            $(".mask", $(this)).css('display', 'block');
        }, function(){
            $(".mask", $(this)).css('display', 'none');
        });
        $obj.mousemove(function(e){
            var clickX = e.offsetX;
            data.hoverValue.call($(this), clickX / $(this).width(), data);
        });
    });
};

/*******************
* controller
********************/
function controllerWeakMap (k_obj) {
    this._k_obj = {};
    this._k_v = {};
    this.update(k_obj);
}
controllerWeakMap.prototype = {
    update : function(objs) {
        for(var key in objs) {
            if (objs[key].data("__control__name__")) {
                objs[key].data("__control__name__").push(key);
            } else {
                objs[key].data("__control__name__", [key]);    
            };
            this._k_obj[key] = objs[key];
            if(!!!this._k_v[key]){
                this._k_v[key] = undefined;
            }
        }
    },
    set : function(obj, value) {
        obj = this._getObj(obj);
        if (obj) {
            var _name = obj.data("__control__name__");
            if (_name) {
                _name = _name[0];
            };
        };
        if (_name) {
            this._k_v[_name] = value;
        };
    },
    get : function(obj) {
        obj = this._getObj(obj);
        if (obj) {
            var _ret = obj.data("__control__name__");
            if (_ret) {
                _ret = _ret[0];
            };
        };
        if (_ret) {
            _ret = this._k_v[_ret]
        };
        return _ret;
    },
    _getObj : function(obj) {
        if (typeof obj == "string") {
            obj = this._k_obj[obj];
        };
        return obj;
    }
}

function controller (map) {
    this.update(map);

    this.reach = /[^, ]+/g;

    this.bind = function(obj, eventType, handler) {
        obj = this._getObj(obj);
        obj.bind(eventType, handler);
    };
    this.do = function(obj, handler) {
        obj = this._getObj(obj);
        handler(obj, this.get(obj), this);
    };
};
controller.prototype = new controllerWeakMap();
