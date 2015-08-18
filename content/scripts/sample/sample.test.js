$(document).ready(function(){
    __OUTPUT__ = $('<div><div>===Test Start===</div><div>');
    var _c = $('<div class="float-win-container"></div>');
    _c.append(__OUTPUT__);
    $("body").append(_c);
    if (console.log) {
        __IFCONSOLE__ = true;
    };
    $("head").append("<style>.float-win-container{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.3);overflow:auto;}.float-win-container>div{margin:30px;}</style>");

    for(test in testCase) {
        if (test.substring(0,5) == "test_") {
            testCase.do(test, function(name) {
                __OUTPUT__.append('<div test="' + name + '">' + name + " : " + "</div>");
            }, function(name, result){
                if (result == true) {
                    $("div[test=" + name + "]", __OUTPUT__).append('<span style="color:green;">PASS</span>');
                } else {
                    $("div[test=" + name + "]", __OUTPUT__).append('<span style="color:red;">FAILED</span>');
                };
                log(name + " : " + result);
            });
        };
    }
});

var __OUTPUT__;
var __IFCONSOLE__ = false;
function log(msg) {
    if (__IFCONSOLE__) {
        console.log(msg);
    };
}

var testCase = {
    do : function(test, beforeHandler ,handler) {
        beforeHandler(test);
        setTimeout(function(){ 
            testCase[test](handler);
        },0);
    },
    test_maping_doms : function(handler) {
        var result = true;
        "float,ahead,dive,left,back,right,shift,stopAll,sbR1,sbR2,sbR3,sbR4,menu1,menu2,menu3,menu4,light,connection,voltage,galvano,power,cameraLeft,cameraRight,cameraReset,cameraAngle,hint,shortcut,printScreen,download".replace($controller.reach, function(name){
            var dom = $controller._getObj(name);
            result = result && (dom.length == 1)
        });
        handler("test_maping_doms", result);
    },
    test_clock_format : function(handler) {
        var result = true;
        __CLOCK_DATA__['full'] = true;
        setTimeout(function(){
            var now= new Date();
            var hour= now.getHours();
            var minute=now.getMinutes();
            var second=now.getSeconds();
            result = result && (hour + " : " + minute + " : " + second == $(".clock").first().html());

            __CLOCK_DATA__['full'] = false;
            __CLOCK_DATA__['tagFront'] = true;
            __CLOCK_DATA__['am'] = "am";
            __CLOCK_DATA__['pm'] = "pm";
            setTimeout(function(){
                var now= new Date();
                var hour= now.getHours();
                var minute=now.getMinutes();
                var second=now.getSeconds();
                var sub = $(".clock").first().html().substring(0, 2);
                result = result && (sub == "am" || sub == "pm");

                __CLOCK_DATA__['tagFront'] = false;
                __CLOCK_DATA__['am'] = "AM";
                __CLOCK_DATA__['pm'] = "PM";
                handler("test_clock_format", result);
            }, 1000);
        }, 1000);
    },
    test_show_board_right_anime : function(handler) {
        var result = true;
        "sbR1,sbR2,sbR3".replace($controller.reach, function(name){
            var dom = $controller._getObj(name);
            dom.mouseenter();
        });
        setTimeout(function(){
            "sbR1,sbR2,sbR3".replace($controller.reach, function(name){
                var dom = $controller._getObj(name);
                dom.mouseleave();
                result = result && dom.width() == 320;
            });
            handler("test_show_board_right_anime", result);
        }, 500);
    },
    test_show_board_right_change_value : function(handler) {
        var data;
        var result = true;
        $controller.invoke("connection", "draw", 10);
        data = $controller.get("connection");
        result = result && data['connection']['dataQueue'][data['connection']['dataQueueLength'] - 1] == 10;
        $controller.invoke("voltage", "draw", 27);
        data = $controller.get("voltage");
        result = result && data['voltage']['dataQueue'][data['voltage']['dataQueueLength'] - 1] == 27;
        $controller.invoke("galvano", "draw", 11);
        data = $controller.get("galvano");
        result = result && data['galvano']['dataQueue'][data['galvano']['dataQueueLength'] - 1] == 11;
        $controller.invoke("power", "draw", 30);
        data = $controller.get("power");
        result = result && data['power']['dataQueue'][data['power']['dataQueueLength'] - 1] == 30;
        handler("test_show_board_right_change_value", result);
    },
    test_show_board_right_push_value : function(handler) {
        setTimeout(function(){
            var data;
            var result = true;
            $controller.invoke("connection", "draw", 0);
            var dom = $controller._getObj("sbR1");
            dom.mouseenter();
            var func = function(cb, time, result){
                if (time == 50) {
                    handler("test_show_board_right_push_value", result);
                    dom.mouseleave();
                    return;
                };
                var data = $controller.get('connection');
                setTimeout(function(){
                    $controller.invoke('connection', "draw", data['connection']['current']+2);
                    result = result && (data['connection']['current'] == time * 2 + 2)
                    cb(func, time+1, result)
                }, 100);
            }
            func(func, 0, true);
        }, 3000);
    },
    test_shift_change : function(handler) {
        $(".shift-item:eq(2)").click();
        handler("test_shift_change", $(".shift-item.active").length == 3);
    },
    test_light_change : function(handler) {
        var dom = $controller._getObj("light");
        var newE = $.Event('click');
        newE.offsetX = 200;
        newE.offsetY = 10;
        dom.trigger(newE);
        var data = $controller.get("light");
        handler("test_light_change", 200 / dom.width() == data['current']);
    },
    test_camera_angle_change : function(handler) {
        $controller.invoke('cameraAngle', "draw", -60);
        var func = function(cb, time, result){
            if (time == 40) {
                handler("test_camera_angle_change", result);
                return;
            };
            var data = $controller.get('cameraAngle');
            setTimeout(function(){
                $controller.invoke('cameraAngle', "draw", data['current']+3);
                result = result && (data['current'] == time * 3 - 57)
                cb(func, time+1, result)
            }, 100);
        }
        func(func, 0, true);
    },
    test_mask_change : function(handler) {
        var result = true;
        var hint = $controller._getObj('hint');
        hint.click();
        result = result && ($(".hint-label.active").length > 0);
        hint.click();
        hint = $controller._getObj('shortcut');
        hint.click();
        result = result && ($(".shortcut-label.active").length > 0);
        hint.click();
        handler("test_mask_change", result);
    },
    test_message_position : function(handler) {
        var result = true;
        $controller.invoke("messageContainer", "message", "debug", "Test message on top left", "tl");
        $controller.invoke("messageContainer", "message", "info", "Test message on top center", "tc");
        $controller.invoke("messageContainer", "message", "remind", "Test message on top right", "tr");
        $controller.invoke("messageContainer", "message", "warning", "Test message on bottom right", "bl");
        $controller.invoke("messageContainer", "message", "error", "Test message on bottom right", "bc");
        $controller.invoke("messageContainer", "message", "critical", "Test message on bottom right", "br");
        setTimeout(function(){
            handler("test_message_position", result);
        }, 3000);
    },
}


