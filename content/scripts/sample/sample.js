$(document).ready(function(){
    metroBtInit();

    // controll initialize.
    var controllerMap = {
        float : $(".metro-bt.bt-float").first(),
        ahead : $(".metro-bt.bt-ahead").first(),
        dive : $(".metro-bt.bt-dive").first(),
        left : $(".metro-bt.bt-left").first(),
        back : $(".metro-bt.bt-back").first(),
        right : $(".metro-bt.bt-right").first(),
        stopAll : $(".metro-bt.bt-stopall").first(),
        sbR1 : $(".metro-block.sb-right-1").first(),
        sbR2 : $(".metro-block.sb-right-2").first(),
        sbR3 : $(".metro-block.sb-right-3").first(),
        sbR4 : $(".metro-block.sb-right-4").first()
    }
    var $controller = controllerInit(controllerMap);
    $controller.bind("sbR1", "click", function(){
        console.log(1);
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

function controllerInit(map) {
    var $controller = new controller(map);
    return $controller;
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
    this.bind = function(obj, eventType, handler) {
        obj = this._getObj(obj);
        obj.bind(eventType, handler);
    };
};
controller.prototype = new controllerWeakMap();
