define(["require", "exports"], function (require, exports) {
    var RouteStatic = (function () {
        function RouteStatic() {
            this.routers = [];
            window.onhashchange = this.onHashchange.bind(this);
            this.onHashchange(undefined);
        }
        RouteStatic.prototype.addRouter = function (router) {
            this.routers.push(router);
        };
        RouteStatic.prototype.removeRouter = function (router) {
            this.routers.splice(this.routers.indexOf(router), 1);
        };
        RouteStatic.prototype.route = function (url, router) {
            var _this = this;
            Promise.resolve('')
                .then(function (_) {
                return _this.beforeRoute(url, router);
            })
                .then(function (_) {
                return _this.canDeactivate(url, router);
            })
                .then(function (_) {
                return _this.canActivate(url, router);
            })
                .then(function (_) {
                return _this.activate(url, router);
            })
                .then(function (_) {
                _this.setUrl(url);
            })
                .catch(function (url) {
                _this.route(url, router);
            });
        };
        RouteStatic.prototype.beforeRoute = function (url, router) {
            if (!!router)
                return router.beforeRoute(url);
            else
                return Promise.all(this.routers.map(function (router) { return router.beforeRoute(url); }));
        };
        RouteStatic.prototype.canDeactivate = function (url, router) {
            if (!!router)
                return router.canDeactivate(url);
            else
                return Promise.all(this.routers.map(function (router) { return router.canDeactivate(url); }));
        };
        RouteStatic.prototype.canActivate = function (url, router) {
            if (!!router)
                return router.canActivate(url);
            else
                return Promise.all(this.routers.map(function (router) { return router.canActivate(url); }));
        };
        RouteStatic.prototype.activate = function (url, router) {
            if (!!router)
                router.activate(url);
            else
                this.routers.forEach(function (router) {
                    router.activate(url);
                });
        };
        RouteStatic.prototype.onHashchange = function (event) {
            this.route(window.location.hash.substring(1));
        };
        RouteStatic.prototype.setUrl = function (url) {
            window.onhashchange = void 0;
            window.location.hash = url;
            window.onhashchange = this.onHashchange.bind(this);
        };
        return RouteStatic;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = RouteStatic;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9yb3V0ZXN0YXRpYy50cyJdLCJuYW1lcyI6WyJSb3V0ZVN0YXRpYyIsIlJvdXRlU3RhdGljLmNvbnN0cnVjdG9yIiwiUm91dGVTdGF0aWMuYWRkUm91dGVyIiwiUm91dGVTdGF0aWMucmVtb3ZlUm91dGVyIiwiUm91dGVTdGF0aWMucm91dGUiLCJSb3V0ZVN0YXRpYy5iZWZvcmVSb3V0ZSIsIlJvdXRlU3RhdGljLmNhbkRlYWN0aXZhdGUiLCJSb3V0ZVN0YXRpYy5jYW5BY3RpdmF0ZSIsIlJvdXRlU3RhdGljLmFjdGl2YXRlIiwiUm91dGVTdGF0aWMub25IYXNoY2hhbmdlIiwiUm91dGVTdGF0aWMuc2V0VXJsIl0sIm1hcHBpbmdzIjoiO0lBRUE7UUFHQ0E7WUFGUUMsWUFBT0EsR0FBa0JBLEVBQUVBLENBQUNBO1lBR25DQSxNQUFNQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNuREEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLENBQUNBO1FBRU1ELCtCQUFTQSxHQUFoQkEsVUFBaUJBLE1BQWFBO1lBQzdCRSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7UUFFTUYsa0NBQVlBLEdBQW5CQSxVQUFvQkEsTUFBYUE7WUFDaENHLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBQ3REQSxDQUFDQTtRQUVNSCwyQkFBS0EsR0FBWkEsVUFBYUEsR0FBVUEsRUFBRUEsTUFBY0E7WUFBdkNJLGlCQW9CQ0E7WUFuQkFBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBO2lCQUNsQkEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLENBQUFBO1lBQ3JDQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLENBQUFBO1lBQ3ZDQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1lBQ3RDQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1lBQ25DQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLEtBQUlBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2xCQSxDQUFDQSxDQUFDQTtpQkFDREEsS0FBS0EsQ0FBQ0EsVUFBQUEsR0FBR0E7Z0JBQ1RBLEtBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1lBQ3pCQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUNIQSxDQUFDQTtRQUVNSixpQ0FBV0EsR0FBbEJBLFVBQW1CQSxHQUFVQSxFQUFFQSxNQUFjQTtZQUM1Q0ssRUFBRUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQ1hBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2hDQSxJQUFJQTtnQkFDSEEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBQUEsTUFBTUEsSUFBS0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7UUFDbEZBLENBQUNBO1FBRU1MLG1DQUFhQSxHQUFwQkEsVUFBcUJBLEdBQVVBLEVBQUVBLE1BQWNBO1lBQzlDTSxFQUFFQSxDQUFBQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFDWEEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDbENBLElBQUlBO2dCQUNKQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFBQSxNQUFNQSxJQUFLQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFBQSxDQUFBQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUNuRkEsQ0FBQ0E7UUFFTU4saUNBQVdBLEdBQWxCQSxVQUFtQkEsR0FBVUEsRUFBRUEsTUFBY0E7WUFDNUNPLEVBQUVBLENBQUFBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBO2dCQUNYQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNoQ0EsSUFBSUE7Z0JBQ0hBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLFVBQUFBLE1BQU1BLElBQUtBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLENBQUNBLENBQUFBLENBQUFBLENBQUNBLENBQUNBLENBQUNBLENBQUFBO1FBQ2xGQSxDQUFDQTtRQUVNUCw4QkFBUUEsR0FBZkEsVUFBZ0JBLEdBQVVBLEVBQUVBLE1BQWNBO1lBQ3pDUSxFQUFFQSxDQUFBQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFDWEEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLElBQUlBO2dCQUNIQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFBQSxNQUFNQTtvQkFDMUJBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUN0QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7UUFDSkEsQ0FBQ0E7UUFFT1Isa0NBQVlBLEdBQXBCQSxVQUFxQkEsS0FBcUJBO1lBQ3pDUyxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMvQ0EsQ0FBQ0E7UUFFT1QsNEJBQU1BLEdBQWRBLFVBQWVBLEdBQVVBO1lBQ3hCVSxNQUFNQSxDQUFDQSxZQUFZQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUM3QkEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDM0JBLE1BQU1BLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ3BEQSxDQUFDQTtRQUNGVixrQkFBQ0E7SUFBREEsQ0E3RUEsQUE2RUNBLElBQUE7SUE3RUQ7aUNBNkVDLENBQUEiLCJmaWxlIjoicm91dGVyL3JvdXRlc3RhdGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJvdXRlciBmcm9tICcuL3JvdXRlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlU3RhdGljIHtcclxuXHRwcml2YXRlIHJvdXRlcnM6IEFycmF5PFJvdXRlcj4gPSBbXTtcclxuXHRcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHdpbmRvdy5vbmhhc2hjaGFuZ2UgPSB0aGlzLm9uSGFzaGNoYW5nZS5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5vbkhhc2hjaGFuZ2UodW5kZWZpbmVkKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGFkZFJvdXRlcihyb3V0ZXI6Um91dGVyKTogdm9pZCB7XHJcblx0XHR0aGlzLnJvdXRlcnMucHVzaChyb3V0ZXIpO1xyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgcmVtb3ZlUm91dGVyKHJvdXRlcjpSb3V0ZXIpOiB2b2lkIHtcclxuXHRcdHRoaXMucm91dGVycy5zcGxpY2UodGhpcy5yb3V0ZXJzLmluZGV4T2Yocm91dGVyKSwgMSk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyByb3V0ZSh1cmw6c3RyaW5nLCByb3V0ZXI/OlJvdXRlcik6IHZvaWQge1xyXG5cdFx0UHJvbWlzZS5yZXNvbHZlKCcnKVxyXG5cdFx0LnRoZW4oXz0+e1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5iZWZvcmVSb3V0ZSh1cmwsIHJvdXRlcilcclxuXHRcdH0pXHJcblx0XHQudGhlbihfPT57XHJcblx0XHRcdHJldHVybiB0aGlzLmNhbkRlYWN0aXZhdGUodXJsLCByb3V0ZXIpXHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oXz0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuY2FuQWN0aXZhdGUodXJsLCByb3V0ZXIpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKF89PntcclxuXHRcdFx0cmV0dXJuIHRoaXMuYWN0aXZhdGUodXJsLCByb3V0ZXIpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKF89PntcclxuXHRcdFx0dGhpcy5zZXRVcmwodXJsKTtcclxuXHRcdH0pXHJcblx0XHQuY2F0Y2godXJsPT4ge1xyXG5cdFx0XHR0aGlzLnJvdXRlKHVybCwgcm91dGVyKTtcclxuXHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBiZWZvcmVSb3V0ZSh1cmw6c3RyaW5nLCByb3V0ZXI/OlJvdXRlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZighIXJvdXRlcilcclxuXHRcdFx0cmV0dXJuIHJvdXRlci5iZWZvcmVSb3V0ZSh1cmwpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5yb3V0ZXJzLm1hcChyb3V0ZXIgPT4ge3JldHVybiByb3V0ZXIuYmVmb3JlUm91dGUodXJsKX0pKVxyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgY2FuRGVhY3RpdmF0ZSh1cmw6c3RyaW5nLCByb3V0ZXI/OlJvdXRlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZighIXJvdXRlcilcclxuXHRcdFx0cmV0dXJuIHJvdXRlci5jYW5EZWFjdGl2YXRlKHVybCk7XHJcblx0XHRlbHNlXHJcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5yb3V0ZXJzLm1hcChyb3V0ZXIgPT4ge3JldHVybiByb3V0ZXIuY2FuRGVhY3RpdmF0ZSh1cmwpfSkpXHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBjYW5BY3RpdmF0ZSh1cmw6c3RyaW5nLCByb3V0ZXI/OlJvdXRlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZighIXJvdXRlcilcclxuXHRcdFx0cmV0dXJuIHJvdXRlci5jYW5BY3RpdmF0ZSh1cmwpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5yb3V0ZXJzLm1hcChyb3V0ZXIgPT4ge3JldHVybiByb3V0ZXIuY2FuQWN0aXZhdGUodXJsKX0pKVxyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgYWN0aXZhdGUodXJsOnN0cmluZywgcm91dGVyPzpSb3V0ZXIpOiB2b2lkIHtcclxuXHRcdGlmKCEhcm91dGVyKVxyXG5cdFx0XHRyb3V0ZXIuYWN0aXZhdGUodXJsKTtcclxuXHRcdGVsc2UgXHJcblx0XHRcdHRoaXMucm91dGVycy5mb3JFYWNoKHJvdXRlciA9PiB7XHJcblx0XHRcdFx0cm91dGVyLmFjdGl2YXRlKHVybCk7XHJcblx0XHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdHByaXZhdGUgb25IYXNoY2hhbmdlKGV2ZW50Okhhc2hDaGFuZ2VFdmVudCk6IHZvaWQge1xyXG5cdFx0dGhpcy5yb3V0ZSh3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSkpO1xyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIHNldFVybCh1cmw6c3RyaW5nKTogdm9pZCB7XHJcblx0XHR3aW5kb3cub25oYXNoY2hhbmdlID0gdm9pZCAwO1xyXG5cdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSB1cmw7XHJcblx0XHR3aW5kb3cub25oYXNoY2hhbmdlID0gdGhpcy5vbkhhc2hjaGFuZ2UuYmluZCh0aGlzKTtcclxuXHR9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=