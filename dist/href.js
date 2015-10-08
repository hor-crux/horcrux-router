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
        HcHref = __decorate([
            horcrux_core_1.Attribute
        ], HcHref);
        return HcHref;
    })(horcrux_core_1.CustomAttribute);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = HcHref;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhyZWYudHMiXSwibmFtZXMiOlsiSGNIcmVmIiwiSGNIcmVmLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUlBO1FBQ29DQSwwQkFBZUE7UUFLbERBLGdCQUFZQSxJQUFVQSxFQUFFQSxJQUFVQSxFQUFFQSxLQUFZQSxFQUFFQSxJQUFZQTtZQU4vREMsaUJBYUNBO1lBTkNBLGtCQUFNQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDdkNBLElBQUtBLENBQUNBLE9BQU9BLEdBQUdBLFVBQUFBLENBQUNBO2dCQUN0QkEsS0FBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDckNBLENBQUNBLENBQUFBO1FBQ0ZBLENBQUNBO1FBVEREO1lBQUNBLG1CQUFNQSxDQUFDQSxpQkFBWUEsQ0FBQ0E7V0FDYkEsZ0NBQVlBLEVBQWVBO1FBSnBDQTtZQUFDQSx3QkFBU0E7bUJBYVRBO1FBQURBLGFBQUNBO0lBQURBLENBYkEsQUFhQ0EsRUFabUMsOEJBQWUsRUFZbEQ7SUFiRDs0QkFhQyxDQUFBIiwiZmlsZSI6ImhyZWYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdXN0b21BdHRyaWJ1dGUsIEF0dHJpYnV0ZSwgTW9kZWwgfSBmcm9tICdob3JjcnV4LWNvcmUnO1xuaW1wb3J0IHsgcmVnaXN0ZXIsIGluamVjdCB9IGZyb20gJ2hvcmNydXgtZGknO1xuaW1wb3J0IFJvdXRlQWN0aW9ucyBmcm9tICcuL3JvdXRlci9hY3Rpb25zJ1xuXG5AQXR0cmlidXRlXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIY0hyZWYgZXh0ZW5kcyBDdXN0b21BdHRyaWJ1dGUge1xuXHRcblx0QGluamVjdChSb3V0ZUFjdGlvbnMpXG5cdHByaXZhdGUgcm91dGVBY3Rpb25zOiBSb3V0ZUFjdGlvbnM7XG5cdFxuXHRjb25zdHJ1Y3Rvcihub2RlOiBOb2RlLCBhdHRyOiBBdHRyLCBtb2RlbDogTW9kZWwsIHBhdGg6IHN0cmluZykge1xuXHRcdHN1cGVyKG5vZGUsIGF0dHIsIG1vZGVsLCBwYXRoKTtcblx0XHRhdHRyLm93bmVyRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0ci5uYW1lKTtcblx0XHQoPGFueT5ub2RlKS5vbmNsaWNrID0gZSA9PiB7XG5cdFx0XHR0aGlzLnJvdXRlQWN0aW9ucy5yb3V0ZShhdHRyLnZhbHVlKTtcblx0XHR9XG5cdH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
