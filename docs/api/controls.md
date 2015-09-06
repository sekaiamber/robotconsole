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
* [message system](#message-system)
* [gopro wifi selector](#gopro-wifi-selector)
* [gopro info](#gopro-info)
* [gopro mode selector](#gopro-mode-selector)
* [gopro action](#gopro-action)

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

This sign controls where the label is fixed to its container(e.g. `div`).

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

### message system

* **In $controller:** Yes
* **$controller alias:** messageContainer
* **Init function:** messagerInit()
* **Init parameters:** 

| parameter | type | description |
| --- | --- | --- |
| type | string | default message's position, see following message postion rule. |
| level | array | a list of level name. |
| levelTitle | array | a list of level name's title. |
| stay | int(millisecond) | how many time a message will stay. |

**message position rule**

This sign controls where the message is fixed to its container(e.g. `div`).

| sign | description |
| --- | --- |
| tl | top left. |
| tc | top center. |
| tr | top right. |
| bl | bottom left. |
| bc | bottom center. |
| br | bottom right. |

* **Function can Invoke:**
  * message(level, message[, type])

*Example*
```javascript
$controller.invoke("messageContainer", "message", "info", "Test message using default position");
$controller.invoke("messageContainer", "message", "debug", "Test message on top left", "tl");
```

**How to: add a level to message system**

1. add a level info to init function.
2. passing its name when using `invoke`.
3. add its style to CSS files.

```javascript
// add a new level
messagerInit($controller, {
    type : 'tc',
    levelTitle : {
        debug : '调试',
        info : '系统消息',
        remind : '提醒',
        warning : '警告',
        error : '错误',
        critical : '严重错误',
        testLevel : '新增项'
    },
    level : ['debug', 'info', 'remind', 'warning', 'error', 'critical', 'testLevel'],
    stay : 5000,
});

// use invoke to pass message
$controller.invoke("messageContainer", "message", "testLevel", "Testlevel message using default position");
```

```css
/* add new level's style */
.msg-sign.icon-testLevel:before { ... }
```

**message behavior**

Normally, a message will come in and stay in its container for a given time(passing by init function), finally goes out by some way, it is called a event chain. But if manually **click** itself, it will break the event chain and stop it, and start to disappear. This is a tactics of dealing with so called 'message explosion'. If a lot of messages come out in a short time, the container will flooded with those messages, this will grab user‘s attention, we don't like this. So user do have the right to close the message by himself.

### gopro wifi selector

* **In $controller:** Yes
* **$controller alias:** goProSelector
* **Init function:** goProSelectorInit()
* **Init parameters:** 

| parameter | type | description |
| --- | --- | --- |
| empty | string | default text for no result. this can be used for everywhere. |
| searching | string | default text for searching. this can be used for everywhere. |
| gopros | array | a list of gopro cameras. see following gopros example. |

** gopros array example **

```json
[
    {
        "ssid": "gopro1234",
        "frequency": "2462",
        "signal": "-46",
        "mac": "00:00:00:00:00:00"
    },
    {
        "ssid": "406",
        "frequency": "2462",
        "signal": "-46",
        "mac": "00:00:00:00:00:00"
    }
]
```

* **Function can Invoke:**
  * setgopros(gopros)

*Example*
```javascript
$controller.invoke("goProSelector", "setgopros", [
    {
        "ssid": "gopro1234",
        "frequency": "2462",
        "signal": "-46",
        "mac": "00:00:00:00:00:00"
    },
    {
        "ssid": "406",
        "frequency": "2462",
        "signal": "-46",
        "mac": "00:00:00:00:00:00"
    }
]);
```

### gopro info

* **In $controller:** Yes
* **$controller alias:** goProInfo
* **Init function:** goProInfoInit()
* **Init parameters:** 

| parameter | type | description |
| --- | --- | --- |
| noConnect | string | default text for no gopro connect. this can be used for everywhere. |
| signal | float | default signal. limited in 0 to 1. we suggest set to 0. |

* **Function can Invoke:**
  * setsignal(signal)

*Example*
```javascript
$controller.invoke("goProInfo", "setsignal", 0.4);
// data.signal will set to 0.4, and the sign in page will display 40% width of its front color.
```

  * disconnect()

*Example*
```javascript
$controller.invoke("goProInfo", "disconnect");
// UI will show the disconnect status.
// You can add some code in this function's attach function to achieve its real logic
```

### gopro mode selector

* **In $controller:** Yes
* **$controller alias:** goProMode
* **Init function:** goProModeInit()
* **Init parameters:** 

| parameter | type | description |
| --- | --- | --- |
| current | int | default mode of gopro. limited in [0, 1], 0: photo, 1: video. |
| enable | boolean | default enable. if this set to `false`, control will be disabled. |

* **Function can Invoke:**
  * setMode(signal)

*Example*
```javascript
$controller.invoke("goProMode", "setMode", 1);
// UI will set to video mode
```

**How to: set goProMode control disabled**
```javascript
// we just set its data.enable to `false`
$controller.get("goProMode").enable = false;
```

### gopro action

* **In $controller:** Yes
* **$controller alias:** goProAction
* **Init function:** goProActionInit()
* **Init parameters:** 

| parameter | type | description |
| --- | --- | --- |
| current | int | default mode of gopro. limited in [0, 1], 0: photo, 1: video. |
| enable | boolean | default enable. if this set to `false`, control will be disabled. |

* **Function can Invoke:**
  * setMode(signal)

*Example*
```javascript
$controller.invoke("goProAction", "setMode", 1);
// UI will set to video mode
```

**How to: set goProAction control disabled**
```javascript
// we just set its data.enable to `false`
$controller.get("goProAction").enable = false;
```
