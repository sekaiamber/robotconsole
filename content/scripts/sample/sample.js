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
        connection : $(".metro-block.sb-right-1 .canvas-container").first(),
        voltage : $(".metro-block.sb-right-2 .canvas-container").first(),
        galvano : $(".metro-block.sb-right-3 .canvas-container").first(),
        power : $(".metro-block.sb-right-4 .canvas-container").first(),
        cameraLeft : $(".metro-block.bt-camera-left").first(),
        cameraRight : $(".metro-block.bt-camera-right").first(),
        cameraReset : $(".metro-block.bt-camera-reset").first(),
        cameraAngle : $(".metro-block .camera-angle").first(),
        hint : $(".metro-bt.hint").first(),
        shortcut : $(".metro-bt.shortcut").first(),
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
    processInit($controller, {
        connection : {
            title : '连接状态',
            max : 100.0,
            min : 0.0,
            current : 64.0,
            radius : 50,
            size : 10,
            backgroundColor : '#241F2F',
            foregroundColor : '#3C5A9A',
            maskColor : '#2a313b',
            textColor : '#ddd',
            format : '@{0}ms',
            dataQueueLength : 20,
            historyMarginTop : 10,
            historyMarginBottom : 10
        },
        voltage : {
            title : '电压',
            max : 30.0,
            min : 10.0,
            current : 17.7,
            radius : 50,
            size : 10,
            backgroundColor : '#241F2F',
            foregroundColor : '#DE4837',
            maskColor : '#2a313b',
            textColor : '#ddd',
            format : '@{0}V',
            dataQueueLength : 20,
            historyMarginTop : 10,
            historyMarginBottom : 10
        },
        galvano : {
            title : '电流',
            max : 30.0,
            min : 10.0,
            current : 22.7,
            radius : 50,
            size : 10,
            backgroundColor : '#241F2F',
            foregroundColor : '#5FC382',
            maskColor : '#2a313b',
            textColor : '#ddd',
            format : '@{0}A',
            dataQueueLength : 20,
            historyMarginTop : 10,
            historyMarginBottom : 10
        },
        power : {
            title : '电量',
            max : 100.0,
            min : 0.0,
            current : 80.7,
            radius : 50,
            size : 10,
            backgroundColor : '#241F2F',
            foregroundColor : '#904FB0',
            maskColor : '#2a313b',
            textColor : '#ddd',
            format : '@{0}%',
            dataQueueLength : 1,
            historyMarginTop : 10,
            historyMarginBottom : 10
        },
    });
    cameraAngleInit($controller, {
        current : 0,
        radius : 70,
        backgroundColor : '#383F4C',
        foregroundColor : '#596579',
        maskColor : '#bcc5d5',
        textColor : '#ddd',
        activeAngle : 20
    });
    maskInit($controller, {
        current : false,
        type : 'dl'
    }, {
        current : false
    });
    shortcutInit($controller, {
        name : 'default',
        mapping : [
            { type: 'hold', mask: 'Ctrl+Up', target: 'light', invoke: 'lightUp', lable: 'tr'},
            { type: 'hold', mask: 'Ctrl+Down', target: 'light', invoke: 'lightDown', lable: 'tl'},
            { type: 'hold', mask: 'Q', target: 'float', invoke: 'clickDown', lable: 'tl'},
            { type: 'up', mask: 'Q', target: 'float', invoke: 'clickUp', lable: 'tl'},
            { type: 'hold', mask: 'W', target: 'ahead', invoke: 'clickDown', lable: 'tl'},
            { type: 'up', mask: 'W', target: 'ahead', invoke: 'clickUp', lable: 'tl'},
            { type: 'hold', mask: 'E', target: 'dive', invoke: 'clickDown', lable: 'tl'},
            { type: 'up', mask: 'E', target: 'dive', invoke: 'clickUp', lable: 'tl'},
            { type: 'hold', mask: 'A', target: 'left', invoke: 'clickDown', lable: 'tl'},
            { type: 'up', mask: 'A', target: 'left', invoke: 'clickUp', lable: 'tl'},
            { type: 'hold', mask: 'S', target: 'back', invoke: 'clickDown', lable: 'tl'},
            { type: 'up', mask: 'S', target: 'back', invoke: 'clickUp', lable: 'tl'},
            { type: 'hold', mask: 'D', target: 'right', invoke: 'clickDown', lable: 'tl'},
            { type: 'up', mask: 'D', target: 'right', invoke: 'clickUp', lable: 'tl'},
            { type: 'hold', mask: 'X', target: 'stopAll', invoke: 'clickDown', lable: 'tl'},
            { type: 'up', mask: 'X', target: 'stopAll', invoke: 'clickUp', lable: 'tl'},
            { type: 'hold', mask: 'Left', target: 'cameraLeft', invoke: 'clickDown', lable: 'tl'},
            { type: 'up', mask: 'Left', target: 'cameraLeft', invoke: 'clickUp', lable: 'tl'},
            { type: 'hold', mask: 'Right', target: 'cameraRight', invoke: 'clickDown', lable: 'tl'},
            { type: 'up', mask: 'Right', target: 'cameraRight', invoke: 'clickUp', lable: 'tl'},
            { type: 'hold', mask: 'R', target: 'cameraReset', invoke: 'clickDown', lable: 'tl'},
            { type: 'up', mask: 'R', target: 'cameraReset', invoke: 'clickUp', lable: 'tl'},
            // { type: 'hold', mask: 'Ctrl+Down', target: 'light', invoke: 'lightDown', lable: 'tl'},
        ]
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
    "sbR1,sbR2,sbR3".replace($controller.reach, function(key){
        $controller.bind(key, "mouseenter", function(){
            $(this).velocity('stop').velocity({
                width: 320,
                left: -161
            }, 300);
            $(".process", this).velocity('stop').velocity({
                opacity: 0
            }, 300);
            $(".history", this).velocity('stop').velocity({
                opacity: 1
            }, 300);
        });
        $controller.bind(key, "mouseleave", function(){
            $(this).velocity('stop').velocity({
                width: 160,
                left: -1
            }, 300);
            $(".process", this).velocity('stop').velocity({
                opacity: 1
            }, 300);
            $(".history", this).velocity('stop').velocity({
                opacity: 0
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
            var _v = value * 100;
            _v =  _v > 100 ? 100 : (_v < 0 ? 0 : _v)
            $(".current", this).css('width', _v + "%");
            data['current'] = _v / 100;
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
        // invoke.
        $controller.attach("light", "lightUp", function(data){
            data.setValue.call(this ,data['current'] + 0.05, data);
        });
        $controller.attach("light", "lightDown", function(data){
            data.setValue.call(this ,data['current'] - 0.05, data);
        });
    });
};

function processInit($controller, data) {
    $.extend(data, {
        setValue : function(name, value, data) {
            // get canvas and clean it
            var canvas = $('.process', this).first()[0];
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, 160, 160);
            // move to center, draw circle.
            context.beginPath();
            context.moveTo(80, 80);
            context.arc(80, 80, data[name]['radius'], 0, Math.PI * 2, false);
            context.closePath();
            context.fillStyle = data[name]['backgroundColor'];
            context.fill();
            // draw process.
            context.beginPath();
            context.moveTo(80, 80);
            var process = (value - data[name]['min']) / (data[name]['max'] - data[name]['min']);
            context.arc(80, 80, data[name]['radius'], 0 - Math.PI / 2, Math.PI * (2 * process - 0.5), false);
            context.closePath();
            context.fillStyle = data[name]['foregroundColor'];
            context.fill();
            // draw mask.
            context.beginPath();
            context.moveTo(80, 80);
            context.arc(80, 80, data[name]['radius'] - data[name]['size'], 0, Math.PI * 2, false);
            context.closePath();
            context.fillStyle = data[name]['maskColor'];
            context.fill();
            // draw text.
            context.font = "bold 12pt Arial";
            context.fillStyle = data[name]['textColor'];
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            var text = data[name]['format'].replace('@{0}', value);
            context.fillText(text, 80, 80);

            // update data queue.
            data[name]['dataQueue'].shift();
            data[name]['dataQueue'].push(value);
            // draw history data.
            canvas = $('.history', this).first()[0];
            context = canvas.getContext('2d');
            context.clearRect(0, 0, 320, 160);
            var each = 320 / (data[name]['dataQueueLength'] - 1);
            context.beginPath();
            context.moveTo(0, 160);
            for (var i = 0; i < data[name]['dataQueueLength']; i++) {
                var percent = (data[name]['dataQueue'][i] - data[name]['min']) / (data[name]['max'] - data[name]['min']);
                context.lineTo(i * each, (160 - (data[name]['historyMarginTop'] + data[name]['historyMarginBottom'])) * (1 - percent) + data[name]['historyMarginBottom']);
            };
            context.lineTo(320, 160);
            context.closePath();
            context.fillStyle = data[name]['foregroundColor'];
            context.fill();
            // title
            context.font = "bold 12pt Arial";
            context.fillStyle = data[name]['textColor'];
            context.textAlign = 'left';
            context.textBaseline = 'middle';
            context.fillText(data[name]['title'], 10, 20);

            data[name]['current'] = value;
        }
    });
    "connection,voltage,galvano,power".replace($controller.reach, function(name){
        $controller.set(name, data);
        data[name]['dataQueue'] = new Array(data[name]['dataQueueLength']);
        for (var i = 0; i < data[name]['dataQueueLength']; i++) {
            data[name]['dataQueue'][i] = data[name]['min'];
        };
        $controller.attach(name, "draw", function(value, data){
            data.setValue.call(this , $controller._getName(this), value, data);
        });
        $controller.invoke(name, "draw", data[name]['current']);
    });
};

function cameraAngleInit($controller, data) {
    $.extend(data, {
        setValue : function(value, data) {
            var canvas = this[0];
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, 150, 130);
            context.beginPath();
            context.moveTo(75, 100);
            context.arc(75, 100, data['radius'], (-5 / 6) * Math.PI, (-1 / 6) * Math.PI, false);
            context.closePath();
            context.fillStyle = data['backgroundColor'];
            context.fill();

            context.beginPath();
            context.moveTo(75, 100);
            context.arc(75, 100, data['radius'], (2 * value -180 - data['activeAngle']) / 360 * Math.PI, (2 * value -180 + data['activeAngle']) / 360 * Math.PI, false);
            context.closePath();
            context.fillStyle = data['foregroundColor'];
            context.fill();

            data['current'] = value;
        }
    });
    $controller.set('cameraAngle', data);
    $controller.attach('cameraAngle', "draw", function(value, data){
        data.setValue.call(this , value, data);
    });
    $controller.invoke('cameraAngle', "draw", data['current']);
};

function maskInit($controller, hintData, shortcutData) {
    var func = function(value, data) {
        if (value) {
            this.addClass("active");
            $(data['selector']).css("display", "block");
        } else {
            this.removeClass("active");
            $(data['selector']).css("display", "none");
        }
        data['current'] = value;
    }
    $.extend(hintData, {
        setValue : func,
        selector : '.hint-lable',
    });
    $.extend(shortcutData, {
        setValue : func,
        selector : '.shortcut-lable',
    });
    $controller.set('hint', hintData);
    $controller.set('shortcut', shortcutData);
    'hint,shortcut'.replace($controller.reach, function(name) {
        $controller.do(name, function($obj, data) {
            $obj.click(function() {
                data.setValue.call($(this), !$(this).hasClass("active"), data);
            });
        });
    });
    $("[hint]").each(function(){
        var $this = $(this);
        $this.append('<div class="hint-lable ' + hintData['type'] + '">' + $this.attr('hint') + '</div>');
        $this.addClass("hinted");
    });
};

function shortcutInit($controller, data) {
    for (var i = 0; i < data.mapping.length; i++) {
        (function(type, mask, target, invoke, lable) {
            $.Shortcuts.add({
                type: type,
                mask: mask,
                handler: function() {
                    $controller.invoke(target, invoke);
                },
                list: data.name
            });
            $controller.do(target, function($obj, data){
                var _m = mask.replace('+', '');
                if ($(".shortcut-lable[shortcut=" + _m + "]", $obj).length == 0) {
                    $obj.append('<div class="shortcut-lable ' + lable + '" shortcut="' + _m + '">' + mask + '</div>');
                };
            });
        })(data.mapping[i]['type'], data.mapping[i]['mask'], data.mapping[i]['target'], data.mapping[i]['invoke'], data.mapping[i]['lable']);
    };
    $.Shortcuts.start(data.name);    
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
            if (objs[key].data("__control__")) {
                objs[key].data("__control__").push(key);
            } else {
                objs[key].data("__control__", [key]);    
            };
            this._k_obj[key] = objs[key];
            if(!!!this._k_v[key]){
                this._k_v[key] = {};
            }
        }
    },
    set : function(obj, value) {
        if (typeof obj == "string") {
            var _name = obj;
        } else {
            _name = this._getName(obj);
        }
        if (_name) {
            this._k_v[_name] = value;
        };
    },
    get : function(obj) {
        if (typeof obj == "string") {
            var _ret = obj;
        } else {
            _ret = this._getName(obj);
        }
        if (_ret) {
            _ret = this._k_v[_ret];
        };
        return _ret;
    },
    _getObj : function(obj) {
        if (typeof obj == "string") {
            obj = this._k_obj[obj];
        };
        return obj;
    },
    _getName : function(obj) {
        var _ret = obj.data("__control__");
        if (_ret) {
            return _ret[0];
        };
        return undefined;
    },
}

function controller (map) {
    this.update(map);

    this.reach = /[^, ]+/g;

    this.bind = function(obj, eventType, handler) {
        obj = this._getObj(obj);
        if (obj) {
            obj.bind(eventType, handler);
        };
    };
    this.do = function(obj, handler) {
        obj = this._getObj(obj);
        if (obj) {
            handler(obj, this.get(obj), this);
        };
    };
    this.attach = function(obj, funcName, handler) {
        obj = this._getObj(obj);
        if (obj) {
            var _name = obj.data("__control__");
            if (_name) {
                _name = _name[0];
            };
            if (_name) {
                var _data = this._k_v[_name];
                funcName = "__func__" + funcName;
                var _attach = {};
                _attach[funcName] = handler;
                $.extend(_data, _attach);
            };
        };
    };
    this.invoke = function(obj, funcName) {
        obj = this._getObj(obj);
        var _data = this.get(obj);
        if (_data) {
            var handler = _data["__func__" + funcName];
            if (handler) {
                var args = [].slice.call(arguments);
                args.shift();
                args.shift();
                args.push(_data);
                handler.apply(obj, args);
            };    
        };
    };
};
controller.prototype = new controllerWeakMap();
