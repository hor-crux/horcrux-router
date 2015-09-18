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
define(["require", "exports", 'horcrux-core', './router/router'], function (require, exports, horcrux_core_1, router_1) {
    var HcView = (function (_super) {
        __extends(HcView, _super);
        function HcView() {
            _super.apply(this, arguments);
            this.div = document.createElement('div');
        }
        HcView.prototype.createdCallback = function () {
            this.name = this.getAttribute('name') || 'default';
        };
        HcView.prototype.attachedCallback = function () {
            var parent = this;
            while (!parent.shadowRoot)
                parent = parent.parentElement;
            for (var key in parent) {
                if (parent[key] instanceof router_1.default)
                    this.router = parent[key];
            }
            this.router.addView(this);
        };
        HcView.prototype.detachedCallback = function () {
            this.router.removeView(this);
        };
        HcView.prototype.canDeavtivate = function (component, args) {
            if (component === this.component && JSON.stringify(args) === JSON.stringify(this.args))
                return Promise.resolve('canDeactivate because requested component and args are same as current');
            if (!!this.current) {
                return this.current.canDeactivate();
            }
            else
                return Promise.resolve('No Component to deactivate');
        };
        HcView.prototype.canAvtivate = function (component, args) {
            if (component === this.component && JSON.stringify(args) === JSON.stringify(this.args))
                return Promise.resolve('canActivate because requested component and args are same as current');
            else {
                this.pending = this.createElement(component, args);
                return this.pending.canActivate();
            }
        };
        HcView.prototype.activate = function (component, args) {
            if (component === this.component && JSON.stringify(args) === JSON.stringify(this.args))
                return void 0;
            this.clearShadow();
            this.shadowRoot.appendChild(this.pending);
            this.pending = void 0;
            this.current = this.shadowRoot.children[0];
            this.component = component;
            this.args = JSON.parse(JSON.stringify(args));
        };
        HcView.prototype.createElement = function (component, args) {
            var html = '<' + component + ' ';
            for (var key in args)
                html += '#' + key + '="{{' + args[key] + '}}"' + ' ';
            html = '></' + component + '>';
            this.div.innerHTML = html;
            return this.div.children[0];
        };
        HcView.prototype.clearShadow = function () {
            while (this.shadowRoot.firstChild)
                this.shadowRoot.removeChild(this.shadowRoot.firstChild);
        };
        HcView = __decorate([
            horcrux_core_1.Component
        ], HcView);
        return HcView;
    })(horcrux_core_1.CustomElement);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = HcView;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXcudHMiXSwibmFtZXMiOlsiSGNWaWV3IiwiSGNWaWV3LmNvbnN0cnVjdG9yIiwiSGNWaWV3LmNyZWF0ZWRDYWxsYmFjayIsIkhjVmlldy5hdHRhY2hlZENhbGxiYWNrIiwiSGNWaWV3LmRldGFjaGVkQ2FsbGJhY2siLCJIY1ZpZXcuY2FuRGVhdnRpdmF0ZSIsIkhjVmlldy5jYW5BdnRpdmF0ZSIsIkhjVmlldy5hY3RpdmF0ZSIsIkhjVmlldy5jcmVhdGVFbGVtZW50IiwiSGNWaWV3LmNsZWFyU2hhZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUdBO1FBQ29DQSwwQkFBYUE7UUFEakRBO1lBQ29DQyw4QkFBYUE7WUFNeENBLFFBQUdBLEdBQUdBLFFBQVFBLENBQUNBLGFBQWFBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBMEU3Q0EsQ0FBQ0E7UUFyRUFELGdDQUFlQSxHQUFmQTtZQUNDRSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxTQUFTQSxDQUFDQTtRQUNwREEsQ0FBQ0E7UUFFREYsaUNBQWdCQSxHQUFoQkE7WUFDQ0csSUFBSUEsTUFBTUEsR0FBT0EsSUFBSUEsQ0FBQ0E7WUFDdEJBLE9BQU1BLENBQUNBLE1BQU1BLENBQUNBLFVBQVVBO2dCQUN2QkEsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7WUFFL0JBLEdBQUdBLENBQUFBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsWUFBWUEsZ0JBQU1BLENBQUNBO29CQUNoQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUJBLENBQUNBO1lBRURBLElBQUlBLENBQUNBLE1BQU1BLENBQUNB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LElBQUlBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLFNBQVNBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2pDQSxHQUFHQSxDQUFBQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDbkJBLElBQUlBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEtBQUtBLEdBQUdBLEdBQUdBLENBQUFBO1lBQ3JEQSxJQUFJQSxHQUFHQSxLQUFLQSxHQUFHQSxTQUFTQSxHQUFHQSxHQUFHQSxDQUFBQTtZQUU5QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDMUJBLE1BQU1BLENBQWdCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUMzQ0EsQ0FBQ0E7UUFFU1IsNEJBQVdBLEdBQXJCQTtZQUNDUyxPQUFPQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxVQUFVQTtnQkFDaENBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1FBQzFEQSxDQUFDQTtRQWhGRlQ7WUFBQ0Esd0JBQVNBO21CQWlGVEE7UUFBREEsYUFBQ0E7SUFBREEsQ0FqRkEsQUFpRkNBLEVBaEZtQyw0QkFBYSxFQWdGaEQ7SUFqRkQ7NEJBaUZDLENBQUEiLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDdXN0b21FbGVtZW50fSBmcm9tICdob3JjcnV4LWNvcmUnO1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJy4vcm91dGVyL3JvdXRlcidcclxuXHJcbkBDb21wb25lbnRcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGNWaWV3IGV4dGVuZHMgQ3VzdG9tRWxlbWVudCB7XHJcblx0XHJcblx0cHJpdmF0ZSBjb21wb25lbnQ6c3RyaW5nO1xyXG5cdHByaXZhdGUgYXJnczphbnk7XHJcblx0cHJpdmF0ZSBjdXJyZW50OiBDdXN0b21FbGVtZW50O1xyXG5cdHByaXZhdGUgcGVuZGluZzogQ3VzdG9tRWxlbWVudDtcclxuXHRwcml2YXRlIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XHJcblx0XHJcblx0cHVibGljIG5hbWU7XHJcblx0XHJcblx0Y3JlYXRlZENhbGxiYWNrKCkge1xyXG5cdFx0dGhpcy5uYW1lID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ25hbWUnKSB8fCAnZGVmYXVsdCc7XHJcblx0fVxyXG5cdFxyXG5cdGF0dGFjaGVkQ2FsbGJhY2soKSB7XHJcblx0XHRsZXQgcGFyZW50OmFueSA9IHRoaXM7XHJcblx0XHR3aGlsZSghcGFyZW50LnNoYWRvd1Jvb3QpXHJcblx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xyXG5cdFx0XHJcblx0XHRmb3IobGV0IGtleSBpbiBwYXJlbnQpIHtcclxuXHRcdFx0aWYocGFyZW50W2tleV0gaW5zdGFuY2VvZiBSb3V0ZXIpXHJcblx0XHRcdFx0dGhpcy5yb3V0ZXIgPSBwYXJlbnRba2V5XTtcclxuXHRcdH1cdFxyXG5cdFx0XHJcblx0XHR0aGlzLnJvdXRlci5hZGRWaWV3KHRoaXMpO1xyXG5cdH1cclxuXHRcclxuXHRkZXRhY2hlZENhbGxiYWNrKCkge1xyXG5cdFx0dGhpcy5yb3V0ZXIucmVtb3ZlVmlldyh0aGlzKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGNhbkRlYXZ0aXZhdGUoY29tcG9uZW50OnN0cmluZywgYXJnczphbnkpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0aWYoY29tcG9uZW50ID09PSB0aGlzLmNvbXBvbmVudCAmJiBKU09OLnN0cmluZ2lmeShhcmdzKSA9PT0gSlNPTi5zdHJpbmdpZnkodGhpcy5hcmdzKSlcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnY2FuRGVhY3RpdmF0ZSBiZWNhdXNlIHJlcXVlc3RlZCBjb21wb25lbnQgYW5kIGFyZ3MgYXJlIHNhbWUgYXMgY3VycmVudCcpO1xyXG5cdFx0XHJcblx0XHRpZighIXRoaXMuY3VycmVudCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5jdXJyZW50LmNhbkRlYWN0aXZhdGUoKTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnTm8gQ29tcG9uZW50IHRvIGRlYWN0aXZhdGUnKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGNhbkF2dGl2YXRlKGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGlmKGNvbXBvbmVudCA9PT0gdGhpcy5jb21wb25lbnQgJiYgSlNPTi5zdHJpbmdpZnkoYXJncykgPT09IEpTT04uc3RyaW5naWZ5KHRoaXMuYXJncykpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2NhbkFjdGl2YXRlIGJlY2F1c2UgcmVxdWVzdGVkIGNvbXBvbmVudCBhbmQgYXJncyBhcmUgc2FtZSBhcyBjdXJyZW50Jyk7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wZW5kaW5nID0gdGhpcy5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgYXJncyk7XHJcblx0XHRcdHJldHVybiB0aGlzLnBlbmRpbmcuY2FuQWN0aXZhdGUoKTtcdFx0XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBhY3RpdmF0ZShjb21wb25lbnQ6c3RyaW5nLCBhcmdzOmFueSk6IHZvaWQge1xyXG5cdFx0aWYoY29tcG9uZW50ID09PSB0aGlzLmNvbXBvbmVudCAmJiBKU09OLnN0cmluZ2lmeShhcmdzKSA9PT0gSlNPTi5zdHJpbmdpZnkodGhpcy5hcmdzKSlcclxuXHRcdFx0cmV0dXJuIHZvaWQgMDtcclxuXHRcdFx0XHJcblx0XHR0aGlzLmNsZWFyU2hhZG93KCk7XHJcblx0XHR0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGhpcy5wZW5kaW5nKTtcclxuXHRcdHRoaXMucGVuZGluZyA9IHZvaWQgMDtcclxuXHRcdFxyXG5cdFx0dGhpcy5jdXJyZW50ID0gPEN1c3RvbUVsZW1lbnQ+KDxIVE1MRWxlbWVudD50aGlzLnNoYWRvd1Jvb3QpLmNoaWxkcmVuWzBdXHJcblx0XHR0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuXHRcdHRoaXMuYXJncyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXJncykpO1xyXG5cdH1cclxuXHRcclxuXHRcclxuXHRwcm90ZWN0ZWQgY3JlYXRlRWxlbWVudChjb21wb25lbnQ6c3RyaW5nLCBhcmdzOmFueSk6IEN1c3RvbUVsZW1lbnQge1xyXG5cdFx0bGV0IGh0bWwgPSAnPCcgKyBjb21wb25lbnQgKyAnICc7XHJcblx0XHRmb3IobGV0IGtleSBpbiBhcmdzKVxyXG5cdFx0XHRodG1sICs9ICcjJyArIGtleSArICc9XCJ7eycgKyBhcmdzW2tleV0gKyAnfX1cIicgKyAnICdcclxuXHRcdGh0bWwgPSAnPjwvJyArIGNvbXBvbmVudCArICc+J1xyXG5cdFx0XHJcblx0XHR0aGlzLmRpdi5pbm5lckhUTUwgPSBodG1sO1xyXG5cdFx0cmV0dXJuIDxDdXN0b21FbGVtZW50PnRoaXMuZGl2LmNoaWxkcmVuWzBdXHJcblx0fVxyXG5cdFxyXG5cdHByb3RlY3RlZCBjbGVhclNoYWRvdygpOiB2b2lkIHtcclxuXHRcdHdoaWxlICh0aGlzLnNoYWRvd1Jvb3QuZmlyc3RDaGlsZClcclxuXHRcdFx0dGhpcy5zaGFkb3dSb290LnJlbW92ZUNoaWxkKHRoaXMuc2hhZG93Um9vdC5maXJzdENoaWxkKTtcclxuXHR9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=