define(["require", "exports"], function (require, exports) {
    var RouteStatic = (function () {
        function RouteStatic() {
            this.routers = [];
            this.history = [];
            window.onhashchange = this.onHashchange.bind(this);
            this.onHashchange(undefined);
        }
        RouteStatic.prototype.addRouter = function (router) {
            this.routers.push(router);
        };
        RouteStatic.prototype.removeRouter = function (router) {
            this.routers.splice(this.routers.indexOf(router), 1);
        };
        RouteStatic.prototype.route = function (url, extern, router, viewName) {
            var _this = this;
            return Promise.resolve('')
                .then(function (_) {
                return _this.beforeRoute(url, router, viewName);
            })
                .then(function (_) {
                return _this.canDeactivate(url, router, viewName);
            }, function (url) {
                _this.route(url, extern, router, viewName);
            })
                .then(function (_) {
                return _this.canActivate(url, router, viewName);
            })
                .then(function (_) {
                return _this.activate(url, router, viewName);
            })
                .then(function (_) {
                //if(!router)
                _this.setUrl(url);
            })
                .catch(function (url) {
                if (!!extern)
                    _this.goBack();
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
            var hash = window.location.hash.length === 0 ? '' : window.location.hash.substring(1);
            if (!!event && (event.newURL.match(/#(.*)/) || [])[1] === hash)
                return;
            this.route(hash, true);
        };
        RouteStatic.prototype.setUrl = function (url) {
            window.onhashchange = void 0;
            window.location.hash = url;
            window.onhashchange = this.onHashchange.bind(this);
            this.history.push(url);
        };
        RouteStatic.prototype.goBack = function () {
            this.setUrl(this.history.pop() || '');
        };
        return RouteStatic;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = RouteStatic;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9yb3V0ZXN0YXRpYy50cyJdLCJuYW1lcyI6WyJSb3V0ZVN0YXRpYyIsIlJvdXRlU3RhdGljLmNvbnN0cnVjdG9yIiwiUm91dGVTdGF0aWMuYWRkUm91dGVyIiwiUm91dGVTdGF0aWMucmVtb3ZlUm91dGVyIiwiUm91dGVTdGF0aWMucm91dGUiLCJSb3V0ZVN0YXRpYy5iZWZvcmVSb3V0ZSIsIlJvdXRlU3RhdGljLmNhbkRlYWN0aXZhdGUiLCJSb3V0ZVN0YXRpYy5jYW5BY3RpdmF0ZSIsIlJvdXRlU3RhdGljLmFjdGl2YXRlIiwiUm91dGVTdGF0aWMub25IYXNoY2hhbmdlIiwiUm91dGVTdGF0aWMuc2V0VXJsIiwiUm91dGVTdGF0aWMuZ29CYWNrIl0sIm1hcHBpbmdzIjoiO0lBRUE7UUFLQ0E7WUFIUUMsWUFBT0EsR0FBa0JBLEVBQUVBLENBQUNBO1lBQzVCQSxZQUFPQSxHQUFrQkEsRUFBRUEsQ0FBQ0E7WUFHbkNBLE1BQU1BLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ25EQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUM5QkEsQ0FBQ0E7UUFFTUQsK0JBQVNBLEdBQWhCQSxVQUFpQkEsTUFBYUE7WUFDN0JFLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQzNCQSxDQUFDQTtRQUVNRixrQ0FBWUEsR0FBbkJBLFVBQW9CQSxNQUFhQTtZQUNoQ0csSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdERBLENBQUNBO1FBRU1ILDJCQUFLQSxHQUFaQSxVQUFhQSxHQUFVQSxFQUFFQSxNQUFjQSxFQUFFQSxNQUFjQSxFQUFFQSxRQUFnQkE7WUFBekVJLGlCQTBCQ0E7WUF6QkFBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBO2lCQUN6QkEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUFBO1lBQy9DQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUFBO1lBQ2pEQSxDQUFDQSxFQUNEQSxVQUFBQSxHQUFHQTtnQkFDRkEsS0FBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsRUFBRUEsTUFBTUEsRUFBRUEsTUFBTUEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDM0NBLENBQUNBLENBQ0FBO2lCQUNBQSxJQUFJQSxDQUFDQSxVQUFBQSxDQUFDQTtnQkFDTkEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsRUFBRUEsTUFBTUEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDaERBLENBQUNBLENBQUNBO2lCQUNEQSxJQUFJQSxDQUFDQSxVQUFBQSxDQUFDQTtnQkFDTkEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsRUFBRUEsTUFBTUEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDN0NBLENBQUNBLENBQUNBO2lCQUNEQSxJQUFJQSxDQUFDQSxVQUFBQSxDQUFDQTtnQkFDTkEsYUFBYUE7Z0JBQ1pBLEtBQUlBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ25CQSxDQUFDQSxDQUFDQTtpQkFDREEsS0FBS0EsQ0FBQ0EsVUFBQUEsR0FBR0E7Z0JBQ1RBLEVBQUVBLENBQUFB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QUNBLENBQUNBO1lBRXRGQSxFQUFFQSxDQUFBQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxDQUFDQTtnQkFDN0RBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1FBQ3hCQSxDQUFDQTtRQUVPVCw0QkFBTUEsR0FBZEEsVUFBZUEsR0FBVUE7WUFDeEJVLE1BQU1BLENBQUNBLFlBQVlBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBO1lBQzdCQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUMzQkEsTUFBTUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFbkRBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ3hCQSxDQUFDQTtRQUVPViw0QkFBTUEsR0FBZEE7WUFDQ1csSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsQ0FBQ0EsQ0FBQUE7UUFDdENBLENBQUNBO1FBQ0ZYLGtCQUFDQTtJQUFEQSxDQWhHQSxBQWdHQ0EsSUFBQTtJQWhHRDtpQ0FnR0MsQ0FBQSIsImZpbGUiOiJyb3V0ZXIvcm91dGVzdGF0aWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUm91dGVyIGZyb20gJy4vcm91dGVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVTdGF0aWMge1xyXG5cdFxyXG5cdHByaXZhdGUgcm91dGVyczogQXJyYXk8Um91dGVyPiA9IFtdO1xyXG5cdHByaXZhdGUgaGlzdG9yeTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0d2luZG93Lm9uaGFzaGNoYW5nZSA9IHRoaXMub25IYXNoY2hhbmdlLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLm9uSGFzaGNoYW5nZSh1bmRlZmluZWQpO1xyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgYWRkUm91dGVyKHJvdXRlcjpSb3V0ZXIpOiB2b2lkIHtcclxuXHRcdHRoaXMucm91dGVycy5wdXNoKHJvdXRlcik7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyByZW1vdmVSb3V0ZXIocm91dGVyOlJvdXRlcik6IHZvaWQge1xyXG5cdFx0dGhpcy5yb3V0ZXJzLnNwbGljZSh0aGlzLnJvdXRlcnMuaW5kZXhPZihyb3V0ZXIpLCAxKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIHJvdXRlKHVybDpzdHJpbmcsIGV4dGVybjpib29sZWFuLCByb3V0ZXI/OlJvdXRlciwgdmlld05hbWU/OnN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCcnKVxyXG5cdFx0LnRoZW4oXz0+e1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5iZWZvcmVSb3V0ZSh1cmwsIHJvdXRlciwgdmlld05hbWUpXHJcblx0XHR9KVx0XHRcclxuXHRcdC50aGVuKF89PntcclxuXHRcdFx0cmV0dXJuIHRoaXMuY2FuRGVhY3RpdmF0ZSh1cmwsIHJvdXRlciwgdmlld05hbWUpXHJcblx0XHR9LFxyXG5cdFx0dXJsPT57IC8vY2FsbGVkIHdpdGggcmVkaXJlY3QgdXJsLCBpZiBiZWZvcmVSb3V0ZSByZXR1cm5zIGFuIHJlamVjdGVkIFByb21pc2VcclxuXHRcdFx0dGhpcy5yb3V0ZSh1cmwsIGV4dGVybiwgcm91dGVyLCB2aWV3TmFtZSk7XHJcblx0XHR9XHJcblx0XHQpXHJcblx0XHQudGhlbihfPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5jYW5BY3RpdmF0ZSh1cmwsIHJvdXRlciwgdmlld05hbWUpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKF89PntcclxuXHRcdFx0cmV0dXJuIHRoaXMuYWN0aXZhdGUodXJsLCByb3V0ZXIsIHZpZXdOYW1lKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbihfPT57XHJcblx0XHRcdC8vaWYoIXJvdXRlcilcclxuXHRcdFx0XHR0aGlzLnNldFVybCh1cmwpO1xyXG5cdFx0fSlcclxuXHRcdC5jYXRjaCh1cmw9PiB7XHJcblx0XHRcdGlmKCEhZXh0ZXJuKVxyXG5cdFx0XHRcdHRoaXMuZ29CYWNrKCk7XHJcblx0XHR9KVxyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgYmVmb3JlUm91dGUodXJsOnN0cmluZywgcm91dGVyPzpSb3V0ZXIsIHZpZXdOYW1lPzpzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0aWYoISFyb3V0ZXIpXHJcblx0XHRcdHJldHVybiByb3V0ZXIuYmVmb3JlUm91dGUodXJsKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHRoaXMucm91dGVycy5tYXAocm91dGVyID0+IHtyZXR1cm4gcm91dGVyLmJlZm9yZVJvdXRlKHVybCl9KSlcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGNhbkRlYWN0aXZhdGUodXJsOnN0cmluZywgcm91dGVyPzpSb3V0ZXIsIHZpZXdOYW1lPzpzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0aWYoISFyb3V0ZXIpXHJcblx0XHRcdHJldHVybiByb3V0ZXIuY2FuRGVhY3RpdmF0ZSh1cmwsIHZpZXdOYW1lKTtcclxuXHRcdGVsc2VcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbCh0aGlzLnJvdXRlcnMubWFwKHJvdXRlciA9PiB7cmV0dXJuIHJvdXRlci5jYW5EZWFjdGl2YXRlKHVybCwgdmlld05hbWUpfSkpXHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBjYW5BY3RpdmF0ZSh1cmw6c3RyaW5nLCByb3V0ZXI/OlJvdXRlciwgdmlld05hbWU/OnN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZighIXJvdXRlcilcclxuXHRcdFx0cmV0dXJuIHJvdXRlci5jYW5BY3RpdmF0ZSh1cmwsIHZpZXdOYW1lKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHRoaXMucm91dGVycy5tYXAocm91dGVyID0+IHtyZXR1cm4gcm91dGVyLmNhbkFjdGl2YXRlKHVybCwgdmlld05hbWUpfSkpXHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBhY3RpdmF0ZSh1cmw6c3RyaW5nLCByb3V0ZXI/OlJvdXRlciwgdmlld05hbWU/OnN0cmluZyk6IHZvaWQge1xyXG5cdFx0aWYoISFyb3V0ZXIpXHJcblx0XHRcdHJvdXRlci5hY3RpdmF0ZSh1cmwsIHZpZXdOYW1lKTtcclxuXHRcdGVsc2UgXHJcblx0XHRcdHRoaXMucm91dGVycy5mb3JFYWNoKHJvdXRlciA9PiB7XHJcblx0XHRcdFx0cm91dGVyLmFjdGl2YXRlKHVybCwgdmlld05hbWUpO1xyXG5cdFx0XHR9KVxyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIG9uSGFzaGNoYW5nZShldmVudDpIYXNoQ2hhbmdlRXZlbnQpOiB2b2lkIHtcclxuXHRcdGxldCBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2gubGVuZ3RoID09PSAwID8gJycgOiB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSk7XHJcblx0XHRcclxuXHRcdGlmKCEhZXZlbnQgJiYgKGV2ZW50Lm5ld1VSTC5tYXRjaCgvIyguKikvKSB8fCBbXSlbMV0gPT09IGhhc2gpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdFx0XHJcblx0XHR0aGlzLnJvdXRlKGhhc2gsIHRydWUpO1xyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIHNldFVybCh1cmw6c3RyaW5nKTogdm9pZCB7XHJcblx0XHR3aW5kb3cub25oYXNoY2hhbmdlID0gdm9pZCAwO1xyXG5cdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSB1cmw7XHJcblx0XHR3aW5kb3cub25oYXNoY2hhbmdlID0gdGhpcy5vbkhhc2hjaGFuZ2UuYmluZCh0aGlzKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5oaXN0b3J5LnB1c2godXJsKTtcclxuXHR9XHJcblx0XHJcblx0cHJpdmF0ZSBnb0JhY2soKTogdm9pZCB7XHJcblx0XHR0aGlzLnNldFVybCh0aGlzLmhpc3RvcnkucG9wKCkgfHwgJycpXHJcblx0fVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9