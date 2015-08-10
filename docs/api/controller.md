# API document.

## controller

This is a class aim to control all UI buttons. It provide a way to register, store data, and bind functions of a DOM.
*NOTE: This class inherited from class `controllerWeakMap`.*

### controller(objs)

| parameter | type | description |
| --- | --- | --- |
| objs | hash | a map of DOM and it's alias. |

*Example*
```javascript
var $controller = new controller({
    'button1': $("#button1"),
    'button2': $("#button2")
});
```

### controller.bind(obj, eventType, handler)

| parameter | type | description |
| --- | --- | --- |
| obj | jQuery Object or alias | DOM that want to bind event. |
| eventType | string | a string containing one or more DOM event types, such as "click" or "submit". |
| handler | function | a function to execute each time the event is triggered. |

*Example*
```javascript
$controller.bind("button1", "click", function(){
    console.log('fire');
});
// when click 'button1', handler will be invoked.
```

*Also see*
* [jQuery.bind](http://api.jquery.com/bind/)

### controller.do(obj, handler)

| parameter | type | description |
| --- | --- | --- |
| obj | jQuery Object or alias | DOM that want to execute function. |
| handler | function | a function to execute immediately, the first parameter of the handler is the DOM object refer to the prev parameter `obj`, the second parameter is the data of the DOM. |

*Example*
```javascript
$controller.do("button1", function($obj, data){
    $obj.html('this is the DOM object of alias "button1"');
});
// the handler will execute immediately.
```

### controller.attach(obj, funcName, handler)

| parameter | type | description |
| --- | --- | --- |
| obj | jQuery Object or alias | DOM that want to attach function. |
| funcName | string | name of attached function. |
| handler | function | a function to attach to the `obj`, `this` in the handler is point to the DOM object refer to the prev parameter `obj`, and you can set the handler's parameters as you like, and `controller.invoke` will send `obj`'s data as the last parameter automatically. |

*Example*
```javascript
$controller.attach("button1", "foo",function(message1, message2){
    this.html(message1 + message2);
});
// when the handler executed using `controller.invoke`, html of `button1` will change to the given string.
```

*Note*
In fact, all function that using `controller.attach` is attach to the DOM's data in `controller` by add prefix '\_\_func\_\_'.

*Also see*
* controller.invoke

### controller.invoke(obj, funcName[, parameter1[, ...]])

| parameter | type | description |
| --- | --- | --- |
| obj | jQuery Object or alias | DOM that want to attach function. |
| funcName | string | name of attached function. |

*Example*
```javascript
$controller.invoke("button1", "foo", "bar1", "bar2");
// refer to the example of `controller.attach`, html of `button1` will change to the given string(`bar1bar2`).
```

*Also see*
* controller.attach
