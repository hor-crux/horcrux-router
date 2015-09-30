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
            else if (!component)
                return Promise.resolve('');
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
            this.updateElement(component, args);
        };
        HcView.prototype.createElement = function (component, args) {
            var element = document.createElement(component);
            for (var key in args)
                element[key] = args[key];
            return element;
        };
        HcView.prototype.updateElement = function (component, args) {
            this.clearShadow();
            if (!!this.pending) {
                this.shadowRoot.appendChild(this.pending);
                this.current = this.shadowRoot.children[0];
            }
            else {
                this.current = void 0;
            }
            this.pending = void 0;
            this.component = component;
            this.args = JSON.parse(JSON.stringify(args));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXcudHMiXSwibmFtZXMiOlsiSGNWaWV3IiwiSGNWaWV3LmNvbnN0cnVjdG9yIiwiSGNWaWV3LmNyZWF0ZWRDYWxsYmFjayIsIkhjVmlldy5hdHRhY2hlZENhbGxiYWNrIiwiSGNWaWV3LmRldGFjaGVkQ2FsbGJhY2siLCJIY1ZpZXcuY2FuRGVhdnRpdmF0ZSIsIkhjVmlldy5jYW5BdnRpdmF0ZSIsIkhjVmlldy5hY3RpdmF0ZSIsIkhjVmlldy5jcmVhdGVFbGVtZW50IiwiSGNWaWV3LnVwZGF0ZUVsZW1lbnQiLCJIY1ZpZXcuY2xlYXJTaGFkb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBRUEsc0NBQXNDO0lBRXRDO1FBQ29DQSwwQkFBYUE7UUFEakRBO1lBQ29DQyw4QkFBYUE7UUFnR2pEQSxDQUFDQTtRQXRGQUQsZ0NBQWVBLEdBQWZBO1lBQ0NFLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLFNBQVNBLENBQUNBO1lBQ25EQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLENBQUNBO1FBQ3pCQSxDQUFDQTtRQUVERixpQ0FBZ0JBLEdBQWhCQTtZQUNDRyxJQUFJQSxNQUFNQSxHQUFPQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUNqQ0EsT0FBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUE7Z0JBQ3ZCQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUUzQ0EsR0FBR0EsQ0FBQUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZCQSxFQUFFQSxDQUFBQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxZQUFZQSxnQkFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFD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LEtBQUtBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1FBQzlDQSxDQUFDQTtRQUVTVCw0QkFBV0EsR0FBckJBO1lBQ0NVLE9BQU9BLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFVBQVVBO2dCQUNoQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUFDMURBLENBQUNBO1FBaEdGVjtZQUFDQSx3QkFBU0E7bUJBaUdUQTtRQUFEQSxhQUFDQTtJQUFEQSxDQWpHQSxBQWlHQ0EsRUFoR21DLDRCQUFhLEVBZ0doRDtJQWpHRDs0QkFpR0MsQ0FBQSIsImZpbGUiOiJ2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEN1c3RvbUVsZW1lbnR9IGZyb20gJ2hvcmNydXgtY29yZSc7XG5pbXBvcnQgUm91dGVyIGZyb20gJy4vcm91dGVyL3JvdXRlcidcbi8vaW1wb3J0IHtiaW5kRG9tfSBmcm9tICdob3JjcnV4LWNvcmUnXG5cbkBDb21wb25lbnRcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhjVmlldyBleHRlbmRzIEN1c3RvbUVsZW1lbnQge1xuXHRcblx0cHJpdmF0ZSBjb21wb25lbnQ6c3RyaW5nO1xuXHRwcml2YXRlIGFyZ3M6YW55O1xuXHRwcml2YXRlIGN1cnJlbnQ6IEN1c3RvbUVsZW1lbnQ7XG5cdHByaXZhdGUgcGVuZGluZzogQ3VzdG9tRWxlbWVudDtcblx0cHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjtcblx0XG5cdHB1YmxpYyBuYW1lO1xuXHRcblx0Y3JlYXRlZENhbGxiYWNrKCkge1xuXHRcdHRoaXMubmFtZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgJ2RlZmF1bHQnO1xuXHRcdHRoaXMuY3JlYXRlU2hhZG93Um9vdCgpO1xuXHR9XG5cdFxuXHRhdHRhY2hlZENhbGxiYWNrKCkge1xuXHRcdGxldCBwYXJlbnQ6YW55ID0gdGhpcy5wYXJlbnROb2RlO1xuXHRcdHdoaWxlKCFwYXJlbnQuc2hhZG93Um9vdClcblx0XHRcdHBhcmVudCA9IHBhcmVudC5ob3N0IHx8IHBhcmVudC5wYXJlbnROb2RlO1xuXHRcdFxuXHRcdGZvcihsZXQga2V5IGluIHBhcmVudCkge1xuXHRcdFx0aWYocGFyZW50W2tleV0gaW5zdGFuY2VvZiBSb3V0ZXIpIHtcblx0XHRcdFx0dGhpcy5yb3V0ZXIgPSBwYXJlbnRba2V5XTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVx0XG5cdFx0aWYoIXRoaXMucm91dGVyKVxuXHRcdFx0dGhyb3cgJ0hjVmlldyBzaG91bGQgYmUgY2hpbGQgb2YgYW4gQ29tcG9uZW50IHRoYXQgaGFzIGEgUm91dGVyISdcblx0XHR0aGlzLnJvdXRlci5hZGRWaWV3KHRoaXMpO1xuXHR9XG5cdFxuXHRkZXRhY2hlZENhbGxiYWNrKCkge1xuXHRcdHRoaXMucm91dGVyLnJlbW92ZVZpZXcodGhpcyk7XG5cdH1cblx0XG5cdHB1YmxpYyBjYW5EZWF2dGl2YXRlKGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogUHJvbWlzZTxhbnk+IHtcblx0XHRpZihjb21wb25lbnQgPT09IHRoaXMuY29tcG9uZW50ICYmIEpTT04uc3RyaW5naWZ5KGFyZ3MpID09PSBKU09OLnN0cmluZ2lmeSh0aGlzLmFyZ3MpKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnY2FuRGVhY3RpdmF0ZSBiZWNhdXNlIHJlcXVlc3RlZCBjb21wb25lbnQgYW5kIGFyZ3MgYXJlIHNhbWUgYXMgY3VycmVudCcpO1xuXHRcdFxuXHRcdGlmKCEhdGhpcy5jdXJyZW50KSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jdXJyZW50LmNhbkRlYWN0aXZhdGUoKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnTm8gQ29tcG9uZW50IHRvIGRlYWN0aXZhdGUnKTtcblx0fVxuXHRcblx0cHVibGljIGNhbkF2dGl2YXRlKGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogUHJvbWlzZTxhbnk+IHtcblx0XHRpZihjb21wb25lbnQgPT09IHRoaXMuY29tcG9uZW50ICYmIEpTT04uc3RyaW5naWZ5KGFyZ3MpID09PSBKU09OLnN0cmluZ2lmeSh0aGlzLmFyZ3MpKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnY2FuQWN0aXZhdGUgYmVjYXVzZSByZXF1ZXN0ZWQgY29tcG9uZW50IGFuZCBhcmdzIGFyZSBzYW1lIGFzIGN1cnJlbnQnKTtcblx0XHRlbHNlIGlmKCFjb21wb25lbnQpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCcnKTtcblx0XHRlbHNlIHtcblx0XHRcdHRoaXMucGVuZGluZyA9IHRoaXMuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIGFyZ3MpO1xuXHRcdFx0cmV0dXJuIHRoaXMucGVuZGluZy5jYW5BY3RpdmF0ZSgpO1x0XHRcblx0XHR9XG5cdH1cblx0XG5cdHB1YmxpYyBhY3RpdmF0ZShjb21wb25lbnQ6c3RyaW5nLCBhcmdzOmFueSk6IHZvaWQge1xuXHRcdGlmKGNvbXBvbmVudCA9PT0gdGhpcy5jb21wb25lbnQgJiYgSlNPTi5zdHJpbmdpZnkoYXJncykgPT09IEpTT04uc3RyaW5naWZ5KHRoaXMuYXJncykpXG5cdFx0XHRyZXR1cm4gdm9pZCAwO1xuXHRcdFxuXHRcdGlmKHR5cGVvZiB0aGlzLnBlbmRpbmcgPT09ICd1bmRlZmluZWQnKVxuXHRcdFx0dGhpcy5wZW5kaW5nID0gdGhpcy5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgYXJncyk7XG5cdFx0XHRcblx0XHR0aGlzLnVwZGF0ZUVsZW1lbnQoY29tcG9uZW50LCBhcmdzKTtcblx0fVxuXHRcblx0XG5cdHByb3RlY3RlZCBjcmVhdGVFbGVtZW50KGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogQ3VzdG9tRWxlbWVudCB7XG5cdFx0bGV0IGVsZW1lbnQgPSA8Q3VzdG9tRWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCk7XG5cdFx0XG5cdFx0Zm9yKGxldCBrZXkgaW4gYXJncylcblx0XHRcdGVsZW1lbnRba2V5XSA9IGFyZ3Nba2V5XTtcblx0XHRcblx0XHRyZXR1cm4gZWxlbWVudDtcblx0fVxuXHRcblx0cHJvdGVjdGVkIHVwZGF0ZUVsZW1lbnQoY29tcG9uZW50OnN0cmluZywgYXJnczphbnkpOiB2b2lkIHtcblx0XHR0aGlzLmNsZWFyU2hhZG93KCk7XG5cdFx0aWYoISF0aGlzLnBlbmRpbmcpIHtcblx0XHRcdHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0aGlzLnBlbmRpbmcpO1xuXHRcdFx0dGhpcy5jdXJyZW50ID0gPEN1c3RvbUVsZW1lbnQ+KDxIVE1MRWxlbWVudD50aGlzLnNoYWRvd1Jvb3QpLmNoaWxkcmVuWzBdXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5jdXJyZW50ID0gdm9pZCAwO1xuXHRcdH1cblx0XHR0aGlzLnBlbmRpbmcgPSB2b2lkIDA7XG5cdFx0XG5cdFx0dGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG5cdFx0dGhpcy5hcmdzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcmdzKSk7XG5cdH1cblx0XG5cdHByb3RlY3RlZCBjbGVhclNoYWRvdygpOiB2b2lkIHtcblx0XHR3aGlsZSAodGhpcy5zaGFkb3dSb290LmZpcnN0Q2hpbGQpXG5cdFx0XHR0aGlzLnNoYWRvd1Jvb3QucmVtb3ZlQ2hpbGQodGhpcy5zaGFkb3dSb290LmZpcnN0Q2hpbGQpO1xuXHR9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
