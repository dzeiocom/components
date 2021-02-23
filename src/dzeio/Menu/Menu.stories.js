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
    title: 'DZEIO/Menu',
    component: Component,
    argTypes: {
        content: { control: 'array', defaultValue: [{ name: 'Name', href: 'https://www.google.com' }] }
    }
};
export var Basic = function (args) { return React.createElement(Component, __assign({}, args)); };
