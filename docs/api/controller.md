# API document.

## controller

This is a class aim to controll all UI buttons. It provide a way to register, store data, and bind functions of a DOM.
*NOTE: This class inherited from class `controllerWeakMap`.*

### controller(objs)

| parameter | type | description |
| --- | --- | --- |
| objs | hash | a map of DOM and it's alias. |

*Example*
```javascript
var map = new controller({
    'button1': $("#button1"),
    'button2': $("#button2")
});
```
