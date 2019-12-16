import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useMouse } from 'react-use';

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
var MainContext = React.createContext({ getClass: function () { return ''; } });
//# sourceMappingURL=contexts.js.map

/**
 * Created 2019/12/16 13:57 By lvmingyin
 */
var OptionList = function (_a) {
    var items = _a.items;
    var getClass = useContext(MainContext).getClass;
    var scroll = useRef(null);
    var _b = useMouse(scroll), docX = _b.docX, docY = _b.docY, posX = _b.posX, posY = _b.posY, elX = _b.elX, elY = _b.elY, elW = _b.elW, elH = _b.elH;
    console.log(docX, docY, posX, posY, elX, elY, elW, elH);
    return (React.createElement("div", { className: getClass('popover-overlay-options') },
        React.createElement("div", { className: getClass('popover-overlay-options-scroll'), ref: scroll }, items.map(function (n) { return (React.createElement("div", { key: n.value, className: getClass('popover-overlay-options-item') },
            React.createElement("span", { className: getClass('popover-overlay-options-item-label') }, n.label))); }))));
};

/**
 * Created 2019/11/18 14:54 By lvmingyin
 */
var Select = function (props) {
    var container = useRef(document.createElement('div'));
    var _a = useState(false), visible = _a[0], setVisible = _a[1];
    var _b = useState(false), animateVisible = _b[0], setAnimateVisible = _b[1];
    var _c = useState(false), firstClick = _c[0], setFirstClick = _c[1];
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
    useEffect(function () {
        document.body.append(container.current);
        return function () {
            document.body.removeChild(container.current);
        };
    }, []);
    useEffect(function () {
        setVisible(props.visible || false);
    }, [props.visible]);
    function renderSelect() {
        var _a;
        if (!firstClick)
            return '';
        return ReactDOM.createPortal(React.createElement("div", { onClick: handleClickHide, onAnimationEnd: handleAnimationEnd, className: getClass('popover', (_a = {},
                _a[getClass('popover-show')] = animateVisible,
                _a)) },
            React.createElement("div", { className: getClass('popover-mask', {
                    fadeIn: visible,
                    fadeOut: !visible,
                }) }),
            React.createElement("div", { className: getClass('popover-overlay', {
                    fadeInUp: visible,
                    fadeOutDown: !visible,
                }) },
                React.createElement("div", { className: getClass('popover-overlay-head') },
                    React.createElement("div", { className: getClass('popover-overlay-cancel') }, "\u53D6\u6D88"),
                    React.createElement("div", { className: getClass('popover-overlay-fill') }),
                    React.createElement("div", { className: getClass('popover-overlay-confirm') }, "\u786E\u5B9A")),
                React.createElement(OptionList, { items: props.items }))), container.current);
    }
    return (React.createElement(MainContext.Provider, { value: { getClass: getClass } },
        React.createElement("div", { className: getClass('select'), onClick: handleClickInput }, props.children),
        renderSelect()));
};

//# sourceMappingURL=index.js.map

export default Select;
