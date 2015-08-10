# API document.

## controls

This document will show all controls that in the page, and list their initialize function and its parameters.

## index

* [clock](#clock)
* [menu items](#menu-items)
* [data board in the right](#data-board-in-the-right)
* [propeller transmission](#propeller-transmission)
* [light control](#light-control)
* [process circle](#process-circle)
* [camera angle](#camera-angle)
* [mask control](#mask-control)
* [shortcut system](#shortcut-system)
* [buttons](#buttons)

### clock

* **In $controller:** No
* **Init function:** clockInit()
* **Init parameters:**

| parameter | type | description |
| --- | --- | --- |
| full | boolean | whether time shows as '24-hour' or '12-hour' system. |
| tagFront | boolean | whether the position of 'AM' or 'PM' tag is in the front of time. |
| am | string | string that 'AM' tag shows. |
| pm | string | string that 'PM' tag shows. |

*Note*
If `full` set to `true`, other parameters will be ignored.

### menu items

* **In $controller:** Yes
* **$controller alias:** menu1, menu2, menu3, menu4
* **Init function:** menuInit()
* **Init parameters:** None

### data board in the right

* **In $controller:** Yes
* **$controller alias:** sbR1, sbR2, sbR3, sbR4
* **Init function:** sbRightInit()
* **Init parameters:** None

### propeller transmission

* **In $controller:** Yes
* **$controller alias:** shift
* **Init function:** shiftInit()
* **Init parameters:** 

| parameter | type | description |
| --- | --- | --- |
| total | int | total transmission level count. |
| current | int | current transmission level. |
| itemWidth | float | use to set width of transmission block in UI. |

* **Function can attach:**
  * afterSetLevel(level)

*Example*
```javascript
$controller.attach("shift", "afterSetLevel", function(lv) {
    console.log(lv);
    $.ajax(...);
});
```

### light control

* **In $controller:** Yes
* **$controller alias:** light
* **Init function:** lightInit()
* **Init parameters:** 

| parameter | type | description |
| --- | --- | --- |
| current | float | percentage of current light power. |

* **Function can attach:**
  * afterSetValue(value)

*Example*
```javascript
$controller.attach("light", "afterSetValue", function(v){
    console.log(v);
    $.ajax(...);
});
```

### process circle

* **In $controller:** Yes
* **$controller alias:** connection, voltage, galvano, power
* **Init function:** processInit()
* **Init parameters:** 

| parameter | type | description |
| --- | --- | --- |
| title | string | title shows in history data. |
| max | float | max value of the process. |
| min | float | min value of the process. |
| current | float | current value of the process. |
| radius | int(px) | radius of the outside circle. |
| size | int(px) | width of the ring. |
| backgroundColor | string(color) | background color of ring. |
| foregroundColor | string(color) | foreground color of ring. |
| maskColor | string(color) | color of the mask, usually is contontainer's(e.g. `div`) background color. |
| textColor | string(color) | text color. |
| format | string | text format in the circle center, using `@{0}` instead of current value. |
| dataQueueLength | int | length of history data. |
| historyMarginTop | int | history data margin top. |
| historyMarginBottom | int | history data margin bottom. |

### camera angle

* **In $controller:** Yes
* **$controller alias:** cameraAngle
* **Init function:** cameraAngleInit()
* **Init parameters:** 

| parameter | type | description |
| --- | --- | --- |
| current | int(deg) | current value of the angle, from -60deg to 60deg. |
| radius | int(px) | radius of the sector. |
| backgroundColor | string(color) | background color of sector. |
| foregroundColor | string(color) | foreground color of active sector. |
| textColor | string(color) | text color. |
| activeAngle | int(deg) | angle of active sector. |

### mask control

*Note:*
Mask control include all mask in the page, such as 'feature hint' and 'shortcut hint'.

* **In $controller:** Yes
* **$controller alias:** hint, shortcut
* **Init function:** maskInit()
* **Init parameters:** 

| parameter | type | description |
| --- | --- | --- |
| current | boolean | whether the button is pressed. |

### shortcut system

* **In $controller:** No
* **Init function:** shortcutInit()
* **Init parameters:** 

| parameter | type | description |
| --- | --- | --- |
| name | string | map name. |
| mapping | object | mapping object. |

**mapping object**

Shortcut system using a `mapping` object to manager all shortcut in the page. It is a list of `mapping-item`, it's members are as follow:

| parameter | type | description |
| --- | --- | --- |
| type | string | the type of action shows when the handler active, limited in ['hold', 'down', 'up']. |
| mask | string | keys mask, see following mask rule. |
| target | jQuery Object or alias | DOM that marked in `controller`. |
| invoke | string | function name attached in `controller`. |
| label | string | a sign of label position, see following label postion rule. |

**keys mask rule**

Supported keys:

**Modifiers**: Ctrl, Shift, Alt

**Numbers**: 0—9

**Letters**: A—Z (case-insensitive)

**Special**: Backspace, Tab, Enter, Pause, CapsLock, Esc, Space, PageUp, PageDown, End, Home, Left, Up, Right, Down, Insert, Delete, F1—F12, ? (Question Mark), Minus, Plus

Using '+' to support key combinations.

Using ',' to support multiple key combinations.

*Example*

* A
* b
* 0
* Plus
* Ctrl+A
* Ctrl+A,Ctrl+B

**label position rule**

This sign controls where the label is fix to its container(e.g. `div`).

| sign | description |
| --- | --- |
| tl | top left. |
| tr | top right. |
| bl | bottom left. |
| br | bottom right. |

### buttons

* **In $controller:** Yes
* **$controller alias:** float, ahead and etc.
* **Init function:** metroBtInit()
* **Init parameters:** None

**How to: bind a function to a button**

1. bind a function using `controller.bind` or simply using jQuery's bind feature like `$.click`.
2. attach a function by `controller.attach` and using name 'clickDown' to active the shortcut key.


```javascript
// binding
$controller.bind("button1", "click", function(){
    console.log('fire');
});
// when click `button1`, console will print 'fire'.

// attaching
$controller.attach("button1", "clickDown", function(){
    this.click();
});
// when press key mapping in shortcut system, console will print 'fire'.
```
