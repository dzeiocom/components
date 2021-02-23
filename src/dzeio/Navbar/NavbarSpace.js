var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import css from './Navbar.module.styl';
var NavbarSpace = /** @class */ (function (_super) {
    __extends(NavbarSpace, _super);
    function NavbarSpace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.render = function () { return (React.createElement("div", { className: css.spacer })); };
        return _this;
    }
    return NavbarSpace;
}(React.Component));
export default NavbarSpace;
