define(["require", "exports"], function (require, exports) {
    var Route = (function () {
        function Route(route) {
            this.params = [];
            this.url = route.url;
            this.component = typeof route.component === 'function' ? { default: route.component } : route.component;
            this.redirect = route.redirect;
            this.regex = new RegExp('^\/?' + this.url.replace(/:\w+/g, '(.+)').replace(/\*/g, '.*') + '$');
            this.params = (this.url.match(/:\w+/g) || []).map(function (param) { return param.substring(1); });
        }
        Route.prototype.matches = function (url) {
            return this.regex.test(url);
        };
        Route.prototype.getArgs = function (url) {
            var values = this.regex.exec(url).slice(1);
            return this.params
                .reduce(function (prev, curr, index) {
                prev[curr] = values[index];
                return prev;
            }, {});
        };
        Route.prototype.getComponentSelector = function (viewName) {
            var component = this.component && this.component[viewName];
            if (component === "*") {
                return "*";
            }
            else {
                return component && component.selector || void 0;
            }
        };
        return Route;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Route;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9yb3V0ZS50cyJdLCJuYW1lcyI6WyJSb3V0ZSIsIlJvdXRlLmNvbnN0cnVjdG9yIiwiUm91dGUubWF0Y2hlcyIsIlJvdXRlLmdldEFyZ3MiLCJSb3V0ZS5nZXRDb21wb25lbnRTZWxlY3RvciJdLCJtYXBwaW5ncyI6IjtJQUdBO1FBU0NBLGVBQVlBLEtBQW1CQTtZQUZ2QkMsV0FBTUEsR0FBaUJBLEVBQUVBLENBQUNBO1lBR2pDQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQTtZQUNyQkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsT0FBT0EsS0FBS0EsQ0FBQ0EsU0FBU0EsS0FBS0EsVUFBVUEsR0FBR0EsRUFBQ0EsT0FBT0EsRUFBRUEsS0FBS0EsQ0FBQ0EsU0FBU0EsRUFBQ0EsR0FBUUEsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0E7WUFDM0dBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBO1lBRS9CQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFBQTtZQUM5RkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBQUEsS0FBS0EsSUFBS0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDekZBLENBQUNBO1FBRU1ELHVCQUFPQSxHQUFkQSxVQUFlQSxHQUFVQTtZQUN4QkUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLENBQUNBO1FBRU1GLHVCQUFPQSxHQUFkQSxVQUFlQSxHQUFVQTtZQUN4QkcsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFM0NBLE1BQU1BLENBQXlCQSxJQUFJQSxDQUFDQSxNQUFNQTtpQkFDekNBLE1BQU1BLENBQUNBLFVBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBO2dCQUN6QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQUE7Z0JBQzFCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNiQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUVSQSxDQUFDQTtRQUVNSCxvQ0FBb0JBLEdBQTNCQSxVQUE0QkEsUUFBZUE7WUFDMUNJLElBQUlBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLElBQUlBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBQzNEQSxFQUFFQSxDQUFBQSxDQUFDQSxTQUFTQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdEJBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBO1lBQ1pBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLENBQUNBO2dCQUNMQSxNQUFNQSxDQUFDQSxTQUFTQSxJQUFVQSxTQUFVQSxDQUFDQSxRQUFRQSxJQUFJQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUN6REEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFDRkosWUFBQ0E7SUFBREEsQ0ExQ0EsQUEwQ0NBLElBQUE7SUExQ0Q7MkJBMENDLENBQUEiLCJmaWxlIjoicm91dGVyL3JvdXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDdXN0b21FbGVtZW50fSBmcm9tICdob3JjcnV4LWNvcmUnXHJcbmltcG9ydCB7SVJvdXRlQ29uZmlnfSBmcm9tICcuL3JvdXRlY29uZmlnJ1xyXG4gXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlIHtcclxuXHRcclxuXHRwdWJsaWMgdXJsOnN0cmluZztcclxuXHRwdWJsaWMgY29tcG9uZW50OntbbmFtZTpzdHJpbmddOnR5cGVvZiBDdXN0b21FbGVtZW50IHwgc3RyaW5nfTtcclxuXHRwdWJsaWMgcmVkaXJlY3Q6c3RyaW5nXHJcblx0XHJcblx0cHJpdmF0ZSByZWdleDogUmVnRXhwO1xyXG5cdHByaXZhdGUgcGFyYW1zOkFycmF5PHN0cmluZz4gPSBbXTtcclxuXHRcclxuXHRjb25zdHJ1Y3Rvcihyb3V0ZTogSVJvdXRlQ29uZmlnKSB7XHJcblx0XHR0aGlzLnVybCA9IHJvdXRlLnVybDtcclxuXHRcdHRoaXMuY29tcG9uZW50ID0gdHlwZW9mIHJvdXRlLmNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJyA/IHtkZWZhdWx0OiByb3V0ZS5jb21wb25lbnR9IDogPGFueT5yb3V0ZS5jb21wb25lbnQ7XHJcblx0XHR0aGlzLnJlZGlyZWN0ID0gcm91dGUucmVkaXJlY3Q7XHJcblx0XHRcclxuXHRcdHRoaXMucmVnZXggPSBuZXcgUmVnRXhwKCdeXFwvPycgKyB0aGlzLnVybC5yZXBsYWNlKC86XFx3Ky9nLCAnKC4rKScpLnJlcGxhY2UoL1xcKi9nLCAnLionKSArICckJylcclxuXHRcdHRoaXMucGFyYW1zID0gKHRoaXMudXJsLm1hdGNoKC86XFx3Ky9nKSB8fCBbXSkubWFwKHBhcmFtID0+IHtyZXR1cm4gcGFyYW0uc3Vic3RyaW5nKDEpfSk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBtYXRjaGVzKHVybDpzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLnJlZ2V4LnRlc3QodXJsKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGdldEFyZ3ModXJsOnN0cmluZyk6IHtbbmFtZTpzdHJpbmddOnN0cmluZ30ge1xyXG5cdFx0bGV0IHZhbHVlcyA9IHRoaXMucmVnZXguZXhlYyh1cmwpLnNsaWNlKDEpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gPHtbbmFtZTpzdHJpbmddOnN0cmluZ30+dGhpcy5wYXJhbXNcclxuXHRcdC5yZWR1Y2UoKHByZXYsIGN1cnIsIGluZGV4KSA9PiB7XHJcblx0XHRcdHByZXZbY3Vycl0gPSB2YWx1ZXNbaW5kZXhdXHJcblx0XHRcdHJldHVybiBwcmV2O1xyXG5cdFx0fSwge30pO1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBnZXRDb21wb25lbnRTZWxlY3Rvcih2aWV3TmFtZTpzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0bGV0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50ICYmIHRoaXMuY29tcG9uZW50W3ZpZXdOYW1lXTtcclxuXHRcdGlmKGNvbXBvbmVudCA9PT0gXCIqXCIpIHtcclxuXHRcdFx0cmV0dXJuIFwiKlwiO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiBjb21wb25lbnQgJiYgKDxhbnk+Y29tcG9uZW50KS5zZWxlY3RvciB8fCB2b2lkIDA7XHJcblx0XHR9XHJcblx0fVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9