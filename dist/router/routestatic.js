define(["require", "exports"], function (require, exports) {
    var RouteStatic = (function () {
        function RouteStatic() {
            this.routers = [];
            this.history = [];
            this._routing = Promise.resolve('');
            window.onhashchange = this.onHashchange.bind(this);
            this.onHashchange(undefined);
        }
        Object.defineProperty(RouteStatic.prototype, "routing", {
            get: function () { return this._routing; },
            enumerable: true,
            configurable: true
        });
        RouteStatic.prototype.addRouter = function (router) {
            var _this = this;
            this.routing.then(function (_) {
                _this.routers.push(router);
            });
        };
        RouteStatic.prototype.removeRouter = function (router) {
            this.routers.splice(this.routers.indexOf(router), 1);
        };
        RouteStatic.prototype.startRouting = function () {
            var _this = this;
            this._routing = new Promise(function (resolve, reject) {
                _this.resolve_routing = resolve;
            });
        };
        RouteStatic.prototype.stopRouting = function () {
            (this.resolve_routing || function () { }).call(this);
        };
        RouteStatic.prototype.route = function (url, extern, router, viewName, args) {
            var _this = this;
            if (this.routers.length === 0 && !router && !viewName) {
                this.stopRouting();
                return;
            }
            return this.routing
                .then(function (_) {
                _this.startRouting();
                return _this.beforeRoute(url, router, viewName); //may reject, if redirect.
            })
                .then(function (_) {
                return _this.canDeactivate(url, router, viewName, args);
            })
                .then(function (_) {
                return _this.canActivate(url, router, viewName, args);
            })
                .then(function (_) {
                return _this.activate(url, router, viewName, args);
            })
                .then(function (_) {
                _this.setUrl(url);
                _this.stopRouting();
            })
                .catch(function (url) {
                _this.stopRouting();
                if (typeof url === "string") {
                    return _this.redirect(url, extern, router, viewName);
                }
            });
        };
        RouteStatic.prototype.redirect = function (url, extern, router, viewName) {
            this.stopRouting();
            //return this.route(url, extern, router, viewName);
            return this.route(url, extern);
        };
        RouteStatic.prototype.beforeRoute = function (url, router, viewName) {
            if (!!router)
                return router.beforeRoute(url);
            else
                return Promise.all(this.routers.map(function (router) { return router.beforeRoute(url); }));
        };
        RouteStatic.prototype.canDeactivate = function (url, router, viewName, args) {
            if (!!router)
                return router.canDeactivate(url, viewName, args);
            else
                return Promise.all(this.routers.map(function (router) { return router.canDeactivate(url, viewName, args); }));
        };
        RouteStatic.prototype.canActivate = function (url, router, viewName, args) {
            if (!!router)
                return router.canActivate(url, viewName, args);
            else
                return Promise.all(this.routers.map(function (router) { return router.canActivate(url, viewName, args); }));
        };
        RouteStatic.prototype.activate = function (url, router, viewName, args) {
            if (!!router)
                router.activate(url, viewName, args);
            else
                this.routers.forEach(function (router) {
                    router.activate(url, viewName, args);
                });
        };
        RouteStatic.prototype.onHashchange = function (event) {
            var hash = window.location.hash.length === 0 ? '' : window.location.hash.substring(1);
            this.route(hash, true);
        };
        RouteStatic.prototype.setUrl = function (url) {
            window.onhashchange = void 0;
            window.location.hash = url;
            this.history.push(url);
            window.onhashchange = this.onHashchange.bind(this);
        };
        RouteStatic.prototype.goBack = function () {
            this.setUrl(this.history.pop() || '');
        };
        return RouteStatic;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = RouteStatic;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9yb3V0ZXN0YXRpYy50cyJdLCJuYW1lcyI6WyJSb3V0ZVN0YXRpYyIsIlJvdXRlU3RhdGljLmNvbnN0cnVjdG9yIiwiUm91dGVTdGF0aWMucm91dGluZyIsIlJvdXRlU3RhdGljLmFkZFJvdXRlciIsIlJvdXRlU3RhdGljLnJlbW92ZVJvdXRlciIsIlJvdXRlU3RhdGljLnN0YXJ0Um91dGluZyIsIlJvdXRlU3RhdGljLnN0b3BSb3V0aW5nIiwiUm91dGVTdGF0aWMucm91dGUiLCJSb3V0ZVN0YXRpYy5yZWRpcmVjdCIsIlJvdXRlU3RhdGljLmJlZm9yZVJvdXRlIiwiUm91dGVTdGF0aWMuY2FuRGVhY3RpdmF0ZSIsIlJvdXRlU3RhdGljLmNhbkFjdGl2YXRlIiwiUm91dGVTdGF0aWMuYWN0aXZhdGUiLCJSb3V0ZVN0YXRpYy5vbkhhc2hjaGFuZ2UiLCJSb3V0ZVN0YXRpYy5zZXRVcmwiLCJSb3V0ZVN0YXRpYy5nb0JhY2siXSwibWFwcGluZ3MiOiI7SUFFQTtRQVNDQTtZQVBRQyxZQUFPQSxHQUFrQkEsRUFBRUEsQ0FBQ0E7WUFDNUJBLFlBQU9BLEdBQWtCQSxFQUFFQSxDQUFDQTtZQUU1QkEsYUFBUUEsR0FBaUJBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBS3BEQSxNQUFNQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNuREEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLENBQUNBO1FBTkRELHNCQUFXQSxnQ0FBT0E7aUJBQWxCQSxjQUFvQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQUEsQ0FBQUEsQ0FBQ0E7OztXQUFBRjtRQVNsREEsK0JBQVNBLEdBQWhCQSxVQUFpQkEsTUFBYUE7WUFBOUJHLGlCQUlDQTtZQUhBQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFBQSxDQUFDQTtnQkFDbEJBLEtBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQzNCQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUNIQSxDQUFDQTtRQUVNSCxrQ0FBWUEsR0FBbkJBLFVBQW9CQSxNQUFhQTtZQUNoQ0ksSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdERBLENBQUNBO1FBRVNKLGtDQUFZQSxHQUF0QkE7WUFBQUssaUJBSUNBO1lBSEFBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLE9BQU9BLENBQUNBLFVBQUNBLE9BQU9BLEVBQUVBLE1BQU1BO2dCQUMzQ0EsS0FBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsT0FBT0EsQ0FBQ0E7WUFDaENBLENBQUNBLENBQUNBLENBQUFBO1FBQ0hBLENBQUNBO1FBRVNMLGlDQUFXQSxHQUFyQkE7WUFDQ00sQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsSUFBSUEsY0FBVyxDQUFDLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ25EQSxDQUFDQTtRQUVNTiwyQkFBS0EsR0FBWkEsVUFBYUEsR0FBVUEsRUFBRUEsTUFBY0EsRUFBRUEsTUFBY0EsRUFBRUEsUUFBZ0JBLEVBQUVBLElBQVNBO1lBQXBGTyxpQkErQkNBO1lBN0JBQSxFQUFFQSxDQUFBQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdERBLElBQUlBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO2dCQUNuQkEsTUFBTUEsQ0FBQ0E7WUFDUkEsQ0FBQ0E7WUFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0E7aUJBQ2xCQSxJQUFJQSxDQUFDQSxVQUFBQSxDQUFDQTtnQkFDTkEsS0FBSUEsQ0FBQ0EsWUFBWUEsRUFBRUEsQ0FBQ0E7Z0JBQ3BCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxFQUFFQSxNQUFNQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFBQSxDQUFDQSwwQkFBMEJBO1lBQzFFQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLENBQUFBO1lBQ3ZEQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBQ3REQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBQ25EQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ05BLEtBQUlBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNqQkEsS0FBSUEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7WUFDcEJBLENBQUNBLENBQUNBO2lCQUNEQSxLQUFLQSxDQUFDQSxVQUFBQSxHQUFHQTtnQkFDVEEsS0FBSUEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7Z0JBQ25CQSxFQUFFQSxDQUFBQSxDQUFDQSxPQUFPQSxHQUFHQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDNUJBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO2dCQUNyREEsQ0FBQ0E7WUFDRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDSkEsQ0FBQ0E7UUFFU1AsOEJBQVFBLEdBQWxCQSxVQUFtQkEsR0FBVUEsRUFBRUEsTUFBY0EsRUFBRUEsTUFBY0EsRUFBRUEsUUFBZ0JBO1lBQzlFUSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtZQUNuQkEsbURBQW1EQTtZQUNuREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFDaENBLENBQUNBO1FBRU1SLGlDQUFXQSxHQUFsQkEsVUFBbUJBLEdBQVVBLEVBQUVBLE1BQWNBLEVBQUVBLFFBQWdCQTtZQUM5RFMsRUFBRUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQ1hBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2hDQSxJQUFJQTtnQkFDSEEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBQUEsTUFBTUEsSUFBS0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7UUFDbEZBLENBQUNBO1FBRU1ULG1DQUFhQSxHQUFwQkEsVUFBcUJBLEdBQVVBLEVBQUVBLE1BQWNBLEVBQUVBLFFBQWdCQSxFQUFFQSxJQUFTQTtZQUMzRVUsRUFBRUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQ1hBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBQ2xEQSxJQUFJQTtnQkFDSkEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBQUEsTUFBTUEsSUFBS0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsR0FBR0EsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7UUFDbkdBLENBQUNBO1FBRU1WLGlDQUFXQSxHQUFsQkEsVUFBbUJBLEdBQVVBLEVBQUVBLE1BQWNBLEVBQUVBLFFBQWdCQSxFQUFFQSxJQUFTQTtZQUN6RVcsRUFBRUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQ1hBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBQ2hEQSxJQUFJQTtnQkFDSEEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBQUEsTUFBTUEsSUFBS0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7UUFDbEdBLENBQUNBO1FBRU1YLDhCQUFRQSxHQUFmQSxVQUFnQkEsR0FBVUEsRUFBRUEsTUFBY0EsRUFBRUEsUUFBZ0JBLEVBQUVBLElBQVNBO1lBQ3RFWSxFQUFFQSxDQUFBQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFDWEEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDdENBLElBQUlBO2dCQUNIQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFBQSxNQUFNQTtvQkFDMUJBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO2dCQUN0Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7UUFDSkEsQ0FBQ0E7UUFFT1osa0NBQVlBLEdBQXBCQSxVQUFxQkEsS0FBcUJBO1lBQ3pDYSxJQUFJQSxJQUFJQSxHQUFHQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN0RkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDeEJBLENBQUNBO1FBRU9iLDRCQUFNQSxHQUFkQSxVQUFlQSxHQUFVQTtZQUN4QmMsTUFBTUEsQ0FBQ0EsWUFBWUEsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDN0JBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBO1lBQzNCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN2QkEsTUFBTUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFcERBLENBQUNBO1FBRU9kLDRCQUFNQSxHQUFkQTtZQUNDZSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFBQTtRQUN0Q0EsQ0FBQ0E7UUFDRmYsa0JBQUNBO0lBQURBLENBeEhBLEFBd0hDQSxJQUFBO0lBeEhEO2lDQXdIQyxDQUFBIiwiZmlsZSI6InJvdXRlci9yb3V0ZXN0YXRpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZVN0YXRpYyB7XHJcblx0XHJcblx0cHJpdmF0ZSByb3V0ZXJzOiBBcnJheTxSb3V0ZXI+ID0gW107XHJcblx0cHJpdmF0ZSBoaXN0b3J5OiBBcnJheTxzdHJpbmc+ID0gW107XHJcblx0XHJcblx0cHJpdmF0ZSBfcm91dGluZzogUHJvbWlzZTxhbnk+ID0gUHJvbWlzZS5yZXNvbHZlKCcnKTtcclxuXHRwdWJsaWMgZ2V0IHJvdXRpbmcoKTogUHJvbWlzZTxhbnk+IHtyZXR1cm4gdGhpcy5fcm91dGluZ31cclxuXHRwcml2YXRlIHJlc29sdmVfcm91dGluZzogRnVuY3Rpb247XHJcblx0XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR3aW5kb3cub25oYXNoY2hhbmdlID0gdGhpcy5vbkhhc2hjaGFuZ2UuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMub25IYXNoY2hhbmdlKHVuZGVmaW5lZCk7XHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdHB1YmxpYyBhZGRSb3V0ZXIocm91dGVyOlJvdXRlcik6IHZvaWQge1xyXG5cdFx0dGhpcy5yb3V0aW5nLnRoZW4oXz0+e1xyXG5cdFx0XHR0aGlzLnJvdXRlcnMucHVzaChyb3V0ZXIpO1xyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0cHVibGljIHJlbW92ZVJvdXRlcihyb3V0ZXI6Um91dGVyKTogdm9pZCB7XHJcblx0XHR0aGlzLnJvdXRlcnMuc3BsaWNlKHRoaXMucm91dGVycy5pbmRleE9mKHJvdXRlciksIDEpO1xyXG5cdH1cclxuXHRcclxuXHRwcm90ZWN0ZWQgc3RhcnRSb3V0aW5nKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5fcm91dGluZyA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dGhpcy5yZXNvbHZlX3JvdXRpbmcgPSByZXNvbHZlO1xyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0cHJvdGVjdGVkIHN0b3BSb3V0aW5nKCk6IHZvaWQge1xyXG5cdFx0KHRoaXMucmVzb2x2ZV9yb3V0aW5nIHx8IGZ1bmN0aW9uKCl7fSkuY2FsbCh0aGlzKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIHJvdXRlKHVybDpzdHJpbmcsIGV4dGVybjpib29sZWFuLCByb3V0ZXI/OlJvdXRlciwgdmlld05hbWU/OnN0cmluZywgYXJncz86YW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdFxyXG5cdFx0aWYodGhpcy5yb3V0ZXJzLmxlbmd0aCA9PT0gMCAmJiAhcm91dGVyICYmICF2aWV3TmFtZSkge1xyXG5cdFx0XHR0aGlzLnN0b3BSb3V0aW5nKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXMucm91dGluZ1xyXG5cdFx0LnRoZW4oXz0+e1xyXG5cdFx0XHR0aGlzLnN0YXJ0Um91dGluZygpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5iZWZvcmVSb3V0ZSh1cmwsIHJvdXRlciwgdmlld05hbWUpIC8vbWF5IHJlamVjdCwgaWYgcmVkaXJlY3QuXHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oXz0+e1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5jYW5EZWFjdGl2YXRlKHVybCwgcm91dGVyLCB2aWV3TmFtZSwgYXJncylcclxuXHRcdH0pXHRcdFxyXG5cdFx0LnRoZW4oXz0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuY2FuQWN0aXZhdGUodXJsLCByb3V0ZXIsIHZpZXdOYW1lLCBhcmdzKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbihfPT57XHJcblx0XHRcdHJldHVybiB0aGlzLmFjdGl2YXRlKHVybCwgcm91dGVyLCB2aWV3TmFtZSwgYXJncyk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oXz0+e1xyXG5cdFx0XHR0aGlzLnNldFVybCh1cmwpO1xyXG5cdFx0XHR0aGlzLnN0b3BSb3V0aW5nKCk7XHJcblx0XHR9KVxyXG5cdFx0LmNhdGNoKHVybD0+IHtcclxuXHRcdFx0dGhpcy5zdG9wUm91dGluZygpO1xyXG5cdFx0XHRpZih0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucmVkaXJlY3QodXJsLCBleHRlcm4sIHJvdXRlciwgdmlld05hbWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0cHJvdGVjdGVkIHJlZGlyZWN0KHVybDpzdHJpbmcsIGV4dGVybjpib29sZWFuLCByb3V0ZXI/OlJvdXRlciwgdmlld05hbWU/OnN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcblx0XHR0aGlzLnN0b3BSb3V0aW5nKCk7XHJcblx0XHQvL3JldHVybiB0aGlzLnJvdXRlKHVybCwgZXh0ZXJuLCByb3V0ZXIsIHZpZXdOYW1lKTtcclxuXHRcdHJldHVybiB0aGlzLnJvdXRlKHVybCwgZXh0ZXJuKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGJlZm9yZVJvdXRlKHVybDpzdHJpbmcsIHJvdXRlcj86Um91dGVyLCB2aWV3TmFtZT86c3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGlmKCEhcm91dGVyKVxyXG5cdFx0XHRyZXR1cm4gcm91dGVyLmJlZm9yZVJvdXRlKHVybCk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBQcm9taXNlLmFsbCh0aGlzLnJvdXRlcnMubWFwKHJvdXRlciA9PiB7cmV0dXJuIHJvdXRlci5iZWZvcmVSb3V0ZSh1cmwpfSkpXHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBjYW5EZWFjdGl2YXRlKHVybDpzdHJpbmcsIHJvdXRlcj86Um91dGVyLCB2aWV3TmFtZT86c3RyaW5nLCBhcmdzPzphbnkpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0aWYoISFyb3V0ZXIpXHJcblx0XHRcdHJldHVybiByb3V0ZXIuY2FuRGVhY3RpdmF0ZSh1cmwsIHZpZXdOYW1lLCBhcmdzKTtcclxuXHRcdGVsc2VcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbCh0aGlzLnJvdXRlcnMubWFwKHJvdXRlciA9PiB7cmV0dXJuIHJvdXRlci5jYW5EZWFjdGl2YXRlKHVybCwgdmlld05hbWUsIGFyZ3MpfSkpXHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBjYW5BY3RpdmF0ZSh1cmw6c3RyaW5nLCByb3V0ZXI/OlJvdXRlciwgdmlld05hbWU/OnN0cmluZywgYXJncz86YW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGlmKCEhcm91dGVyKVxyXG5cdFx0XHRyZXR1cm4gcm91dGVyLmNhbkFjdGl2YXRlKHVybCwgdmlld05hbWUsIGFyZ3MpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5yb3V0ZXJzLm1hcChyb3V0ZXIgPT4ge3JldHVybiByb3V0ZXIuY2FuQWN0aXZhdGUodXJsLCB2aWV3TmFtZSwgYXJncyl9KSlcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGFjdGl2YXRlKHVybDpzdHJpbmcsIHJvdXRlcj86Um91dGVyLCB2aWV3TmFtZT86c3RyaW5nLCBhcmdzPzphbnkpOiB2b2lkIHtcclxuXHRcdGlmKCEhcm91dGVyKVxyXG5cdFx0XHRyb3V0ZXIuYWN0aXZhdGUodXJsLCB2aWV3TmFtZSwgYXJncyk7XHJcblx0XHRlbHNlIFxyXG5cdFx0XHR0aGlzLnJvdXRlcnMuZm9yRWFjaChyb3V0ZXIgPT4ge1xyXG5cdFx0XHRcdHJvdXRlci5hY3RpdmF0ZSh1cmwsIHZpZXdOYW1lLCBhcmdzKTtcclxuXHRcdFx0fSlcclxuXHR9XHJcblx0XHJcblx0cHJpdmF0ZSBvbkhhc2hjaGFuZ2UoZXZlbnQ6SGFzaENoYW5nZUV2ZW50KTogdm9pZCB7XHJcblx0XHRsZXQgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLmxlbmd0aCA9PT0gMCA/ICcnIDogd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpO1xyXG5cdFx0dGhpcy5yb3V0ZShoYXNoLCB0cnVlKTtcclxuXHR9XHJcblx0XHJcblx0cHJpdmF0ZSBzZXRVcmwodXJsOnN0cmluZyk6IHZvaWQge1xyXG5cdFx0d2luZG93Lm9uaGFzaGNoYW5nZSA9IHZvaWQgMDtcclxuXHRcdHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gdXJsO1xyXG5cdFx0dGhpcy5oaXN0b3J5LnB1c2godXJsKTtcclxuXHRcdHdpbmRvdy5vbmhhc2hjaGFuZ2UgPSB0aGlzLm9uSGFzaGNoYW5nZS5iaW5kKHRoaXMpO1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHByaXZhdGUgZ29CYWNrKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zZXRVcmwodGhpcy5oaXN0b3J5LnBvcCgpIHx8ICcnKVxyXG5cdH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==