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
define(["require", "exports", 'horcrux-core', './router/router', 'horcrux-core'], function (require, exports, horcrux_core_1, router_1, horcrux_core_2) {
    var HcView = (function (_super) {
        __extends(HcView, _super);
        function HcView() {
            _super.apply(this, arguments);
            this.div = document.createElement('div');
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
            var html = '<' + component + ' ';
            for (var key in args)
                html += '#' + key + '="{{' + args[key] + '}}"' + ' ';
            html += '></' + component + '>';
            this.div.innerHTML = html;
            var element = this.div.children[0];
            horcrux_core_2.bindDom(element, [args]);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXcudHMiXSwibmFtZXMiOlsiSGNWaWV3IiwiSGNWaWV3LmNvbnN0cnVjdG9yIiwiSGNWaWV3LmNyZWF0ZWRDYWxsYmFjayIsIkhjVmlldy5hdHRhY2hlZENhbGxiYWNrIiwiSGNWaWV3LmRldGFjaGVkQ2FsbGJhY2siLCJIY1ZpZXcuY2FuRGVhdnRpdmF0ZSIsIkhjVmlldy5jYW5BdnRpdmF0ZSIsIkhjVmlldy5hY3RpdmF0ZSIsIkhjVmlldy5jcmVhdGVFbGVtZW50IiwiSGNWaWV3LmNsZWFyU2hhZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUlBO1FBQ29DQSwwQkFBYUE7UUFEakRBO1lBQ29DQyw4QkFBYUE7WUFNeENBLFFBQUdBLEdBQUdBLFFBQVFBLENBQUNBLGFBQWFBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBcUY3Q0EsQ0FBQ0E7UUFoRkFELGdDQUFlQSxHQUFmQTtZQUNDRSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxTQUFTQSxDQUFDQTtZQUNuREEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7UUFFREYsaUNBQWdCQSxHQUFoQkE7WUFDQ0csSUFBSUEsTUFBTUEsR0FBT0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7WUFDakNBLE9BQU1BLENBQUNBLE1BQU1BLENBQUNBLFVBQVVBO2dCQUN2QkEsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsSUFBSUEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7WUFFM0NBLEdBQUdBLENBQUFBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsWUFBWUEsZ0JBQU1BLENBQUNBLENBQUNBLENBQUNBO29CQUNsQ0EsSUFBSUEsQ0FB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UyxPQUFPQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxVQUFVQTtnQkFDaENBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1FBQzFEQSxDQUFDQTtRQTNGRlQ7WUFBQ0Esd0JBQVNBO21CQTRGVEE7UUFBREEsYUFBQ0E7SUFBREEsQ0E1RkEsQUE0RkNBLEVBM0ZtQyw0QkFBYSxFQTJGaEQ7SUE1RkQ7NEJBNEZDLENBQUEiLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDdXN0b21FbGVtZW50fSBmcm9tICdob3JjcnV4LWNvcmUnO1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJy4vcm91dGVyL3JvdXRlcidcclxuaW1wb3J0IHtiaW5kRG9tfSBmcm9tICdob3JjcnV4LWNvcmUnXHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhjVmlldyBleHRlbmRzIEN1c3RvbUVsZW1lbnQge1xyXG5cdFxyXG5cdHByaXZhdGUgY29tcG9uZW50OnN0cmluZztcclxuXHRwcml2YXRlIGFyZ3M6YW55O1xyXG5cdHByaXZhdGUgY3VycmVudDogQ3VzdG9tRWxlbWVudDtcclxuXHRwcml2YXRlIHBlbmRpbmc6IEN1c3RvbUVsZW1lbnQ7XHJcblx0cHJpdmF0ZSBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRwcml2YXRlIHJvdXRlcjogUm91dGVyO1xyXG5cdFxyXG5cdHB1YmxpYyBuYW1lO1xyXG5cdFxyXG5cdGNyZWF0ZWRDYWxsYmFjaygpIHtcclxuXHRcdHRoaXMubmFtZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgJ2RlZmF1bHQnO1xyXG5cdFx0dGhpcy5jcmVhdGVTaGFkb3dSb290KCk7XHJcblx0fVxyXG5cdFxyXG5cdGF0dGFjaGVkQ2FsbGJhY2soKSB7XHJcblx0XHRsZXQgcGFyZW50OmFueSA9IHRoaXMucGFyZW50Tm9kZTtcclxuXHRcdHdoaWxlKCFwYXJlbnQuc2hhZG93Um9vdClcclxuXHRcdFx0cGFyZW50ID0gcGFyZW50Lmhvc3QgfHwgcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcclxuXHRcdGZvcihsZXQga2V5IGluIHBhcmVudCkge1xyXG5cdFx0XHRpZihwYXJlbnRba2V5XSBpbnN0YW5jZW9mIFJvdXRlcikge1xyXG5cdFx0XHRcdHRoaXMucm91dGVyID0gcGFyZW50W2tleV07XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cdFxyXG5cdFx0aWYoIXRoaXMucm91dGVyKVxyXG5cdFx0XHR0aHJvdyAnSGNWaWV3IHNob3VsZCBiZSBjaGlsZCBvZiBhbiBDb21wb25lbnQgdGhhdCBoYXMgYSBSb3V0ZXIhJ1xyXG5cdFx0dGhpcy5yb3V0ZXIuYWRkVmlldyh0aGlzKTtcclxuXHR9XHJcblx0XHJcblx0ZGV0YWNoZWRDYWxsYmFjaygpIHtcclxuXHRcdHRoaXMucm91dGVyLnJlbW92ZVZpZXcodGhpcyk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBjYW5EZWF2dGl2YXRlKGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGlmKGNvbXBvbmVudCA9PT0gdGhpcy5jb21wb25lbnQgJiYgSlNPTi5zdHJpbmdpZnkoYXJncykgPT09IEpTT04uc3RyaW5naWZ5KHRoaXMuYXJncykpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2NhbkRlYWN0aXZhdGUgYmVjYXVzZSByZXF1ZXN0ZWQgY29tcG9uZW50IGFuZCBhcmdzIGFyZSBzYW1lIGFzIGN1cnJlbnQnKTtcclxuXHRcdFxyXG5cdFx0aWYoISF0aGlzLmN1cnJlbnQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuY3VycmVudC5jYW5EZWFjdGl2YXRlKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJ05vIENvbXBvbmVudCB0byBkZWFjdGl2YXRlJyk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBjYW5BdnRpdmF0ZShjb21wb25lbnQ6c3RyaW5nLCBhcmdzOmFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZihjb21wb25lbnQgPT09IHRoaXMuY29tcG9uZW50ICYmIEpTT04uc3RyaW5naWZ5KGFyZ3MpID09PSBKU09OLnN0cmluZ2lmeSh0aGlzLmFyZ3MpKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdjYW5BY3RpdmF0ZSBiZWNhdXNlIHJlcXVlc3RlZCBjb21wb25lbnQgYW5kIGFyZ3MgYXJlIHNhbWUgYXMgY3VycmVudCcpO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucGVuZGluZyA9IHRoaXMuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIGFyZ3MpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5wZW5kaW5nLmNhbkFjdGl2YXRlKCk7XHRcdFxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgYWN0aXZhdGUoY29tcG9uZW50OnN0cmluZywgYXJnczphbnkpOiB2b2lkIHtcclxuXHRcdGlmKGNvbXBvbmVudCA9PT0gdGhpcy5jb21wb25lbnQgJiYgSlNPTi5zdHJpbmdpZnkoYXJncykgPT09IEpTT04uc3RyaW5naWZ5KHRoaXMuYXJncykpXHJcblx0XHRcdHJldHVybiB2b2lkIDA7XHJcblx0XHRcdFxyXG5cdFx0aWYodHlwZW9mIHRoaXMucGVuZGluZyA9PT0gJ3VuZGVmaW5lZCcpXHJcblx0XHRcdHRoaXMucGVuZGluZyA9IHRoaXMuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIGFyZ3MpO1xyXG5cdFx0XHRcclxuXHRcdHRoaXMuY2xlYXJTaGFkb3coKTtcclxuXHRcdHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0aGlzLnBlbmRpbmcpO1xyXG5cdFx0dGhpcy5wZW5kaW5nID0gdm9pZCAwO1xyXG5cdFx0XHJcblx0XHR0aGlzLmN1cnJlbnQgPSA8Q3VzdG9tRWxlbWVudD4oPEhUTUxFbGVtZW50PnRoaXMuc2hhZG93Um9vdCkuY2hpbGRyZW5bMF1cclxuXHRcdHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG5cdFx0dGhpcy5hcmdzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcmdzKSk7XHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdHByb3RlY3RlZCBjcmVhdGVFbGVtZW50KGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogQ3VzdG9tRWxlbWVudCB7XHJcblx0XHRsZXQgaHRtbCA9ICc8JyArIGNvbXBvbmVudCArICcgJztcclxuXHRcdGZvcihsZXQga2V5IGluIGFyZ3MpXHJcblx0XHRcdGh0bWwgKz0gJyMnICsga2V5ICsgJz1cInt7JyArIGFyZ3Nba2V5XSArICd9fVwiJyArICcgJ1xyXG5cdFx0aHRtbCArPSAnPjwvJyArIGNvbXBvbmVudCArICc+J1xyXG5cdFx0XHJcblx0XHR0aGlzLmRpdi5pbm5lckhUTUwgPSBodG1sO1xyXG5cdFx0bGV0IGVsZW1lbnQgPSA8Q3VzdG9tRWxlbWVudD50aGlzLmRpdi5jaGlsZHJlblswXVxyXG5cdFx0XHJcblx0XHRiaW5kRG9tKGVsZW1lbnQsIFthcmdzXSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHRcclxuXHRwcm90ZWN0ZWQgY2xlYXJTaGFkb3coKTogdm9pZCB7XHJcblx0XHR3aGlsZSAodGhpcy5zaGFkb3dSb290LmZpcnN0Q2hpbGQpXHJcblx0XHRcdHRoaXMuc2hhZG93Um9vdC5yZW1vdmVDaGlsZCh0aGlzLnNoYWRvd1Jvb3QuZmlyc3RDaGlsZCk7XHJcblx0fVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9