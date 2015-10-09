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
            if (!component)
                return void 0;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXcudHMiXSwibmFtZXMiOlsiSGNWaWV3IiwiSGNWaWV3LmNvbnN0cnVjdG9yIiwiSGNWaWV3LmNyZWF0ZWRDYWxsYmFjayIsIkhjVmlldy5hdHRhY2hlZENhbGxiYWNrIiwiSGNWaWV3LmRldGFjaGVkQ2FsbGJhY2siLCJIY1ZpZXcuY2FuRGVhdnRpdmF0ZSIsIkhjVmlldy5jYW5BdnRpdmF0ZSIsIkhjVmlldy5hY3RpdmF0ZSIsIkhjVmlldy5jcmVhdGVFbGVtZW50IiwiSGNWaWV3LnVwZGF0ZUVsZW1lbnQiLCJIY1ZpZXcuY2xlYXJTaGFkb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBRUEsc0NBQXNDO0lBRXRDO1FBQ29DQSwwQkFBYUE7UUFEakRBO1lBQ29DQyw4QkFBYUE7UUFtR2pEQSxDQUFDQTtRQXpGQUQsZ0NBQWVBLEdBQWZBO1lBQ0NFLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLFNBQVNBLENBQUNBO1lBQ25EQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLENBQUNBO1FBQ3pCQSxDQUFDQTtRQUVERixpQ0FBZ0JBLEdBQWhCQTtZQUNDRyxJQUFJQSxNQUFNQSxHQUFPQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUNqQ0EsT0FBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUE7Z0JBQ3ZCQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUUzQ0EsR0FBR0EsQ0FBQUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZCQSxFQUFFQSxDQUFBQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxZQUFZQSxnQkFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFD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LElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFNBQVNBLENBQUNBO1lBQzNCQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM5Q0EsQ0FBQ0E7UUFFU1QsNEJBQVdBLEdBQXJCQTtZQUNDVSxPQUFPQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxVQUFVQTtnQkFDaENBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1FBQzFEQSxDQUFDQTtRQW5HRlY7WUFBQ0Esd0JBQVNBO21CQW9HVEE7UUFBREEsYUFBQ0E7SUFBREEsQ0FwR0EsQUFvR0NBLEVBbkdtQyw0QkFBYSxFQW1HaEQ7SUFwR0Q7NEJBb0dDLENBQUEiLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDdXN0b21FbGVtZW50fSBmcm9tICdob3JjcnV4LWNvcmUnO1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJy4vcm91dGVyL3JvdXRlcidcclxuLy9pbXBvcnQge2JpbmREb219IGZyb20gJ2hvcmNydXgtY29yZSdcclxuXHJcbkBDb21wb25lbnRcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGNWaWV3IGV4dGVuZHMgQ3VzdG9tRWxlbWVudCB7XHJcblx0XHJcblx0cHJpdmF0ZSBjb21wb25lbnQ6c3RyaW5nO1xyXG5cdHByaXZhdGUgYXJnczphbnk7XHJcblx0cHJpdmF0ZSBjdXJyZW50OiBDdXN0b21FbGVtZW50O1xyXG5cdHByaXZhdGUgcGVuZGluZzogQ3VzdG9tRWxlbWVudDtcclxuXHRwcml2YXRlIHJvdXRlcjogUm91dGVyO1xyXG5cdFxyXG5cdHB1YmxpYyBuYW1lO1xyXG5cdFxyXG5cdGNyZWF0ZWRDYWxsYmFjaygpIHtcclxuXHRcdHRoaXMubmFtZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgJ2RlZmF1bHQnO1xyXG5cdFx0dGhpcy5jcmVhdGVTaGFkb3dSb290KCk7XHJcblx0fVxyXG5cdFxyXG5cdGF0dGFjaGVkQ2FsbGJhY2soKSB7XHJcblx0XHRsZXQgcGFyZW50OmFueSA9IHRoaXMucGFyZW50Tm9kZTtcclxuXHRcdHdoaWxlKCFwYXJlbnQuc2hhZG93Um9vdClcclxuXHRcdFx0cGFyZW50ID0gcGFyZW50Lmhvc3QgfHwgcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcclxuXHRcdGZvcihsZXQga2V5IGluIHBhcmVudCkge1xyXG5cdFx0XHRpZihwYXJlbnRba2V5XSBpbnN0YW5jZW9mIFJvdXRlcikge1xyXG5cdFx0XHRcdHRoaXMucm91dGVyID0gcGFyZW50W2tleV07XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cdFxyXG5cdFx0aWYoIXRoaXMucm91dGVyKVxyXG5cdFx0XHR0aHJvdyAnSGNWaWV3IHNob3VsZCBiZSBjaGlsZCBvZiBhbiBDb21wb25lbnQgdGhhdCBoYXMgYSBSb3V0ZXIhJ1xyXG5cdFx0dGhpcy5yb3V0ZXIuYWRkVmlldyh0aGlzKTtcclxuXHR9XHJcblx0XHJcblx0ZGV0YWNoZWRDYWxsYmFjaygpIHtcclxuXHRcdHRoaXMucm91dGVyLnJlbW92ZVZpZXcodGhpcyk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBjYW5EZWF2dGl2YXRlKGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGlmKGNvbXBvbmVudCA9PT0gdGhpcy5jb21wb25lbnQgJiYgSlNPTi5zdHJpbmdpZnkoYXJncykgPT09IEpTT04uc3RyaW5naWZ5KHRoaXMuYXJncykpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2NhbkRlYWN0aXZhdGUgYmVjYXVzZSByZXF1ZXN0ZWQgY29tcG9uZW50IGFuZCBhcmdzIGFyZSBzYW1lIGFzIGN1cnJlbnQnKTtcclxuXHRcdFxyXG5cdFx0aWYoISF0aGlzLmN1cnJlbnQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuY3VycmVudC5jYW5EZWFjdGl2YXRlKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJ05vIENvbXBvbmVudCB0byBkZWFjdGl2YXRlJyk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBjYW5BdnRpdmF0ZShjb21wb25lbnQ6c3RyaW5nLCBhcmdzOmFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZihjb21wb25lbnQgPT09IHRoaXMuY29tcG9uZW50ICYmIEpTT04uc3RyaW5naWZ5KGFyZ3MpID09PSBKU09OLnN0cmluZ2lmeSh0aGlzLmFyZ3MpKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdjYW5BY3RpdmF0ZSBiZWNhdXNlIHJlcXVlc3RlZCBjb21wb25lbnQgYW5kIGFyZ3MgYXJlIHNhbWUgYXMgY3VycmVudCcpO1xyXG5cdFx0ZWxzZSBpZighY29tcG9uZW50KVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCcnKTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnBlbmRpbmcgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBhcmdzKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMucGVuZGluZy5jYW5BY3RpdmF0ZSgpO1x0XHRcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0cHVibGljIGFjdGl2YXRlKGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogdm9pZCB7XHJcblx0XHRpZihjb21wb25lbnQgPT09IHRoaXMuY29tcG9uZW50ICYmIEpTT04uc3RyaW5naWZ5KGFyZ3MpID09PSBKU09OLnN0cmluZ2lmeSh0aGlzLmFyZ3MpKVxyXG5cdFx0XHRyZXR1cm4gdm9pZCAwO1xyXG5cdFx0XHJcblx0XHRpZih0eXBlb2YgdGhpcy5wZW5kaW5nID09PSAndW5kZWZpbmVkJylcclxuXHRcdFx0dGhpcy5wZW5kaW5nID0gdGhpcy5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgYXJncyk7XHJcblx0XHRcdFxyXG5cdFx0dGhpcy51cGRhdGVFbGVtZW50KGNvbXBvbmVudCwgYXJncyk7XHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdHByb3RlY3RlZCBjcmVhdGVFbGVtZW50KGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogQ3VzdG9tRWxlbWVudCB7XHJcblx0XHRpZighY29tcG9uZW50KVxyXG5cdFx0XHRyZXR1cm4gdm9pZCAwO1xyXG5cdFx0XHJcblx0XHRsZXQgZWxlbWVudCA9IDxDdXN0b21FbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50KTtcclxuXHRcdFxyXG5cdFx0Zm9yKGxldCBrZXkgaW4gYXJncylcclxuXHRcdFx0ZWxlbWVudFtrZXldID0gYXJnc1trZXldO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblx0XHJcblx0cHJvdGVjdGVkIHVwZGF0ZUVsZW1lbnQoY29tcG9uZW50OnN0cmluZywgYXJnczphbnkpOiB2b2lkIHtcclxuXHRcdHRoaXMuY2xlYXJTaGFkb3coKTtcclxuXHRcdGlmKCEhdGhpcy5wZW5kaW5nKSB7XHJcblx0XHRcdHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0aGlzLnBlbmRpbmcpO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnQgPSA8Q3VzdG9tRWxlbWVudD4oPEhUTUxFbGVtZW50PnRoaXMuc2hhZG93Um9vdCkuY2hpbGRyZW5bMF1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLmN1cnJlbnQgPSB2b2lkIDA7XHJcblx0XHR9XHJcblx0XHR0aGlzLnBlbmRpbmcgPSB2b2lkIDA7XHJcblx0XHRcclxuXHRcdHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG5cdFx0dGhpcy5hcmdzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcmdzKSk7XHJcblx0fVxyXG5cdFxyXG5cdHByb3RlY3RlZCBjbGVhclNoYWRvdygpOiB2b2lkIHtcclxuXHRcdHdoaWxlICh0aGlzLnNoYWRvd1Jvb3QuZmlyc3RDaGlsZClcclxuXHRcdFx0dGhpcy5zaGFkb3dSb290LnJlbW92ZUNoaWxkKHRoaXMuc2hhZG93Um9vdC5maXJzdENoaWxkKTtcclxuXHR9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=