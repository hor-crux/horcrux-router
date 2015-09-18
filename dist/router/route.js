define(["require", "exports"], function (require, exports) {
    var Route = (function () {
        function Route(route) {
            this.params = [];
            this.url = route.url;
            this.component = typeof route.component === 'string' ? { default: route.component } : route.component;
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
        return Route;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Route;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9yb3V0ZS50cyJdLCJuYW1lcyI6WyJSb3V0ZSIsIlJvdXRlLmNvbnN0cnVjdG9yIiwiUm91dGUubWF0Y2hlcyIsIlJvdXRlLmdldEFyZ3MiXSwibWFwcGluZ3MiOiI7SUFBQTtRQU9DQSxlQUFZQSxLQUFtQkE7WUFGdkJDLFdBQU1BLEdBQWlCQSxFQUFFQSxDQUFDQTtZQUdqQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7WUFDckJBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLE9BQU9BLEtBQUtBLENBQUNBLFNBQVNBLEtBQUtBLFFBQVFBLEdBQUdBLEVBQUNBLE9BQU9BLEVBQUVBLEtBQUtBLENBQUNBLFNBQVNBLEVBQUNBLEdBQVFBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBO1lBQ3pHQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFBQTtZQUM5RkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBQUEsS0FBS0EsSUFBS0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDekZBLENBQUNBO1FBRU1ELHVCQUFPQSxHQUFkQSxVQUFlQSxHQUFVQTtZQUN4QkUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLENBQUNBO1FBRU1GLHVCQUFPQSxHQUFkQSxVQUFlQSxHQUFVQTtZQUN4QkcsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFM0NBLE1BQU1BLENBQXlCQSxJQUFJQSxDQUFDQSxNQUFNQTtpQkFDekNBLE1BQU1BLENBQUNBLFVBQUNBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBO2dCQUN6QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQUE7Z0JBQzFCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNiQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUVSQSxDQUFDQTtRQUNGSCxZQUFDQTtJQUFEQSxDQTVCQSxBQTRCQ0EsSUFBQTtJQTVCRDsyQkE0QkMsQ0FBQSIsImZpbGUiOiJyb3V0ZXIvcm91dGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZSB7XHJcblx0XHJcblx0cHVibGljIHVybDpzdHJpbmc7XHJcblx0cHVibGljIGNvbXBvbmVudDp7W25hbWU6c3RyaW5nXTpzdHJpbmd9O1xyXG5cdHByaXZhdGUgcmVnZXg6IFJlZ0V4cDtcclxuXHRwcml2YXRlIHBhcmFtczpBcnJheTxzdHJpbmc+ID0gW107XHJcblx0XHJcblx0Y29uc3RydWN0b3Iocm91dGU6IElSb3V0ZUNvbmZpZykge1xyXG5cdFx0dGhpcy51cmwgPSByb3V0ZS51cmw7XHJcblx0XHR0aGlzLmNvbXBvbmVudCA9IHR5cGVvZiByb3V0ZS5jb21wb25lbnQgPT09ICdzdHJpbmcnID8ge2RlZmF1bHQ6IHJvdXRlLmNvbXBvbmVudH0gOiA8YW55PnJvdXRlLmNvbXBvbmVudDtcclxuXHRcdHRoaXMucmVnZXggPSBuZXcgUmVnRXhwKCdeXFwvPycgKyB0aGlzLnVybC5yZXBsYWNlKC86XFx3Ky9nLCAnKC4rKScpLnJlcGxhY2UoL1xcKi9nLCAnLionKSArICckJylcclxuXHRcdHRoaXMucGFyYW1zID0gKHRoaXMudXJsLm1hdGNoKC86XFx3Ky9nKSB8fCBbXSkubWFwKHBhcmFtID0+IHtyZXR1cm4gcGFyYW0uc3Vic3RyaW5nKDEpfSk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBtYXRjaGVzKHVybDpzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLnJlZ2V4LnRlc3QodXJsKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGdldEFyZ3ModXJsOnN0cmluZyk6IHtbbmFtZTpzdHJpbmddOnN0cmluZ30ge1xyXG5cdFx0bGV0IHZhbHVlcyA9IHRoaXMucmVnZXguZXhlYyh1cmwpLnNsaWNlKDEpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gPHtbbmFtZTpzdHJpbmddOnN0cmluZ30+dGhpcy5wYXJhbXNcclxuXHRcdC5yZWR1Y2UoKHByZXYsIGN1cnIsIGluZGV4KSA9PiB7XHJcblx0XHRcdHByZXZbY3Vycl0gPSB2YWx1ZXNbaW5kZXhdXHJcblx0XHRcdHJldHVybiBwcmV2O1xyXG5cdFx0fSwge30pO1xyXG5cdFx0XHJcblx0fVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9