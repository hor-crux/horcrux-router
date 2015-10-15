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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXcudHMiXSwibmFtZXMiOlsiSGNWaWV3IiwiSGNWaWV3LmNvbnN0cnVjdG9yIiwiSGNWaWV3LmNyZWF0ZWRDYWxsYmFjayIsIkhjVmlldy5hdHRhY2hlZENhbGxiYWNrIiwiSGNWaWV3LmRldGFjaGVkQ2FsbGJhY2siLCJIY1ZpZXcuY2FuRGVhdnRpdmF0ZSIsIkhjVmlldy5jYW5BdnRpdmF0ZSIsIkhjVmlldy5hY3RpdmF0ZSIsIkhjVmlldy5jcmVhdGVFbGVtZW50IiwiSGNWaWV3LnVwZGF0ZUVsZW1lbnQiLCJIY1ZpZXcuY2xlYXJTaGFkb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBRUEsc0NBQXNDO0lBRXRDO1FBQ29DQSwwQkFBYUE7UUFEakRBO1lBQ29DQyw4QkFBYUE7UUEyR2pEQSxDQUFDQTtRQWpHQUQsZ0NBQWVBLEdBQWZBO1lBQ0NFLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLFNBQVNBLENBQUNBO1lBQ25EQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLENBQUNBO1FBQ3pCQSxDQUFDQTtRQUVERixpQ0FBZ0JBLEdBQWhCQTtZQUNDRyxJQUFJQSxNQUFNQSxHQUFPQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUNqQ0EsT0FBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUE7Z0JBQ3ZCQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUUzQ0EsR0FBR0EsQ0FBQUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZCQSxFQUFFQSxDQUFBQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxZQUFZQSxnQkFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFD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QUNuQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFnQ0EsSUFBSUEsQ0FBQ0EsVUFBV0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7WUFDekVBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLENBQUNBO2dCQUNMQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUN2QkEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFFdEJBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFNBQVNBLENBQUNBO1lBQzNCQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM5Q0EsQ0FBQ0E7UUFFU1QsNEJBQVdBLEdBQXJCQTtZQUNDVSxPQUFPQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxVQUFVQTtnQkFDaENBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1FBQzFEQSxDQUFDQTtRQTNHRlY7WUFBQ0Esd0JBQVNBO21CQTRHVEE7UUFBREEsYUFBQ0E7SUFBREEsQ0E1R0EsQUE0R0NBLEVBM0dtQyw0QkFBYSxFQTJHaEQ7SUE1R0Q7NEJBNEdDLENBQUEiLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDdXN0b21FbGVtZW50LCBQcm9wZXJ0eX0gZnJvbSAnaG9yY3J1eC1jb3JlJztcclxuaW1wb3J0IFJvdXRlciBmcm9tICcuL3JvdXRlci9yb3V0ZXInXHJcbi8vaW1wb3J0IHtiaW5kRG9tfSBmcm9tICdob3JjcnV4LWNvcmUnXHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhjVmlldyBleHRlbmRzIEN1c3RvbUVsZW1lbnQge1xyXG5cdFxyXG5cdHByaXZhdGUgY29tcG9uZW50OnN0cmluZztcclxuXHRwcml2YXRlIGFyZ3M6YW55O1xyXG5cdHByaXZhdGUgY3VycmVudDogQ3VzdG9tRWxlbWVudDtcclxuXHRwcml2YXRlIHBlbmRpbmc6IEN1c3RvbUVsZW1lbnQ7XHJcblx0cHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjtcclxuXHRcclxuXHRwdWJsaWMgbmFtZTtcclxuXHRcclxuXHRjcmVhdGVkQ2FsbGJhY2soKSB7XHJcblx0XHR0aGlzLm5hbWUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbmFtZScpIHx8ICdkZWZhdWx0JztcclxuXHRcdHRoaXMuY3JlYXRlU2hhZG93Um9vdCgpO1xyXG5cdH1cclxuXHRcclxuXHRhdHRhY2hlZENhbGxiYWNrKCkge1xyXG5cdFx0bGV0IHBhcmVudDphbnkgPSB0aGlzLnBhcmVudE5vZGU7XHJcblx0XHR3aGlsZSghcGFyZW50LnNoYWRvd1Jvb3QpXHJcblx0XHRcdHBhcmVudCA9IHBhcmVudC5ob3N0IHx8IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHJcblx0XHRmb3IobGV0IGtleSBpbiBwYXJlbnQpIHtcclxuXHRcdFx0aWYocGFyZW50W2tleV0gaW5zdGFuY2VvZiBSb3V0ZXIpIHtcclxuXHRcdFx0XHR0aGlzLnJvdXRlciA9IHBhcmVudFtrZXldO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHRcclxuXHRcdGlmKCF0aGlzLnJvdXRlcilcclxuXHRcdFx0dGhyb3cgJ0hjVmlldyBzaG91bGQgYmUgY2hpbGQgb2YgYW4gQ29tcG9uZW50IHRoYXQgaGFzIGEgUm91dGVyISdcclxuXHRcdHRoaXMucm91dGVyLmFkZFZpZXcodGhpcyk7XHJcblx0fVxyXG5cdFxyXG5cdGRldGFjaGVkQ2FsbGJhY2soKSB7XHJcblx0XHR0aGlzLnJvdXRlci5yZW1vdmVWaWV3KHRoaXMpO1xyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgY2FuRGVhdnRpdmF0ZShjb21wb25lbnQ6c3RyaW5nLCBhcmdzOmFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZihjb21wb25lbnQgPT09IHRoaXMuY29tcG9uZW50ICYmIEpTT04uc3RyaW5naWZ5KGFyZ3MpID09PSBKU09OLnN0cmluZ2lmeSh0aGlzLmFyZ3MpKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdjYW5EZWFjdGl2YXRlIGJlY2F1c2UgcmVxdWVzdGVkIGNvbXBvbmVudCBhbmQgYXJncyBhcmUgc2FtZSBhcyBjdXJyZW50Jyk7XHJcblx0XHRcclxuXHRcdGVsc2UgaWYoISF0aGlzLmN1cnJlbnQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuY3VycmVudC5jYW5EZWFjdGl2YXRlKGNvbXBvbmVudCwgYXJncyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnTm8gQ29tcG9uZW50IHRvIGRlYWN0aXZhdGUnKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGNhbkF2dGl2YXRlKGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGlmKGNvbXBvbmVudCA9PT0gdGhpcy5jb21wb25lbnQgJiYgSlNPTi5zdHJpbmdpZnkoYXJncykgPT09IEpTT04uc3RyaW5naWZ5KHRoaXMuYXJncykpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2NhbkFjdGl2YXRlIGJlY2F1c2UgcmVxdWVzdGVkIGNvbXBvbmVudCBhbmQgYXJncyBhcmUgc2FtZSBhcyBjdXJyZW50Jyk7XHJcblx0XHRcclxuXHRcdGVsc2UgaWYoIWNvbXBvbmVudClcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnJyk7XHJcblx0XHRcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnBlbmRpbmcgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBhcmdzKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMucGVuZGluZy5jYW5BY3RpdmF0ZSgpO1x0XHRcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0cHVibGljIGFjdGl2YXRlKGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogdm9pZCB7XHJcblx0XHRpZihjb21wb25lbnQgPT09IHRoaXMuY29tcG9uZW50ICYmIEpTT04uc3RyaW5naWZ5KGFyZ3MpID09PSBKU09OLnN0cmluZ2lmeSh0aGlzLmFyZ3MpKVxyXG5cdFx0XHRyZXR1cm4gdm9pZCAwO1xyXG5cdFx0XHJcblx0XHRpZih0eXBlb2YgdGhpcy5wZW5kaW5nID09PSAndW5kZWZpbmVkJylcclxuXHRcdFx0dGhpcy5wZW5kaW5nID0gdGhpcy5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgYXJncyk7XHJcblx0XHRcdFxyXG5cdFx0dGhpcy51cGRhdGVFbGVtZW50KGNvbXBvbmVudCwgYXJncyk7XHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdHByb3RlY3RlZCBjcmVhdGVFbGVtZW50KGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogQ3VzdG9tRWxlbWVudCB7XHJcblx0XHRpZighY29tcG9uZW50KVxyXG5cdFx0XHRyZXR1cm4gdm9pZCAwO1xyXG5cdFx0XHJcblx0XHRsZXQgZWxlbWVudCA9IDxDdXN0b21FbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50KTtcclxuXHRcdFxyXG5cdFx0Zm9yKGxldCBrZXkgaW4gYXJncykge1xyXG5cdFx0XHRpZighIWVsZW1lbnQucHJvcGVydGllcyAmJiBlbGVtZW50LnByb3BlcnRpZXMuaW5kZXhPZihrZXkpID4gLTEpXHJcblx0XHRcdFx0KDxhbnk+UHJvcGVydHkpLnNldFByb3BlcnR5KGVsZW1lbnQsIGtleSwgYXJnc1trZXldKTtcclxuXHRcdFx0XHQvL2VsZW1lbnRba2V5XSA9IGFyZ3Nba2V5XTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgYXJnc1trZXldKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblx0XHJcblx0cHJvdGVjdGVkIHVwZGF0ZUVsZW1lbnQoY29tcG9uZW50OnN0cmluZywgYXJnczphbnkpOiB2b2lkIHtcclxuXHRcdHRoaXMuY2xlYXJTaGFkb3coKTtcclxuXHRcdGlmKCEhdGhpcy5wZW5kaW5nKSB7XHJcblx0XHRcdHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0aGlzLnBlbmRpbmcpO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnQgPSA8Q3VzdG9tRWxlbWVudD4oPEhUTUxFbGVtZW50PnRoaXMuc2hhZG93Um9vdCkuY2hpbGRyZW5bMF1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLmN1cnJlbnQgPSB2b2lkIDA7XHJcblx0XHR9XHJcblx0XHR0aGlzLnBlbmRpbmcgPSB2b2lkIDA7XHJcblx0XHRcclxuXHRcdHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG5cdFx0dGhpcy5hcmdzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcmdzKSk7XHJcblx0fVxyXG5cdFxyXG5cdHByb3RlY3RlZCBjbGVhclNoYWRvdygpOiB2b2lkIHtcclxuXHRcdHdoaWxlICh0aGlzLnNoYWRvd1Jvb3QuZmlyc3RDaGlsZClcclxuXHRcdFx0dGhpcy5zaGFkb3dSb290LnJlbW92ZUNoaWxkKHRoaXMuc2hhZG93Um9vdC5maXJzdENoaWxkKTtcclxuXHR9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=