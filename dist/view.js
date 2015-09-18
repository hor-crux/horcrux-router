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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXcudHMiXSwibmFtZXMiOlsiSGNWaWV3IiwiSGNWaWV3LmNvbnN0cnVjdG9yIiwiSGNWaWV3LmNyZWF0ZWRDYWxsYmFjayIsIkhjVmlldy5hdHRhY2hlZENhbGxiYWNrIiwiSGNWaWV3LmRldGFjaGVkQ2FsbGJhY2siLCJIY1ZpZXcuY2FuRGVhdnRpdmF0ZSIsIkhjVmlldy5jYW5BdnRpdmF0ZSIsIkhjVmlldy5hY3RpdmF0ZSIsIkhjVmlldy5jcmVhdGVFbGVtZW50IiwiSGNWaWV3LnVwZGF0ZUVsZW1lbnQiLCJIY1ZpZXcuY2xlYXJTaGFkb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBRUEsc0NBQXNDO0lBRXRDO1FBQ29DQSwwQkFBYUE7UUFEakRBO1lBQ29DQyw4QkFBYUE7UUFnR2pEQSxDQUFDQTtRQXRGQUQsZ0NBQWVBLEdBQWZBO1lBQ0NFLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLFNBQVNBLENBQUNBO1lBQ25EQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLENBQUNBO1FBQ3pCQSxDQUFDQTtRQUVERixpQ0FBZ0JBLEdBQWhCQTtZQUNDRyxJQUFJQSxNQUFNQSxHQUFPQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUNqQ0EsT0FBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUE7Z0JBQ3ZCQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUUzQ0EsR0FBR0EsQ0FBQUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZCQSxFQUFFQSxDQUFBQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxZQUFZQSxnQkFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFD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LEtBQUtBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1FBQzlDQSxDQUFDQTtRQUVTVCw0QkFBV0EsR0FBckJBO1lBQ0NVLE9BQU9BLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFVBQVVBO2dCQUNoQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUFDMURBLENBQUNBO1FBaEdGVjtZQUFDQSx3QkFBU0E7bUJBaUdUQTtRQUFEQSxhQUFDQTtJQUFEQSxDQWpHQSxBQWlHQ0EsRUFoR21DLDRCQUFhLEVBZ0doRDtJQWpHRDs0QkFpR0MsQ0FBQSIsImZpbGUiOiJ2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEN1c3RvbUVsZW1lbnR9IGZyb20gJ2hvcmNydXgtY29yZSc7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZXIvcm91dGVyJ1xyXG4vL2ltcG9ydCB7YmluZERvbX0gZnJvbSAnaG9yY3J1eC1jb3JlJ1xyXG5cclxuQENvbXBvbmVudFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIY1ZpZXcgZXh0ZW5kcyBDdXN0b21FbGVtZW50IHtcclxuXHRcclxuXHRwcml2YXRlIGNvbXBvbmVudDpzdHJpbmc7XHJcblx0cHJpdmF0ZSBhcmdzOmFueTtcclxuXHRwcml2YXRlIGN1cnJlbnQ6IEN1c3RvbUVsZW1lbnQ7XHJcblx0cHJpdmF0ZSBwZW5kaW5nOiBDdXN0b21FbGVtZW50O1xyXG5cdHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XHJcblx0XHJcblx0cHVibGljIG5hbWU7XHJcblx0XHJcblx0Y3JlYXRlZENhbGxiYWNrKCkge1xyXG5cdFx0dGhpcy5uYW1lID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ25hbWUnKSB8fCAnZGVmYXVsdCc7XHJcblx0XHR0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKTtcclxuXHR9XHJcblx0XHJcblx0YXR0YWNoZWRDYWxsYmFjaygpIHtcclxuXHRcdGxldCBwYXJlbnQ6YW55ID0gdGhpcy5wYXJlbnROb2RlO1xyXG5cdFx0d2hpbGUoIXBhcmVudC5zaGFkb3dSb290KVxyXG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQuaG9zdCB8fCBwYXJlbnQucGFyZW50Tm9kZTtcclxuXHRcdFxyXG5cdFx0Zm9yKGxldCBrZXkgaW4gcGFyZW50KSB7XHJcblx0XHRcdGlmKHBhcmVudFtrZXldIGluc3RhbmNlb2YgUm91dGVyKSB7XHJcblx0XHRcdFx0dGhpcy5yb3V0ZXIgPSBwYXJlbnRba2V5XTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVx0XHJcblx0XHRpZighdGhpcy5yb3V0ZXIpXHJcblx0XHRcdHRocm93ICdIY1ZpZXcgc2hvdWxkIGJlIGNoaWxkIG9mIGFuIENvbXBvbmVudCB0aGF0IGhhcyBhIFJvdXRlciEnXHJcblx0XHR0aGlzLnJvdXRlci5hZGRWaWV3KHRoaXMpO1xyXG5cdH1cclxuXHRcclxuXHRkZXRhY2hlZENhbGxiYWNrKCkge1xyXG5cdFx0dGhpcy5yb3V0ZXIucmVtb3ZlVmlldyh0aGlzKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGNhbkRlYXZ0aXZhdGUoY29tcG9uZW50OnN0cmluZywgYXJnczphbnkpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0aWYoY29tcG9uZW50ID09PSB0aGlzLmNvbXBvbmVudCAmJiBKU09OLnN0cmluZ2lmeShhcmdzKSA9PT0gSlNPTi5zdHJpbmdpZnkodGhpcy5hcmdzKSlcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnY2FuRGVhY3RpdmF0ZSBiZWNhdXNlIHJlcXVlc3RlZCBjb21wb25lbnQgYW5kIGFyZ3MgYXJlIHNhbWUgYXMgY3VycmVudCcpO1xyXG5cdFx0XHJcblx0XHRpZighIXRoaXMuY3VycmVudCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5jdXJyZW50LmNhbkRlYWN0aXZhdGUoKTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnTm8gQ29tcG9uZW50IHRvIGRlYWN0aXZhdGUnKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGNhbkF2dGl2YXRlKGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGlmKGNvbXBvbmVudCA9PT0gdGhpcy5jb21wb25lbnQgJiYgSlNPTi5zdHJpbmdpZnkoYXJncykgPT09IEpTT04uc3RyaW5naWZ5KHRoaXMuYXJncykpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2NhbkFjdGl2YXRlIGJlY2F1c2UgcmVxdWVzdGVkIGNvbXBvbmVudCBhbmQgYXJncyBhcmUgc2FtZSBhcyBjdXJyZW50Jyk7XHJcblx0XHRlbHNlIGlmKCFjb21wb25lbnQpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJycpO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucGVuZGluZyA9IHRoaXMuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIGFyZ3MpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5wZW5kaW5nLmNhbkFjdGl2YXRlKCk7XHRcdFxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgYWN0aXZhdGUoY29tcG9uZW50OnN0cmluZywgYXJnczphbnkpOiB2b2lkIHtcclxuXHRcdGlmKGNvbXBvbmVudCA9PT0gdGhpcy5jb21wb25lbnQgJiYgSlNPTi5zdHJpbmdpZnkoYXJncykgPT09IEpTT04uc3RyaW5naWZ5KHRoaXMuYXJncykpXHJcblx0XHRcdHJldHVybiB2b2lkIDA7XHJcblx0XHRcclxuXHRcdGlmKHR5cGVvZiB0aGlzLnBlbmRpbmcgPT09ICd1bmRlZmluZWQnKVxyXG5cdFx0XHR0aGlzLnBlbmRpbmcgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBhcmdzKTtcclxuXHRcdFx0XHJcblx0XHR0aGlzLnVwZGF0ZUVsZW1lbnQoY29tcG9uZW50LCBhcmdzKTtcclxuXHR9XHJcblx0XHJcblx0XHJcblx0cHJvdGVjdGVkIGNyZWF0ZUVsZW1lbnQoY29tcG9uZW50OnN0cmluZywgYXJnczphbnkpOiBDdXN0b21FbGVtZW50IHtcclxuXHRcdGxldCBlbGVtZW50ID0gPEN1c3RvbUVsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChjb21wb25lbnQpO1xyXG5cdFx0XHJcblx0XHRmb3IobGV0IGtleSBpbiBhcmdzKVxyXG5cdFx0XHRlbGVtZW50W2tleV0gPSBhcmdzW2tleV07XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHRcclxuXHRwcm90ZWN0ZWQgdXBkYXRlRWxlbWVudChjb21wb25lbnQ6c3RyaW5nLCBhcmdzOmFueSk6IHZvaWQge1xyXG5cdFx0dGhpcy5jbGVhclNoYWRvdygpO1xyXG5cdFx0aWYoISF0aGlzLnBlbmRpbmcpIHtcclxuXHRcdFx0dGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHRoaXMucGVuZGluZyk7XHJcblx0XHRcdHRoaXMuY3VycmVudCA9IDxDdXN0b21FbGVtZW50Pig8SFRNTEVsZW1lbnQ+dGhpcy5zaGFkb3dSb290KS5jaGlsZHJlblswXVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuY3VycmVudCA9IHZvaWQgMDtcclxuXHRcdH1cclxuXHRcdHRoaXMucGVuZGluZyA9IHZvaWQgMDtcclxuXHRcdFxyXG5cdFx0dGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcblx0XHR0aGlzLmFyZ3MgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFyZ3MpKTtcclxuXHR9XHJcblx0XHJcblx0cHJvdGVjdGVkIGNsZWFyU2hhZG93KCk6IHZvaWQge1xyXG5cdFx0d2hpbGUgKHRoaXMuc2hhZG93Um9vdC5maXJzdENoaWxkKVxyXG5cdFx0XHR0aGlzLnNoYWRvd1Jvb3QucmVtb3ZlQ2hpbGQodGhpcy5zaGFkb3dSb290LmZpcnN0Q2hpbGQpO1xyXG5cdH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==