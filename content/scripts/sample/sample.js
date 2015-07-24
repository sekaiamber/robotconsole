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
        stopAll : $(".metro-bt.bt-stopall").first()
    }
    var $controller = controllerInit(controllerMap);
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
        if (typeof obj == "string") {
            obj = this._k_obj[obj];
        };
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
        if (typeof obj == "string") {
            obj = this._k_obj[obj];
        };
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
    }
}

function controller (map) {
    this.update(map);
};
controller.prototype = new controllerWeakMap();
