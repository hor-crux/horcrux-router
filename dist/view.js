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
            else if (!!this.current) {
                return this.current.canDeactivate(component, args);
            }
            else
                return Promise.resolve('No Component to deactivate');
        };
        HcView.prototype.canAvtivate = function (component, args) {
            var _this = this;
            if (component === this.component && JSON.stringify(args) === JSON.stringify(this.args))
                return Promise.resolve('canActivate because requested component and args are same as current');
            else if (!component)
                return Promise.resolve('');
            else {
                this.pending = this.createElement(component, args);
                return this.pending.canActivate()
                    .then(function (_) {
                    return Promise.resolve(_);
                })
                    .catch(function (_) {
                    _this.pending = void 0;
                    return Promise.reject(_);
                });
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
            if (!component)
                return void 0;
            var element = document.createElement(component);
            for (var key in args) {
                if (!!element.properties && element.properties.indexOf(key) > -1)
                    horcrux_core_1.Property.setProperty(element, key, args[key]);
                else
                    element.setAttribute(key, args[key]);
            }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXcudHMiXSwibmFtZXMiOlsiSGNWaWV3IiwiSGNWaWV3LmNvbnN0cnVjdG9yIiwiSGNWaWV3LmNyZWF0ZWRDYWxsYmFjayIsIkhjVmlldy5hdHRhY2hlZENhbGxiYWNrIiwiSGNWaWV3LmRldGFjaGVkQ2FsbGJhY2siLCJIY1ZpZXcuY2FuRGVhdnRpdmF0ZSIsIkhjVmlldy5jYW5BdnRpdmF0ZSIsIkhjVmlldy5hY3RpdmF0ZSIsIkhjVmlldy5jcmVhdGVFbGVtZW50IiwiSGNWaWV3LnVwZGF0ZUVsZW1lbnQiLCJIY1ZpZXcuY2xlYXJTaGFkb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBRUEsc0NBQXNDO0lBRXRDO1FBQ29DQSwwQkFBYUE7UUFEakRBO1lBQ29DQyw4QkFBYUE7UUFtSGpEQSxDQUFDQTtRQXpHQUQsZ0NBQWVBLEdBQWZBO1lBQ0NFLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLFNBQVNBLENBQUNBO1lBQ25EQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLENBQUNBO1FBQ3pCQSxDQUFDQTtRQUVERixpQ0FBZ0JBLEdBQWhCQTtZQUNDRyxJQUFJQSxNQUFNQSxHQUFPQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUNqQ0EsT0FBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUE7Z0JBQ3ZCQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUUzQ0EsR0FBR0EsQ0FBQUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZCQSxFQUFFQSxDQUFBQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxZQUFZQSxnQkFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFD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QTtRQUMxREEsQ0FBQ0E7UUFuSEZWO1lBQUNBLHdCQUFTQTttQkFvSFRBO1FBQURBLGFBQUNBO0lBQURBLENBcEhBLEFBb0hDQSxFQW5IbUMsNEJBQWEsRUFtSGhEO0lBcEhEOzRCQW9IQyxDQUFBIiwiZmlsZSI6InZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ3VzdG9tRWxlbWVudCwgUHJvcGVydHl9IGZyb20gJ2hvcmNydXgtY29yZSc7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZXIvcm91dGVyJ1xyXG4vL2ltcG9ydCB7YmluZERvbX0gZnJvbSAnaG9yY3J1eC1jb3JlJ1xyXG5cclxuQENvbXBvbmVudFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIY1ZpZXcgZXh0ZW5kcyBDdXN0b21FbGVtZW50IHtcclxuXHRcclxuXHRwcml2YXRlIGNvbXBvbmVudDpzdHJpbmc7XHJcblx0cHJpdmF0ZSBhcmdzOmFueTtcclxuXHRwcml2YXRlIGN1cnJlbnQ6IEN1c3RvbUVsZW1lbnQ7XHJcblx0cHJpdmF0ZSBwZW5kaW5nOiBDdXN0b21FbGVtZW50O1xyXG5cdHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XHJcblx0XHJcblx0cHVibGljIG5hbWU7XHJcblx0XHJcblx0Y3JlYXRlZENhbGxiYWNrKCkge1xyXG5cdFx0dGhpcy5uYW1lID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ25hbWUnKSB8fCAnZGVmYXVsdCc7XHJcblx0XHR0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKTtcclxuXHR9XHJcblx0XHJcblx0YXR0YWNoZWRDYWxsYmFjaygpIHtcclxuXHRcdGxldCBwYXJlbnQ6YW55ID0gdGhpcy5wYXJlbnROb2RlO1xyXG5cdFx0d2hpbGUoIXBhcmVudC5zaGFkb3dSb290KVxyXG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQuaG9zdCB8fCBwYXJlbnQucGFyZW50Tm9kZTtcclxuXHRcdFxyXG5cdFx0Zm9yKGxldCBrZXkgaW4gcGFyZW50KSB7XHJcblx0XHRcdGlmKHBhcmVudFtrZXldIGluc3RhbmNlb2YgUm91dGVyKSB7XHJcblx0XHRcdFx0dGhpcy5yb3V0ZXIgPSBwYXJlbnRba2V5XTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVx0XHJcblx0XHRpZighdGhpcy5yb3V0ZXIpXHJcblx0XHRcdHRocm93ICdIY1ZpZXcgc2hvdWxkIGJlIGNoaWxkIG9mIGFuIENvbXBvbmVudCB0aGF0IGhhcyBhIFJvdXRlciEnXHJcblx0XHR0aGlzLnJvdXRlci5hZGRWaWV3KHRoaXMpO1xyXG5cdH1cclxuXHRcclxuXHRkZXRhY2hlZENhbGxiYWNrKCkge1xyXG5cdFx0dGhpcy5yb3V0ZXIucmVtb3ZlVmlldyh0aGlzKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGNhbkRlYXZ0aXZhdGUoY29tcG9uZW50OnN0cmluZywgYXJnczphbnkpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0aWYoY29tcG9uZW50ID09PSB0aGlzLmNvbXBvbmVudCAmJiBKU09OLnN0cmluZ2lmeShhcmdzKSA9PT0gSlNPTi5zdHJpbmdpZnkodGhpcy5hcmdzKSlcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnY2FuRGVhY3RpdmF0ZSBiZWNhdXNlIHJlcXVlc3RlZCBjb21wb25lbnQgYW5kIGFyZ3MgYXJlIHNhbWUgYXMgY3VycmVudCcpO1xyXG5cdFx0XHJcblx0XHRlbHNlIGlmKCEhdGhpcy5jdXJyZW50KSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmN1cnJlbnQuY2FuRGVhY3RpdmF0ZShjb21wb25lbnQsIGFyZ3MpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJ05vIENvbXBvbmVudCB0byBkZWFjdGl2YXRlJyk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBjYW5BdnRpdmF0ZShjb21wb25lbnQ6c3RyaW5nLCBhcmdzOmFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZihjb21wb25lbnQgPT09IHRoaXMuY29tcG9uZW50ICYmIEpTT04uc3RyaW5naWZ5KGFyZ3MpID09PSBKU09OLnN0cmluZ2lmeSh0aGlzLmFyZ3MpKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdjYW5BY3RpdmF0ZSBiZWNhdXNlIHJlcXVlc3RlZCBjb21wb25lbnQgYW5kIGFyZ3MgYXJlIHNhbWUgYXMgY3VycmVudCcpO1xyXG5cdFx0XHJcblx0XHRlbHNlIGlmKCFjb21wb25lbnQpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJycpO1xyXG5cdFx0XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wZW5kaW5nID0gdGhpcy5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgYXJncyk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdGhpcy5wZW5kaW5nLmNhbkFjdGl2YXRlKClcclxuXHRcdFx0LnRoZW4oXyA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShfKTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmNhdGNoKF8gPT4ge1xyXG5cdFx0XHRcdHRoaXMucGVuZGluZyA9IHZvaWQgMDtcclxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXyk7XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBhY3RpdmF0ZShjb21wb25lbnQ6c3RyaW5nLCBhcmdzOmFueSk6IHZvaWQge1xyXG5cdFx0aWYoY29tcG9uZW50ID09PSB0aGlzLmNvbXBvbmVudCAmJiBKU09OLnN0cmluZ2lmeShhcmdzKSA9PT0gSlNPTi5zdHJpbmdpZnkodGhpcy5hcmdzKSlcclxuXHRcdFx0cmV0dXJuIHZvaWQgMDtcclxuXHRcdFxyXG5cdFx0aWYodHlwZW9mIHRoaXMucGVuZGluZyA9PT0gJ3VuZGVmaW5lZCcpXHJcblx0XHRcdHRoaXMucGVuZGluZyA9IHRoaXMuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIGFyZ3MpO1xyXG5cdFx0XHRcclxuXHRcdHRoaXMudXBkYXRlRWxlbWVudChjb21wb25lbnQsIGFyZ3MpO1xyXG5cdH1cclxuXHRcclxuXHRcclxuXHRwcm90ZWN0ZWQgY3JlYXRlRWxlbWVudChjb21wb25lbnQ6c3RyaW5nLCBhcmdzOmFueSk6IEN1c3RvbUVsZW1lbnQge1xyXG5cdFx0aWYoIWNvbXBvbmVudClcclxuXHRcdFx0cmV0dXJuIHZvaWQgMDtcclxuXHRcdFxyXG5cdFx0bGV0IGVsZW1lbnQgPSA8Q3VzdG9tRWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCk7XHJcblx0XHRcclxuXHRcdGZvcihsZXQga2V5IGluIGFyZ3MpIHtcclxuXHRcdFx0aWYoISFlbGVtZW50LnByb3BlcnRpZXMgJiYgZWxlbWVudC5wcm9wZXJ0aWVzLmluZGV4T2Yoa2V5KSA+IC0xKVxyXG5cdFx0XHRcdCg8YW55PlByb3BlcnR5KS5zZXRQcm9wZXJ0eShlbGVtZW50LCBrZXksIGFyZ3Nba2V5XSk7XHJcblx0XHRcdFx0Ly9lbGVtZW50W2tleV0gPSBhcmdzW2tleV07XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGFyZ3Nba2V5XSlcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cdFxyXG5cdHByb3RlY3RlZCB1cGRhdGVFbGVtZW50KGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogdm9pZCB7XHJcblx0XHR0aGlzLmNsZWFyU2hhZG93KCk7XHJcblx0XHRpZighIXRoaXMucGVuZGluZykge1xyXG5cdFx0XHR0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGhpcy5wZW5kaW5nKTtcclxuXHRcdFx0dGhpcy5jdXJyZW50ID0gPEN1c3RvbUVsZW1lbnQ+KDxIVE1MRWxlbWVudD50aGlzLnNoYWRvd1Jvb3QpLmNoaWxkcmVuWzBdXHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5jdXJyZW50ID0gdm9pZCAwO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5wZW5kaW5nID0gdm9pZCAwO1xyXG5cdFx0XHJcblx0XHR0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuXHRcdHRoaXMuYXJncyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXJncykpO1xyXG5cdH1cclxuXHRcclxuXHRwcm90ZWN0ZWQgY2xlYXJTaGFkb3coKTogdm9pZCB7XHJcblx0XHR3aGlsZSAodGhpcy5zaGFkb3dSb290LmZpcnN0Q2hpbGQpXHJcblx0XHRcdHRoaXMuc2hhZG93Um9vdC5yZW1vdmVDaGlsZCh0aGlzLnNoYWRvd1Jvb3QuZmlyc3RDaGlsZCk7XHJcblx0fVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9