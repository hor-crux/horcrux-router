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
            /*
            for(let key in args)
                html += '#' + key + '="{{' + args[key] + '}}"' + ' '
            */
            html += '></' + component + '>';
            this.div.innerHTML = html;
            var element = this.div.children[0];
            //bindDom(element, [args]);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXcudHMiXSwibmFtZXMiOlsiSGNWaWV3IiwiSGNWaWV3LmNvbnN0cnVjdG9yIiwiSGNWaWV3LmNyZWF0ZWRDYWxsYmFjayIsIkhjVmlldy5hdHRhY2hlZENhbGxiYWNrIiwiSGNWaWV3LmRldGFjaGVkQ2FsbGJhY2siLCJIY1ZpZXcuY2FuRGVhdnRpdmF0ZSIsIkhjVmlldy5jYW5BdnRpdmF0ZSIsIkhjVmlldy5hY3RpdmF0ZSIsIkhjVmlldy5jcmVhdGVFbGVtZW50IiwiSGNWaWV3LmNsZWFyU2hhZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUVBLHNDQUFzQztJQUV0QztRQUNvQ0EsMEJBQWFBO1FBRGpEQTtZQUNvQ0MsOEJBQWFBO1lBTXhDQSxRQUFHQSxHQUFHQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQXlGN0NBLENBQUNBO1FBcEZBRCxnQ0FBZUEsR0FBZkE7WUFDQ0UsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0E7WUFDbkRBLElBQUlBLENBQUNBLGdCQUFnQkEsRUFBRUEsQ0FBQ0E7UUFDekJBLENBQUNBO1FBRURGLGlDQUFnQkEsR0FBaEJBO1lBQ0NHLElBQUlBLE1BQU1BLEdBQU9BLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1lBQ2pDQSxPQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFVQTtnQkFDdkJBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBLElBQUlBLElBQUlBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBO1lBRTNDQSxHQUFHQSxDQUFBQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkJBLEVBQUVBLENBQUFBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFlBQVlBLGdCQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFD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QSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUMxREEsQ0FBQ0E7UUEvRkZUO1lBQUNBLHdCQUFTQTttQkFnR1RBO1FBQURBLGFBQUNBO0lBQURBLENBaEdBLEFBZ0dDQSxFQS9GbUMsNEJBQWEsRUErRmhEO0lBaEdEOzRCQWdHQyxDQUFBIiwiZmlsZSI6InZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ3VzdG9tRWxlbWVudH0gZnJvbSAnaG9yY3J1eC1jb3JlJztcclxuaW1wb3J0IFJvdXRlciBmcm9tICcuL3JvdXRlci9yb3V0ZXInXHJcbi8vaW1wb3J0IHtiaW5kRG9tfSBmcm9tICdob3JjcnV4LWNvcmUnXHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhjVmlldyBleHRlbmRzIEN1c3RvbUVsZW1lbnQge1xyXG5cdFxyXG5cdHByaXZhdGUgY29tcG9uZW50OnN0cmluZztcclxuXHRwcml2YXRlIGFyZ3M6YW55O1xyXG5cdHByaXZhdGUgY3VycmVudDogQ3VzdG9tRWxlbWVudDtcclxuXHRwcml2YXRlIHBlbmRpbmc6IEN1c3RvbUVsZW1lbnQ7XHJcblx0cHJpdmF0ZSBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRwcml2YXRlIHJvdXRlcjogUm91dGVyO1xyXG5cdFxyXG5cdHB1YmxpYyBuYW1lO1xyXG5cdFxyXG5cdGNyZWF0ZWRDYWxsYmFjaygpIHtcclxuXHRcdHRoaXMubmFtZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgJ2RlZmF1bHQnO1xyXG5cdFx0dGhpcy5jcmVhdGVTaGFkb3dSb290KCk7XHJcblx0fVxyXG5cdFxyXG5cdGF0dGFjaGVkQ2FsbGJhY2soKSB7XHJcblx0XHRsZXQgcGFyZW50OmFueSA9IHRoaXMucGFyZW50Tm9kZTtcclxuXHRcdHdoaWxlKCFwYXJlbnQuc2hhZG93Um9vdClcclxuXHRcdFx0cGFyZW50ID0gcGFyZW50Lmhvc3QgfHwgcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcclxuXHRcdGZvcihsZXQga2V5IGluIHBhcmVudCkge1xyXG5cdFx0XHRpZihwYXJlbnRba2V5XSBpbnN0YW5jZW9mIFJvdXRlcikge1xyXG5cdFx0XHRcdHRoaXMucm91dGVyID0gcGFyZW50W2tleV07XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cdFxyXG5cdFx0aWYoIXRoaXMucm91dGVyKVxyXG5cdFx0XHR0aHJvdyAnSGNWaWV3IHNob3VsZCBiZSBjaGlsZCBvZiBhbiBDb21wb25lbnQgdGhhdCBoYXMgYSBSb3V0ZXIhJ1xyXG5cdFx0dGhpcy5yb3V0ZXIuYWRkVmlldyh0aGlzKTtcclxuXHR9XHJcblx0XHJcblx0ZGV0YWNoZWRDYWxsYmFjaygpIHtcclxuXHRcdHRoaXMucm91dGVyLnJlbW92ZVZpZXcodGhpcyk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBjYW5EZWF2dGl2YXRlKGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGlmKGNvbXBvbmVudCA9PT0gdGhpcy5jb21wb25lbnQgJiYgSlNPTi5zdHJpbmdpZnkoYXJncykgPT09IEpTT04uc3RyaW5naWZ5KHRoaXMuYXJncykpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2NhbkRlYWN0aXZhdGUgYmVjYXVzZSByZXF1ZXN0ZWQgY29tcG9uZW50IGFuZCBhcmdzIGFyZSBzYW1lIGFzIGN1cnJlbnQnKTtcclxuXHRcdFxyXG5cdFx0aWYoISF0aGlzLmN1cnJlbnQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuY3VycmVudC5jYW5EZWFjdGl2YXRlKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJ05vIENvbXBvbmVudCB0byBkZWFjdGl2YXRlJyk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBjYW5BdnRpdmF0ZShjb21wb25lbnQ6c3RyaW5nLCBhcmdzOmFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZihjb21wb25lbnQgPT09IHRoaXMuY29tcG9uZW50ICYmIEpTT04uc3RyaW5naWZ5KGFyZ3MpID09PSBKU09OLnN0cmluZ2lmeSh0aGlzLmFyZ3MpKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdjYW5BY3RpdmF0ZSBiZWNhdXNlIHJlcXVlc3RlZCBjb21wb25lbnQgYW5kIGFyZ3MgYXJlIHNhbWUgYXMgY3VycmVudCcpO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucGVuZGluZyA9IHRoaXMuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIGFyZ3MpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5wZW5kaW5nLmNhbkFjdGl2YXRlKCk7XHRcdFxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgYWN0aXZhdGUoY29tcG9uZW50OnN0cmluZywgYXJnczphbnkpOiB2b2lkIHtcclxuXHRcdGlmKGNvbXBvbmVudCA9PT0gdGhpcy5jb21wb25lbnQgJiYgSlNPTi5zdHJpbmdpZnkoYXJncykgPT09IEpTT04uc3RyaW5naWZ5KHRoaXMuYXJncykpXHJcblx0XHRcdHJldHVybiB2b2lkIDA7XHJcblx0XHRcdFxyXG5cdFx0aWYodHlwZW9mIHRoaXMucGVuZGluZyA9PT0gJ3VuZGVmaW5lZCcpXHJcblx0XHRcdHRoaXMucGVuZGluZyA9IHRoaXMuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIGFyZ3MpO1xyXG5cdFx0XHRcclxuXHRcdHRoaXMuY2xlYXJTaGFkb3coKTtcclxuXHRcdHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0aGlzLnBlbmRpbmcpO1xyXG5cdFx0dGhpcy5wZW5kaW5nID0gdm9pZCAwO1xyXG5cdFx0XHJcblx0XHR0aGlzLmN1cnJlbnQgPSA8Q3VzdG9tRWxlbWVudD4oPEhUTUxFbGVtZW50PnRoaXMuc2hhZG93Um9vdCkuY2hpbGRyZW5bMF1cclxuXHRcdHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG5cdFx0dGhpcy5hcmdzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcmdzKSk7XHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdHByb3RlY3RlZCBjcmVhdGVFbGVtZW50KGNvbXBvbmVudDpzdHJpbmcsIGFyZ3M6YW55KTogQ3VzdG9tRWxlbWVudCB7XHJcblx0XHRsZXQgaHRtbCA9ICc8JyArIGNvbXBvbmVudCArICcgJztcclxuXHRcdC8qXHJcblx0XHRmb3IobGV0IGtleSBpbiBhcmdzKVxyXG5cdFx0XHRodG1sICs9ICcjJyArIGtleSArICc9XCJ7eycgKyBhcmdzW2tleV0gKyAnfX1cIicgKyAnICdcclxuXHRcdCovXHJcblx0XHRodG1sICs9ICc+PC8nICsgY29tcG9uZW50ICsgJz4nXHJcblx0XHRcclxuXHRcdHRoaXMuZGl2LmlubmVySFRNTCA9IGh0bWw7XHJcblx0XHRsZXQgZWxlbWVudCA9IDxDdXN0b21FbGVtZW50PnRoaXMuZGl2LmNoaWxkcmVuWzBdXHJcblx0XHRcclxuXHRcdC8vYmluZERvbShlbGVtZW50LCBbYXJnc10pO1xyXG5cdFx0Zm9yKGxldCBrZXkgaW4gYXJncylcclxuXHRcdFx0ZWxlbWVudFtrZXldID0gYXJnc1trZXldO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblx0XHJcblx0cHJvdGVjdGVkIGNsZWFyU2hhZG93KCk6IHZvaWQge1xyXG5cdFx0d2hpbGUgKHRoaXMuc2hhZG93Um9vdC5maXJzdENoaWxkKVxyXG5cdFx0XHR0aGlzLnNoYWRvd1Jvb3QucmVtb3ZlQ2hpbGQodGhpcy5zaGFkb3dSb290LmZpcnN0Q2hpbGQpO1xyXG5cdH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==