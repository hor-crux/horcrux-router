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
            var url = attr.value[0] == '#' ? attr.value.substring(1) : attr.value;
            node.onclick = function (e) {
                _this.routeActions.route(url);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhyZWYudHMiXSwibmFtZXMiOlsiSGNIcmVmIiwiSGNIcmVmLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUlBO1FBQ29DQSwwQkFBZUE7UUFLbERBLGdCQUFZQSxJQUFVQSxFQUFFQSxJQUFVQSxFQUFFQSxLQUFZQSxFQUFFQSxJQUFZQTtZQU4vREMsaUJBY0NBO1lBUENBLGtCQUFNQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDN0NBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1lBQ2hFQSxJQUFLQSxDQUFDQSxPQUFPQSxHQUFHQSxVQUFBQSxDQUFDQTtnQkFDckJBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQy9CQSxDQUFDQSxDQUFBQTtRQUNGQSxDQUFDQTtRQVZERDtZQUFDQSxtQkFBTUEsQ0FBQ0EsaUJBQVlBLENBQUNBO1dBQ2JBLGdDQUFZQSxFQUFlQTtRQUpwQ0E7WUFBQ0Esd0JBQVNBO21CQWNUQTtRQUFEQSxhQUFDQTtJQUFEQSxDQWRBLEFBY0NBLEVBYm1DLDhCQUFlLEVBYWxEO0lBZEQ7NEJBY0MsQ0FBQSIsImZpbGUiOiJocmVmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3VzdG9tQXR0cmlidXRlLCBBdHRyaWJ1dGUsIE1vZGVsIH0gZnJvbSAnaG9yY3J1eC1jb3JlJztcclxuaW1wb3J0IHsgcmVnaXN0ZXIsIGluamVjdCB9IGZyb20gJ2hvcmNydXgtZGknO1xyXG5pbXBvcnQgUm91dGVBY3Rpb25zIGZyb20gJy4vcm91dGVyL2FjdGlvbnMnXHJcblxyXG5AQXR0cmlidXRlXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhjSHJlZiBleHRlbmRzIEN1c3RvbUF0dHJpYnV0ZSB7XHJcblx0XHJcblx0QGluamVjdChSb3V0ZUFjdGlvbnMpXHJcblx0cHJpdmF0ZSByb3V0ZUFjdGlvbnM6IFJvdXRlQWN0aW9ucztcclxuXHRcclxuXHRjb25zdHJ1Y3Rvcihub2RlOiBOb2RlLCBhdHRyOiBBdHRyLCBtb2RlbDogTW9kZWwsIHBhdGg6IHN0cmluZykge1xyXG5cdFx0c3VwZXIobm9kZSwgYXR0ciwgbW9kZWwsIHBhdGgpO1xyXG5cdFx0YXR0ci5vd25lckVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHIubmFtZSk7XHJcblx0XHR2YXIgdXJsID0gYXR0ci52YWx1ZVswXSA9PSAnIycgPyBhdHRyLnZhbHVlLnN1YnN0cmluZygxKSA6IGF0dHIudmFsdWU7XHJcblx0XHQoPGFueT5ub2RlKS5vbmNsaWNrID0gZSA9PiB7XHJcblx0XHRcdCB0aGlzLnJvdXRlQWN0aW9ucy5yb3V0ZSh1cmwpO1xyXG5cdFx0fVxyXG5cdH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==