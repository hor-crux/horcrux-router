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
        RouteStatic.prototype.route = function (url, router, viewName) {
            var _this = this;
            return Promise.resolve('')
                .then(function (_) {
                return _this.beforeRoute(url, router, viewName);
            }, function (url) {
                _this.route(url, router, viewName);
            })
                .then(function (_) {
                return _this.canDeactivate(url, router, viewName);
            })
                .then(function (_) {
                return _this.canActivate(url, router, viewName);
            })
                .then(function (_) {
                return _this.activate(url, router, viewName);
            })
                .then(function (_) {
                _this.setUrl(url);
            })
                .catch(function (url) {
                //Route not succesful
            });
        };
        RouteStatic.prototype.beforeRoute = function (url, router, viewName) {
            if (!!router)
                return router.beforeRoute(url);
            else
                return Promise.all(this.routers.map(function (router) { return router.beforeRoute(url); }));
        };
        RouteStatic.prototype.canDeactivate = function (url, router, viewName) {
            if (!!router)
                return router.canDeactivate(url, viewName);
            else
                return Promise.all(this.routers.map(function (router) { return router.canDeactivate(url, viewName); }));
        };
        RouteStatic.prototype.canActivate = function (url, router, viewName) {
            if (!!router)
                return router.canActivate(url, viewName);
            else
                return Promise.all(this.routers.map(function (router) { return router.canActivate(url, viewName); }));
        };
        RouteStatic.prototype.activate = function (url, router, viewName) {
            if (!!router)
                router.activate(url, viewName);
            else
                this.routers.forEach(function (router) {
                    router.activate(url, viewName);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9yb3V0ZXN0YXRpYy50cyJdLCJuYW1lcyI6WyJSb3V0ZVN0YXRpYyIsIlJvdXRlU3RhdGljLmNvbnN0cnVjdG9yIiwiUm91dGVTdGF0aWMuYWRkUm91dGVyIiwiUm91dGVTdGF0aWMucmVtb3ZlUm91dGVyIiwiUm91dGVTdGF0aWMucm91dGUiLCJSb3V0ZVN0YXRpYy5iZWZvcmVSb3V0ZSIsIlJvdXRlU3RhdGljLmNhbkRlYWN0aXZhdGUiLCJSb3V0ZVN0YXRpYy5jYW5BY3RpdmF0ZSIsIlJvdXRlU3RhdGljLmFjdGl2YXRlIiwiUm91dGVTdGF0aWMub25IYXNoY2hhbmdlIiwiUm91dGVTdGF0aWMuc2V0VXJsIl0sIm1hcHBpbmdzIjoiO0lBRUE7UUFHQ0E7WUFGUUMsWUFBT0EsR0FBa0JBLEVBQUVBLENBQUNBO1lBR25DQSxNQUFNQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNuREEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLENBQUNBO1FBRU1ELCtCQUFTQSxHQUFoQkEsVUFBaUJBLE1BQWFBO1lBQzdCRSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7UUFFTUYsa0NBQVlBLEdBQW5CQSxVQUFvQkEsTUFBYUE7WUFDaENHLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBQ3REQSxDQUFDQTtRQUVNSCwyQkFBS0EsR0FBWkEsVUFBYUEsR0FBVUEsRUFBRUEsTUFBY0EsRUFBRUEsUUFBZ0JBO1lBQXpESSxpQkF1QkNBO1lBdEJBQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQTtpQkFDekJBLElBQUlBLENBQUNBLFVBQUFBLENBQUNBO2dCQUNOQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxFQUFFQSxNQUFNQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFBQTtZQUMvQ0EsQ0FBQ0EsRUFDREEsVUFBQUEsR0FBR0E7Z0JBQ0ZBLEtBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBQ25DQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUFBO1lBQ2pEQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBQ2hEQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBQzdDQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLEtBQUlBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2xCQSxDQUFDQSxDQUFDQTtpQkFDREEsS0FBS0EsQ0FBQ0EsVUFBQUEsR0FBR0E7Z0JBQ1RBLHFCQUFxQkE7WUFDdEJBLENBQUNBLENBQUNBLENBQUFBO1FBQ0hBLENBQUNBO1FBRU1KLGlDQUFXQSxHQUFsQkEsVUFBbUJBLEdBQVVBLEVBQUVBLE1BQWNBLEVBQUVBLFFBQWdC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QUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ3BEQSxDQUFDQTtRQUNGVixrQkFBQ0E7SUFBREEsQ0FoRkEsQUFnRkNBLElBQUE7SUFoRkQ7aUNBZ0ZDLENBQUEiLCJmaWxlIjoicm91dGVyL3JvdXRlc3RhdGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJvdXRlciBmcm9tICcuL3JvdXRlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlU3RhdGljIHtcclxuXHRwcml2YXRlIHJvdXRlcnM6IEFycmF5PFJvdXRlcj4gPSBbXTtcclxuXHRcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHdpbmRvdy5vbmhhc2hjaGFuZ2UgPSB0aGlzLm9uSGFzaGNoYW5nZS5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5vbkhhc2hjaGFuZ2UodW5kZWZpbmVkKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGFkZFJvdXRlcihyb3V0ZXI6Um91dGVyKTogdm9pZCB7XHJcblx0XHR0aGlzLnJvdXRlcnMucHVzaChyb3V0ZXIpO1xyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgcmVtb3ZlUm91dGVyKHJvdXRlcjpSb3V0ZXIpOiB2b2lkIHtcclxuXHRcdHRoaXMucm91dGVycy5zcGxpY2UodGhpcy5yb3V0ZXJzLmluZGV4T2Yocm91dGVyKSwgMSk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyByb3V0ZSh1cmw6c3RyaW5nLCByb3V0ZXI/OlJvdXRlciwgdmlld05hbWU/OnN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCcnKVxyXG5cdFx0LnRoZW4oXz0+e1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5iZWZvcmVSb3V0ZSh1cmwsIHJvdXRlciwgdmlld05hbWUpXHJcblx0XHR9LFxyXG5cdFx0dXJsPT57XHJcblx0XHRcdHRoaXMucm91dGUodXJsLCByb3V0ZXIsIHZpZXdOYW1lKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbihfPT57XHJcblx0XHRcdHJldHVybiB0aGlzLmNhbkRlYWN0aXZhdGUodXJsLCByb3V0ZXIsIHZpZXdOYW1lKVxyXG5cdFx0fSlcclxuXHRcdC50aGVuKF89PiB7XHJcblx0XHRcdHJldHVybiB0aGlzLmNhbkFjdGl2YXRlKHVybCwgcm91dGVyLCB2aWV3TmFtZSk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oXz0+e1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5hY3RpdmF0ZSh1cmwsIHJvdXRlciwgdmlld05hbWUpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKF89PntcclxuXHRcdFx0dGhpcy5zZXRVcmwodXJsKTtcclxuXHRcdH0pXHJcblx0XHQuY2F0Y2godXJsPT4ge1xyXG5cdFx0XHQvL1JvdXRlIG5vdCBzdWNjZXNmdWxcclxuXHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBiZWZvcmVSb3V0ZSh1cmw6c3RyaW5nLCByb3V0ZXI/OlJvdXRlciwgdmlld05hbWU/OnN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZighIXJvdXRlcilcclxuXHRcdFx0cmV0dXJuIHJvdXRlci5iZWZvcmVSb3V0ZSh1cmwpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5yb3V0ZXJzLm1hcChyb3V0ZXIgPT4ge3JldHVybiByb3V0ZXIuYmVmb3JlUm91dGUodXJsKX0pKVxyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgY2FuRGVhY3RpdmF0ZSh1cmw6c3RyaW5nLCByb3V0ZXI/OlJvdXRlciwgdmlld05hbWU/OnN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZighIXJvdXRlcilcclxuXHRcdFx0cmV0dXJuIHJvdXRlci5jYW5EZWFjdGl2YXRlKHVybCwgdmlld05hbWUpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKHRoaXMucm91dGVycy5tYXAocm91dGVyID0+IHtyZXR1cm4gcm91dGVyLmNhbkRlYWN0aXZhdGUodXJsLCB2aWV3TmFtZSl9KSlcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGNhbkFjdGl2YXRlKHVybDpzdHJpbmcsIHJvdXRlcj86Um91dGVyLCB2aWV3TmFtZT86c3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGlmKCEhcm91dGVyKVxyXG5cdFx0XHRyZXR1cm4gcm91dGVyLmNhbkFjdGl2YXRlKHVybCwgdmlld05hbWUpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5yb3V0ZXJzLm1hcChyb3V0ZXIgPT4ge3JldHVybiByb3V0ZXIuY2FuQWN0aXZhdGUodXJsLCB2aWV3TmFtZSl9KSlcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGFjdGl2YXRlKHVybDpzdHJpbmcsIHJvdXRlcj86Um91dGVyLCB2aWV3TmFtZT86c3RyaW5nKTogdm9pZCB7XHJcblx0XHRpZighIXJvdXRlcilcclxuXHRcdFx0cm91dGVyLmFjdGl2YXRlKHVybCwgdmlld05hbWUpO1xyXG5cdFx0ZWxzZSBcclxuXHRcdFx0dGhpcy5yb3V0ZXJzLmZvckVhY2gocm91dGVyID0+IHtcclxuXHRcdFx0XHRyb3V0ZXIuYWN0aXZhdGUodXJsLCB2aWV3TmFtZSk7XHJcblx0XHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdHByaXZhdGUgb25IYXNoY2hhbmdlKGV2ZW50Okhhc2hDaGFuZ2VFdmVudCk6IHZvaWQge1xyXG5cdFx0dGhpcy5yb3V0ZSh3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSkpO1xyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIHNldFVybCh1cmw6c3RyaW5nKTogdm9pZCB7XHJcblx0XHR3aW5kb3cub25oYXNoY2hhbmdlID0gdm9pZCAwO1xyXG5cdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSB1cmw7XHJcblx0XHR3aW5kb3cub25oYXNoY2hhbmdlID0gdGhpcy5vbkhhc2hjaGFuZ2UuYmluZCh0aGlzKTtcclxuXHR9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=