var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'horcrux-core', 'horcrux-di', './router/actions'], function (require, exports, horcrux_core_1, horcrux_di_1, actions_1) {
    var HcHref = (function (_super) {
        __extends(HcHref, _super);
        function HcHref(node, attr, model, path) {
            var _this = this;
            _super.call(this, node, attr, model, path);
            attr.ownerElement.removeAttribute(attr.name);
            node.onclick = function (e) {
                _this.routeActions.route(attr.value);
            };
        }
        __decorate([
            horcrux_di_1.inject(actions_1.default)
        ], HcHref.prototype, "routeActions");
        return HcHref;
    })(horcrux_core_1.CustomAttribute);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = HcHref;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhyZWYudHMiXSwibmFtZXMiOlsiSGNIcmVmIiwiSGNIcmVmLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUlBO1FBQW9DQSwwQkFBZUE7UUFLbERBLGdCQUFZQSxJQUFVQSxFQUFFQSxJQUFVQSxFQUFFQSxLQUFZQSxFQUFFQSxJQUFZQTtZQUwvREMsaUJBWUNBO1lBTkNBLGtCQUFNQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDdkNBLElBQUtBLENBQUNBLE9BQU9BLEdBQUdBLFVBQUFBLENBQUNBO2dCQUN0QkEsS0FBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDckNBLENBQUNBLENBQUFBO1FBQ0ZBLENBQUNBO1FBVEREO1lBQUNBLG1CQUFNQSxDQUFDQSxpQkFBWUEsQ0FBQ0E7V0FDYkEsZ0NBQVlBLEVBQWVBO1FBU3BDQSxhQUFDQTtJQUFEQSxDQVpBLEFBWUNBLEVBWm1DLDhCQUFlLEVBWWxEO0lBWkQ7NEJBWUMsQ0FBQSIsImZpbGUiOiJocmVmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3VzdG9tQXR0cmlidXRlLCBNb2RlbCB9IGZyb20gJ2hvcmNydXgtY29yZSc7XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICdob3JjcnV4LWRpJztcbmltcG9ydCBSb3V0ZUFjdGlvbnMgZnJvbSAnLi9yb3V0ZXIvYWN0aW9ucydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGNIcmVmIGV4dGVuZHMgQ3VzdG9tQXR0cmlidXRlIHtcblx0XG5cdEBpbmplY3QoUm91dGVBY3Rpb25zKVxuXHRwcml2YXRlIHJvdXRlQWN0aW9uczogUm91dGVBY3Rpb25zO1xuXHRcblx0Y29uc3RydWN0b3Iobm9kZTogTm9kZSwgYXR0cjogQXR0ciwgbW9kZWw6IE1vZGVsLCBwYXRoOiBzdHJpbmcpIHtcblx0XHRzdXBlcihub2RlLCBhdHRyLCBtb2RlbCwgcGF0aCk7XG5cdFx0YXR0ci5vd25lckVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHIubmFtZSk7XG5cdFx0KDxhbnk+bm9kZSkub25jbGljayA9IGUgPT4ge1xuXHRcdFx0dGhpcy5yb3V0ZUFjdGlvbnMucm91dGUoYXR0ci52YWx1ZSk7XG5cdFx0fVxuXHR9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
