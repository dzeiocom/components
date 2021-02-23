var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import Component from '.';
export default {
    title: 'DZEIO/Code',
    component: Component,
    argTypes: {
        content: { control: 'text', defaultValue: 'Code Block' }
    }
};
export var Basic = function (args) {
    var content = args.content;
    delete args.content;
    return (React.createElement(Component, __assign({}, args), content));
};
