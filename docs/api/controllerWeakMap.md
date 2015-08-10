# API document.

## controllerWeakMap

This is a simulation weakmap class of DOMs using `jQuery.data`, it is useful for store data and get through it's DOM(jQuery object) and a given alias.

### controllerWeakMap(objs)

| parameter | type | description |
| --- | --- | --- |
| objs | hash | a map of DOM and it's alias. |

*Example*
```javascript
var map = new controllerWeakMap({
    'button1': $("#button1"),
    'button2': $("#button2")
});
```

### controllerWeakMap.update(objs)

| parameter | type | description |
| --- | --- | --- |
| objs | hash | a map of DOM and it's alias. |

*Example*
```javascript
map.update({
    'button3': $("#button3"),
    'button4': $("#button4")
});
```

*Note*
If you update data of a DOM which is already marked in `controllerWeakMap`, it will point one.

### controllerWeakMap.set(obj, value)

| parameter | type | description |
| --- | --- | --- |
| obj | jQuery Object or alias | DOM that want to store data. |
| value | any | data want to store. |

*Example*
```javascript
map.set($("#button1"), {'data': 1});
map.set('button2', 'data');
```

*Note*
If you set data of a DOM which is not marked in `controllerWeakMap`'s initialization or by `update` function, it will effect nothing.

### controllerWeakMap.get(obj)

| parameter | type | description |
| --- | --- | --- |
| obj | jQuery Object or alias | DOM that want to store data. |

*Example*
```javascript
map.get($("#button1"));
map.get("button2");
```

*Note*
If you get data of a DOM which is not marked in `controllerWeakMap`'s initialization or by `update` function, it will return `{}`.

### controllerWeakMap._getObj(obj)

| parameter | type | description |
| --- | --- | --- |
| obj | jQuery Object or alias | DOM's alias that want to get its DOM. |

*Example*
```javascript
map._getObj("button1");
```

*Note*
If `obj` is not a `string`, this function will return `obj` itself.

### controllerWeakMap._getName(obj)

| parameter | type | description |
| --- | --- | --- |
| obj | jQuery Object | DOM that want to get its alias. |

*Example*
```javascript
map._getObj("button1");
```

*Note*
If `obj` is not a `jQuery Object` or it is not marked in `controllerWeakMap`, this function will return `undefined`.
