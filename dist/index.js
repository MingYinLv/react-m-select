'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactDOM = _interopDefault(require('react-dom'));
var reactUse = require('react-use');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

/**
 * Created 2019/12/16 14:47 By lvmingyin
 */
var MainContext = React__default.createContext({ getClass: function () { return ''; } });
//# sourceMappingURL=contexts.js.map

var EventType;
(function (EventType) {
    EventType["None"] = "";
    EventType["Start"] = "Start";
    EventType["Move"] = "Move";
    EventType["End"] = "End";
})(EventType || (EventType = {}));
var useTouch = function (ref) {
    if (process.env.NODE_ENV === 'development') {
        if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
            console.error('useTouch expects a single ref argument.');
        }
    }
    var _a = reactUse.useRafState({
        eventType: EventType.None,
        prevEventType: EventType.None,
        directions: {
            vertical: 0,
            horizontal: 0,
        },
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        moveX: 0,
        moveY: 0,
    }), state = _a[0], setState = _a[1];
    var setFullState = function (args) {
        setState(function (prev) { return (__assign(__assign(__assign({}, prev), { prevEventType: prev.eventType }), args)); });
    };
    var touchStartHandle = function (event) {
        var target = event.changedTouches[0];
        setFullState({
            eventType: EventType.Start,
            startX: target.clientX,
            startY: target.clientY,
        });
    };
    var touchMoveHandle = function (event) {
        setState(function (prev) {
            var _a = event.changedTouches[0], clientX = _a.clientX, clientY = _a.clientY;
            var prevX = prev.eventType === EventType.Move ? prev.moveX : prev.startX;
            var prevY = prev.eventType === EventType.Move ? prev.moveY : prev.startY;
            var directions = {
                vertical: prevY - clientY,
                horizontal: prevX - clientX,
            };
            return __assign(__assign({}, prev), { directions: directions, prevEventType: prev.eventType, eventType: EventType.Move, moveX: clientX, moveY: clientY });
        });
    };
    var touchEndHandle = function (event) {
        var target = event.changedTouches[0];
        setFullState({
            eventType: EventType.End,
            endX: target.clientX,
            endY: target.clientY,
        });
    };
    React.useEffect(function () {
        if (ref && ref.current) {
            ref.current.addEventListener('touchstart', touchStartHandle);
            ref.current.addEventListener('touchmove', touchMoveHandle);
            ref.current.addEventListener('touchend', touchEndHandle);
        }
        return function () {
            if (ref && ref.current) {
                ref.current.removeEventListener('touchstart', touchStartHandle);
                ref.current.removeEventListener('touchmove', touchMoveHandle);
                ref.current.removeEventListener('touchend', touchEndHandle);
            }
        };
    }, [ref]);
    return state;
};
//# sourceMappingURL=useTouch.js.map

/**
 * Created 2019/12/16 13:57 By lvmingyin
 */
var findNear = function (_a) {
    var value = _a.value, step = _a.step, min = _a.min, max = _a.max;
    var result = Math.round(value / step) * 30;
    if (result > max)
        return max;
    else if (result < min)
        return min;
    return result;
};
var OptionList = function (_a) {
    var items = _a.items;
    var getClass = React.useContext(MainContext).getClass;
    var _b = reactUse.useRafState(0), scrollY = _b[0], setScrollY = _b[1];
    var _c = reactUse.useRafState(0), lastMoveDiff = _c[0], setLastMoveDiff = _c[1];
    var minScroll = -(items.length - 1) * 30;
    var maxScroll = 0;
    var options = React.useRef(null);
    var touch = useTouch(options);
    React.useEffect(function () {
        if (touch.eventType === EventType.End) {
            setScrollY(findNear({ value: scrollY, step: 30, min: minScroll, max: maxScroll }));
        }
        if (touch.eventType !== EventType.Move)
            return;
        var vertical = touch.directions.vertical;
        setLastMoveDiff(vertical);
        if (scrollY - vertical < minScroll) {
            setScrollY(minScroll);
        }
        else if (scrollY - vertical > maxScroll) {
            setScrollY(maxScroll);
        }
        else {
            var tmpY = scrollY - vertical;
            setScrollY(tmpY);
        }
    }, [touch]);
    return (React__default.createElement("div", { className: getClass('popover-overlay-options'), ref: options },
        React__default.createElement("div", { className: getClass('popover-overlay-options-scroll'), style: {
                transform: "translate3d(0, " + scrollY + "px, 0)",
            } }, items.map(function (n) { return (React__default.createElement("div", { key: n.value, className: getClass('popover-overlay-options-item') },
            React__default.createElement("span", { className: getClass('popover-overlay-options-item-label') }, n.label))); }))));
};

/**
 * Created 2019/11/18 14:54 By lvmingyin
 */
var Select = function (props) {
    var container = React.useRef(document.createElement('div'));
    var _a = React.useState(false), visible = _a[0], setVisible = _a[1];
    var _b = React.useState(false), animateVisible = _b[0], setAnimateVisible = _b[1];
    var _c = React.useState(false), firstClick = _c[0], setFirstClick = _c[1];
    function getClass(name) {
        var classnames$1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            classnames$1[_i - 1] = arguments[_i];
        }
        return classnames.apply(void 0, __spreadArrays([(props.prefixCls || 'm-zhinanmao-select') + "-" + name], classnames$1));
    }
    function handleAnimationEnd() {
        setAnimateVisible(visible);
    }
    function handleClickInput() {
        setFirstClick(true);
        setVisible(true);
        setAnimateVisible(true);
        props.onVisibleChange && props.onVisibleChange(true);
    }
    function handleClickHide() {
        setVisible(false);
        props.onVisibleChange && props.onVisibleChange(false);
    }
    React.useEffect(function () {
        document.body.append(container.current);
        return function () {
            document.body.removeChild(container.current);
        };
    }, []);
    React.useEffect(function () {
        setVisible(props.visible || false);
    }, [props.visible]);
    function renderSelect() {
        var _a;
        if (!firstClick)
            return '';
        return ReactDOM.createPortal(React__default.createElement("div", { onAnimationEnd: handleAnimationEnd, className: getClass('popover', (_a = {},
                _a[getClass('popover-show')] = animateVisible,
                _a)) },
            React__default.createElement("div", { className: getClass('popover-mask', {
                    fadeIn: visible,
                    fadeOut: !visible,
                }) }),
            React__default.createElement("div", { className: getClass('popover-overlay', {
                    fadeInUp: visible,
                    fadeOutDown: !visible,
                }) },
                React__default.createElement("div", { className: getClass('popover-overlay-head') },
                    React__default.createElement("div", { className: getClass('popover-overlay-cancel'), onClick: handleClickHide }, "\u53D6\u6D88"),
                    React__default.createElement("div", { className: getClass('popover-overlay-fill') }),
                    React__default.createElement("div", { className: getClass('popover-overlay-confirm') }, "\u786E\u5B9A")),
                React__default.createElement(OptionList, { items: props.items }))), container.current);
    }
    return (React__default.createElement(MainContext.Provider, { value: { getClass: getClass } },
        React__default.createElement("div", { className: getClass('select'), onClick: handleClickInput }, props.children),
        renderSelect()));
};

//# sourceMappingURL=index.js.map

module.exports = Select;
