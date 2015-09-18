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
    //import {bindDom} from 'horcrux-core'
    var HcView = (function (_super) {
        __extends(HcView, _super);
        function HcView() {
            _super.apply(this, arguments);
        }
        HcView.prototype.createdCallback = function () {
            this.name = this.getAttribute('name') || 'default';
            this.createShadowRoot();
        };
        HcView.prototype.attachedCallback = function () {
            var parent = this.parentNode;
            while (!parent.shadowRoot)
                parent = parent.host || parent.parentNode;
            for (var key in parent) {
                if (parent[key] instanceof router_1.default) {
                    this.router = parent[key];
                    break;
                }
            }
            if (!this.router)
                throw 'HcView should be child of an Component that has a Router!';
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
            if (typeof this.pending === 'undefined')
                this.pending = this.createElement(component, args);
            this.clearShadow();
            this.shadowRoot.appendChild(this.pending);
            this.pending = void 0;
            this.current = this.shadowRoot.children[0];
            this.component = component;
            this.args = JSON.parse(JSON.stringify(args));
        };
        HcView.prototype.createElement = function (component, args) {
            var element = document.createElement(component);
            for (var key in args)
                element[key] = args[key];
            return element;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXcudHMiXSwibmFtZXMiOlsiSGNWaWV3IiwiSGNWaWV3LmNvbnN0cnVjdG9yIiwiSGNWaWV3LmNyZWF0ZWRDYWxsYmFjayIsIkhjVmlldy5hdHRhY2hlZENhbGxiYWNrIiwiSGNWaWV3LmRldGFjaGVkQ2FsbGJhY2siLCJIY1ZpZXcuY2FuRGVhdnRpdmF0ZSIsIkhjVmlldy5jYW5BdnRpdmF0ZSIsIkhjVmlldy5hY3RpdmF0ZSIsIkhjVmlldy5jcmVhdGVFbGVtZW50IiwiSGNWaWV3LmNsZWFyU2hhZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUVBLHNDQUFzQztJQUV0QztRQUNvQ0EsMEJBQWFBO1FBRGpEQTtZQUNvQ0MsOEJBQWFBO1FBcUZqREEsQ0FBQ0E7UUEzRUFELGdDQUFlQSxHQUFmQTtZQUNDRSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxTQUFTQSxDQUFDQTtZQUNuREEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7UUFFREYsaUNBQWdCQSxHQUFoQkE7WUFDQ0csSUFBSUEsTUFBTUEsR0FBT0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7WUFDakNBLE9BQU1BLENBQUNBLE1BQU1BLENBQUNBLFVBQVVBO2dCQUN2QkEsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsSUFBSUEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7WUFFM0NBLEdBQUdBLENBQUFBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsWUFBWUEsZ0JBQU1BLENBQUNBLENBQUNBLENBQUNBO29CQUNsQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JB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Q0EsQ0FBQ0E7WUFFdEJBLElBQUlBLENBQUNBLE9BQU9BLEdBQWdDQSxJQUFJQSxDQUFDQSxVQUFXQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFBQTtZQUN4RUEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0E7WUFDM0JBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1FBQzlDQSxDQUFDQTtRQUdTUCw4QkFBYUEsR0FBdkJBLFVBQXdCQSxTQUFnQkEsRUFBRUEsSUFBUUE7WUFDakRRLElBQUlBLE9BQU9BLEdBQWtCQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUUvREEsR0FBR0EsQ0FBQUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQ25CQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUUxQkEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRVNSLDRCQUFXQSxHQUFyQkE7WUFDQ1MsT0FBT0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsVUFBVUE7Z0JBQ2hDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUMxREEsQ0FBQ0E7UUFyRkZUO1lBQUNBLHdCQUFTQTttQkFzRlRBO1FBQURBLGFBQUNBO0lBQURBLENBdEZBLEFBc0ZDQSxFQXJGbUMsNEJBQWEsRUFxRmhEO0lBdEZEOzRCQXNGQyxDQUFBIiwiZmlsZSI6InZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ3VzdG9tRWxlbWVudH0gZnJvbSAnaG9yY3J1eC1jb3JlJztcclxuaW1wb3J0IFJvdXRlciBmcm9tICcuL3JvdXRlci9yb3V0ZXInXHJcbi8vaW1wb3J0IHtiaW5kRG9tfSBmcm9tICdob3JjcnV4LWNvcmUnXHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhjVmlldyBleHRlbmRzIEN1c3RvbUVsZW1lbnQge1xyXG5cdFxyXG5cdHByaXZhdGUgY29tcG9uZW50OnN0cmluZztcclxuXHRwcml2YXRlIGFyZ3M6YW55O1xyXG5cdHByaXZhdGUgY3VycmVudDogQ3VzdG9tRWxlbWVudDtcclxuXHRwcml2YXRlIHBlbmRpbmc6IEN1c3RvbUVsZW1lbnQ7XHJcblx0cHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjtcclxuXHRcclxuXHRwdWJsaWMgbmFtZTtcclxuXHRcclxuXHRjcmVhdGVkQ2FsbGJhY2soKSB7XHJcblx0XHR0aGlzLm5hbWUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbmFtZScpIHx8ICdkZWZhdWx0JztcclxuXHRcdHRoaXMuY3JlYXRlU2hhZG93Um9vdCgpO1xyXG5cdH1cclxuXHRcclxuXHRhdHRhY2hlZENhbGxiYWNrKCkge1xyXG5cdFx0bGV0IHBhcmVudDphbnkgPSB0aGlzLnBhcmVudE5vZGU7XHJcblx0XHR3aGlsZSghcGFyZW50LnNoYWRvd1Jvb3QpXHJcblx0XHRcdHBhcmVudCA9IHBhcmVudC5ob3N0IHx8IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHJcblx0XHRmb3IobGV0IGtleSBpbiBwYXJlbnQpIHtcclxuXHRcdFx0aWYocGFyZW50W2tleV0gaW5zdGFuY2VvZiBSb3V0ZXIpIHtcclxuXHRcdFx0XHR0aGlzLnJvdXRlciA9IHBhcmVudFtrZXldO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHRcclxuXHRcdGlmKCF0aGlzLnJvdXRlcilcclxuXHRcdFx0dGhyb3cgJ0hjVmlldyBzaG91bGQgYmUgY2hpbGQgb2YgYW4gQ29tcG9uZW50IHRoYXQgaGFzIGEgUm91dGVyISdcclxuXHRcdHRoaXMucm91dGVyLmFkZFZpZXcodGhpcyk7XHJcblx0fVxyXG5cdFxyXG5cdGRldGFjaGVkQ2FsbGJhY2soKSB7XHJcblx0XHR0aGlzLnJvdXRlci5yZW1vdmVWaWV3KHRoaXMpO1xyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgY2FuRGVhdnRpdmF0ZShjb21wb25lbnQ6c3RyaW5nLCBhcmdzOmFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZihjb21wb25lbnQgPT09IHRoaXMuY29tcG9uZW50ICYmIEpTT04uc3RyaW5naWZ5KGFyZ3MpID09PSBKU09OLnN0cmluZ2lmeSh0aGlzLmFyZ3MpKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdjYW5EZWFjdGl2YXRlIGJlY2F1c2UgcmVxdWVzdGVkIGNvbXBvbmVudCBhbmQgYXJncyBhcmUgc2FtZSBhcyBjdXJyZW50Jyk7XHJcblx0XHRcclxuXHRcdGlmKCEhdGhpcy5jdXJyZW50KSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmN1cnJlbnQuY2FuRGVhY3RpdmF0ZSgpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdObyBDb21wb25lbnQgdG8gZGVhY3RpdmF0ZScpO1xyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgY2FuQXZ0aXZhdGUoY29tcG9uZW50OnN0cmluZywgYXJnczphbnkpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0aWYoY29tcG9uZW50ID09PSB0aGlzLmNvbXBvbmVudCAmJiBKU09OLnN0cmluZ2lmeShhcmdzKSA9PT0gSlNPTi5zdHJpbmdpZnkodGhpcy5hcmdzKSlcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnY2FuQWN0aXZhdGUgYmVjYXVzZSByZXF1ZXN0ZWQgY29tcG9uZW50IGFuZCBhcmdzIGFyZSBzYW1lIGFzIGN1cnJlbnQnKTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnBlbmRpbmcgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBhcmdzKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMucGVuZGluZy5jYW5BY3RpdmF0ZSgpO1x0XHRcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0cHVibGljIGFjdGl2YXRlKGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogdm9pZCB7XHJcblx0XHRpZihjb21wb25lbnQgPT09IHRoaXMuY29tcG9uZW50ICYmIEpTT04uc3RyaW5naWZ5KGFyZ3MpID09PSBKU09OLnN0cmluZ2lmeSh0aGlzLmFyZ3MpKVxyXG5cdFx0XHRyZXR1cm4gdm9pZCAwO1xyXG5cdFx0XHRcclxuXHRcdGlmKHR5cGVvZiB0aGlzLnBlbmRpbmcgPT09ICd1bmRlZmluZWQnKVxyXG5cdFx0XHR0aGlzLnBlbmRpbmcgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBhcmdzKTtcclxuXHRcdFx0XHJcblx0XHR0aGlzLmNsZWFyU2hhZG93KCk7XHJcblx0XHR0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGhpcy5wZW5kaW5nKTtcclxuXHRcdHRoaXMucGVuZGluZyA9IHZvaWQgMDtcclxuXHRcdFxyXG5cdFx0dGhpcy5jdXJyZW50ID0gPEN1c3RvbUVsZW1lbnQ+KDxIVE1MRWxlbWVudD50aGlzLnNoYWRvd1Jvb3QpLmNoaWxkcmVuWzBdXHJcblx0XHR0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuXHRcdHRoaXMuYXJncyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXJncykpO1xyXG5cdH1cclxuXHRcclxuXHRcclxuXHRwcm90ZWN0ZWQgY3JlYXRlRWxlbWVudChjb21wb25lbnQ6c3RyaW5nLCBhcmdzOmFueSk6IEN1c3RvbUVsZW1lbnQge1xyXG5cdFx0bGV0IGVsZW1lbnQgPSA8Q3VzdG9tRWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCk7XHJcblx0XHRcclxuXHRcdGZvcihsZXQga2V5IGluIGFyZ3MpXHJcblx0XHRcdGVsZW1lbnRba2V5XSA9IGFyZ3Nba2V5XTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cdFxyXG5cdHByb3RlY3RlZCBjbGVhclNoYWRvdygpOiB2b2lkIHtcclxuXHRcdHdoaWxlICh0aGlzLnNoYWRvd1Jvb3QuZmlyc3RDaGlsZClcclxuXHRcdFx0dGhpcy5zaGFkb3dSb290LnJlbW92ZUNoaWxkKHRoaXMuc2hhZG93Um9vdC5maXJzdENoaWxkKTtcclxuXHR9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=