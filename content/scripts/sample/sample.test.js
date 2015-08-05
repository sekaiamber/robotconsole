$(document).ready(function(){

    __OUTPUT__ = $('<div class="float-win-container"><div>===Test Start===</div></div>');
    $("body").append(__OUTPUT__);
    if (console.log) {
        __IFCONSOLE__ = true;
    };
    $("head").append("<style>.float-win-container{position:absolute;top:0;left:0;width:300px;height:600px;background:rgba(0,0,0,.3);overflow:auto;padding:20px;}</style>");

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
}


